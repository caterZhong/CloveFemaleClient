Ext.define('cfa.store.SimpleNoteBookStore', {
	extend: 'Ext.data.Store',
	id:'SimpleNoteBookStore',
	requires:['cfa.model.SimpleNoteBookModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	config:{
		model:'cfa.model.SimpleNoteBookModel',
		// autoLoad:true,
		data:[
			{id:'0',name:'全部笔记'},
		],

	},
});