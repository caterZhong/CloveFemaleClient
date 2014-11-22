Ext.define("cfa.view.KidView",{

	extend:"Ext.Container",
	requires:["Ext.DataView","Ext.Panel","Ext.data.Store","cfa.controller.KidAction"],

	xtype:"kidview",

	config:{
		xtype:"panel",
		layout:"vbox",
		width:"100%",
		items:[{
			xtype: "toolbar",
			title: "小宝成长", 
			docked: "top",
			items:[{
				id:'backBtn',
				text:'返回'
				/*handler:function(){
					Ext.Viewport.setActiveItem('recordview')
					Ext.Viewport.destroyAll();
					recordview.show();

				}*/
			}]
		},{
			xtype:'panel',
			cls:'panelTips',
			html:'小宝成长'			
		},
		{
			xtype:"dataview",
			cls:'recordMenu',
			id:'babyMenu',
			store:{
				fields:['imgSrc','itemMsg'],
				data:[
					{imgSrc:'public/images/kid.png',itemMsg:'孩子诞生'},
					{imgSrc:'public/images/yimiao.png',itemMsg:'疫苗接种'},
					{imgSrc:'public/images/health.png',itemMsg:'身体指标'},
					{imgSrc:'public/images/score.png',itemMsg:'成绩表单'},
				]
			},
			itemTpl:'<div class="recordMenuItem"><img src="{imgSrc}" /><span>{itemMsg}</span><div class="more">...</div></div>',
			listeners:{
				itemsingletap:function(dataview,index,item,record,e){
					console.log("您点击了"+index);
				}
			}
		}]
	}
});