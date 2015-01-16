Ext.define('cfa.controller.NotebookAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.JsonP','Ext.data.reader.Json','Ext.data.Store'],
	config: {
		refs: {
			backBtn: 'button[name="bookBack_btn"]',
			newBtn : 'button[name="new_btn"]',
			searchBtn:'button[name="search_btn"]',
			noteList:'list[name="shownoteList"]',
			noteBookList:'list[name="noteBookList"]',
			bookfirstview : 'bookfirstview',
			slidenav:'slidenav',
			navBtn : 'button[name="nav_btn"]',
			notebookview:{
        		//引用随手记页面
                selector: 'notebookview',
                xtype: "notebookview",
                autoCreate: true
        	}
		},
		control: {
			backBtn: {
						tap : 'backToRecordview'
			},
			navBtn : {
						tap : 'toggleNav'
			},
			noteList:{
						itemtap:'showNoteDetail'
			},
			noteBookList:{
						itemtap : 'showNote'
			},
			searchBtn:{
						tap:'showSearchView'
			},
			newBtn : {
						tap : 'showNewnoteView'
			},
												
			slidenav : {
						itemtap : function(list, index, target, record){
										this.toggleNav();
						}
			}
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
    	this.loadNoteBookData();
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
					if(Ext.getCmp("noteBookList").getStore().getCount()<=1){
						this.loadNoteBookData();
					}				
					if (mainEl.hasCls('out')) {

						mainEl.removeCls('out').addCls('in'); 
						me.getBookfirstview().setMasked(false);
					} else {

						mainEl.removeCls('in').addCls('out');  
						me.getBookfirstview().setMasked(true);
					}
				},

	loadNoteBookData: function(){
		var list = Ext.getCmp("noteBookList");
    	var store = list.getStore();
    	// alert(store.getAt(0));
    	if(store.getCount()<=1){
			Ext.data.JsonP.request({
	    		url:'http://localhost:9000/RandomNote/findNoteBookByUserId',
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
	showNote:function(list, index, target, record){
		var noteBookId = list.getStore().getAt(index).get('id');
		var noteList = Ext.getCmp("shownoteList");
    	var store = noteList.getStore();
		switch(index){
			case 0:this.showAllNote(store);break;
			default:this.showNoteInNoteBook(noteBookId,store);break;
		}
	},

	/*显示用户的所有笔记*/
	showAllNote:function(store){
		Ext.data.JsonP.request({
    		url:'http://localhost:9000/RandomNote/findNoteByUserId',
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
    		url:'http://localhost:9000/RandomNote/findNoteByUserIdAndBookId',
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
			// var store = Ext.getStore("ParameterStore");
			// store.removeAll();
			// store.addData({id:noteId});
			var list = Ext.getCmp("noteBookList");
    		var store = list.getStore();
    		if(store.getCount()<=1){
				this.loadNoteBookData();
			}	
    		store.removeAt(0);
    		var newData = {'id':0,'name':'新建笔记本'};
    		store.addData(newData);

			this.redirectTo("notedetail");
	},

});