Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox'],
	
	controllers:["MainAction","RecordAction","KidAction","PregnantAction"],
	views: ["MainView","RecordView","KidView","PregnantView"],

	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});