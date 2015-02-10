Ext.define("cfa.store.chart.ChartSubjectsStore", {
	extend: "Ext.data.Store",

    requires: ['Ext.data.proxy.JsonP'],

    config:{
        fields: ['text', 'value'],
        data : [{text: '语文', value: '1'},
                {text: '数学', value: '2'},
                {text: '英语', value: '3'}],
	    proxy: {
	        type: 'jsonp',
	        url : domain + 'FgChartTest/getSubjects',
	        extraParams:{
	        	'userid' : '12345',
	        }
	    }
    },

    getSubjectsAmount: function(){
        return this.getData().length ;
    }
});