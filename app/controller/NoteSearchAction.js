Ext.define('cfa.controller.NoteSearchAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.JsonP','Ext.data.reader.Json','Ext.data.Store'],
	config: {
		refs: {
			backBtn: 'button[name="notesearchBack_btn"]',
			searchBtn:'button[name="notesearch_btn"]',
			searchList:'list[name="searchnoteList"]',
			notesearchview:{
        		//引用随手记页面
                selector: 'notesearchview',
                xtype: "notesearchview",
                autoCreate: true
        	}
		},
		control: {
			backBtn: {
						tap : 'backToNoteBookview'
			},
			searchBtn:{
						tap : 'loadSearchResult'
			},
			searchList:{
						itemtap:'showsearchdetailview'
			}

		},
		routes:{
			'searchnote':'showNoteSearchView'
		}
	},

	//返回到随手记页面,同时删除笔记搜索的页面
	backToNoteBookview: function(){
		this.redirectTo('notebook');
		// Ext.Viewport.remove(this.getNotesearchview());
	},

	//显示笔记搜索页面
	showNoteSearchView:function(){
    	Ext.Viewport.setActiveItem(this.getNotesearchview());
    	// this.loadNoteBookData();
    },

    /*加载搜索结果*/
    loadSearchResult: function(){
    	var keyWord = Ext.getCmp("notesearch_field").getValue();
    	localStorage.keyword = keyWord;
    	var list = Ext.getCmp("searchnoteList");
    	var store = Ext.getStore('NoteStore');
    	// list.setStore(store);
    	Ext.data.JsonP.request({
    		url:'http://localhost:9000/RandomNote/findNoteByKeyWord',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
				'userId':'199762408FBC4D6C9455BB332D5FC877',
				'keyword': keyWord
			},
    		callback:function(success,result){
    			if(success&&result.data != ""){
    				store.loadData(result.data);
    				list.setStore(store);
    			}else if(result.data == ""){
    				store.removeAll();
					alert("没有找到相关内容");
    			}else{
 					store.removeAll();
    				alert("搜索失败");
    			}
    		},
    	})	
    },

    showsearchdetailview:function(list, index, target, record){
    	alert("切换页面");
    	var noteStore = list.getStore();
		noteId = noteStore.getAt(index).get('id');
		localStorage.notesearchId = noteId;
    	this.redirectTo('notesearchdetail');
    }

});