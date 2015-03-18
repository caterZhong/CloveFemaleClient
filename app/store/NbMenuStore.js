Ext.define('cfa.store.NbMenuStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	config:{
		fields:[
			{name:'id',type:'int'},
			{name:'name',type:'string'}
		],
		autoLoad:true,
		data:[
			{id:0,name:'重命名'},
			{id:1,name:'删除'},
			{id:2,name:'新建笔记本'},
		],
	},
});