Ext.define("cfa.view.me.PrivacyView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","Ext.field.Toggle","Ext.picker.Picker","cfa.view.me.MuteTimeView"],
	
	xtype: "privacyview",
	config:{
			/*隐私页面*/
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			// scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "隐私", 
				docked: "top",
				items:[{
					html:'返回',
					name:'backToSetingBtn',
					ui:'plain',
				}],
			},{//进入软件密码保护
				xtype:'panel',
				margin:'20 0 0 0',
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					label:'进入软件密码保护',
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					name:'toggle_swPwd',
					id:'toggle_swPwd',
					ui: 'plain',
				}]
			},{//开通笔记密码保护
				xtype:'panel',	
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					label:'开通笔记密码保护',
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					name:'toggle_notePwd',
					id:'toggle_notePwd',
					ui: 'plain',
				}]
				
			}],
	}
});