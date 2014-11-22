Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox'],
	
	views: ["MainView"],
	controllers:["MainAction","RecordAction"],


	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});