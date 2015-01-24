Ext.define('cfa.model.NoteModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
         	{name:'id',type:'string'},
         	{name:'title',type:'string'},
            {name:'content',type:'string'},
         	{name:'year',type:'string'},
            {name:'month',type:'string'},
            {name:'day',type:'string'},
            {name:'recentMFDate',type:'date'},
         	{name:'noteBookId',type:'string'},
            {name:'noteBookName',type:'string'},
        ]
    }
});