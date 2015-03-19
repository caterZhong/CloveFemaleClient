Ext.define('cfa.controller.PersonalAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			/*返回按钮----返回到我页面(我页面中各个菜单按钮点击后进入的页面中的返回按钮)*/
			back_btn:'button[name="backToMeBtn"]',
			/*个人信息按钮*/
			psnSim:'button[name="psnSim"]',
			/*金币按钮*/
			coin:'button[name="coin_btn"]',
			/*小工具按钮*/
			tool:'button[name="tool"]',
			/*设置按钮*/
			settings:'button[name="settings"]',
			/*登录按钮-----切换到登录页面*/
			btnToLogin:'button[name="btnToLogin"]',
			/*我页面*/
			personalview:{
        		//引用我页面
                selector: 'personalview',
                xtype: "personalview",
                autoCreate: true,
        	}
		},
		control: {	
			/*返回按钮----返回到我页面*/
			back_btn:{
				tap:'backToMe',
			},	
			psnSim:{
				tap:'showPsninfView',
			},
			/*金币按钮*/
			coin:{
				tap:'showCoinView',
			},
			/*小工具按钮*/
			tool:{
				tap:'showToolView',
			},
			/*设置按钮*/
			settings:{
				tap:'showSettingView',
			},
			/*登录按钮-----切换到登录页面*/
			btnToLogin:{
				tap:'showLoginView',
			}
		},
		routes:{
			'personal':'showPersonalview'
		}
	},

	/*显示我页面---即本页*/
	showPersonalview:function(){
		Ext.Viewport.setActiveItem(this.getPersonalview());
	},

	/*返回到我页面---返回按钮的tap事件*/
    backToMe:function(){
    	modular = MINE;//返回的页面的我tab
    	this.redirectTo("main"); //返回的main页面
    },


	/*已经登录用户切换到个人信息详细页面,否则切换到登录页面-----个人信息按钮tap事件*/
	showPsninfView:function(){
		this.redirectTo("psninf");
		// this.redirectTo("psninf");
	},

	/*切换到金币页面-----金币按钮tap事件*/
	showCoinView:function(){

	},

	/*切换到小工具页面-----小工具按钮tap事件*/
	showToolView:function(){

	},

	/*切换到个人信息设置页面-----设置按钮tap事件*/
	showSettingView:function(){
		this.redirectTo("setting");
	},

	/*切换到登录页面-----登录按钮tap事件*/
	showLoginView:function(){
		this.redirectTo("login");
	},
});