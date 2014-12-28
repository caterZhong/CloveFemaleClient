Ext.define('cfa.model.NoteGroupModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'groupName', type: 'string'},
         	{name: 'shortName',  type: 'string'},
        ]
    }
});