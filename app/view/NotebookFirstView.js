Ext.define("cfa.view.NotebookFirstView",{

	extend: "Ext.Panel",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","Ext.form.FormPanel"],
	
	xtype: "bookfirstview",

    config:{
			/*随手记默认页面*/
			layout: "hbox",
			id:"notebookmainview",
			items : [{
						xtype : 'titlebar',
						title : '随手记',
						docked: 'top',
						cls:'note-titleBar',
						items :[
						{
							// iconCls:'refresh',
							text:'Back',
							name:'bookBack_btn',
							cls:'backBtn-plain',
							ui: 'plain'
						},{
							align: 'right',
							name: 'search_btn',
							iconCls: 'search',
							ui: 'plain'
						},
						{
							align: 'right',
							name: 'nav_btn',
							iconCls: 'list',
							ui: 'plain'
					    }]
			},{
				xtype:'list',
				id:'shownoteList',
				name:'shownoteList',
				width: "100%",
				itemTpl : '<div class="noteTitile">{title}</div><div class="noteDate">{year}年{month}月{day}日</div><div class="noteContent">{content}...</div>',
				store:'NoteStore',
			},{
						xtype:'panel',
						baseCls:'addNote',
						height:40,
						items:[{
							xtype:'button',
							name: 'new_btn',
							iconCls: 'add',
							ui: 'plain'
						}]

			}]
	}



	
});

        