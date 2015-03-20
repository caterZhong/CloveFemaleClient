Ext.define("cfa.view.note.NewNoteView",{

	extend: "Ext.Panel",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store",
			  "Ext.form.FormPanel","Ext.field.Select"],
	
	xtype: "newnoteview",

    config:{
		// 随手记添加笔记页面
		layout:{
				type:'vbox',
				align:'stretch',
				// pack:'justify'
			},
		items:[{//操作消息提示Model
					id:'nnTipsModal',
					xtype:'panel',
					layout: "vbox",
					modal:true,
					name:'nbTipsModal',
					hidden:true,
					hideOnMaskTap:true,
					// showAnimation:'pop',
					hideAnimation:'fadeOut',
					height:30,
					minWidth:80,
					html:'加载失败',
					cls:'infTipsModal',
			},{//笔记本重命名或新建笔记本操作模态对话框
					id:'nnbModal',
					xtype:'panel',
					layout: "vbox",
					modal:true,
					hidden:true,
					hideOnMaskTap:true,
					centered:true,
					height:170,
					width:'90%',
					items:[{
							xtype:'panel',
							cls:'modalPanel',
							html:'请输入笔记本名称',
						},{
							xtype:'textfield',
							name:'nbNameField_nn',
							placeHolder:'少于12字',
							id:'nbNameField_nn',
							cls:'nbModelTf',
							
						},{
							html:'笔记本名称不能为空!',
							id:'nbNameTips_nn',
							hidden:true,
							cls:'nbTips',
						},{
							xtype:'button',
							name:'nbNameBtn_nn',
							cls:'subBtn',
							text:'确定',
					}]
			},{
					xtype:'panel',
					id:'noteForm',
					name:'noteForm',
					id:'noteForm',
					width:'100%',
					height:'100%',
					layout:{
						type:'vbox',
						align:'stretch',
						// pack:'justify'
					},
					// baseCls:'note-form',
					items:[{
							xtype:'titlebar',
							title:'添加笔记',
							docked:'top',
							cls:'note-titleBar',
							items:[{
								text:'返回',
								name:'newnote_back_btn',
								cls:'backBtn-plain',
								ui: 'plain'
							},{
								text:'保存',
								xtype:'button',
								id:'newnote_save_btn',
								name:'newnote_save_btn',
								align: 'right',
								cls:'backBtn-plain',
								ui: 'plain'
							}]
						},{
							xtype:'panel',
							cls:'testPanel', 
							items:[{
								xtype:'textfield',
								id:'noteTitle',
								name:'noteTitle',
								placeHolder:'标题',
								clearIncon:false,
							}]				
						},{
							flex:1,
							xtype:'textareafield',
							id:'noteContent',
							name:'noteContent',
							placeHolder:'内容',
							clearIcon:false,
							baseCls:'textarea-note'
						},{//bottomPanel，内容包括创建日期、spacer、笔记本selectfield
							xtype:'panel',
							docked:'bottom',
							layout:'hbox',
							height:50,
							items:[{
									xtype:'panel',
									cls:'note-builddate',
									layout:'hbox',
									items:[{
											html:'创建日期:&nbsp;',		
										},{
											id:'note-dateText',
											html:'',
									}]
								},{
									xtype:'spacer',
									cls:'spacer'
								},{
									xtype:'selectfield',
									id:'noteGroup',
									name:'noteGroup',
									docked:'right',
									cls:'note-blong',
									store:'SimpleNoteBookStore',
									valueField:'id',
									displayField:'name',	
									placeHolder:'默认笔记本',		
							}]
					}]
			
		}]
	}
	
});

        