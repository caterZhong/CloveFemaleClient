Ext.define("cfa.store.medicine.medDetailStore",{
	extend: "Ext.data.Store",
	
	requires: ['cfa.model.medicine.medDetailModel','Ext.data.proxy.JsonP'],
	
	config: {
		data:[],
		model:'cfa.model.medicine.medDetailModel',
		proxy:{
	        type: 'jsonp',
	        url : domain + 'MedicineTestAction/findMedyMedBox'
	   },
	   callbackkey: 'callback'
	},
	
	reload: function(medBoxId){
        this.load({
        	params:{
        		medBoxId:medBoxId
        	},
        	callback: function(records,operation,success){
        	}
        }) ;
    }
});