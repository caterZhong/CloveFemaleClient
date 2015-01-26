Ext.define('cfa.store.NoteSearchDetailStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	model:'cfa.model.NoteModel',
	autoLoad:true,

	sorters:Ext.create('Ext.util.Sorter',{
				property:'date',
				direction:'desc',
			}),

});