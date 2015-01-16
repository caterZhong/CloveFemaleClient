Ext.define("cfa.model.medicine.medDetailModel",{
	extend: "Ext.data.Model",
	
	config: {
		fields: [
			{name: 'name', type: 'string'},
			{name: 'type', type: 'string'},
			{name: 'deadline', type: 'string'},
			{name: 'code', type: 'string'},
			{name: 'photoAddr', type: 'string'},
			{name: 'function', type: 'string'},
			{name: 'applicabbility', type: 'string'},
			{name: 'medicineBoxId', type: 'string'}
		]
	}
});
