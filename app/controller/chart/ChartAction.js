Ext.define('cfa.controller.chart.ChartAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			chartView:{
				selector:'chartView',
				xtype:'chartView',
				autoCreate:true
			},
			chartsPanel 	:'#chartsPanel',
			lineChartBtn	:'#lineChartBtn',
			pieChartBtn		:'#pieChartBtn',
			barChartBtn		:'#barChartBtn',
			customizeTimeBtn:'#customizeTimeBtn',
			babyMoveDataBtn	:'#babyMoveDataBtn',
			tempDataBtn		:'#tempDataBtn',
			weightDataBtn	:'#weightDataBtn',
			sleepDataBtn	:'#sleepDataBtn'
		},
		control:{
			lineChartBtn:{
				tap:'showLineChart'
			},
			pieChartBtn:{
				tap:'showPieChart'
			},
			barChartBtn:{
				tap:'showBarChart'
			},
			customizeTimeBtn:{
				tap:'changeData'
			},
			babyMoveDataBtn:{
				tap:'changeData'
			},
			tempDataBtn:{
				tap:'changeData'
			},
			weightDataBtn:{
				tap:'changeData'
			},
			sleepDataBtn:{
				tap:'changeData'
			}
		},
		routes:{
			'chart':'showChartView'
		}
	},

	showChartView: function(){
		Ext.Viewport.setActiveItem(this.getChartView());
	},

	showPieChart:function(){
		this.getChartsPanel().setActiveItem(0) ;
	},

	showLineChart:function(){
		this.getChartsPanel().setActiveItem(1) ;
	},

	showBarChart:function(){
		this.getChartsPanel().setActiveItem(2) ;
	},

	refreshData: function(){
		this.changeData() ;
	},

	changeData: function(){
		Ext.getStore('PieStore').generateData(9) ;
		Ext.Viewport.hideMenu('right');
	},

	launch: function(){
		// this.getChartsPanel().setActiveItem(1) ;
	}
});