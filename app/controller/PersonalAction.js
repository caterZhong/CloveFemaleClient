Ext.define('cfa.controller.PersonalAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			/*个人信息按钮*/
			psnSim:'button[name="psnSim"]',
			/*金币按钮*/
			coin:'button[name="coin_btn"]',
			/*小工具按钮*/
			tool:'button[name="tool"]',
			/*设置按钮*/
			settings:'button[name="settings"]',
			/*我页面*/
			personalview:{
        		//引用我页面
                selector: 'personalview',
                xtype: "personalview",
                autoCreate: true,
        	}
		},
		control: {		
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
		},
		routes:{
			'personal':'showPersonalview'
		}
	},

	/*显示我页面---即本页*/
	showPersonalview:function(){
		Ext.Viewport.setActiveItem(this.getPersonalview());
	},

	/*切换到个人信息详细页面-----个人信息按钮tap事件*/
	showPsninfView:function(){
		this.redirectTo("psninf");
	},

	/*切换到金币页面-----金币按钮tap事件*/
	showCoinView:function(){

	},

	/*切换到小工具页面-----小工具按钮tap事件*/
	showToolView:function(){

	},

	/*切换到设置页面-----设置按钮tap事件*/
	showSettingView:function(){
		this.redirectTo("setting");
	},

});