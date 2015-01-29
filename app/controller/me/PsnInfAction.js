Ext.define('cfa.controller.me.PsnInfAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {

			psninfview:{
        		//引用个人信息页面
                selector: 'psninfview',
                xtype: "psninfview",
                autoCreate: true
        	}
		},
		control: {
			
		},
		routes:{
			'psninf':'showPsnInfview',
		}
	},

	/*显示个人信息页面*/
	showPsnInfview:function(){
    	Ext.Viewport.setActiveItem(this.getPsninfview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

});