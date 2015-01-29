Ext.define("cfa.view.KidView",{

	extend:"Ext.Container",

	requires:["Ext.DataView","Ext.Panel","Ext.data.Store","cfa.controller.KidAction","Ext.form.FormPanel","Ext.field.DatePicker","Ext.form.FieldSet","Ext.field.Select","Ext.data.JsonP","Ext.field.Radio"],
	
	xtype:"kidview",

	config:{
		xtype:"panel",
		layout: "vbox",
		width: "100%",
		items: [{
			xtype: "toolbar",
			title: "小宝成长", 
			docked: "top",
			items:[{
				id:'kidBackBtn',
				text:'返回'
			}]
		},{
			xtype:'panel',
			cls:'panelTips',
			html:'孩子的成长记录'			
		},
    	/*身体指标开始*/
		{
			id:'kidHealModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:273,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'身体指标记录'	
			},{
				xtype:'formpanel',
				id:'healthForm',
				url : domain+'BabyGrowth/addBodyIndex',
				name:'healthForm',
				scrollable:'vertical',
				items:[
				{
					xtype:'fieldset',
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'datepickerfield',
							id:'healthTime',
							name:'healthTime',
                        	dateFormat:'Y-m-d',
							value : new Date() ,
							label:'日期',
							clearIcon:true,
							disabled:false
						},{
							xtype:'textfield',
							id:'height',
							name:'height',
							label:'身高',
							placeHolder:'输入身高(cm)',
							clearIcon:true,
							disabled:false
						},{
							xtype:'textfield',
							id:'weight',
							name:'weight',
							label:'体重',
							placeHolder:'输入体重(Kg)',
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
							cls:'subBtn',
							id : 'submitHealthBtn',
							text:'提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								Ext.getCmp('healthForm').reset();
							}
						}
					]
				}]
			}]
		},
		/*身体指标结束*/
        /*孩子诞生开始*/
		{
			id:'kidBirthModal',
			xtype:'panel',
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:326,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'新生孩子记录'	
			},{
				xtype:'formpanel',
				id:'birthForm',
				scrollable:'vertical',
				url:domain+'BabyAction/addBaby',
				items:[
				{
					xtype:'fieldset',
					/*title:'孩子信息',*/
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'textfield',
							id:'babyName',
							name:'babyName',
							label:'姓名',
							placeHolder:'输入孩子的姓名',
							clearIcon:true,
							disabled:false
						},{
							xtype:'datepickerfield',
							id:'birthDate',
							name:'healthTime',
                        	dateFormat:'Y-m-d',
							value : new Date() ,
							label:'出生日期',
							clearIcon:true,
							disabled:false
						},{
							xtype:'radiofield',
							id:'babyMale',
							name:'sex',
							label:'男孩',
							value:'male',
							checked:true
						},{
							xtype:'radiofield',
							id:'babyFemale',
							name:'sex',
							label:'女孩',
							value:'female',
							check:false
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
							id : 'submitBirthFormBtn',
							text:'提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								Ext.getCmp('birthForm').reset();
							}
						}
					]
				}]
			}]
		},
		/*孩子诞生结束*/
		/*成绩表单开始*/
		{
			id:'kidScoreModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:271,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'小宝成绩记录'	
			},{
				xtype:'formpanel',
				id:'scoreForm',
				cls:'babyForm',
				scrollable:'vertical',
				url:domain+'BabyGrowth/addGradeCondition',
				items:[
				{
					xtype:'fieldset',
					/*title:'电影信息',*/
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'selectfield',
							id:'grade',
							name:'grade',
							label:'年级',
							options:[{
								text:'一年级',
								value:'1'
							},{
								text:'二年级',
								value:'2'
							},{
								text:'三年级',
								value:'3'
							},{
								text:'四年级',
								value:'4'
							},{
								text:'五年级',
								value:'5'
							},{
								text:'六年级',
								value:'6'
							}]
						},{
							xtype:'selectfield',
							id:'subject',
							name:'subject',
							label:'科目',
							options:[{
								text:'语文',
								value:'1'
							},{
								text:'数学',
								value:'1'
							},{
								text:'英语',
								value:'1'
							}]
						},{
							xtype:'textfield',
							id:'mark',
							name:'mark',
							label:'成绩',
							placeHolder:'输入科目成绩',
							clearIcon:true,
							disabled:false
						},{
							xtype:'datepickerfield',
							id:'scoreDate',
							name:'scoreDate',
                        	dateFormat:'Y-m-d',
							value : new Date() ,
							label:'日期',
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
							cls:'subBtn',
							id : 'submitScoreFormBtn',
							text:'提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								Ext.getCmp('scoreForm').reset();
							}
						}
					]
				}]
			}]
		},
		/*成绩表单结束*/
		/*疫苗接种开始*/
		{
			id:'vaccineModal',
			xtype:'panel',
			layout: "vbox",
			modal:true,
			hidden:true,
			hideOnMaskTap:true,
			centered:true,
			minHeight:215,
			height:'60%',
			width:'90%',
			items:[{
				xtype:'panel',
				cls:'modalPanel',
				html:'小宝疫苗记录'	
			},{
				xtype:'formpanel',
				id:'vaccineForm',
				cls:'babyForm',
				scrollable:'vertical',
				url:domain+'BabyGrowth/addVaccination',
				items:[
				{
					xtype:'fieldset',
					defaults:{
						labelwidth:'20%'
					},
					items:[
						{
							xtype:'datepickerfield',
							id:'vaccinTime',
							name:'vaccinTime',
							label:'日期',
                        	dateFormat:'Y-m-d',
							value : new Date() ,
							clearIcon:true,
							disabled:false
						},{
							xtype:'textfield',
							id:'vaccineContent',
							name:'vaccineContent',
							label:'备注',
							placeHolder:'输入疫苗接种备注',
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
							cls:'subBtn',
							id : 'submitVaccineFormBtn',
							text:'提交'
						},{
							cls:'resetBtn',
							text:'重置',
							handler:function(){
								Ext.getCmp('vaccineForm').reset();
							}
						}
					]
				}]
			}]
		},
		/*疫苗接种结束*/
		{
			xtype:"dataview",
			id:"kidMenu",
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
		}]
	}
});