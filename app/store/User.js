Ext.define("cfa.store.User", {
	extend: "Ext.data.Store",

    requires: ['Ext.data.proxy.JsonP'],

    config:{
        fields: ['id', 'name', 'realName', 'phoneNum', 'email', 'IDcard', 'sex'],
	    proxy: {
	        type: 'jsonp',
	        url : domain + 'CalendarAction/getTestUser',
	        extraParams:{
	        	'userid' : '12345',
	        }
	    }
    },

    getTestUser: function(){
        var pro = this.getProxy() ;
        pro.setUrl(domain+'CalendarAction/getTestUser') ;
        this.load() ;
    },

    refresh: function(){
        console.log("user refreshed!") ;
    }
});