Ext.define('cfa.controller.chart.PieChartAction',{
	extend:'cfa.controller.chart.ChartAction',

	changeData: function(){
		Ext.getStore('PieStore').generateData(9) ;
	}
});