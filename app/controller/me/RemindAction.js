Ext.define('cfa.controller.me.RemindAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*静音时间段按钮*/
			muteBtn:'button[name="muteBtn"]',
			/*引用提醒页面*/
			remindview:{
                selector: 'remindview',
                xtype: "remindview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*静音时间段按钮*/
			muteBtn:{
				tap:'showMuteTimeView',//显示静音设置页面
			}
		},
		routes:{
			'remind':'showRemindview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示提醒页面*/
	showRemindview:function(){
    	Ext.Viewport.setActiveItem(this.getRemindview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*显示静音设置页面-----静音时间段按钮tap事件*/
    showMuteTimeView:function(){
    	this.redirectTo('mute');
    }

});