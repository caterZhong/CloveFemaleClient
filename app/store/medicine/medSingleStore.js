Ext.define("cfa.store.medicine.medSingleStore",{
	extend: "Ext.data.Store",
	
	requires: ['cfa.model.medicine.medDetailModel','Ext.data.proxy.JsonP'],
	
	config: {
		data:[],
		model:'cfa.model.medicine.medDetailModel',
		proxy:{
	        type: 'jsonp',
	        url : domain + 'MedicineTestAction/findSingleMedicine'
	   },
	   callbackkey: 'callback'
	},
	
	reload: function(){
        this.load({
        	params:{},
        	callback: function(records,operation,success){
        		console.log(records[0].data.name);
        	}
        }) ;
   },
   
   loadNewData: function(medId){
   		this.load({
        	params:{
        		medId:medId
        	},
        	callback: function(records,operation,success){
        	}
        }) ;
   }
});