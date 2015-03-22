Ext.define('cfa.controller.lock.LockAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			lockview:{
        		//引用手势密码锁页面
                selector: 'dialLocker',
                xtype: "dialLocker",
                autoCreate: true
        	}
		},
		control: {
			lockview:{
				'initialize':'initPwd'
			}
			
		},
		routes:{
			'lock':'showLockview',
			
		}
	},

	//显示记录控页面
	showLockview:function(){
    	Ext.Viewport.setActiveItem(this.getLockview());
    },

    initPwd:function(locker,eOpts){
    	// console.log("LockAction.initPwd");

    	locker.setToSetup(false) ;
    	if(window.dialLockType == "swLock"){
    		locker.hideReturnBtnOrNot(true) ;
    		locker.setInfo("请绘制图案以解锁软件") ;
    	}else{
    		locker.hideReturnBtnOrNot(false) ;
    		locker.setInfo("请绘制图案以解锁随手记") ;
    	}
		var redirecter = this;
		//设置获取密码之后的响应方法
        //方法的参数是密码字符串
        // console.log("setSuccessCallback start") ;
		locker.setSuccessCallback(function(passwd){
		// Ext.Msg.alert("Customized callback(" + passwd + ")") ;
			// alert(passwd);
			console.log("Customized callback(" + passwd + ")") ;
			if(passwd != "01258"){
			    //向用户显示警告
			    //密码路径会变成红色
			    //同时屏幕上会增加“重试”、“取消”两个按钮
				locker.warn("密码不正确，请重试") ;
			}else{
				// //退出密码器
				locker.reset() ;
				// Ext.getCmp('dial-locker').destroy() ;
				// console.log("destroy...................") ;
				// locker.dispose();
				// isInit = false;
				var nextPage = localStorage.nextPage;
				redirecter.redirectTo(nextPage);
			}
		}) ;
        // console.log("setSuccessCallback end") ;
    },

});