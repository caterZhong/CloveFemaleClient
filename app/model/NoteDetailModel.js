Ext.define('cfa.model.NoteDetailModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
         	{name:'id',type:'string'},
         	{name:'title',type:'string'},
            {name:'content',type:'string'},
         	{name:'createDate',type:'string'},
            {name:'recentMFDate',type:'string'},
         	{name:'noteBookId',type:'string'},
        ]
    }
});