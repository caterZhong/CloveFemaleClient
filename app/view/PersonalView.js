Ext.define("cfa.view.PersonalView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","cfa.view.me.PsnInfView","cfa.view.me.SettingView"],
	
	xtype: "personalview",
	config:{
			/*我主页*/
			xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			// id:'personalPanel',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [{
				xtype: "titlebar",
				title: "我", 
				docked: "top",
			},{
				xtype:'button',
				html:['<div class="personalImg"><img src="public/images/headPhoto.jpg" /></div><div class="personalName">丁香妹子</div><div class="personalId">丁香号:37232892</div>'],
				cls:'psnSim',
				name:'psnSim',
				id:'psnSim',
				ui: 'plain',
			},{
				xtype:'button',
				cls:'psnMenu',
				name:'coin_btn',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/coin.png" /></div><div class="psnItemTitle">金币</div>'],
			},{
				xtype:'button',
				cls:'psnMenu',
				name:'tool',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/tool.png" /></div><div class="psnItemTitle">小工具</div>'],
			},{
				xtype:'button',
				cls:'psnMenu',
				name:'settings',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>'],
			}]
	}
});