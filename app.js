//<debug>
Ext.Loader.setPath({
    'Ext': 'lib/src'
});
//</debug>
Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox','cfa.view.ColorPatterns','Ext.util.HashMap'],
	
	controllers:["MainAction","RecordAction","KidAction","PregnantAction","NotebookAction","NewNoteAction",
		"chart.ChartAction","chart.CustomizeDateAction"],
		
	views: ["MainView","RecordView","KidView","PregnantView","NotebookView","SlideNav",
		"NotebookFirstView","NewNoteView","chart.ChartView","chart.CustomizeDateView", "chart.BarChartBabyMove", 
		"chart.BarChartGrade", "chart.BarChartTemp",
		"chart.LineChartBabyMove", "chart.LineChartGesWeight", "chart.LineChartGrade",
		"chart.LineChartHeight", "chart.LineChartTemp", "chart.PieChartBabyMove", "chart.PieChartGrade",
		"chart.PieChartTemp"],
	models:["NoteGroupModel"],
	
	stores: ["NoteGroupStore","chart.ChartStore", "chart.LineBabyMoveStore", "chart.LineGesWeightStore", 
		"chart.LineGradeStore", "chart.LineHeightStore", "chart.LineTempStore", "chart.PieBabyMoveStore", 
		"chart.PieGradeStore", "chart.PieTempStore", "chart.ChartSubjectsStore"],


	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});