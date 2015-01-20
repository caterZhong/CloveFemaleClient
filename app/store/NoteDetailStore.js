Ext.define('cfa.store.NoteDetailStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteDetailModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	model:'cfa.model.NoteDetailModel',
	autoLoad:true,
	// sorters:Ext.create('Ext.util.Sorter',{
	// 			property:'recentMFDate',
	// 			direction:'desc',
	// 		}),
});