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
                autoCreate: true
        	}
		},
		control: {		
			psnSim:{
				tap:'testest',
			},
			/*金币按钮*/
			coin:{
				tap:'testest',
			},
			/*小工具按钮*/
			tool:{
				tap:'testest',
			},
			/*设置按钮*/
			settings:{
				tap:'testest',
			},
		},
		// routes:{
		// 	'record':'showRecordview'
		// }
	},

	/*切换到个人信息详细页面-----个人信息按钮tap事件*/
	testest:function(){
		alert("正在开发中");
		// this.redirectTo("psninf");
	},

});