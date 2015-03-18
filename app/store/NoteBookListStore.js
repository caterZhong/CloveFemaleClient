Ext.define('cfa.store.NoteBookListStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.SimpleNoteBookModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	config:{
		model:'cfa.model.SimpleNoteBookModel',
		data:[],
	},
	
});