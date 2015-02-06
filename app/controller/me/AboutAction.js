Ext.define('cfa.controller.me.AboutAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
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
                selector: 'aboutview',
                xtype: "aboutview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*评分按钮*/
			scorebtn:{
				tap:'toDo',
			},
			/*版本检测按钮*/
			editionbtn:{
				tap:'toDo',
			},
			/*责任声明按钮*/
			responsibilitybtn:{
				tap:'toDo',
			},
			/*使用协议按钮*/
			agreementbtn:{
				tap:'toDo',
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

    toDo:function(){
    	alert("正在开发中");
    }

});