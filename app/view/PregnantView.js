Ext.define("cfa.view.PregnantView",{

	extend:"Ext.Container",

	requires:["Ext.DataView","Ext.Panel","Ext.data.Store","cfa.controller.PregnantAction","Ext.form.FormPanel","Ext.field.DatePicker","Ext.form.FieldSet","Ext.field.Select","Ext.data.JsonP","Ext.field.Radio"],
	
	xtype:"pregnantview",

	config:{
		xtype:"panel",
		layout: "vbox",
		width: "100%",
		items: [{
			xtype: "toolbar",
			title: "助孕记录", 
			docked: "top",
			items:[{
				id:'pregnantBackBtn',
				text:'返回'
			}]
		},{
			xtype:'panel',
			cls:'panelTips',
			html:'助孕的记录'			
		},
    	/*月经开始*/
		{
			id:'mensesModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:381,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'月经记录'	
			},{
				xtype:'formpanel',
				id:'mensesForm',
				cls:'babyForm',
				scrollable:'vertical',
				url:domain+'FgMensesAction/addMenses',
				items:[
				{
					xtype:'fieldset',
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'selectfield',
							id:'mcolor',
							name:'mcolor',
							label:'颜色',
							options:[{
								text:'暗红',
								value:'1'
							},{
								text:'鲜红',
								value:'2'
							},{
								text:'浅红',
								value:'3'
							}]
						},{
							xtype:'selectfield',
							id:'mmeasure',
							name:'mmeasure',
							label:'经量',
							options:[{
								text:'小',
								value:'1'
							},{
								text:'中',
								value:'2'
							},{
								text:'大',
								value:'3'
							}]

						},{
							xtype:'selectfield',
							id:'mpiece',
							name:'mpiece',
							label:'色块',
							options:[{
								text:'有',
								value:'1'
							},{
								text:'无',
								value:'2'
							}]
						},{
							xtype:'selectfield',
							id:'ismcramp',
							name:'ismcramp',
							label:'痛经',
							options:[{
								text:'是',
								value:'1'
							},{
								text:'否',
								value:'2'
							}]
						},{
							xtype:'selectfield',
							id:'vicidity',
							name:'vicidity',
							label:'稠度',
							options:[{
								text:'稠',
								value:'1'
							},{
								text:'稀',
								value:'2'
							}]
						}
					]
				},{
					xtype:'panel',
					docked: "bottom",
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
							id:'mensesFormSubmitBtn',
							text:'提交'
							// handler:function(){
							// 	healthForm.submit();
							// }
						},{
							cls:'resetBtn',
							id:'mensesFormResetBtn',
							text:'重置'
							// handler:function(){
							// 	healthForm.reset();
							// }
						}
					]
				}]
			}]
		},
		/*月经结束*/
        /*基础体温开始*/
		{
			id:'temperatureModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:151,
			height:'30%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'基础体温记录'	
			},{
				xtype	: 'panel',
				layout	: "hbox",
				id		: 'temperatureForm',
				items 	:[{
					id:'tValue',
					xtype:'selectfield',
					label:'体温',
					options:[{
						text:'35',
						value:'35'
					},{
						text:'36',
						value:'36'
					},{
						text:'37',
						value:'37'
					},{
						text:'38',
						value:'38'
					},{
						text:'39',
						value:'39'
					},{
						text:'40',
						value:'40'
					},{
						text:'41',
						value:'41'
					}],
					flex:1,
					height:100,

	 			},
				{
					id:'item2',
					xtype:'selectfield',
					label:'',
					options:[{
						text:'0',
						value:'0'
					},{
						text:'1',
						value:'1'
					},{
						text:'2',
						value:'2'
					},{
						text:'3',
						value:'3'
					},{
						text:'4',
						value:'4'
					},{
						text:'5',
						value:'5'
					},{
						text:'6',
						value:'6'
					},{
						text:'7',
						value:'7'
					},{
						text:'8',
						value:'8'
					},{
						text:'9',
						value:'9'
					}],
					flex:1,
				}],
				getUrl: function(){
					return domain+"FgTemperatureAction/addTemperature" ;
				},
				reset: function(){
					Ext.getCmp('tValue').setValue('37') ;
				}
			},{
				xtype:'panel',
					docked: "bottom",
					layout:{
						type:'hbox',
						pack:'end'
					},
					defaults:{
						xtype:'button'
					},
					items:[
						{
							cls : 'subBtn',
							id	: 'submitTemperatureFormBtn',
							text: '提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								Ext.getCmp('temperatureForm').reset() ;
							}
						}
					]
			}]
		},
		/*基础体温结束*/
		/*孕重开始*/
		{
			id 				: 'weightModal',
			xtype 			: 'panel',
			layout 			: "vbox",
			modal 			: true,
			hidden 			: true,
			hideOnMaskTap	: true,
			centered 		: true,
			minHeight       : 213,
			height			: '40%',
			width 			: '90%',
			items 			: [{
				xtype 	:'panel',
				cls 	:'modalPanel',
				html 	:'孕重记录'	
			},{
				xtype 		: 'formpanel',
				id 			: 'weightForm',
				cls 		: 'babyForm',
				scrollable 	: 'vertical',
				url 		: domain+'FgGestationalWeightAction/addWeight',
				items 		: [
				{
					xtype:'fieldset',
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'datepickerfield',
							id:'wDate',
							name:'Time',
							label:'日期',
                        	dateFormat:'Y-m-d',
							value:new Date(),
							clearIcon:true,
							disabled:false
						},{
							xtype:'textfield',
							id:'wValue',
							name:'weight',
							label:'孕重',
							placeHolder:'输入孕重',
							clearIcon:true,
							disabled:false
						}
					]
				},{
					xtype:'panel',
					docked: "bottom",
					layout:{
						type:'hbox',
						pack:'end'
					},
					defaults:{
						xtype:'button'
					},
					items:[
						{
							cls : 'subBtn',
							id	: 'submitWeightFormBtn',
							text: '提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								this.getCmp('weightForm').reset();
							}
						}
					]
				}]
			}]
		},
		/*孕重结束*/
		/*胎动开始*/
		{
			id:'movementModal',
			cls:'addWeight',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:171,
			height:'25%',
			width:'90%',
			items:[{ 
				xtype:'panel',
				// cls:'modalPanel',
				// html:'胎动记录'	
				items:[{
					html:"<div class='movementHeader'><div class='floatTips'>Tips</div><div class='movementTitle'>胎动记录</div></div>",
					
				}
				// ,{
				// 	xtype:'panel',
				// 	cls:'modalPanel',
				// 	html:'胎动记录'
				// }
				]
			},{
				xtype   : 'panel',
				layout	: 'hbox',
				id 		: 'movementForm' ,
				cls 	: 'movementPanel',
				items 	:[{
					id 		: 'movementNum',
					xtype 	: 'selectfield',
					label 	: '',
					options :[{
						text:'0',
						value:'0'
					},{
						text:'1',
						value:'1'
					},{
						text:'2',
						value:'2'
					},{
						text:'3',
						value:'3'
					},{
						text:'4',
						value:'4'
					},{
						text:'5',
						value:'5'
					},{
						text:'6',
						value:'6'
					},{
						text:'7',
						value:'7'
					},{
						text:'8',
						value:'8'
					},{
						text:'9',
						value:'9'
					},{
						text:'10',
						value:'10'
					},{
						text:'11',
						value:'11'
					},{
						text:'12',
						value:'12'
					},{
						text:'13',
						value:'13'
					},{
						text:'14',
						value:'14'
					},{
						text:'15',
						value:'15'
					},{
						text:'16',
						value:'16'
					},{
						text:'17',
						value:'17'
					},{
						text:'18',
						value:'18'
					},{
						text:'19',
						value:'19'
					},{
						text:'20',
						value:'20'
					},{
						text:'21',
						value:'21'
					}],
					height:100,

	 			},{
	 				cls:'movementUnit',
	 				html:'次/小时'
	 			}],
	 			getUrl: function(){
	 				return domain+"FgFetalMovementAction/addMovement" ;
	 			},
	 			reset: function(){
	 				Ext.getCmp('movementNum').setValue('0') ;
	 			}
	 			// html:'胎动记录'	
			},{
				
	 				xtype:'panel',
					docked: "bottom",
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
							id 	: 'submitMovementFormBtn'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								this.getCmp('movementForm').reset();
							}
						}
					]

			}]
		},
		// {	
		// 	layout:'hbox',
		// 	id:'movementModal',
		// 	xtype:'toolbar',
		// 	title:'胎动记录',
		// 	items:[
		// 	{xtype:'spacer'}	
		// 	,{
		// 		xtype:'label',
		// 		html:'tips'
		// 		text:'New'
		// 		ui:'action'
		// 	}]
		// },
		/*胎动结束*/
		{
			xtype:"dataview",
			id:"pregnantMenu",
			cls:'recordMenu',
			store:{
				fields:['imgSrc','itemMsg'],
				data:[
					{imgSrc:'public/images/kid.png',itemMsg:'月经'},
					{imgSrc:'public/images/health.png',itemMsg:'基础体温'},
					{imgSrc:'public/images/score.png',itemMsg:'孕重'},
					{imgSrc:'public/images/yimiao.png',itemMsg:'胎动'},
				]
			},
			itemTpl:'<div class="recordMenuItem"><img src="{imgSrc}" /><span>{itemMsg}</span><div class="more">...</div></div>',
		}]
	}
});