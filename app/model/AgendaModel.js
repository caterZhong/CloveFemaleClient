Ext.define('cfa.model.AgendaModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name:'userId',         type:'string'},
            {name:'id',             type:'string'},
            {name:'title',          type:'string'},
            {name:'description',    type:'string'},
            {name:'startTime',      type:'string'},
            {name:'endTime',        type:'string'},
            {name:'remindMinutes',  type:'string'},
            {name:'type',           type:'string'},
        ]
    },

    create: function(title, description, startTime, endTime, type, remindMinutes, userId, successCallback, failCallback){
    // create: function(successCallback, failCallback){
        // var d = this.getData(false) ;
        var params = {
            "model.userId"          : userId ,
            "model.title"           : title,
            "model.description"     : description ,
            "model.startTime"       : startTime ,
            "model.endTime"         : endTime ,
            "model.remindMinutes"   : remindMinutes ,
            "model.type"            : type
        } ;
    	Ext.data.JsonP.request({
            url 		: domain+"FgAgendasAction/create",
            method 		: 'POST',
            type 		: 'jsonp',
            scope 		: this,    
            callbackkey : 'callback',
            params 		: params,
            success: function(result) {
                window.rresult = result ;
                console.log("result:" + result) ;
                // console.log(result);
                if(result.result == "success"){
                    successCallback(result.id) ;
                }else{
                    failCallback() ;
                }
            }
        });
    },//create : function

    update: function(id, title, description, startTime, endTime, type, remindMinutes, userId, successCallback, failCallback){
        var params = {
            "model.userId"          : userId ,
            "model.title"           : title,
            "model.description"     : description ,
            "model.startTime"       : startTime ,
            "model.endTime"         : endTime ,
            "model.remindMinutes"   : remindMinutes ,
            "model.type"            : type ,
            "model.id"              : id
        } ;
        Ext.data.JsonP.request({
            url         : domain+"FgAgendasAction/update",
            method      : 'POST',
            type        : 'jsonp',
            scope       : this,    
            callbackkey : 'callback',
            params      : params,
            success: function(result) {
                // console.log(result);
                if(result.result == "success"){
                    successCallback(result.id) ;
                }else{
                    failCallback() ;
                }
            }
        });
    },//update : function

    delete: function(id, successCallback, failCallback){
        var params = {
            "id" : id
        } ;
        Ext.data.JsonP.request({
            url         : domain+"FgAgendasAction/delete",
            method      : 'POST',
            type        : 'jsonp',
            scope       : this,    
            callbackkey : 'callback',
            params      : params,
            success: function(result) {
                // console.log(result);
                if(result.result == "success"){
                    successCallback() ;
                }else{
                    failCallback() ;
                }
            }
        });
    }
});