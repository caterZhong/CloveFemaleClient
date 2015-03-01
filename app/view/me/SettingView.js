Ext.define("cfa.view.me.SettingView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","cfa.view.me.AboutView","cfa.view.me.RemindView","cfa.view.me.PrivacyView","cfa.view.me.AccountView"],
	
	xtype: "settingview",
	config:{
			/*设置页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "设置", 
				docked: "top",
				items:[{
					html:'返回',
					name:'backToMeBtn',
					ui:'plain',
				}],
			},{//提醒
				xtype:'button',
				name:'remindBtn',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">提醒</div></div>']
			},{//隐私
				xtype:'button',
				name:'privacyBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">隐私</div></div>']
			},{//账号与安全
				xtype:'button',
				name:'accountBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">账号与安全</div></div>']
			},{//关于软件
				xtype:'button',
				cls:'psnMenu',
				name:'aboutBtn',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">关于软件</div></div>']
			},{//退出
				xtype:'button',
				name:'exitBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">退出</div></div>']
			}]
	}
});