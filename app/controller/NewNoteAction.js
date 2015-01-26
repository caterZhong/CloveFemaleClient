Ext.define('cfa.controller.NewNoteAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			newnotebackBtn: 'button[name="newnote_back_btn"]',
			newnotesaveBtn: 'button[name="newnote_save_btn"]',
			newnoteview : 'newnoteview',
			noteGroup : 'selectfield[name="noteGroup"]',
            notebookAddBtn:'button[name="noteBook_add_btn"]',
            notebbooCancelBtn:'button[name="noteBook_cancel_btn"]',
			newNoteBookName:'textfield[name="noteBookName"]',
			newnoteview:{
        		//引用新建笔记页面
                selector: 'newnoteview',
                xtype: "newnoteview",
                autoCreate: true
        	}
		},
		control: {
			newnotebackBtn: {
						tap : 'backToNotebookview'
			},
			newnotesaveBtn: {
						tap: 'saveNote'
			},
			noteGroup: {
					change : 'showNewGroupModal'	
			},
			newNoteBookName:{
					focus : 'hideTips'
			},
			notebookAddBtn: {
					tap : 'addNoteBook'
			},
			notebbooCancelBtn:{
					tap : 'cancleAddGroup'
			},
		},
		routes:{
			'newnote':'showNewnoteview'
		}
	},

	//返回到随手记页面,同时删除新建笔记的页面
	backToNotebookview: function(){
		this.redirectTo('notebook');
		Ext.Viewport.remove(this.getNewnoteview());
        var list = Ext.getCmp("noteBookList");
        var store = list.getStore();
        store.removeAt(store.getCount()-1);
        var newData = {'id':0,'name':'全部笔记'};
        store.insert(0,newData);
	},

    //保存笔记
	saveNote:function(){
        var noteTitle = Ext.getCmp("noteTitle");
        var noteContent= Ext.getCmp("noteContent");
        var noteBookId = Ext.getCmp("noteGroup");
        Ext.data.JsonP.request({
            url:domain+'RandomNote/addNote2',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'noteTitle':noteTitle.getValue(),
                'noteContent':noteContent.getValue(),
                'noteBookId':noteBookId.getValue(),
            },
            callback:function(success,result){           
                noteTitle.setValue("");
                noteContent.setValue("");   
            }

        });
        this.backToNotebookview();
	},

	//显示添加笔记页面
	showNewnoteview:function(){
    	Ext.Viewport.setActiveItem(this.getNewnoteview());
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDay()+1;
        var createDay = "" + year + "年" + month + "月" + day + "日";
        Ext.getCmp("note-dateText").setHtml(createDay);
    },

    //显示新建分组模态框
    showNewGroupModal: function(select,newValue,oldValue,eOpts){
        if(newValue == '0'){
    		var newGroupModal=Ext.getCmp('newgroupModal');
    		var noteBookName = Ext.getCmp("noteBookName").setValue("");
    		var shortName = Ext.getCmp("shortName").setValue("");
			newGroupModal.show();
    	}
    },

    //添加分组
    addNoteBook:function(){
    	var noteBookName = Ext.getCmp("noteBookName").getValue();
    	var shortName = Ext.getCmp("shortName").getValue();
    	if(noteBookName == ""){
    		Ext.getCmp('notNullTips').show();
    		return;
    	}
    	var noteGroup = Ext.getCmp("noteGroup");
    	var store = noteGroup.getStore();
    	var length = store.getCount();
    	for(var i = 0; i < length; i++ ){
    		if(noteBookName == store.getAt(i).get('name')){
    			Ext.getCmp('existTips').show();
                 Ext.getCmp("noteBookName").setValue("")
    			return;
    		}
    		
    	}
        //使用JsonP的request请求到后台添加笔记本
        Ext.data.JsonP.request({
            url:domain+'RandomNote/addNoteBook2',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'userId':'199762408FBC4D6C9455BB332D5FC877',
                'noteBookName':noteBookName,
            },
            callback:function(success,result){
                if(success&&result.data != ""){
                    var list = Ext.getCmp("noteGroup");
                    var store = list.getStore();
                    var length = store.getCount();
                    store.insert(length-1,result.data);
                    noteGroup.setValue(result.data.id);
                }else{
                    alert("添加笔记本失败");
                }
            }
        })
    	this.hideModalFrame();
    },

    //隐藏提示
    hideTips:function(){
    	Ext.getCmp('existTips').hide();
    	Ext.getCmp('notNullTips').hide();
    },

    //隐藏添加笔记本的模态对话框
    hideModalFrame:function(){
    	Ext.getCmp('newgroupModal').hide();
    },

    //取消添加笔记本
    cancleAddGroup:function(){
    	var noteGroup = Ext.getCmp("noteGroup");
    	var store = noteGroup.getStore();
    	noteGroup.setValue(store.getAt(0).get("groupName"));
		this.hideTips();
		this.hideModalFrame();
    }

});