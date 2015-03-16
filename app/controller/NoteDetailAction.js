Ext.define('cfa.controller.NoteDetailAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
            /*返回按钮---返回到搜索详情页面或随手记页面*/
			backBtn: 'button[name="notedetail_back_btn"]',
            /*保存按钮---保存修改后的笔记*/
			saveBtn: 'button[name="notedetail_save_btn"]',
            /*引用笔记详情页面*/
			notedetailview:{
        		//引用笔记详情页面
                selector: 'notedetailview',
                xtype: "notedetailview",
                autoCreate: true
        	}
		},
		control: {
            /*返回按钮---返回到搜索详情页面或随手记页面*/
			backBtn: {
						tap : 'backToNotebookview'
			},
            /*保存按钮---保存修改后的笔记*/
			saveBtn: {
						tap: 'saveNote'
			},
		},
		routes:{
			'notedetail':'showNotedetailview'
		}
	},

	/*返回到随手记页面,同时删除新建笔记的页面*/
	backToNotebookview: function(){
        var lastView = localStorage.lastView;  //获取上一个页面
		this.redirectTo(lastView); //返回到上一个页面
		Ext.Viewport.remove(this.getNotedetailview());  //删除本页面
        var list = Ext.getCmp("noteBookList");
        var store = list.getStore();
        store.removeAt(store.getCount()-1);
        var newData = {'id':0,'name':'全部笔记'};
        store.insert(0,newData);
	},

    /*保存笔记*/
	saveNote:function(){
        var noteTitle = Ext.getCmp("noteDetailTitle");
        var noteContent= Ext.getCmp("noteDetailContent");
        var noteBookId = Ext.getCmp("noteGroup");
        var note = Ext.getStore("NoteDetailStore").getAt(0);
        note.set("title",noteTitle.getValue());
        note.set("content",noteContent.getValue());
        note.set("noteBookId",noteBookId.getValue());
        var createDate = new Date(note.get('createDate'));
        var showTipsModal = this.showTipsModal;
        Ext.data.JsonP.request({
            url:domain+'RandomNote/updateNote2',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'noteId':note.get('id'),
                'noteTitle':note.get('title'),
                'noteContent':note.get('content'),      
                'createDate':createDate,
                'noteBookId':note.get('noteBookId'),
            },
            callback:function(success,result){  
                if(success && result.result==0){
                    noteTitle.setValue("");
                    noteContent.setValue("");  
                    showTipsModal("保存成功",2000);
                }else{
                    showTipsModal("保存失败",2000);
                }         
                 
            }

        });
        // this.backToNotebookview();
	},

	/*显示笔记详情页面*/
	showNotedetailview:function(){
        var lastView = localStorage.lastView;  //获取上一个页面
        if(lastView == "notebook"){
            Ext.Viewport.setActiveItem(this.getNotedetailview());
        }else{
            Ext.Viewport.animateActiveItem(this.getNotedetailview(),{type:'slide',duration:300});
        }
        var noteId = localStorage.noteId;
        var showTipsModal = this.showTipsModal;
        Ext.data.JsonP.request({
                url:domain+'RandomNote/findNoteById',
                callbackKey:'callback',
                callback:'callback',
                params:{
                    'userId':localStorage.userId,//'199762408FBC4D6C9455BB332D5FC877',
                    'noteId':noteId,
                },
                callback:function(success,result){                   
                    if(success&&result.data!=null&&result.data != ""){
                        var note = result.data;
                        var noteStore = Ext.getStore("NoteDetailStore");
                        noteStore.loadData(result.data);
                        var modifyDate = new Date(note.recentMFDate);
                        var stringModifyDate = modifyDate.getFullYear()+"年"+(modifyDate.getMonth() + 1)+"月"+modifyDate.getDate()+ "日";
                        Ext.getCmp("noteModifyDate_text").setHtml(stringModifyDate);
                        Ext.getCmp("noteDetailTitle").setValue(note.title);
                        Ext.getCmp("noteDetailContent").setValue(note.content);
                        Ext.getCmp("noteGroup").setValue(note.noteBookId);
                    }else{
                        showTipsModal('加载数据失败',2000);
                    }
                }
            })
    },

    /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout){
        var tipsModal = Ext.getCmp("nbDetailTipsModal");
        tipsModal.setHtml(tips);
        var width = tips.length*13 + 20;
        tipsModal.setWidth(width);
        var marginLeft = width/-2;
        var MarginString = "0 0 0 "+ marginLeft;
        tipsModal.setMargin(MarginString);
        tipsModal.show();
        setTimeout('Ext.getCmp("nbDetailTipsModal").hide()',timeout);
    },
    

});