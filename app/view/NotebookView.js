Ext.define("cfa.view.NotebookView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","Ext.form.FormPanel"],
	
	xtype: "notebookview",
	config:{
			/*随手记主页*/
			fullscreen: true,
			layout: "hbox",
			id:"notebookmainview",
			items : [{		
						xtype : 'bookfirstview',
						cls: 'slide',
						width: '100%'											
					},{

						xtype : 'slidenav',
						name : 'noteBookList',
						id:'noteBookList',
						// cls:'noteBookList',
						// itemTpl : '<div class="bookDelImg" id="delImg_{id}"><img src="public/images/delete32.png"/></div><div class="notebookName">{name}</div>',
						itemTpl : '<div class="notebookName">{name}</div>',
						store:'SimpleNoteBookStore',
						width : 250,
						itemCls:'notebookListItem',
						preventSelectionOnDisclose:true,
						onItemDisclosure:function(record,element,index,e){
							console.log("点击了垃圾桶图标");
							localStorage.tapDisclosure = 1;
						},
					},{
						id:'nbModal',
						xtype:'panel',
						layout: "vbox",
						modal:true,
						hidden:true,
						hideOnMaskTap:true,
						centered:true,
						height:170,
						minHeight:170,
						width:'90%',
						items:[{
							xtype:'panel',
							cls:'modalPanel',
							html:'笔记本名称',
						},{
							xtype:'list',
							height:120,
							cls:'nbModelList',
							store:'NbMenuStore',
							itemTpl:'{name}',
							itemCls:'nbModelListItem',
						}]
					}]
	}
});