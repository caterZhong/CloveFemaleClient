Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox'],
	
	controllers:["MainAction","RecordAction","KidAction"],
	views: ["MainView","RecordView","KidView"],

	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});