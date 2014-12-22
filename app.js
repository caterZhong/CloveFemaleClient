//<debug>
Ext.Loader.setPath({
    'Ext': 'lib/src'
});
//</debug>
Ext.application({

	name: "cfa",
	requires:['Ext.MessageBox','cfa.view.ColorPatterns'],
	
	controllers:["MainAction","RecordAction","KidAction","PregnantAction","NotebookAction",
		"chart.ChartAction","chart.PieChartAction"],
	views: ["MainView","RecordView","KidView","PregnantView","NotebookView","SlideNav",
		"NotebookFirstView","chart.ChartView","chart.PieChart","chart.LineChart","chart.BarChart"],
	stores: ["PieStore"],

	launch: function(){
		Ext.Viewport.add({
			xtype: "mainview"
		});
		
		
	}
});