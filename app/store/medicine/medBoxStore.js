Ext.define("cfa.store.medicine.medBoxStore",{
	extend: "Ext.data.Store",
	
	requires: ['cfa.model.medicine.medBoxModel','Ext.data.proxy.JsonP'],
	
	config: {
		data:[],
		model:'cfa.model.medicine.medBoxModel',
		proxy:{
	        type: 'jsonp',
	        url : domain + 'MedicineTestAction/findAllMedBoxByUser'
	   },
	   callbackkey: 'callback'
	},
	
	reload: function(userId){
        this.load({
        	params:{
        		userId:userId
        	},
        	callback: function(records,operation,success){
        		
        	}
        }) ;
    }
});