var delNoteList = new Array();
var delNoteIdList = new Array();
Ext.define('cfa.controller.NotebookAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.JsonP','Ext.data.reader.Json','Ext.data.Store'],
	config: {
		refs: {
			/*返回按钮——返回到记录控页面*/
			backBtn: 'button[name="bookBack_btn"]',
			/*新建笔记按钮*/
			newBtn : 'button[name="new_btn"]',
			/*搜索笔记按钮*/
			searchBtn:'button[name="search_btn"]',
			/*笔记列表*/
			noteList:'list[name="shownoteList"]',
			/*笔记本列表*/
			noteBookList:'list[name="noteBookList"]',
			/*随手记首页*/
			bookfirstview : 'bookfirstview',
			/*侧栏开关按钮*/
			navBtn : 'button[name="nav_btn"]',
			/*关闭删除笔记模式按钮*/
			closeDel_btn:'button[name="closeDel_btn"]',
			/*删除笔记按钮*/
			delNote_btn:'button[name="delNote_btn"]',
			/*删除的TitleBar*/
			delBar : 'titlebar[name="noteDelBar"]',
			/*笔记本的操作选项-模态对话框中的List*/
			nbMenuList : 'list[name="nbMenuList"]',
			/*随手记页面*/
			notebookview:{
        		//引用随手记页面
                selector: 'notebookview',
                xtype: "notebookview",
                autoCreate: true
        	}
		},
		control: {
			/*返回按钮——返回到记录控页面*/
			backBtn: { 
						tap : 'backToRecordview'
			},
			/*侧栏开关按钮-展开笔记本列表*/
	 		navBtn : {
						tap : 'toggleNav'
			},
			/*笔记列表*/
			noteList:{
						itemtap:'noteListTap',
						itemtaphold:'changeToDelModel',
						initialize:'defineModel',
			},
			/*笔记本列表*/
			noteBookList:{
						itemtap : 'showNote',
						// itemtaphold:'showDeleteImg',showNbModel
						itemtaphold:'showNbModel',
						selectionchange:'nbchange',
						initialize:'nbListInit',
			},
			/*搜索笔记按钮*/
			searchBtn:{
						tap:'showSearchView'
			},
			/*新建笔记按钮*/
			newBtn : {
						tap : 'showNewnoteView'
			},
			/*关闭删除笔记模式按钮*/
			closeDel_btn:{
						tap:'closeDelModel',
			},
			/*删除笔记按钮*/
			delNote_btn:{
						tap:'delNote',
			},
			/*删除的TitleBar*/
			delBar:{
					initialize:'delBarInit',
			},
			/*笔记本的操作选项-模态对话框中的List*/
			nbMenuList :{
						//执行菜单相关操作
						itemtap:'doNbMenuOpr',
			},

		},
		routes:{
			'notebook':'showNotebookview'
		}
	},

	//返回到记录控页面,同时删除笔记本的页面
	backToRecordview: function(){
		this.redirectTo('main');
		Ext.Viewport.remove(this.getNotebookview());
	},

	//显示随手记页面
	showNotebookview:function(){
    	Ext.Viewport.setActiveItem(this.getNotebookview());
    	this.loadNoteData();//加载笔记信息
    	this.loadNoteBookData();//加载笔记本信息
    },

    /*定义初始化模式为普通模式0-区别于删除模式1*/
    defineModel:function(){
    	localStorage.noteModel= 0;//设定初始化模式为普通模式
    },

    /*长按笔记list时切换到删除模式*/
    changeToDelModel:function(list, index, target, record){
    	localStorage.noteModel = 1;//删除模式
    	var noteBar =  Ext.getCmp("randomNoteBar");
    	noteBar.hide();
    	var delBar = Ext.getCmp("noteDelBar");
    	delBar.show();
    	var addBtn = Ext.getCmp("addNotePanel");
    	addBtn.hide();//隐藏添加笔记按钮

    	list.getItemAt(index).addCls("Listitem-del");
    	list.addCls("DelNoteList");
    	// .Listitem-del
    },

    /*关闭删除笔记模式*/
    closeDelModel:function(){
    	var noteBar =  Ext.getCmp("randomNoteBar");
    	noteBar.show();
    	var delBar = Ext.getCmp("noteDelBar");
    	delBar.hide();
    	var addBtn = Ext.getCmp("addNotePanel");
    	addBtn.show();//显示添加笔记按钮
    	localStorage.noteModel = 0;
    	var length = delNoteList.length;
    	var list = Ext.getCmp("shownoteList");
    	for(var index in delNoteList){
    		list.getItemAt(delNoteList[index]).removeCls("Listitem-del");
    	}
    	Ext.getCmp("shownoteList").removeCls("DelNoteList");
    	delNoteList.splice(0,delNoteList.length);
    	delNoteIdList.splice(0,delNoteIdList.length);
    	Ext.getCmp("noteDelBar").setTitle("已选择1个");
    },

    /*笔记列表的tap事件*/
    noteListTap:function(list, index, target, record){
    	var model = localStorage.noteModel;
    	if(model == 0){
    		//切换到笔记详情页面
    		this.showNoteDetail(list, index, target, record);
    	}else{
    		//让选中的item置灰表示选中 	
    		var inSelected = false;	
    		for(var selectedIndex in delNoteList){
    			if(index == delNoteList[selectedIndex]){
    				delNoteList.splice(selectedIndex,1);
    				delNoteIdList.splice(selectedIndex,1);
    				list.getItemAt(index).removeCls("Listitem-del");
    				inSelected = true;
    				break;
    			}
    		}
    		if(!inSelected){
    			list.getItemAt(index).addCls("Listitem-del");
    			var noteId = list.getStore().getAt(index).get("id");
    			delNoteList.push(index);
    			delNoteIdList.push(noteId);
    		}
    		if(delNoteList.length == 0){
    			this.closeDelModel();
    		}else{
    			var title = "已选择"+delNoteList.length+"个";
    			Ext.getCmp("noteDelBar").setTitle(title);
    		}
    		
    	}	
    },

    /*删除笔记*/
    delNote:function(){
    	if(delNoteIdList.length==0){
    		Ext.Msg.alert("消息","请选择要删除的笔记");
    	}else{
    		var closeDelModel = this.closeDelModel;
    		Ext.data.JsonP.request({
	    		url:domain+'RandomNote/delNote',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'noteIdList':delNoteIdList,
				},
	    		callback:function(success,result){
	    			alert(result.result);
	    			if(result.result == 0){
	    				var store = Ext.getCmp("shownoteList").getStore();
	    				for(var index in delNoteList){
	    					store.removeAt(delNoteList[index]);
	    				}
	    				closeDelModel();
	    			}else{
	    				Ext.Msg.alert("消息","操作失败");
	    			}
	    		}
			});
    	}
    },

    //切换到新建笔记页面
    showNewnoteView:function(){
    	this.redirectTo('newnote');
    	var list = Ext.getCmp("noteBookList");
    	var store = list.getStore();
    	if(store.getCount()<=1){
			this.loadNoteBookData();
		}	
    	store.removeAt(0);
    	var newData = {'id':0,'name':'新建笔记本'};
    	store.addData(newData);
    },

    /**
     *切换到笔记搜索页面
     */
     showSearchView:function(){
     	this.redirectTo('searchnote');
     },

    /**
	 * 切换展示导航栏
	 */
	toggleNav : function(){
					var me = this,
					mainEl = me.getBookfirstview().element;
					var list = Ext.getCmp("noteBookList");
					if(list.getStore().getCount()<=1){
						this.loadNoteBookData();
					}				
					if (mainEl.hasCls('out')) {

						mainEl.removeCls('out').addCls('in'); 
						me.getBookfirstview().setMasked(false);
					} else {

						mainEl.removeCls('in').addCls('out');  
						me.getBookfirstview().setMasked(true);
						var lastHoldIndex = localStorage.holdItem;
						if(lastHoldIndex!=0||lastHoldIndex!=1){//默认笔记本或全部笔记不可删除
    						list.getItemAt(lastHoldIndex).removeCls("activeNb");
    					}
					}
				},

	/* 加载笔记信息 */
	loadNoteData:function(){
		var list = Ext.getCmp("shownoteList");
    	var store = list.getStore();
		Ext.data.JsonP.request({
	    	url:domain+'RandomNote/findNoteByUserId',
	    	callbackKey:'callback',
	    	callback:'callback',
	    	params:{
				'userId':'199762408FBC4D6C9455BB332D5FC877',
			},
	    	callback:function(success,result){
	    			
	    		if(success&&result!= ""){
	    			store.loadData(result);
	    			
	    		}else{
	 				
	    			alert("加载数据失败");
	    		}
	    	}
		})
	},

	/* 加载笔记本信息 */
	loadNoteBookData: function(){
		var list = Ext.getCmp("noteBookList");
    	var store = list.getStore();
    	if(store.getCount()<=1){
			Ext.data.JsonP.request({
	    		url:domain+'RandomNote/findNoteBookByUserId',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'userId':'199762408FBC4D6C9455BB332D5FC877',
				},
	    		callback:function(success,result){
	    			
	    			
	    			if(success&&result.data != ""){
	    				var length = result.data.length;
	    				for(var i= 0 ;i<length;i++){
	    					
	    					store.addData(result.data[i]);
	    				}
	    			}else{
	 					
	    				alert("加载数据失败");
	    			}
	    		}
			})
		}
	},

	/*显示相关笔记--笔记本选择的itemtap事件*/
	// showNote:function(list, index, target, record){
	// 	var noteBookId = list.getStore().getAt(index).get('id');
	// 	if(localStorage.tapDisclosure == 1){//如果点击的是垃圾桶按钮，则删除相关笔记
	// 		Ext.Msg.confirm('删除','确认删除该笔记本？(将删除该笔记本中的所有笔记哦！)',function(btn,text){
	// 			if(btn == 'yes'){
	// 				this.DelNoteBook(noteBookId, list, index)
	// 			}else{
	// 				alert("cancel");
	// 			}
	// 		})
	// 	}
	// 	else if(localStorage.onlytap == 1){//当只是tap的时候加载数据，而hold的时候不加载数据
	// 		console.log("tap");	
	// 		var noteList = Ext.getCmp("shownoteList");
	//     	var store = noteList.getStore();
	// 		switch(index){
	// 			case 0:this.showAllNote(store);break;
	// 			default:this.showNoteInNoteBook(noteBookId,store);break;
	// 		}
	// 		this.toggleNav();//关闭slideNav
	// 	}
	// 	localStorage.onlytap = 1;
	// 	localStorage.tapDisclosure = 0;
	// },

	/*显示相关笔记--笔记本选择的itemtap事件*/
	showNote:function(list, index, target, record){
		var noteBookId = list.getStore().getAt(index).get('id'); //获取笔记本Id，0表示点击的是全部笔记

		if(localStorage.onlytap == 1){//当只是tap的时候加载数据，而hold的时候不加载数据
			console.log("tap");	
			var noteList = Ext.getCmp("shownoteList");
	    	var store = noteList.getStore();
			switch(index){
				case 0:this.showAllNote(store);break;
				default:this.showNoteInNoteBook(noteBookId,store);break;
			}
			this.toggleNav();//关闭slideNav
		}
		localStorage.onlytap = 1;
	},

	/*删除指定Id的笔记本*/
	DelNoteBook:function(noteBookId, list, index){
		Ext.data.JsonP.request({
    		url:domain+'RandomNote/deleteNoteBook',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
    			'noteBookId':noteBookId,		
			},
    		callback:function(success,result){
    			alert(success);
    			if(success){//删除成功则从noteBookLists删除该Item
       				list.removeAt(index);
    			}else{
    				
    			}
    		},
		})
	},

	/*显示用户的所有笔记*/
	showAllNote:function(store){
		Ext.data.JsonP.request({
    		url:domain+'RandomNote/findNoteByUserId',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
				'userId':'199762408FBC4D6C9455BB332D5FC877',
			},
    		callback:function(success,result){
    			if(result != ""||result!=null){
    				store.loadData(result);
    			}else{
    				alert("加载数据失败");
    			}
    		},
		})
	},

	/*显示具体笔记本中的笔记*/
	showNoteInNoteBook : function(noteBookId,store){
			Ext.data.JsonP.request({
    		url:domain+'RandomNote/findNoteByUserIdAndBookId',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
				'userId':'199762408FBC4D6C9455BB332D5FC877',
				'notebookId': noteBookId
			},
    		callback:function(success,result){
    			if(success&&result.data != ""){
    				store.loadData(result.data);
    			}else if(result.data == ""){
    				store.removeAll();
					alert("该笔记本中还没有笔记");
    			}else{
 					store.removeAll();
    				alert("加载数据失败");
    			}
    		},
    	})		
	},

	/*切换到笔记详情页面*/
	showNoteDetail:function(list, index, target, record){
			var noteStore = list.getStore();
			noteId = noteStore.getAt(index).get('id');
			localStorage.noteId = noteId;
			var list = Ext.getCmp("noteBookList");
    		var store = list.getStore();
    		if(store.getCount()<=1){
				this.loadNoteBookData();
			}	
    		store.removeAt(0);
    		var newData = {'id':0,'name':'新建笔记本'};
    		store.addData(newData);

    		localStorage.lastView = "notebook";
			this.redirectTo("notedetail");
	},

	/*显示删除的垃圾桶图标*/
    showDeleteImg:function(list, index, target, record, e){    
    	// 
    	// console.log("hold");
    	localStorage.onlytap = 0;

    	var lastHoldIndex = localStorage.holdItem; 
    	if(lastHoldIndex!=0||lastHoldIndex!=1){
    		list.getItemAt(lastHoldIndex).removeCls("activeNb");
    	}	    	
    	if(index!=0&&index!=1&&index!=lastHoldIndex){
    		list.getItemAt(index).addCls("activeNb");
    	}	
    	localStorage.holdItem = index;
    },

    /*显示笔记本操作模态对话框*/
    showNbModel:function(list, index, target, record, e){    
    	localStorage.onlytap = 0;   	
    	if(index!=0){ //如果点击的全部笔记Item，则不显示对话框
    		Ext.getCmp("nbModal").show(); 
    	}	
    },

    /*根据选择执行笔记本菜单操作*/
    doNbMenuOpr:function(list, index, target, record){
    	switch(index){
    		case 0:this.doRenameForBb();break;//重命名
    		case 1:this.deleteNoteBook();break;//删除
    		case 2:this.newNb();break;//新建笔记本
    	}
    },

    /*笔记本重命名操作*/
    doRenameForBb:function(){
    	Ext.getCmp("nbModal").hide();
    	Ext.Msg.show({
    		title:'请输入笔记本名称',
    		message:'请输入笔记本名称',
    		height:200,
    		width:'90%',
    		buttons:Ext.MessageBox.YESNO,
    		modal:true,
    		value:'默认值',
    		prompt:true,
    		defaultTextHeight:80,
    	});
    },

    /*新建笔记本*/
    newNb:function(){
    	// Ext.
    },

    /*删除笔记本*/
    deleteNoteBook:function(record,element,index,e){
    	alert("delNB");
    },

    nbchange:function( list, records, eOpts ){
    	// alert("change");
    	// alert(list.getSelectionCount());
    	// alert(records.length);
    	console.log(records[0].get("name"));
    },


    nbListInit:function(list, eOpts ){
    	localStorage.holdItem = 0;
    	localStorage.tapDisclosure = 0;
    },

    delBarInit:function(titleBar,eOpts){
    	titleBar.hide();
    },

});