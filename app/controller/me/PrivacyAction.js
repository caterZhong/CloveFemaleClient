Ext.define('cfa.controller.me.PrivacyAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*引用隐私页面*/
			privacyview:{
                selector: 'privacyview',
                xtype: "privacyview",
                autoCreate: true
        	},
   	
		},
		control: {

		},
		routes:{
			'privacy':'showPrivacyview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示隐私页面*/
	showPrivacyview:function(){
    	Ext.Viewport.setActiveItem(this.getPrivacyview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

});