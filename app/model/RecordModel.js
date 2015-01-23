Ext.define('cfa.model.RecordModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
         	{name:'value',type:'string'},
        ]
    },

    saveRecord: function(form, params){
    	Ext.data.JsonP.request({
            url 		: form.getUrl(),
            method 		: 'POST',
            type 		: 'jsonp',    
            scope 		: this,    
            callbackkey : 'callback',
            params 		: params,
            success: function(result) {
                // console.log(result);
                if(result.data == "success"){
                	form.getParent().hide() ;
                	form.reset() ;
                	Ext.Msg.alert("OK", "记录已保存") ;
                }else{
                	Ext.Msg.alert("ERROR", "保存失败") ;
                }
            }
        });
    }
});