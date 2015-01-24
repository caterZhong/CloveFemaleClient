Ext.define('cfa.store.SimpleNoteBookStore', {
	extend: 'Ext.data.Store',
	id:'SimpleNoteBookStore',
	requires:['cfa.model.SimpleNoteBookModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	model:'cfa.model.SimpleNoteBookModel',
	// autoLoad:true,
	data:[
		{id:'0',name:'全部笔记'},
	],
	// listeners:{
	// 	load:function(store,records,successful,operation){
	// 		//读取数据失败
	// 	}
	// },
});