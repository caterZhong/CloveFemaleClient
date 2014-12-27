Ext.define("cfa.view.NewnoteView",{

	extend: "Ext.Panel",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","Ext.form.FormPanel"],
	
	xtype: "newnoteview",

    config:{
		// 随手记添加笔记页面
		layout:{
				type:'vbox',
				align:'stretch',
				// pack:'justify'
			},
		items:[{
			xtype:'panel',
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
				cls:'note-add-titleBar',
				items:[{
					text:'返回',
					name:'newnote_back_btn',
					cls:'backBtn-plain',
					ui: 'plain'
				},
				{
					text:'保存',
					xtype:'button',
					align: 'right',
					name:'saveNote_btn',
					cls:'backBtn-plain',
					// icon:''
					ui: 'plain'
				}]
			},
			{
				xtype:'panel',
				cls:'testPanel', 
				items:[{
					xtype:'textfield',
					placeHolder:'标题',
					clearIncon:false,
				}]				
			}
			,{
				flex:1,
				xtype:'textareafield',
				placeHolder:'内容',
				clearIcon:false,
				baseCls:'textarea-note'
			}
			,{
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
						
					}
					,{
						id:'note-dateText',
						html:'2014-12-27',
					}
					]
				},
				{
					xtype:'spacer',
					cls:'spacer'
				},
				{
					xtype:'selectfield',
					docked:'right',
					cls:'note-blong',
					placeHolder:'默认笔记本',
					options:[{
							text:'默认笔记本',
							value:'1'
						},{
							text:'菜谱',
							value:'2'
						},{
							text:'孩子学习',
							value:'3'
						}]
					
				}
				]
			}
			]
			
		}]
	}
	
});

        