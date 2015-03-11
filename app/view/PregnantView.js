Ext.define("cfa.view.PregnantView",{

	extend:"Ext.Container",

	requires:["Ext.DataView","Ext.Panel","Ext.data.Store","cfa.controller.PregnantAction","Ext.form.FormPanel","Ext.field.DatePicker","Ext.form.FieldSet","Ext.field.Select","Ext.data.JsonP","Ext.field.Radio"],
	
	xtype:"pregnantview",

	config:{
		layout: "vbox",
		width: "100%",
		items: [{
			xtype:'panel',
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			items:[{//标题
				xtype: "toolbar",
				title: "助孕记录",
				// masked:true,
				docked: "top",
				zIndex:2, 
				items:[{
					id:'pregnantBackBtn',
					text:'返回'
				}]
			},{//提示
				xtype:'panel',
				cls:'panelTips',
				html:'助孕的记录'			
			},{//菜单选项
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
		},{/*月经开始*/
			id:'mensesModal',
			xtype:'panel',
			layout: "vbox",
			zIndex:1100,
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			// minHeight:361,
			height:350,
			width:'90%',
			zIndex:99, 
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'月经记录'	
			},{
				xtype:'formpanel',
				id:'mensesForm',
				// cls:'Form',
				height:243,
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
				}]
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
							text:'保存'
							// handler:function(){
							// 	healthForm.submit();
							// }
						}
					]
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
			cls:'modal',
			height:311,
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
					xtype:'panel',
					name:'pickerBox',
					cls:'pickerBox',
					layout:'vbox',
					height:228,
					width:'100%',
					items:[{
					xtype:'picker',
					id:'tmpPicker',
					modal:false,
					cancelButton:false,
					doneButton:false,
					width:'100%',
					height:228,
					cls:'picker',
					slots:[{
						name:'intpart',
						value:36,
						title:'时',
						data:[
							{text:'35',value:35},
							{text:'36',value:36},
							{text:'37',value:37},
							{text:'38',value:38},
							{text:'39',value:39},
							{text:'40',value:40},
							{text:'41',value:41},
							{text:'42',value:42},
						]
					},{
						name:'floatpart',
						value:80,
						title:'分',
						data:[
							{text:'00',value:0},
							{text:'01',value:1},
							{text:'02',value:2},
							{text:'03',value:3},
							{text:'04',value:4},
							{text:'05',value:5},
							{text:'06',value:6},
							{text:'07',value:7},
							{text:'08',value:8},
							{text:'09',value:9},
							{text:'10',value:10},
							{text:'11',value:11},
							{text:'12',value:12},
							{text:'13',value:13},
							{text:'14',value:14},
							{text:'15',value:15},
							{text:'16',value:16},
							{text:'17',value:17},
							{text:'18',value:18},
							{text:'19',value:19},
							{text:'20',value:20},
							{text:'21',value:21},
							{text:'22',value:22},
							{text:'23',value:23},
							{text:'24',value:24},
							{text:'25',value:25},
							{text:'26',value:26},
							{text:'27',value:27},
							{text:'28',value:28},
							{text:'29',value:29},
							{text:'30',value:30},
							{text:'31',value:31},
							{text:'32',value:32},
							{text:'33',value:33},
							{text:'34',value:34},
							{text:'35',value:35},
							{text:'36',value:36},
							{text:'37',value:37},
							{text:'38',value:38},
							{text:'39',value:39},
							{text:'40',value:40},
							{text:'41',value:41},
							{text:'42',value:42},
							{text:'43',value:43},
							{text:'44',value:19},
							{text:'45',value:45},
							{text:'46',value:46},
							{text:'47',value:47},
							{text:'48',value:48},
							{text:'49',value:49},
							{text:'50',value:50},
							{text:'51',value:51},
							{text:'52',value:52},
							{text:'53',value:53},
							{text:'54',value:54},
							{text:'55',value:55},
							{text:'56',value:56},
							{text:'57',value:57},
							{text:'58',value:58},
							{text:'59',value:59},
							{text:'60',value:60},
							{text:'61',value:61},
							{text:'62',value:62},
							{text:'63',value:63},
							{text:'64',value:64},
							{text:'65',value:65},
							{text:'66',value:66},
							{text:'67',value:67},
							{text:'68',value:68},
							{text:'69',value:69},
							{text:'70',value:70},
							{text:'71',value:71},
							{text:'72',value:72},
							{text:'73',value:73},
							{text:'74',value:74},
							{text:'75',value:75},
							{text:'76',value:76},
							{text:'77',value:77},
							{text:'78',value:78},
							{text:'79',value:79},
							{text:'80',value:80},
							{text:'81',value:81},
							{text:'82',value:82},
							{text:'83',value:83},
							{text:'84',value:84},
							{text:'85',value:85},
							{text:'86',value:86},
							{text:'87',value:87},
							{text:'88',value:88},
							{text:'89',value:89},
							{text:'90',value:90},
							{text:'91',value:91},
							{text:'92',value:92},
							{text:'93',value:93},
							{text:'94',value:94},
							{text:'95',value:95},
							{text:'96',value:96},
							{text:'97',value:97},
							{text:'98',value:98},
							{text:'99',value:99},
						]
					}]
					}],
				}],
				getUrl: function(){
					return domain+"FgTemperatureAction/addTemperature" ;
				},
				reset: function(){//tvalue为体温,提交按钮id:submitTemperatureFormBtn,重置按钮handler:Ext.getCmp('temperatureForm').reset() ;
					Ext.getCmp("tmpPicker").setValue({'intpart':36,'floatpart':80});
				}
			},{//装载确定取消按钮的panel
				xtype:'panel',
				layout:'hbox',
				cls:'pickerBtnBox',
				width:'100%',
				items:[{
					xtype:'button',
					name:'cancelBtn_tmp',
					cls:'pickerBtn btn-border-right btn-border-',
					text:'取消',
					width:'50%',
					ui:'plain',
				},{
					xtype:'button',
					name:'doneBtn_tmp',
					id:'submitTemperatureFormBtn',
					cls:'pickerBtn',
					text:'确定',
					width:'50%',
					ui:'plain',
				}]
			}]
		},
		/*基础体温结束*/
		/*孕重开始*//*wvalue*/
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
			cls             : 'modal',
			items 			: [{
				xtype 	:'panel',
				cls 	:'modalPanel',
				html 	:'孕重记录'	
			},{
				xtype	: 'panel',
				layout	: "hbox",
				id		: 'temperatureForm',
				items 	:[{
					xtype:'panel',
					name:'pickerBox',
					cls:'pickerBox',
					layout:'vbox',
					height:228,
					width:'100%',
					items:[{
						xtype:'picker',
						id:'wPicker',
						modal:false,
						cancelButton:false,
						doneButton:false,
						width:'100%',
						height:228,
						cls:'picker',
						slots:[{
							name:'intpart',
							value:50,
							data:[
								{text:'20',value:20},
								{text:'21',value:21},
								{text:'22',value:22},
								{text:'23',value:23},
								{text:'24',value:24},
								{text:'25',value:25},
								{text:'26',value:26},
								{text:'27',value:27},
								{text:'28',value:28},
								{text:'29',value:29},
								{text:'30',value:30},
								{text:'31',value:31},
								{text:'32',value:32},
								{text:'33',value:33},
								{text:'34',value:34},
								{text:'35',value:35},
								{text:'36',value:36},
								{text:'37',value:37},
								{text:'38',value:38},
								{text:'39',value:39},
								{text:'40',value:40},
								{text:'41',value:41},
								{text:'42',value:42},
								{text:'43',value:43},
								{text:'44',value:19},
								{text:'45',value:45},
								{text:'46',value:46},
								{text:'47',value:47},
								{text:'48',value:48},
								{text:'49',value:49},
								{text:'50',value:50},
								{text:'51',value:51},
								{text:'52',value:52},
								{text:'53',value:53},
								{text:'54',value:54},
								{text:'55',value:55},
								{text:'56',value:56},
								{text:'57',value:57},
								{text:'58',value:58},
								{text:'59',value:59},
								{text:'60',value:60},
								{text:'61',value:61},
								{text:'62',value:62},
								{text:'63',value:63},
								{text:'64',value:64},
								{text:'65',value:65},
								{text:'66',value:66},
								{text:'67',value:67},
								{text:'68',value:68},
								{text:'69',value:69},
								{text:'70',value:70},
								{text:'71',value:71},
								{text:'72',value:72},
								{text:'73',value:73},
								{text:'74',value:74},
								{text:'75',value:75},
								{text:'76',value:76},
								{text:'77',value:77},
								{text:'78',value:78},
								{text:'79',value:79},
								{text:'80',value:80},
								{text:'81',value:81},
								{text:'82',value:82},
								{text:'83',value:83},
								{text:'84',value:84},
								{text:'85',value:85},
								{text:'86',value:86},
								{text:'87',value:87},
								{text:'88',value:88},
								{text:'89',value:89},
								{text:'90',value:90},
								{text:'91',value:91},
								{text:'92',value:92},
								{text:'93',value:93},
								{text:'94',value:94},
								{text:'95',value:95},
								{text:'96',value:96},
								{text:'97',value:97},
								{text:'98',value:98},
								{text:'99',value:99},
							]
						},{
							name:'floatpart',
							value:5,
							data:[
								{text:'00',value:0},
								{text:'01',value:1},
								{text:'02',value:2},
								{text:'03',value:3},
								{text:'04',value:4},
								{text:'05',value:5},
								{text:'06',value:6},
								{text:'07',value:7},
								{text:'08',value:8},
								{text:'09',value:9},
							]
						}]
					}],
				}],
			},{//装载确定取消按钮的panel
				xtype:'panel',
				layout:'hbox',
				cls:'pickerBtnBox',
				width:'100%',
				items:[{
					xtype:'button',
					name:'cancelBtn_weight',
					cls:'pickerBtn btn-border-right btn-border-',
					text:'取消',
					width:'50%',
					ui:'plain',
				},{
					xtype:'button',
					// name:'doneBtn_tmp',
					// id:'submitTemperatureFormBtn',
					cls:'pickerBtn',
					text:'确定',
					width:'50%',
					ui:'plain',
				}]
			}]
		},
		/*孕重结束*/
		/*胎动开始*/
		{
			id:'movementModal',
			cls:'modal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:171,
			height:320,
			width:'90%',
			items:[{ 
				xtype:'panel',
				cls:'modalPanel',
				html:'胎动记录'	
				// items:[{
				// 	html:"<div class='movementHeader'><div class='floatTips'>Tips</div><div class='movementTitle'>胎动记录</div></div>",
					
				// }]
			},{
				xtype	: 'panel',
				layout	: "hbox",
				id		: 'temperatureForm',
				items 	:[{
					xtype:'panel',
					name:'pickerBox',
					cls:'pickerBox',
					layout:'vbox',
					height:180,
					width:'100%',
					items:[{
						xtype:'picker',
						id:'wPicker',
						modal:false,
						cancelButton:false,
						doneButton:false,
						width:'100%',
						height:228,
						cls:'picker',
						slots:[{
							name:'times',
							value:7,
							data:[
								{text:'5',value:5},
								{text:'6',value:6},
								{text:'7',value:7},
								{text:'8',value:8},
								{text:'9',value:9},
								{text:'10',value:10},
								{text:'11',value:11},
								{text:'12',value:12},
								{text:'13',value:13},
							]
						}]
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
			},{//装载确定取消按钮的panel
				xtype:'panel',
				layout:'hbox',
				cls:'pickerBtnBox',
				width:'100%',
				items:[{
					xtype:'button',
					name:'cancelBtn_move',
					cls:'pickerBtn btn-border-right btn-border-',
					text:'取消',
					width:'50%',
					ui:'plain',
				},{
					xtype:'button',
					// name:'doneBtn_tmp',
					// id:'submitTemperatureFormBtn',
					cls:'pickerBtn',
					text:'确定',
					width:'50%',
					ui:'plain',
				}]
			}]
		}
		/*胎动结束*/
		]
	}
});