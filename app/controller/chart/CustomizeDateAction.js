Ext.define('cfa.controller.chart.CustomizeDateAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			backToChartBtn:'#backToChartBtn',
			saveDateBtn:'#saveDateBtn',
			startDatePicker:'#startDatePicker',
			endDatePicker:'#endDatePicker'
		},
		control:{
			backToChartBtn:{
				tap:'backToChartView'
			},
			saveDateBtn:{
				tap:'saveDate'
			}
		},
		routes:{
			
		}
	},

	backToChartView: function(){
		this.getStartDatePicker().setValue(Ext.Date.clone(window.customizedDate1)) ;
		this.getEndDatePicker().setValue(Ext.Date.clone(window.customizedDate2)) ;
		this.redirectTo('chart') ;
	},

	saveDate: function(){
		var date1 = this.getStartDatePicker().getValue() ;
		var date2 = this.getEndDatePicker().getValue() ;
		if(date1 >= date2){
			Ext.Msg.alert("Error","起始日期必须小于结束日期！") ;
		}else{
			window.customizedDate1 = date1 ;
			window.customizedDate2 = date2 ;
			calculateCustomizedDateGap() ;

			//重置计算参数
			window.resetParams() ;

			//重新加载数据
			var storeList = ['PieTempStore','PieGradeStore','PieBabyMoveStore','LineTempStore',
	            'LineHeightStore','LineGradeStore','LineGesWeightStore','LineBabyMoveStore'] ;
	        for(i = 0 ; i < storeList.length ; i++){
	        	Ext.getStore(storeList[i]).reload() ;
	        }

			this.redirectTo('chart') ;
		}
	},

	launch: function(){
		// this.getChartsPanel().setActiveItem(1) ;
	}
});