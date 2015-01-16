Ext.define("cfa.store.medicine.medBoxStore",{
	extend: "Ext.data.Store",
	
	requires: ['cfa.model.medicine.medBoxModel','Ext.data.proxy.JsonP'],
	
	config: {
		data:[],
		model:'cfa.model.medicine.medBoxModel',
		proxy:{
	        type: 'jsonp',
	        url : domain + 'MedicineTestAction/findAllMedBox'
	   },
	   callbackkey: 'callback'
	},
	
	reload: function(){
        this.load({
        	params:{},
        	callback: function(records,operation,success){
        		
        	}
        }) ;
    }
});