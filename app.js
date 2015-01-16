//<debug>
Ext.Loader.setPath({
    'Ext': 'lib/src'
});
//</debug>
Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox','cfa.view.ColorPatterns','Ext.util.HashMap'],
	
	controllers:["MainAction","RecordAction","KidAction","PregnantAction","NotebookAction","NewNoteAction",
		"chart.ChartAction","chart.CustomizeDateAction","cfa.controller.MedicineAction","cfa.controller.MedicineListAction"],
		
	views: ["MainView","RecordView","KidView","PregnantView","NotebookView","SlideNav",
		"NotebookFirstView","NewNoteView","chart.ChartView","chart.CustomizeDateView", "chart.BarChartBabyMove", 
		"chart.BarChartGrade", "chart.BarChartTemp",
		"chart.LineChartBabyMove", "chart.LineChartGesWeight", "chart.LineChartGrade",
		"chart.LineChartHeight", "chart.LineChartTemp", "chart.PieChartBabyMove", "chart.PieChartGrade",
		"chart.PieChartTemp"],
	models:["NoteGroupModel"],
	
	stores: ["NoteGroupStore","chart.ChartStore", "chart.LineBabyMoveStore", "chart.LineGesWeightStore", 
		"chart.LineGradeStore", "chart.LineHeightStore", "chart.LineTempStore", "chart.PieBabyMoveStore", 
<<<<<<< HEAD
		"chart.PieGradeStore", "chart.PieTempStore","medicine.medBoxStore","medicine.medDetailStore","medicine.medSingleStore"],
=======
		"chart.PieGradeStore", "chart.PieTempStore", "chart.ChartSubjectsStore"],
>>>>>>> 639b0ecaac00c6b7f5be3fde4731f3017fa6796b


	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});