Ext.define("cfa.store.chart.LineHeightStore", {
	extend: "cfa.store.chart.ChartStore",

    requires: ['Ext.data.proxy.JsonP','Ext.util.HashMap'],

    config:{
    	storeId: "LineHeightStore",
        fields: ['height', 'date'],
        data : [],
        map : Ext.create('Ext.util.HashMap'),
        index : 0 ,
	    proxy: {
	        type: 'jsonp',
	        url : domain + 'FgChartTest/getLineHeightStore',
	        extraParams:{
                'startDate': Ext.Date.format(window.dataDate1, "Y-m-d"),
                'endDate': Ext.Date.format(window.dataDate2, "Y-m-d")
	        }
	    }
    },

    getParams: function(){
    	var params = this.getProxy().getExtraParams() ;
    	// console.log(params) ;
    	return params ;
    },

    refresh: function(data, eOpts ){
        console.log("test refresh") ;
        // Ext.getStore('UserStore').hasOwnProperty()
    }, 

    reload: function(){
        this.getMap().clear() ;
        var params = {
            'startDate': Ext.Date.format(window.dataDate1, "Y-m-d"),
            'endDate': Ext.Date.format(window.dataDate2, "Y-m-d")
        } ;
        this.getProxy().setExtraParams(params) ;
        this.load() ;
    },

    previousData: function(){
        window.dateIndex-- ;
        var date1 = window.dataDate1 ;
        var date2 = window.dataDate2 ;
        var params = {
            'startDate': Ext.Date.format(date1, "Y-m-d"),
            'endDate': Ext.Date.format(date2, "Y-m-d"),
            'date1': Ext.Date.format(window.customizedDate1, "Y-m-d"),
            'date2': Ext.Date.format(window.customizedDate2, "Y-m-d")
        } ;
        console.log("LineHeightStore previousData Called") ;
        this.loadNewData(params) ;
    },

    nextData: function(){
        window.dateIndex++ ;
        var date1 = window.dataDate1 ;
        var date2 = window.dataDate2 ;
        var params = {
            'startDate': Ext.Date.format(date1, "Y-m-d"),
            'endDate': Ext.Date.format(date2, "Y-m-d"),
            'date1': Ext.Date.format(window.customizedDate1, "Y-m-d"),
            'date2': Ext.Date.format(window.customizedDate2, "Y-m-d")
        } ;
        console.log("LineHeightStore nextData Called") ;
        this.loadNewData(params) ;
    }
});