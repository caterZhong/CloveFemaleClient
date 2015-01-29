Ext.define('cfa.controller.NoteSearchDetailAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.Store'],
	config: {
		refs: {
            /*返回按钮---返回到搜索页面*/
			backBtn: 'button[name="notesearchDetailBack_btn"]',
            /*笔记按钮---切换到笔记详情页面*/
			editBtn: 'button[name="notedetaileditBack_btn"]',
            /*引用笔记搜索详情笔记页面*/
			notesearchdetailview:{
        		//引用笔记搜索详情笔记页面
                selector: 'notesearchdetailview',
                xtype: "notesearchdetailview",
                autoCreate: true
        	}
		},
		control: {
            /*返回按钮---返回到搜索页面*/
			backBtn: {
						tap : 'backToNotesearchview'
			},
            /*笔记按钮---切换到笔记详情页面*/
            editBtn: {
                        tap : 'showEditview'
            },
		},
		routes:{
			'notesearchdetail':'showNotesearchdetailview'
		}
	},

	/*返回到随手记页面,同时删除新建笔记的页面*/
	backToNotesearchview: function(){
		this.redirectTo('searchnote');
	},

    /*切换到笔记详情页面--可编辑*/
    showEditview:function(){
        // this.redirectTo('notedetail');
        var noteId = localStorage.notesearchId;
        localStorage.noteId = noteId;
        var list = Ext.getCmp("noteBookList");
        var store = list.getStore(); 
        store.removeAt(0);
        var newData = {'id':0,'name':'新建笔记本'};
        store.addData(newData);

        localStorage.lastView = "notesearchdetail";
        this.redirectTo("notedetail");
    },

	/*显示搜索笔记详情页面---即本页面*/
	showNotesearchdetailview:function(){
        Ext.Viewport.setActiveItem(this.getNotesearchdetailview());
        var resultList = Ext.getCmp("notesearchdetailList");
        var store = resultList.getStore();
        store.removeAll();

        var showTipsModal = this.showTipsModal;
    	
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
                        showTipsModal("加载数据失败",2000)
                    }
                }
            })
    },

     /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout){
        var tipsModal = Ext.getCmp("nbsearchDetailTipsModal");
        tipsModal.setHtml(tips);
        var width = tips.length*13 + 20;
        tipsModal.setWidth(width);
        var marginLeft = width/-2;
        var MarginString = "0 0 0 "+ marginLeft;
        tipsModal.setMargin(MarginString);
        tipsModal.show();
        setTimeout('Ext.getCmp("nbsearchDetailTipsModal").hide()',timeout);
    },
    

});