//<debug>
Ext.Loader.setPath({
    'Ext': 'lib/src'
});
//</debug>
Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox','cfa.view.ColorPatterns','Ext.util.HashMap'],
	

	controllers:["MainAction","RecordAction","KidAction","PregnantAction","NotebookAction","NewNoteAction","NoteSearchAction","NoteSearchDetailAction",
		"NoteDetailAction","cfa.controller.MedicineAction","cfa.controller.MedicineListAction","chart.ChartAction","chart.CustomizeDateAction","PersonalAction","me.PsnInfAction"],
		
	views: ["MainView","RecordView","KidView","PregnantView","NotebookView","SlideNav",
		"NotebookFirstView","NewNoteView","NoteSearchView","NoteDetailView","NoteSearchDetailView","chart.ChartView",
		"chart.CustomizeDateView", "chart.BarChartBabyMove", "chart.BarChartGrade", "chart.BarChartTemp",
		"chart.LineChartBabyMove", "chart.LineChartGesWeight", "chart.LineChartGrade",
		"chart.LineChartHeight", "chart.LineChartTemp", "chart.PieChartBabyMove", "chart.PieChartGrade",
		"chart.PieChartTemp","lock.DialLocker", "lock.DialLockerComponent"],
	models:["NoteModel","NoteGroupModel","SimpleNoteBookModel","NoteDetailModel", "RecordModel"],
	
	stores: ["NoteStore","NoteGroupStore","SimpleNoteBookStore","NoteDetailStore","NoteSearchDetailStore","NbMenuStore",
		"chart.ChartStore", "chart.LineBabyMoveStore", "chart.LineGesWeightStore", 
		"chart.LineGradeStore", "chart.LineHeightStore", "chart.LineTempStore", "chart.PieBabyMoveStore", 
		"chart.PieGradeStore", "chart.PieTempStore","chart.ChartSubjectsStore","medicine.medBoxStore","medicine.medDetailStore","medicine.medSingleStore"],


	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});