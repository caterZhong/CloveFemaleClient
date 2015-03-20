Ext.define("cfa.view.note.NotebookView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","Ext.form.FormPanel",
			   "cfa.view.note.NotebookFirstView","cfa.view.note.NewNoteView", "cfa.view.note.NoteSearchView", 
			   "cfa.view.note.NoteDetailView", "cfa.view.note.NoteSearchDetailView",],
	
	xtype: "notebookview",
	config:{
			/*随手记主页*/
			fullscreen: true,
			layout: "hbox",
			items : [{//数据加载提示Model
						id:'nbTipsModal',
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
					},{		
						xtype : 'bookfirstview',
						cls: 'slide',
						width: '100%'											
					},{

						xtype : 'slidenav',
						name : 'noteBookList',
						id:'noteBookList',
						itemTpl : '<div class="notebookName">{name}</div>',
						store:'SimpleNoteBookStore',
						width : 250,
						itemCls:'notebookListItem',
						
					},{//笔记本操作菜单模态对话框
						id:'nbModal',
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
							id:'nbModalName',
							cls:'modalPanel',
							html:'笔记本名称',
						},{
							xtype:'list',
							name:'nbMenuList',
							height:120,
							cls:'nbModelList',
							store:'NbMenuStore',
							itemTpl:'{name}',
							itemCls:'nbModelListItem',
						}]
					},{//笔记本重命名或新建笔记本操作模态对话框
						id:'nbRnOrNewModal',
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
							name:'nbNameField',
							placeHolder:'少于12字',
							id:'nbNameField',
							cls:'nbModelTf',
							
						},{
							html:'笔记本名称不能为空!',
							id:'nbNameTips',
							hidden:true,
							cls:'nbTips',
						},{
							xtype:'button',
							name:'nbNameBtn',
							cls:'subBtn',
							text:'确定',
						}]
					}]
	}
});