Ext.define("cfa.view.KidView",{

	extend:"Ext.Container",

	requires:["Ext.DataView","Ext.Panel","Ext.data.Store","cfa.controller.KidAction","Ext.form.FormPanel","Ext.field.DatePicker"],
	
	xtype:"kidview",

	config:{
		xtype:"panel",
		layout: "vbox",
		width: "100%",
		//id:"recordmainview",
		items: [{
			xtype: "toolbar",
			title: "小宝成长", 
			docked: "top",
			items:[{
				id:'kidBackBtn',
				/*xtype:'button',
				ui:'decline-back',*/
				text:'返回'
				/*handler:function(){}*/
			}]
		},{
			xtype:'panel',
			cls:'panelTips',
			html:'孩子的成长记录'			
		},{
			id:'kidHealModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'身体指标记录'	
			},{
				xtype:'formpanel',
				id:'healthForm',
				scrollable:'vertical',
				url:'test.php',
				items:[
				{
					xtype:'fieldset',
					title:'电影信息',
					//instructions:'请填写电影信息',
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'datepickerfield',
							id:'time',
							name:'healthTime',
							label:'日期',
							clearIcon:true,
							disabled:false
						},{
							xtype:'textfield',
							id:'tall',
							name:'tall',
							label:'身高',
							placeHolder:'输入身高',
							clearIcon:true,
							disabled:false
						}
					]
				},{
					xtype:'panel',
					layout:{
						type:'hbox',
						pack:'end'
					},
					defaults:{
						xtype:'button'
					},
					items:[
						{
							cls:'subBtn',
							text:'提交',
							handler:function(){
								healthForm.submit();
							}
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								healthForm.reset();
							}
						}
					]
				}]
			}]
		},{
			id:'kidBirthModal',
			xtype:'panel',
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			height:'60%',
			width:'90%',
			html:'孩子诞生'
		},{
			xtype:"dataview",
			cls:'recordMenu',
			store:{
				fields:['imgSrc','itemMsg'],
				data:[
					{imgSrc:'public/images/kid.png',itemMsg:'孩子诞生'},
					{imgSrc:'public/images/health.png',itemMsg:'身体指标'},
					{imgSrc:'public/images/score.png',itemMsg:'成绩表单'},
					{imgSrc:'public/images/yimiao.png',itemMsg:'疫苗接种'},
				]
			},
			itemTpl:'<div class="recordMenuItem"><img src="{imgSrc}" /><span>{itemMsg}</span><div class="more">...</div></div>',
			listeners:{
				itemsingletap:function(dataview,index,item,record,e){
					
					if(index==0){
						var birthModal=Ext.getCmp('kidBirthModal');
						birthModal.show();
					}
					else if(index==1){
						var healModal=Ext.getCmp('kidHealModal');
						healModal.show();
					}
					else if(index==2){
						;
					}
					else
						;
					}
				}
		}]
	}
});