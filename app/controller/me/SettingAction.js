// var txtSize = 0;
Ext.define('cfa.controller.me.SettingAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*提醒按钮*/
			remindBtn:'button[name="remindBtn"]',
			/*隐私按钮*/
			privacyBtn:'button[name="privacyBtn"]',
			/*账号与安全按钮*/
			accountBtn:'button[name="accountBtn"]',
			/*关于软件按钮*/
			aboutBtn:'button[name="aboutBtn"]',
			/*退出按钮*/
			exitBtn:'button[name="exitBtn"]',
			/*引用设置页面*/
			settingview:{
        		//引用设置页面
                selector: 'settingview',
                xtype: "settingview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*提醒按钮*/
			remindBtn:{
				tap:'',
			},
			/*隐私按钮*/
			privacyBtn:{
				tap:'',
			},
			/*账号与安全按钮*/
			accountBtn:{
				tap:'',
			},
			/*关于软件按钮*/
			aboutBtn:{
				tap:'showAboutView',//显示关于软件页面
			},
			/*退出按钮*/
			exitBtn:{
				tap:'',
			}
		},
		routes:{
			'setting':'showSettingview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示设置页面*/
	showSettingview:function(){
    	Ext.Viewport.setActiveItem(this.getSettingview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*切换到关于软件页面*/
    showAboutView:function(){
        this.redirectTo("about");
    },


});