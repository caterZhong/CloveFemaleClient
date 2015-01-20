Ext.define('cfa.controller.NoteSearchDetailAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.Store'],
	config: {
		refs: {
			backBtn: 'button[name="notesearchDetailBack_btn"]',
			editBtn: 'button[name="notedetaileditBack_btn"]',
			notesearchdetailview:{
        		//引用新建笔记页面
                selector: 'notesearchdetailview',
                xtype: "notesearchdetailview",
                autoCreate: true
        	}
		},
		control: {
			backBtn: {
						tap : 'backToNotebookview'
			},
            // editBtn: {
            //             tap : 'showEditview'
            // },
		},
		routes:{
			'notesearchdetail':'showNotesearchdetailview'
		}
	},

	//返回到随手记页面,同时删除新建笔记的页面
	backToNotesearchview: function(){
		this.redirectTo('searchnote');
	},

    showEditview:function(){
        this.redirectTo('notedetail');
    },

	//显示搜索笔记详情页面
	showNotesearchdetailview:function(){
        Ext.Viewport.setActiveItem(this.getNotesearchdetailview());
        var resultList = Ext.getCmp("notesearchdetailList");
        var store = resultList.getStore();
        store.removeAll();
    	
        var noteId = localStorage.notesearchId;
        var keyword = localStorage.keyword;
        Ext.data.JsonP.request({
                url:domain+'RandomNote/findSearchNoteDetailByNoteIdAndKeyword',
                callbackKey:'callback',
                callback:'callback',
                params:{
                    'userId':'199762408FBC4D6C9455BB332D5FC877',
                    'noteId':noteId,
                    'keyword':keyword,
                },
                callback:function(success,result){    
                    if(success&&result.data!=null&&result.data != ""){
                        store.loadData(result.data);
                    
                    }else{
                        
                        alert("加载数据失败");
                    }
                }
            })
    },

});