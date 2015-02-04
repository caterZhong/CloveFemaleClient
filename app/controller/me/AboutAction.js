Ext.define('cfa.controller.me.AboutAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*返回按钮----返回到设置页面*/
			back_btn:'button[name="back_about"]',
			/*评分按钮*/
			scorebtn:'button[name="scorebtn"]',
			/*版本检测按钮*/
			editionbtn:'button[name="editionbtn"]',
			/*责任声明按钮*/
			responsibilitybtn:'button[name="responsibilitybtn"]',
			/*使用协议按钮*/
			agreementbtn:'button[name="agreementbtn"]',
			/*引用关于软件页面*/
			aboutview:{
        		//引用个人信息页面
                selector: 'aboutview',
                xtype: "aboutview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*返回按钮----返回到设置页面*/
			back_btn:{
				tap:'backToSetting',
			},
			/*评分按钮*/
			scorebtn:{
				tap:'',
			},
			/*版本检测按钮*/
			editionbtn:{
				tap:'',
			},
			/*责任声明按钮*/
			responsibilitybtn:{
				tap:'',
			},
			/*使用协议按钮*/
			agreementbtn:{
				tap:'',
			}
		},
		routes:{
			'about':'showAboutview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示关于软件页面*/
	showAboutview:function(){
    	Ext.Viewport.setActiveItem(this.getAboutview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*返回到设置页面------返回按钮tap事件*/
    backToSetting:function(){
    	this.redirectTo("setting");

    }	

});