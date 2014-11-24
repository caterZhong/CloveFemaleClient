Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox'],
	
	views: ["MainView","KidView"],
	controllers:["MainAction","RecordAction"],

	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});