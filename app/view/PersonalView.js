Ext.define("cfa.view.PersonalView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","cfa.view.MedicineView"],
	
	xtype: "personalview",
	config:{
			/*我主页*/
			xtype:"panel",
			layout: "vbox",
			width: "100%",
			id:'personalPanel',
			default:{
				styleHtmlContent:true,
			},
			items: [{
				xtype: "toolbar",
				title: "我", 
				docked: "top"
			},
			{
				xtype:'button',
				html:['<div class="personalImg"><img src="public/images/headPhoto.jpg" /></div><div class="personalName">丁香妹子</div><div class="personalId">丁香号:37232892</div>'],
				cls:'psnSim',
				name:'psnSim',
				id:'psnSim',
				ui: 'plain',
				itemTpl:'<div class="personalImg"><img src="{imgSrc}" /></div><div class="personalName">{itemMsg}</div><div class="personalId">丁香号:{itemNum}</div></div>',
			},{
				xtype:'button',
				cls:'psnMenu',
				pressedCls:'psnMenuPres',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/coin.png" /></div><div class="psnItemTitle">金币</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/tool.png" /></div><div class="psnItemTitle">小工具</div>']
			},{
				xtype:'button',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnItemImg"><img src="public/images/setting.png" /></div><div class="psnItemTitle">设置</div>']
			}]
	}
});