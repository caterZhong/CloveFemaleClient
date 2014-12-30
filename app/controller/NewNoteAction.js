Ext.define('cfa.controller.NewnoteAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			newnotebackBtn: 'button[name="newnote_back_btn"]',
			newnotesaveBtn: 'button[name="newnote_save_btn"]',
			newnoteview : 'newnoteview',
			noteGroup : 'selectfield[name="noteGroup"]',
			groupAddBtn:'#group_add_btn',
			newGroupName:'#groupName',
			cancelBtn:'#cancelBtn',
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
			newGroupName:{
					focus : 'hideTips'
			},
			groupAddBtn: {
					tap : 'addNoteGroup'
			},
			cancelBtn:{
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
	},

	saveNote:function(){
		alert("此功能还未开发完成");
	},

	//显示添加笔记页面
	showNewnoteview:function(){
    	Ext.Viewport.setActiveItem(this.getNewnoteview());
    },

    //显示新建分组模态框
    showNewGroupModal: function(select,newValue,oldValue,eOpts){
    	if(newValue == '新建笔记本'){
    		var newGroupModal=Ext.getCmp('newgroupModal');
    		var groupName = Ext.getCmp("groupName").setValue("");
    		var shortName = Ext.getCmp("shortName").setValue("");
			newGroupModal.show();
    	}
    },

    //添加分组
    addNoteGroup:function(){
    	var groupName = Ext.getCmp("groupName").getValue();
    	var shortName = Ext.getCmp("shortName").getValue();
    	if(groupName == "" || shortName ==""){
    		Ext.getCmp('notNullTips').show();
    		return;
    	}
    	var noteGroup = Ext.getCmp("noteGroup");
    	var store = noteGroup.getStore();
    	var length = store.getCount();
    	for(var i = 0; i < length; i++ ){
    		if(groupName == store.getAt(i).get('groupName')){
    			Ext.getCmp('newGroupTips').show();
    			return;
    		}
    		
    	}
    	var newData = {'groupName':groupName,'shortName':shortName};
    	store.addData(newData);
    	hideModalFrame();
    	noteGroup.setValue(groupName);
    },

    //隐藏提示
    hideTips:function(){
    	Ext.getCmp('newGroupTips').hide();
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