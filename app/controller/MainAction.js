Ext.define('cfa.controller.MainAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			mainview:{
        		//引用主页面
                selector: 'mainview',
                xtype: "mainview",
                autoCreate: true
        	}
		},
		control: {
		},
		routes:{
			'main':'showMainview'
		}
	},
	//显示主页面
	showMainview:function(){
    	Ext.Viewport.setActiveItem(this.getMainview());
    }
});