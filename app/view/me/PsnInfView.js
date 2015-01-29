Ext.define("cfa.view.me.PsnInfView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel"],
	// views: [],
	
	xtype: "psninfview",
	config:{
			/*我主页*/
			xtype:"panel",
			layout: "vbox",
			width: "100%",
			id:'personalPanel',
			default:{
				styleHtmlContent:true,
			},
			// items: [
			// {
			// 	xtype: "toolbar",
			// 	title: "我", 
			// 	docked: "top"
			// },
			// {
			// 	xtype:'button',
			// 	cls:'psnMenu',
			// 	// pressedCls:'psnMenuPres',
			// 	ui: 'plain',
			// 	html:['<div class="psnItemImg"><img src="public/images/coin.png" /></div><div class="psnItemTitle">金币</div>']
			// },{
			// 	xtype:'button',
			// 	cls:'psnMenu',
			// 	ui: 'plain',
			// 	html:['<div class="psnItemImg"><img src="public/images/tool.png" /></div><div class="psnItemTitle">小工具</div>']
			// },{
			// 	xtype:'button',
			// 	cls:'psnMenu',
			// 	ui: 'plain',
			// 	html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			// }]
	}
});