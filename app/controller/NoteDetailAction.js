Ext.define('cfa.controller.NoteDetailAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			backBtn: 'button[name="notedetail_back_btn"]',
			saveBtn: 'button[name="notedetail_save_btn"]',
			notedetailview:{
        		//引用新建笔记页面
                selector: 'notedetailview',
                xtype: "notedetailview",
                autoCreate: true
        	}
		},
		control: {
			backBtn: {
						tap : 'backToNotebookview'
			},
			saveBtn: {
						tap: 'saveNote'
			},
		},
		routes:{
			'notedetail':'showNotedetailview'
		}
	},

	//返回到随手记页面,同时删除新建笔记的页面
	backToNotebookview: function(){
		this.redirectTo('notebook');
		Ext.Viewport.remove(this.getNotedetailview());
        var list = Ext.getCmp("noteBookList");
        var store = list.getStore();
        store.removeAt(store.getCount()-1);
        var newData = {'id':0,'name':'全部笔记'};
        store.insert(0,newData);
	},

    //保存笔记
	saveNote:function(){
        var noteTitle = Ext.getCmp("noteDetailTitle");
        var noteContent= Ext.getCmp("noteDetailContent");
        var noteBookId = Ext.getCmp("noteGroup");
        var note = Ext.getStore("NoteDetailStore").getAt(0);
        note.set("title",noteTitle.getValue());
        note.set("content",noteContent.getValue());
        note.set("noteBookId",noteBookId.getValue());
        var createDate = new Date(note.get('createDate'));
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
                noteTitle.setValue("");
                noteContent.setValue("");   
            }

        });
        // this.backToNotebookview();
	},

	//显示笔记详情页面
	showNotedetailview:function(){
    	Ext.Viewport.setActiveItem(this.getNotedetailview());
        var noteId = localStorage.noteId;
        Ext.data.JsonP.request({
                url:domain+'RandomNote/findNoteById',
                callbackKey:'callback',
                callback:'callback',
                params:{
                    'userId':'199762408FBC4D6C9455BB332D5FC877',
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
                        
                        alert("加载数据失败");
                    }
                }
            })
    },

});