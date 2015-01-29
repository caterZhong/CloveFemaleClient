Ext.define("cfa.view.me.PsnInfView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel"],
	// views: [],
	
	xtype: "psninfview",
	config:{
			/*个人信息页面*/
			xtype:"panel",
			layout: "vbox",
			width: "100%",
			// id:'personalPanel',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "我", 
				docked: "top",
				// items:[{

				// }],
			},
			{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemTitle">金币</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemTitle">小工具</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			}]
	}
});