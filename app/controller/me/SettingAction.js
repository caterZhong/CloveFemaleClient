// var txtSize = 0;
Ext.define('cfa.controller.me.SettingAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*返回按钮----返回到设置页面(设置下所有页面的返回按钮)*/
			back_btn:'button[name="backToSetingBtn"]',
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
			/*返回按钮----返回到设置页面(设置下所有页面的返回按钮)*/
			back_btn:{
				tap:'backToSetting',
			},
			/*提醒按钮*/
			remindBtn:{
				tap:'showRemindView',
			},
			/*隐私按钮*/
			privacyBtn:{
				tap:'showPrivacyView',
			},
			/*账号与安全按钮*/
			accountBtn:{
				tap:'showAccountView',
			},
			/*关于软件按钮*/
			aboutBtn:{
				tap:'showAboutView',//显示关于软件页面
			},
			/*退出按钮*/
			exitBtn:{
				tap:'showAccountView',
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

     /*返回到设置页面------设置下所有页面的返回按钮tap事件*/
    backToSetting:function(){
    	this.redirectTo("setting");

    },	

    /*切换到提醒页面*/
    showRemindView:function(){
    	this.redirectTo("remind");
    },

     /*切换到隐私页面*/
    showPrivacyView:function(){
    	this.redirectTo("privacy");
    },

     /*切换到账号与安全页面*/
    showAccountView:function(){
    	// this.redirectTo("account");
    },

    /*切换到关于软件页面*/
    showAboutView:function(){
        this.redirectTo("about");
    },


});