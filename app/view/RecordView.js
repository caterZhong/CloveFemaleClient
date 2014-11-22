Ext.define("cfa.view.RecordView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","cfa.view.KidView"],

	xtype: "recordview",
	
	config:{
			/*记录控主页*/
			xtype:"panel",
			layout: "vbox",
			width: "100%",
			id:"recordmainview",
			items: [{
				xtype: "toolbar",
				title: "记录控", 
				docked: "top"
			},{
				xtype:'panel',
				cls:'panelTips',
				html:'记录您的点滴'			
			},
			{
				xtype:"dataview",
				cls:'recordMenu',
				id:'recordMenu',
				store:{
					fields:['imgSrc','itemMsg'],
					data:[
						{imgSrc:'public/images/preg.png',itemMsg:'助孕记录'},
						{imgSrc:'public/images/kid.png',itemMsg:'小宝成长'},
						{imgSrc:'public/images/note.png',itemMsg:'随手记'},
						{imgSrc:'public/images/medicine.png',itemMsg:'小药箱'},
					]
				},
				itemTpl:'<div class="recordMenuItem"><img src="{imgSrc}" /><span>{itemMsg}</span><div class="more">...</div></div>',
				listeners:{
					itemsingletap:function(dataview,index,item,record,e){
						if(index==1){
							Ext.Viewport.setActiveItem('kidview');
						}
						else
							console.log('其他功能');
					}
				}
			}]
	}
});