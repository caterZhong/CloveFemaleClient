Ext.define('cfa.controller.chart.ChartAction',{
	extend:'Ext.app.Controller',
	config: {
		pieIndex	: 0 ,
		lineIndex	: 6 ,
		barIndex	: 3 ,

		pieBabyMoveIndex:0, pieGrade:1, 		pieTemp:2, 
		barBabyMove:3, 		barGrade:4, 		barTemp:5,
		lineBabyMove:6, 	lineGesWeight:7, 	lineGrade:8, lineHeight:9, lineTemp:10,

		onlyLineIndex:11,
		physicalIndex:0 ,
		refs: {
			chartView:{
				selector:'chartView',
				xtype:'chartView',
				autoCreate:true
			},
			customizeDateView:{
				selector:'customizeDateView',
				xtype:'customizeDateView',
				autoCreate:true
			},
			chartsPanel 	:'#chartsPanel',

			lineChartBtn	:'#lineChartBtn',
			pieChartBtn		:'#pieChartBtn',
			barChartBtn		:'#barChartBtn',

			customizeTimeBtn:'#customizeTimeBtn',
			babyGradeBtn	:'#babyGradeBtn',
			babyHeightBtn	:'#babyHeightBtn',
			fetalWeightBtn	:'#fetalWeightBtn',
			fetalMoveBtn	:'#fetalMoveBtn',
			temperatureBtn	:'#temperatureBtn',

			preDataBtn		:'button[name=preDataBtn]',
			nextDataBtn		:'button[name=nextDataBtn]',
			// nextDataBtn		:'#nextDataBtn'

			line_x			:'#line_x'
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
				tap:'customizeDate'
			},

			babyGradeBtn	:{ tap:'applyBabyGradeData'},
			babyHeightBtn	:{ tap:'applyBabyHeightData'},
			fetalWeightBtn	:{ tap:'applyFetalWeightData'},
			fetalMoveBtn	:{ tap:'applyFetalMoveData'},
			temperatureBtn	:{ tap:'applyTemperatureData'},

			preDataBtn:{
				tap:'getPreviousData'
			},
			nextDataBtn:{
				tap:'getNextData'
			}
		},
		routes:{
			'chart':'showChartView',
			'setDate':'showCustomizeDateView'
		}
	},

	showChartView: function(){
		Ext.Viewport.animateActiveItem(this.getChartView(), {
			type:'cover',
			direction:'right'
		});
	},

	showPieChart:function(){
		this.getChartsPanel().setActiveItem(this.getPieIndex()) ;
		this.setPhysicalIndex(0) ;
	},

	showLineChart:function(){
		this.getChartsPanel().setActiveItem(this.getLineIndex()) ;
		this.setPhysicalIndex(1) ;
	},

	showBarChart:function(){
		this.getChartsPanel().setActiveItem(this.getBarIndex()) ;
		this.setPhysicalIndex(2) ;
	},

	refreshData: function(){
		this.changeData() ;
	},

	applyBabyGradeData	: 	function(){ 
		// console.log("applyBabyGradeData") ;
		this.changeDataType("babyGrade") ;},
	applyBabyHeightData	: 	function(){ this.changeDataType("babyHeight") ;},
	applyFetalWeightData: 	function(){ this.changeDataType("fetalWeight") ;},
	applyFetalMoveData	: 	function(){ this.changeDataType("fetalMove") ;},
	applyTemperatureData: 	function(){ this.changeDataType("temperature") ;},

	changeDataType: function(type){
		//标示此种数据是否只有线形图能表示
		var onlyLine = false ;
		switch(type){
			case "babyGrade":
				this.setPieIndex(1) ;
				this.setBarIndex(4) ;
				this.setLineIndex(8) ;
				break ;
			case "babyHeight" :
				this.setPieIndex(this.getOnlyLineIndex()) ;
				this.setBarIndex(this.getOnlyLineIndex()) ;
				document.getElementById('only_line_title').innerHTML = "身高" ;
				this.setLineIndex(9) ;
				break ;
			case "fetalWeight" :
				this.setPieIndex(this.getOnlyLineIndex()) ;
				this.setBarIndex(this.getOnlyLineIndex()) ;
				document.getElementById('only_line_title').innerHTML = "孕重" ;
				this.setLineIndex(7) ;
				break ;
			case "fetalMove" :
				this.setPieIndex(0) ;
				this.setBarIndex(3) ;
				this.setLineIndex(6) ;
				break ;
			case "temperature" :
				this.setPieIndex(2) ;
				this.setBarIndex(5) ;
				this.setLineIndex(10) ;
				break ;
			default :
		}

		// console.log("physicalIndex is  : " + this.getPhysicalIndex()) ;
		switch(this.getPhysicalIndex()){
			case 0 :
				this.getChartsPanel().setActiveItem(this.getPieIndex()) ;
				break ;
			case 1 :
				this.getChartsPanel().setActiveItem(this.getLineIndex()) ;
				break ;
			case 2 : 
				this.getChartsPanel().setActiveItem(this.getBarIndex()) ;
				break ;
		}
		Ext.Viewport.hideMenu('right');
	},

	customizeDate: function(){
		this.redirectTo('setDate');
	},

	//获取上一个时间段的数据
	getPreviousData: function(){
		window.dateIndex-- ;
		window.changeDateByIndex() ;
		// console.log("ChartAction getPreviousData") ;
		this.setChartTitleDates(Ext.Date.format(window.dataDate1, "Y-m-d"), 
			Ext.Date.format(window.dataDate2, "Y-m-d")) ;
		var storeList = ['PieTempStore','PieGradeStore','PieBabyMoveStore','LineTempStore',
            'LineHeightStore','LineGradeStore','LineGesWeightStore','LineBabyMoveStore'] ;
        for(i = 0 ; i < storeList.length ; i++){
        	Ext.getStore(storeList[i]).reload() ;
        }
	},

	//获取下一个时间段的数据
	getNextData: function(){
		window.dateIndex++ ;
		window.changeDateByIndex() ;
		// console.log("ChartAction getNextData") ;
		this.setChartTitleDates(Ext.Date.format(window.dataDate1, "Y-m-d"), 
			Ext.Date.format(window.dataDate2, "Y-m-d")) ;
		var storeList = ['PieTempStore','PieGradeStore','PieBabyMoveStore','LineTempStore',
            'LineHeightStore','LineGradeStore','LineGesWeightStore','LineBabyMoveStore'] ;
        for(i = 0 ; i < storeList.length ; i++){
        	Ext.getStore(storeList[i]).reload() ;
        }
	},

	setChartTitleDates: function(dateString1, dateString2){
		document.getElementById("pie_grade_date1").innerHTML 	= dateString1 ;
		document.getElementById("pie_grade_date2").innerHTML 	= dateString2 ;
		document.getElementById("pie_babymove_date1").innerHTML = dateString1 ;
		document.getElementById("pie_babymove_date2").innerHTML = dateString2 ;
		document.getElementById("pie_temp_date1").innerHTML 	= dateString1 ;
		document.getElementById("pie_temp_date2").innerHTML 	= dateString2 ;

		document.getElementById("bar_grade_date1").innerHTML 	= dateString1 ;
		document.getElementById("bar_grade_date2").innerHTML 	= dateString2 ;
		document.getElementById("bar_babymove_date1").innerHTML = dateString1 ;
		document.getElementById("bar_babymove_date2").innerHTML = dateString2 ;
		document.getElementById("bar_temp_date1").innerHTML 	= dateString1 ;
		document.getElementById("bar_temp_date2").innerHTML 	= dateString2 ;

		document.getElementById("line_grade_date1").innerHTML 		= dateString1 ;
		document.getElementById("line_grade_date2").innerHTML 		= dateString2 ;
		document.getElementById("line_babymove_date1").innerHTML 	= dateString1 ;
		document.getElementById("line_babymove_date2").innerHTML 	= dateString2 ;
		document.getElementById("line_gesweight_date1").innerHTML 	= dateString1 ;
		document.getElementById("line_gesweight_date2").innerHTML 	= dateString2 ;
		document.getElementById("line_height_date1").innerHTML 		= dateString1 ;
		document.getElementById("line_height_date2").innerHTML 		= dateString2 ;
		document.getElementById("line_temp_date1").innerHTML 		= dateString1 ;
		document.getElementById("line_temp_date2").innerHTML 		= dateString2 ;
	},

	showCustomizeDateView: function(){
		// var view   = this.createView(id),
		Ext.Viewport.animateActiveItem(this.getCustomizeDateView(),{
			type:'cover',
			direction:'left'
		});
	},

	launch: function(){
		// this.setChartTitleDates(Ext.Date.format(window.dataDate1, "Y-m-d"), 
		// 	Ext.Date.format(window.dataDate2, "Y-m-d")) ;
		var chartAction = this ;
		window.initDateLabels = function(){
			chartAction.setChartTitleDates(Ext.Date.format(window.dataDate1, "Y-m-d"), 
			Ext.Date.format(window.dataDate2, "Y-m-d")) ;
		}
	}
});