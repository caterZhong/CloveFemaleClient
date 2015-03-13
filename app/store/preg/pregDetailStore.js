Ext.define("cfa.store.preg.pregDetailStore",{
	extend: "Ext.data.Store",
	
	requires: ['cfa.model.preg.pregDetailModel','Ext.data.proxy.JsonP'],
	
	config: {
		data:[],
		model:'cfa.model.preg.pregDetailModel',
		proxy:{
	        type: 'jsonp',
	        url : domain + 'FgPregAction/showPregMsg'
	   },
	   callbackkey: 'callback'
	},
	
	reload: function(date){
        this.load({
        	params:{
        		date:date
        	},
        	callback: function(records,operation,success){
        		
        	}
        }) ;
    }
});