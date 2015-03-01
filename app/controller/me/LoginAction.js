Ext.define('cfa.controller.me.LoginAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*登录按钮*/
			loginBtn:'button[name="loginBtn"]',
			/*引用登录页面*/
			loginview:{
                selector: 'loginview',
                xtype: "loginview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*登录按钮*/
			loginBtn:{
				tap:'loginSystem',
			},
		},
		routes:{
			'login':'showLoginview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示登录页面*/
	showLoginview:function(){
    	Ext.Viewport.setActiveItem(this.getLoginview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*登录-------登录按钮的tap事件--未完成*/
    loginSystem:function(){
    	var accountNum = Ext.getCmp("accountNumField").getValue();
    	var password = Ext.getCmp("passwordfield").getValue();
    	console.log(accountNum + "---" + password);
    	Ext.data.JsonP.request({
	    		url:domain+'UserAction/login',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'accountNum':accountNum,
					'password':password,
				},
	    		callback:function(success,result){
	    			if(success && result.result == 0){//登录成功
						localStorage.userId = result.data.id;
						alert(localStorage.userId);	
	    			}else{
	    				alert(result.data);
	    			}
	    		}
			});
    },

});