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
			/*笔记本名称textfield*/
			nbNameField:'textfield[name="nbNameField"]',
			/*笔记本名称模态对话框确定按钮*/
			nbNameBtn:'button[name="nbNameBtn"]',
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
						itemswipe:'moveSlideNav',//移动侧栏
			},
			/*笔记本列表*/
			noteBookList:{
						itemtap : 'showNote',
						itemtaphold:'showNbModel',
						initialize:'nbListInit',
						itemswipe:'OpenOrCloseSlideNav',//移动侧栏
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
			/*笔记本名称textfield*/
			nbNameField:{
					focus:'hideNullTips',
			},
			/*笔记本名称模态对话框确定按钮*/
			nbNameBtn:{
					tap:'doNbRnOrNew',
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
    	// if(list.getStore.getCount!=0){}
    	for(var index in delNoteList){
    		list.getItemAt(delNoteList[index]).removeCls("Listitem-del");
    	}
    	Ext.getCmp("shownoteList").removeCls("DelNoteList");
    	Ext.getCmp("noteDelBar").setTitle("已选择1个");
    },

    /*重置删除列表*/
    resetDelNote:function(){
    	delNoteList.splice(0,delNoteList.length);
    	delNoteIdList.splice(0,delNoteIdList.length);
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
    	var showTipsModal = this.showTipsModal;
    	if(delNoteIdList.length==0){
    		showTipsModal(请选择要删除的笔记,2000);
    		// Ext.Msg.alert("消息","请选择要删除的笔记");
    	}else{
    		var resetDelNote = this.resetDelNote;
    		this.closeDelModel();
    		Ext.data.JsonP.request({
	    		url:domain+'RandomNote/delNote',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'noteIdList':delNoteIdList,
				},
	    		callback:function(success,result){
	    			if(result.result == 0){
	    				var store = Ext.getCmp("shownoteList").getStore();
	    				delNoteList.sort(function(a,b){
	    					return a<b?1:-1;
	    				});
	    				for(var index in delNoteList){
	    					store.removeAt(delNoteList[index]);
	    				}
	    				
	    			}else{
	    				showTipsModal("删除失败",2000);

	    				// Ext.Msg.alert("消息","操作失败");
	    			}
	    			resetDelNote();//重置删除列表
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
					var me = this;
					mainEl = me.getBookfirstview().element;
					
									
					if (mainEl.hasCls('out')) {

						mainEl.removeCls('out').addCls('in'); 
						me.getBookfirstview().setMasked(false);

					} else {

						mainEl.removeCls('in').addCls('out');  
						me.getBookfirstview().setMasked(true);
						var list = Ext.getCmp("noteBookList");
						if(list.getStore().getCount()<=1){
							me.loadNoteBookData();
						}
						// var lastHoldIndex = localStorage.holdItem;
						// if(lastHoldIndex!=0){//全部笔记不可删除
    		// 				list.getItemAt(lastHoldIndex).removeCls("activeNb");
    		// 			}
					}
				},

	/* 加载笔记信息 */
	loadNoteData:function(){
		var list = Ext.getCmp("shownoteList");
    	var store = list.getStore();
    	var showTipsModal = this.showTipsModal;
		Ext.data.JsonP.request({
	    	url:domain+'RandomNote/findNoteByUserId',
	    	callbackKey:'callback',
	    	callback:'callback',
	    	params:{
				'userId': localStorage.userId,
			},
	    	callback:function(success,result){
	    			
	    		if(success&&result.result== 0){//操作成功
	    			store.loadData(result.data);
	    			
	    		}else{
	 				showTipsModal("加载数据失败",2000);
	    			// alert("加载数据失败");
	    		}
	    	}
		})
	},

	/* 加载笔记本信息 */
	loadNoteBookData: function(){
		var list = Ext.getCmp("noteBookList");
    	var store = list.getStore();
    	var showTipsModal = this.showTipsModal;
    	if(store.getCount()<=1){
			Ext.data.JsonP.request({
	    		url:domain+'RandomNote/findNoteBookByUserId',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'userId': localStorage.userId,
				},
	    		callback:function(success,result){
	    			if(success&&result.data != ""){
	    				var length = result.data.length;
	    				for(var i= 0 ;i<length;i++){			
	    					store.addData(result.data[i]);
	    				}
	    			}else{
	 					showTipsModal("加载数据失败",2000);
	    				// alert("加载数据失败");
	    			}
	    		}
			})
		}
	},

	/*显示相关笔记--笔记本选择的itemtap事件*/
	showNote:function(list, index){
		var noteBookId = list.getStore().getAt(index).get('id'); //获取笔记本Id，0表示点击的是全部笔记

		if(localStorage.onlytap == 1){//当只是tap的时候加载数据，而hold的时候不加载数据
			// console.log("tap");	
			var noteList = Ext.getCmp("shownoteList");
			var showTipsModal = this.showTipsModal;
	    	var store = noteList.getStore();
			switch(index){
				case 0:this.showAllNote(store,showTipsModal);break;
				default:this.showNoteInNoteBook(noteBookId,store);break;
			}
			this.toggleNav();//关闭slideNav
		}
		localStorage.onlytap = 1;
	},

	/*显示用户的所有笔记*/
	showAllNote:function(store,showTipsModal){
		// var showTipsModal = this.showTipsModal;
		Ext.data.JsonP.request({
    		url:domain+'RandomNote/findNoteByUserId',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
				'userId':localStorage.userId,
			},
    		callback:function(success,result){
    			if(success&&result.data != ""){
	    				store.loadData(result.data);
	    		}else if(result.data == ""){
	    				store.removeAll();
	    				showTipsModal("您好还没有笔记哦！",2000);
						// alert("该笔记本中还没有笔记");
	    		}else{
	 					store.removeAll();
	 					showTipsModal("加载数据失败",2000);
	    				// alert("加载数据失败");
	    		}
    		},
		})
	},

	/*显示具体笔记本中的笔记*/
	showNoteInNoteBook : function(noteBookId,store){
		var showTipsModal = this.showTipsModal;
			Ext.data.JsonP.request({
	    		url:domain+'RandomNote/findNoteByUserIdAndBookId',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'notebookId': noteBookId,
				},
	    		callback:function(success,result){
	    			if(success&&result.data != ""){
	    				store.loadData(result.data);
	    			}else if(result.data == ""){
	    				store.removeAll();
	    				showTipsModal("该笔记本中还没有笔记",2000);
						// alert("该笔记本中还没有笔记");
	    			}else{
	 					store.removeAll();
	 					showTipsModal("加载数据失败",2000);
	    				// alert("加载数据失败");
	    			}
	    		},
    		});		
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
    		var nbName = record.get("name"); //获取点击Item中的笔记本名称
    		Ext.getCmp("nbModalName").setHtml(nbName);//设置模态对话框的标题为笔记本名称
    		Ext.getCmp("nbModal").show(); 
    		localStorage.nbListTapIndex = index;//更新最新tap的ItemIndex
    	}	
    },

    /*根据选择执行笔记本菜单操作*/
    doNbMenuOpr:function(list, index, target, record){
    	var nbModel = Ext.getCmp("nbModal");
    	switch(index){
    		case 0:
    				localStorage.RnOrNew = 0;
    				var tapIndex = localStorage.nbListTapIndex;
    				var oldName = Ext.getCmp("noteBookList").getStore().getAt(tapIndex).get("name");
    				Ext.getCmp("nbNameField").setValue(oldName);
    				Ext.getCmp("nbRnOrNewModal").show();
    				break;//重命名
    		case 1:this.deleteNoteBook();break;//删除
    		case 2:
    				localStorage.RnOrNew = 1;
    				Ext.getCmp("nbRnOrNewModal").show();break;//新建笔记本
    	};
    	nbModel.hide();
    },

    /*笔记本重命名操作*/
    doRenameForBb:function(store,index,noteBookId,nbName){
	    Ext.data.JsonP.request({
				url:domain+'RandomNote/renameNb',
				callbackKey:'callback',
				callback:'callback',
				params:{
					'noteBookId': noteBookId,
					'name':nbName,
				},
				callback:function(success,result){
				    			if(success==true && result.result == 0){//操作成功
				    				store.getAt(index).set("name",nbName);
				    				// Ext.getCmp("nbRnOrNewModal").hide();
				    			}
				 		},
		});	
    },

    /*新建笔记本*/
    newNb:function(store,index,nbName){
    	Ext.data.JsonP.request({
			    		url:domain+'RandomNote/addNoteBook2',
			    		callbackKey:'callback',
			    		callback:'callback',
			    		params:{
			    			'userId':localStorage.userId,
			    			'noteBookName':nbName,		
						},
			    		callback:function(success,result){
			    			if(success&&result.result==0){//添加成功则把新建笔记本加入到store中，从而在list上显示
			       				var length = store.getCount();
			       				store.addData(result.data);
			    			}else{
			    				//操作失败
			    				Ext.Msg.alert("操作失败","请检查网络连接");
			    			}
			    		},
		});
    },

    /*删除笔记本*/
    deleteNoteBook:function(){
    	var nbMenu = Ext.getCmp("nbModal");
    	nbMenu.hide();
    	var showTipsModal = this.showTipsModal;
    	var showAllNote = this.showAllNote;
    	var showTipsModal = this.showTipsModal;
    	var bookfirstview = this.getBookfirstview();
		// var mainEl = this.getBookfirstview().element;;
		var noteBookAction = this;
		var showNote = this.showNote;//:function(list, index)
    	Ext.Msg.confirm('删除','确认删除该笔记本？',function(btn,text){
				if(btn == 'yes'){
					var store = Ext.getCmp("noteBookList").getStore();
	    			var index = localStorage.nbListTapIndex;
					var noteBookId = store.getAt(index).get("id");
					
					Ext.data.JsonP.request({
			    		url:domain+'RandomNote/delNoteBook',
			    		callbackKey:'callback',
			    		callback:'callback',
			    		params:{
			    			'noteBookId':noteBookId,		
						},
			    		callback:function(success,result){
			    			if(success&&result.result==0){//删除成功则从noteBookLists删除该Item
			       				store.removeAt(index);
			       				showAllNote(Ext.getCmp("shownoteList").getStore(),showTipsModal);
			       				// toggleNav(this);
			       				bookfirstview.element.removeCls('out').addCls('in'); 
								bookfirstview.setMasked(false);
			       				// showNote(Ext.getCmp("noteBookList"),0);

			    			}else{
			    				showTipsModal("删除失败",2000);
			    			}
			    		},
					});
				}
			});
    },

    /*笔记本list初始化事件---初始holdItem值为0*/
    nbListInit:function(list, eOpts ){
    	localStorage.holdItem = 0;
    },

    /*隐藏笔记本名称不能为空的提示---笔记本名称textfield的focus事件*/
    hideNullTips:function(){
    	Ext.getCmp("nbNameTips").hide();
    },

    /*重命名或新建笔记本----笔记本模态对话框的确定按钮tap事件*/
    doNbRnOrNew:function(){
    	var nbNameField = Ext.getCmp("nbNameField");
    	var nbName = nbNameField.getValue();
    	var tips = Ext.getCmp("nbNameTips");
    	if("" == nbName){//笔记本名称为空
    		tips.setHtml("笔记本名称不能为空");
    		tips.show();//显示不为空提示
    	}else if(nbName.length >12){
    		tips.setHtml("笔记本名称必须少于12字");
    		tips.show();//显示名称必须少于12字提示
    	}else{
    		var store = Ext.getCmp("noteBookList").getStore();
    		if(store.find("name",nbName,0,false,true,true) >= 0){
                 tips.setHtml("此笔记本已存在");
                 tips.show();//已存在此笔记本提示
            }else{
            	nbNameField.setValue("");
		    	var index = localStorage.nbListTapIndex;
	    		// var oldName = store.getAt(index).get("name");
	    		var noteBookId = store.getAt(index).get("id"); //获取笔记本Id
	    		Ext.getCmp("nbRnOrNewModal").hide();
	    		if(localStorage.RnOrNew == 0){ //重命名
	    				this.doRenameForBb(store,index,noteBookId,nbName);
	    		}else{//新建笔记本
	    				this.newNb(store,index,nbName);
	    		}
    		}
    	}
    	
    },

    /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout){
    	var tipsModal = Ext.getCmp("nbTipsModal");
		tipsModal.setHtml(tips);
		var width = tips.length*13 + 20;
		tipsModal.setWidth(width);
		var marginLeft = width/-2;
		var MarginString = "0 0 0 "+ marginLeft;
		tipsModal.setMargin(MarginString);
		tipsModal.show();
    	setTimeout('Ext.getCmp("nbTipsModal").hide()',timeout);
    },
    
    /*根据手势活动的左右方向，移动侧栏*/
    moveSlideNav:function( list, index, target, record, e, eOpts){
    	if(e.direction == "left"){
    		this.toggleNav();
    	}
    },

    OpenOrCloseSlideNav:function(list, index, target, record, e, eOpts){
    	if(e.direction == "left"||e.direction =="right"){
    		this.toggleNav();
    	}
    }
});