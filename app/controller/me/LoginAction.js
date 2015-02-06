Ext.define('cfa.controller.me.LoginAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*引用登录页面*/
			loginview:{
                selector: 'loginview',
                xtype: "loginview",
                autoCreate: true
        	},
   	
		},
		control: {

		},
		routes:{
			'login':'showLoginview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示登录页面*/
	showLoginview:function(){
    	Ext.Viewport.setActiveItem(this.getLoginview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

});