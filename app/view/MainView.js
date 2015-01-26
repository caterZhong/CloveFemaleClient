Ext.define("cfa.view.MainView", {

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","cfa.view.RecordView","cfa.view.PersonalView"],
	
	xtype: "mainview",
	
	//html: "Test Container"
    
    config:{
    	layout:{
    		type: 'fit'
    	},
    	items: [{
    		xtype: "tabpanel",
    		id:"tabpanel1",
    		ui:"dark",
    		tabBarPosition: "bottom",
    		
    		items:[
				{
					title: "记录控",
					//html: "记录控",
					iconCls: "compose",
		            items: [{
		            	xtype: "recordview"
		            }]
				},
				{
					title: "空间",
					html:"空间",
					iconCls: "star"
				}, 
				{
					title: "女人圈",
					html: "女人圈",
					iconCls:"team"
				},
				{
					title: "我",
					// html:"我",
					iconCls: "user",
					items: [{
		            	xtype: "personalview"
		            }]
				}    			
    		]
    	}]
    }
    
});