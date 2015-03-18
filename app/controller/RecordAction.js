Ext.define('cfa.controller.RecordAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			recordMenu: "#recordMenu", //记录控功能菜单
			tabpanel:"#tabpanel1",
			recordview:{
        		//引用记录控页面
                selector: 'recordview',
                xtype: "recordview",
                autoCreate: true
        	}
		},
		control: {
			recordMenu: {
				itemsingletap: "nextMenuView"//进入下一级菜单
			}
		},
		routes:{
			'record':'showRecordview'
		}
	},

	//随手记页面进入控制，当设置了密码保护的时候，先进入手势密码界面，在输入正确的情况下进入随手记页面
    randomNoteC:function(){
    	var isOpenNotePwd = localStorage.isOpenNotePwd;//获取isOpenSwPwd的最新状态
    	// this.softwareController();//进入控制器
    	if(typeof(isOpenNotePwd)!="undefined" && isOpenNotePwd == 1){
    		localStorage.nextPage = "notebook";
    		window.dialLockType = "nbLock" ;
    		this.redirectTo("lock");
    	}else{
    		this.redirectTo("notebook");
    	} 
    	
    },

	//进入记录控点击不同菜单进入下一级菜单
	nextMenuView: function(dataview,index,item,record,e){
		switch(index){
			case 0: this.redirectTo('pregnant');break;
			case 1: this.redirectTo('kid'); break;
			case 2: this.randomNoteC(); break;//this.redirectTo('notebook'); break;
			case 3: this.redirectTo('medicine'); break;
			case 4: this.redirectTo('chart');break;
			case 5: 
				var locker = new cfa.view.lock.DialLocker() ;

				/**
		        是否设置为密码设定模式，默认不是
		        如果是，则密码器的行为表现为要求用户输入两次相同的密码
		        密码器检验到两次两次密码相同才调用successCallback方法
		        */
				locker.setToSetup(false) ;

				//显示返回按钮
				locker.hideReturnBtnOrNot(false) ;

				locker.setInfo("测试九宫格解锁") ;

				//设置获取密码之后的响应方法
        		//方法的参数是密码字符串
				locker.setSuccessCallback(function(passwd){
					// Ext.Msg.alert("Customized callback(" + passwd + ")") ;
					console.log("Customized callback(" + passwd + ")") ;
					if(passwd != "01258"){
						//向用户显示警告
				        //密码路径会变成红色
				        //同时屏幕上会增加“重试”、“取消”两个按钮
						locker.warn("密码不正确，请重试") ;
					}else{
						//退出密码器
						locker.dispose() ;
					}
				}) ;

				//可选。设置点击“取消”按钮时的动作
				//默认是退出密码器，设置之后会覆盖默认的方法
				locker.setCancelCallback(function(){
					console.log("Customized cancelCallback") ;
				}) ;

				Ext.Viewport.animateActiveItem(locker, {
					type:'cover',
					direction:'right'
				});
				break;
			default:Ext.Msg.alert("Tips","功能尚未开发");break;
		};
	},
	//显示记录控页面
	showRecordview:function(){
		console.log("record");
    	Ext.Viewport.setActiveItem(this.getRecordview());
    },

    //测试
    testest:function(){
    	alert("asdf");
    }

    

});