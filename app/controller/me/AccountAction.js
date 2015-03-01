Ext.define('cfa.controller.me.AccountAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*引用账号与安全页面*/
			accountview:{
                selector: 'accountview',
                xtype: "accountview",
                autoCreate: true
        	},
   	
		},
		control: {

		},
		routes:{
			'account':'showAccountview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示账号与安全页面*/
	showAccountview:function(){
    	Ext.Viewport.setActiveItem(this.getAccountview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

});