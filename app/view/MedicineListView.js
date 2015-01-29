Ext.define("cfa.view.MedicineListView",{

	extend:"Ext.Container",

	requires:["Ext.data.Store"],
	
	xtype:"medicinelistview",
	
	config:{
		xtype: "tabpanel",
		fullscreen: true,
		layout:'card',
		id:'medicineListView',
		items: [
				/* first panel begin */
             	{
                	title:'medBoxList',
                	layout: "vbox",
                	height:'100%',
                	id:'medDetailListPanel',
                	items: [{
								xtype: "titlebar",
								title: "我的药品", 
								docked: "top",
								items:[{
									name:'medDetailBackBtn',
									text:'返回',
									ui: 'plain'
								},{
									align: 'right',
									iconCls: 'list',
									ui: 'plain',
									name:'showTipViewBtn'
								}]
							},{
								cls:'medList',
								id:'medList',
								name:'medList',
								xtype:'list',
								width:'100%',
								height:'100%',
								emptyText:'药箱为空，请自行添加药品',
								itemTpl:'<div class="medMenuItem" medId="{id}""><img src="public/images/med.png" /><div class="medBoxTitle"><div class="medBoxName">{name}</div><span class="medBoxMark"><span class="deadlineDesc">有效期至</span><span class="deadline">{deadline}</span></div><div class="medMore">></div></div>'
							},{
								cls:'medAddTip',
								id:'medAddTip',
								xtype:'panel',
								items:[{
									xtype:'button',
									cls:'medAddTipBtn',
									name:'med2code',
									disabled:'true',
									text:'扫描输入'
								},{
									xtype:'button',
									cls:'medAddTipBtn',
									name:'medManual',
									text:'手动输入'
								},{
									xtype:'button',
									name:'cancelTipView',
									cls:'medAddTipBtn',
									text:'取消'
								},]
							}
					]
               },
               /* first panel end */
               /* second panel begin */
               {
                	title:'showMedDetail',
                	layout: "vbox",
                	id:'showMedDetailPanel',
                	cls:'addMedDetailPanel',
                	height:'100%',
                	items: [{
								xtype: "titlebar",
								title: "药品详情", 
								docked: "top",
								items:[{
									text:'返回',
									name:'showMedDetailRtnBtn'
								},
								{
									text:'保存',
									align:'right',
									name:'saveMedDetailBtn'
								}]
							},{
								xtype:'formpanel',
								id:'medDetailForm',
								name:'medDetailForm',
								scrollable:'vertical',
								height:'100%',
								items:[
								{
									items:[
										{
											xtype:'textfield',
											name:'medName',
											label:'名称',
											placeHolder:'药品名称',
											id:'medNameFeild',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textfield',
											name:'medType',
											id:'medType',
											label:'类型',
											placeHolder:'药品类型',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textfield',
											name:'medDeadline',
											id:'medDeadline',
											label:'有效期',
											placeHolder:'有效期',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textareafield',
											name:'medMark',
											id:'medFunctionFeild',
											label:'备注',
											placeHolder:'药品描述',
											clearIcon:true,
											disabled:false
										}
									]
								}]
							},
							{
								xtype: "titlebar",
								docked: "bottom",
								items:[{
									iconCls:'trash',
									align:'right',
									name:'medDetailDeleteBtn'
								}]
							}
					]
               },
               /* second panel end */
              /* third panel begin */
               {
                	title:'showMedDetail',
                	layout: "vbox",
                	id:'addMedDetailPanel',
                	cls:'addMedDetailPanel',
                	height:'100%',
                	items: [{
								xtype: "titlebar",
								title: "添加药品", 
								docked: "top",
								items:[{
									text:'返回',
									name:'showMedRtnBtn'
								},
								{
									text:'保存',
									align:'right',
									name:'addMedBtn'
								}]
							},{
								xtype:'formpanel',
								id:'medAddForm',
								name:'medAddForm',
								scrollable:'vertical',
								height:'100%',
								items:[
								{
									items:[
										{
											xtype:'textfield',
											name:'medName',
											label:'名称',
											placeHolder:'药品名称',
											id:'medNameFeild2',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textfield',
											name:'medType',
											id:'medType2',
											label:'类型',
											placeHolder:'药品类型',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textfield',
											name:'medDeadline',
											id:'medDeadline2',
											label:'有效期',
											placeHolder:'有效期',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textareafield',
											name:'medMark',
											id:'medFunctionFeild2',
											label:'备注',
											placeHolder:'药品描述',
											clearIcon:true,
											disabled:false
										}
									]
								}]
							}
					]
                }
               /* third panel end */
       ]
		
	}
});