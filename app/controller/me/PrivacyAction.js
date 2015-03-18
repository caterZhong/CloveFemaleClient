Ext.define('cfa.controller.me.PrivacyAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*toggle进入软件密码保护*/
			toggle_swPwd:'togglefield[name="toggle_swPwd"]',
			/*toggle开通笔记密码保护*/
			toggle_notePwd:'togglefield[name="toggle_notePwd"]',
			/*引用隐私页面*/
			privacyview:{
                selector: 'privacyview',
                xtype: "privacyview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*toggle进入软件密码保护*/
			toggle_swPwd:{
				change:"changeIsOpenSwPwd",
				// show:"initToggle_swPwd",
			},
			/*toggle开通笔记密码保护*/
			toggle_notePwd:{
				change:"changeIsOpenNotePwd",
				// show:"initToggle_notePwd",
			}
		},
		routes:{
			'privacy':'showPrivacyview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示隐私页面*/
	showPrivacyview:function(){
    	Ext.Viewport.setActiveItem(this.getPrivacyview());

    	var isOpenSwPwd = localStorage.isOpenSwPwd;//获取isOpenSwPwd的最新状态
    	if(typeof(isOpenSwPwd)!="undefined"){
    		Ext.getCmp("toggle_swPwd").setValue(isOpenSwPwd);
    	}

    	var isOpenNotePwd = localStorage.isOpenNotePwd;//获取isOpenNotePwd的最新状态
    	if(typeof(isOpenNotePwd)!="undefined"){
    		Ext.getCmp("toggle_notePwd").setValue(isOpenNotePwd);
    	}
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*改变软件保护密码是否打开的状态*/
    changeIsOpenSwPwd:function(toggle, newValue, oldValue, eOpts ){
    	console.log(newValue);
    	localStorage.isOpenSwPwd = newValue;
    },

    /*改变笔记保护密码是否打开的状态*/
    changeIsOpenNotePwd:function(toggle, newValue, oldValue, eOpts ){
    	console.log(newValue);
    	localStorage.isOpenNotePwd = newValue;
    },

    /*初始化toggle_swPwd的状态*/
    initToggle_swPwd:function(){
    	console.log("show");
    	var isOpenSwPwd = localStorage.isOpenSwPwd;
    	if(typeof(isOpenSwPwd)!="undefined"){
    		Ext.getCmp("toggle_swPwd").setValue(isOpenSwPwd);
    	}
    },

    /*初始化toggle_swPwd的状态*/
    initToggle_notePwd:function(){
		var isOpenNotePwd = localStorage.isOpenNotePwd;
    	if(typeof(isOpenNotePwd)!="undefined"){
    		Ext.getCmp("toggle_notePwd").setValue(isOpenNotePwd);
    	}
    },

    
});