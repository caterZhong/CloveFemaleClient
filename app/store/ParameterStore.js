Ext.define('cfa.store.ParameterStore', {
	extend: 'Ext.data.Store',
	id:'ParameterStore',
	requires:['cfa.model.SimpleNoteBookModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	model:'cfa.model.ParameterModel',
	// data:[{value:'0'},]
});