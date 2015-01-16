Ext.define('cfa.store.NoteStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	model:'cfa.model.NoteModel',
	// data:[],
	// data:[
	// 	{id:0,title : 'MVC结构',date:'2014-12-12',content:'从存储数据觉的逻辑角度上来说,一个数据仓库有点类似一个数据一览表，而一个记录有点',notebook:'菜谱'},
	// 	{id:1,title : '代理与阅读器',date:'2013-12-11',content:'表单面板组件Ext.form.Panel,别名Ext.form.FormPanel,xtype值为formpanel,表单',notebook:'孩子学习'},
	// 	{id:2,title : '数据仓库',date:'2014-12-1',content:'从存储数据觉的逻辑角度上来说,一个数据仓库有点类似一个数据一览表，而一个记录有点',notebook:'助孕'},
	// 	{id:3,title : 'Xtype',date:'2012-11-11',content:'表单面板组件Ext.form.Panel,别名Ext.form.FormPanel,xtype值为formpanel,表单',notebook:'孩子学习'},
	// 	{id:4,title : '表单域',date:'2012-11-11',content:'从存储数据觉的逻辑角度上来说,一个数据仓库有点类似一个数据一览表，而一个记录有点',notebook:'菜谱'},
	// ],
	autoLoad:true,
	// property:'date',
	// direction:'desc',
	// index : 0,
	sorters:Ext.create('Ext.util.Sorter',{
				property:'date',
				direction:'desc',
			}),
	proxy:{
		type:'jsonp',
		url:'http://localhost:9000/RandomNote/findNoteByUserId',
		extraParams:{
			'userId':'199762408FBC4D6C9455BB332D5FC877',
		},
		// reader:{
		// 	type:'json',
		// },
	// 	callbackKey:'callback',
		
		listeners:{
			exception:function(proxy,response){
				alert("获取数据失败，请检查网络连接");
			}
		}
	},
	// pageSize:5,
	// scope:this,
	listeners:{
		load:function(store,records,successful,operation){
			//读取数据失败
		}
	},
	// grouper:function(record){
	// 			return record.get('notebook');
	// 		}, 
});