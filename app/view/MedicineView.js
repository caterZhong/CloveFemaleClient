Ext.define("cfa.view.MedicineView",{

	extend:"Ext.Container",

	requires:["Ext.data.Store","cfa.view.MedicineListView"],
	
	xtype:"medicineview",
	
	config:{
		xtype: "tabpanel",
		fullscreen: true,
		layout:'card',
		id:'medicineView',
		items: [
				/* first panel begin */
             	{
                	title:'medBoxList',
                	layout: "vbox",
                	height:'100%',
                	id:'medBoxListPanel',
                	items: [{
								xtype: "titlebar",
								title: "我的药箱", 
								docked: "top",
								items:[{
									name:'medBackBtn',
									text:'返回',
									ui: 'plain'
								},{
									align: 'right',
									iconCls: 'add',
									ui: 'plain',
									name:'medNewBtn'
								}]
							},{
								cls:'medboxList',
								id:'medboxList',
								xtype:'list',
								name:'medboxList',
								width:'100%',
								height:'100%',
								itemTpl:'<div class="medMenuItem" medBoxNum="{id}" userId="{userId}"><img src="public/images/medicine.png" /><div class="medBoxTitle"><div class="medBoxName">{name}</div><span class="medBoxMark">{mark}</span></div><div class="medMore">></div></div>'
							}
					]
               },
               /* first panel end */
               /* second panel begin */
               {
                	title:'addMedBox',
                	layout: "vbox",
                	id:'addMedBoxPanel',
                	cls:'addMedBoxPanel',
                	height:'100%',
                	items: [{
								xtype: "titlebar",
								title: "新增药箱", 
								docked: "top",
								items:[{
									name:'medBackBtn',
									text:'返回',
									ui: 'plain',
									name:'addMedBoxBtn'
								}]
							},
							/* form begin */
							{
								xtype:'formpanel',
								id:'medBoxForm',
								name:'medBoxForm',
								scrollable:'vertical',
								height:'100%',
								items:[
								{
									xtype:'fieldset',
									defaults:{
										labelwidth:'10%'
									},
									items:[
										{
											xtype:'textfield',
											name:'medBoxName',
											label:'名称',
											placeHolder:'药箱名字',
											clearIcon:true,
											disabled:false
										},
										{
											xtype:'textareafield',
											name:'medBoxMark',
											label:'备注',
											placeHolder:'药箱相关描述',
											clearIcon:true,
											disabled:false
										}
									]
								},{
									xtype:'panel',
									layout:{
										type:'vbox'
									},
									defaults:{
										xtype:'button'
									},
									items:[
										{
											cls:'subBtn',
											name:'addMedBoxSubBtn',
											text:'提交'
										},{
											cls:'resetBtn',
											text:'重置',
											handler:function(){
												healthForm.reset();
											}
										}
									]
								}]
							}
							/* form end */
					]
                }
               /* second panel end */
       ]
		
	}
});