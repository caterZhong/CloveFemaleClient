Ext.define('cfa.store.NoteGroupStore', {
	extend: 'Ext.data.Store',
	requires:['cfa.model.NoteGroupModel'],
	model:'cfa.model.NoteGroupModel',
	data:[
		{groupName:'默认笔记本',shortName:'默'},
		{groupName:'菜谱',shortName:'菜'},
		{groupName:'孩子学习',shortName:'孩'},
		{groupName:'新建笔记本',shortName:'新'},
		// {textName:'测试',shortName:'测',id:'4'}
	]
});