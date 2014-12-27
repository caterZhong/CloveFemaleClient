Ext.define('cfa.controller.NewnoteAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			newnotebackBtn: 'button[name="newnote_back_btn"]',
			newnoteview : 'newnoteview',
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

	//显示添加笔记页面
	showNewnoteview:function(){
    	Ext.Viewport.setActiveItem(this.getNewnoteview());
    },

});