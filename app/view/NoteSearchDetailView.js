Ext.define("cfa.view.NoteSearchDetailView",{

	extend: "Ext.Panel",
	requires: ["Ext.TabPanel","Ext.DataView","Ext.Panel","Ext.data.Store","Ext.form.FormPanel"],
	
	xtype: "notesearchdetailview",

    config:{
			/*搜索笔记本详情页面(不可编辑)*/
			layout: "hbox",
			items : [{
						xtype : 'titlebar',
						// title : 'asdf',
						docked: 'top',
						cls:'note-titleBar',
						items :[
						{
							// iconCls:'refresh',
							text:'返回',
							name:'bookBack_btn',
							cls:'backBtn-plain',
							ui: 'plain'
						},{
							// iconCls:'refresh',
							text:'编辑',
							align:'right',
							name:'notedetaileditBack_btn',
							cls:'backBtn-plain',
							ui: 'plain'
						}
						
					 ]
			},{
				xtype:'list',
				id:'notesearchdetailList',
				name:'notesearchdetailList',
				width: "100%",
				itemTpl : '<div class="noteTitile detailTitle">{title}</div><div class="noteDate">{year}年{month}月{day}日</div><div class="noteContent">{content}</div>',
				store:'NoteStore',
			}
			]
	}



	
});

        