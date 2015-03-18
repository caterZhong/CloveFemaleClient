Ext.define('cfa.store.NoteStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteModel','Ext.data.reader.Json','Ext.data.proxy.JsonP'],
	config:{
		model:'cfa.model.NoteModel',
		autoLoad:true,
		sorters:Ext.create('Ext.util.Sorter',{
				property:'date',
				direction:'desc',
			}),
	},
	// proxy:{
	// 	type:'jsonp',
	// 	url:domain+'RandomNote/findNoteByUserId',
	// 	extraParams:{
	// 		'userId':'199762408FBC4D6C9455BB332D5FC877',
	// 	},	
	// 	listeners:{
	// 		exception:function(proxy,response){
	// 			alert("获取数据失败，请检查网络连接");
	// 		}
	// 	}
	// },
	// listeners:{
	// 	load:function(store,records,successful,operation){
	// 		//读取数据失败
	// 	}
	// },
});