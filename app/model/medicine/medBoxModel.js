Ext.define("cfa.model.medicine.medBoxModel",{
	extend: "Ext.data.Model",
	
	config: {
		fields: [
			{name: 'name', type: 'string'},
			{name: 'createDate', type: 'date'},
			{name: 'mark', type: 'string'},
			{name: 'userId', type: 'string'},
			{name: 'id', type: 'string'}
		]
	}
});
