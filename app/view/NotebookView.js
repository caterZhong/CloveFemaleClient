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
												
						// Needed to fit the whole content
						width: '100%'											
					}
					, {

						xtype : 'slidenav',
						name : 'noteBookList',
						id:'noteBookList',
						itemTpl : '{name}',
						store:'SimpleNoteBookStore',
						width : 250,
						
					}
			]
	}
});