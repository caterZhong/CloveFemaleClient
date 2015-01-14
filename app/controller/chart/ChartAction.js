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

			subject_selects	:'selectfield[name=subject_selects]'
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
			},
			subject_selects:{
				change:'changeSubject',
				focus:'tapSelection'
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

	changeSubject: function(){
		var chartView = Ext.getCmp('chartView') ;
		//1.只有点击过选择列表之后，触发change事件才执行下面的逻辑
		//	因为选择列表使用了store，远程加载数据的时候change事件会被触发多次
		//	而此时是不需要进行处理的
		//2.自动设置列表选中项的时候会触发change事件，需要防止多次执行
		if(chartView.getRequestQuota() != undefined && chartView.getRequestQuota() > 0){
			chartView.setRequestQuota(chartView.getRequestQuota() - 1) ;
			var newIndex = arguments[1] ;
			var oldIndex = arguments[2] ;
			var owner = arguments[0] ;
			var selects = Ext.ComponentQuery.query('selectfield[name=subject_selects]') ;
			for(i = 0 ; i < selects.length ; i++){
				
				selects[i].setValue(newIndex) ;
			}
			var subjects = Ext.getStore('ChartSubjectsStore') ;
			var index = parseInt(newIndex) ;
			if(index < subjects.getData().length){
				var subject = subjects.getData().getAt(index).data.text ;
				Ext.getStore('LineGradeStore').loadSubject(subject) ;
				Ext.getStore('PieGradeStore').loadSubject(subject) ;
			}
		}
	},

	tapSelection: function(){
		var chartView = Ext.getCmp('chartView') ;
		//限制自动更改选中科目时多次调用请求
		chartView.setRequestQuota(1) ;
	},

	setChartTitleDates: function(dateString1, dateString2){
		var date1_ids = ["pie_grade_date1","pie_babymove_date1","pie_temp_date1","bar_grade_date1",
			"bar_babymove_date1","bar_temp_date1","line_grade_date1","line_babymove_date1",
			"line_gesweight_date1","line_height_date1","line_temp_date1"] ;

		var date2_ids = ["pie_grade_date2","pie_babymove_date2","pie_temp_date2","bar_grade_date2",
			"bar_babymove_date2","bar_temp_date2","line_grade_date2","line_babymove_date2",
			"line_gesweight_date2","line_height_date2","line_temp_date2"] ;

		for(i = 0 ; i < date1_ids.length ; i++){
			document.getElementById(date1_ids[i]).innerHTML 	= dateString1 ;
		}
		for(i = 0 ; i < date2_ids.length ; i++){
			document.getElementById(date2_ids[i]).innerHTML 	= dateString2 ;
		}
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