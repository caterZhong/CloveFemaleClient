Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox'],
	
	controllers:["MainAction","RecordAction","KidAction","PregnantAction","NotebookAction"],
	views: ["MainView","RecordView","KidView","PregnantView","NotebookView","SlideNav","NotebookFirstView"],

	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});