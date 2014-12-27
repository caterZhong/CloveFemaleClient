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
						items :[
						{
							// iconCls:'refresh',
							text:'Back',
							name:'bookBack_btn',
							cls:'backBtn-plain',
							ui: 'plain'
						},{
							align: 'right',
							name: 'new_btn',
							iconCls: 'add',
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
				width: "100%",
				itemTpl : '{title}',
				store:{
					fields:['title'],
					data:[
						{title : '最近'},
						{title : '全部笔记'},
						{title : '默认笔记本'},
						{title : '菜谱'},
					]
				},
			}]
	}



	
});

        