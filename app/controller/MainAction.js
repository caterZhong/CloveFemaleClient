var isInit = true;
Ext.define('cfa.controller.MainAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			mainview:{
        		//引用主页面
                selector: 'mainview',
                xtype: "mainview",
                autoCreate: true
        	}
		},
		control: {
			mainview:{
				initialize:'initSoftware',
			},
		},
		routes:{
			'main':'showMainview'
		}
	},
	//显示主页面
	showMainview:function(){
		var modular_tabpanel = Ext.getCmp("modular_tabpanel");
		switch(modular){
			case RECORD:modular_tabpanel.setActiveItem(RECORD);break;
			case SPACE:modular_tabpanel.setActiveItem(SPACE);break;
			case WOMEN_CIRCLE:modular_tabpanel.setActiveItem(WOMEN_CIRCLE);break;
			case MINE:modular_tabpanel.setActiveItem(MINE);break;
			default:modular_tabpanel.setActiveItem(RECORD);break;
		};
		modular = RECORD;
	    Ext.Viewport.setActiveItem(this.getMainview());
    },

    initSoftware:function(){
    	
    	var isOpenSwPwd = localStorage.isOpenSwPwd;//获取isOpenSwPwd的最新状态
    	if(typeof(isOpenSwPwd)!="undefined" && isOpenSwPwd == 1){
    		localStorage.nextPage = "main";
    		window.dialLockType = "swLock" ;
    		this.redirectTo("lock");//进入控制器
    	} 

    },
   
});