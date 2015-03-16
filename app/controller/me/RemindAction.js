var muteStartTime = "null";
var muteEndTime = "null";
Ext.define('cfa.controller.me.RemindAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*生理记录提醒toggle*/
			toggle_phy:'togglefield[name="toggle_phy"]',
			/*药品到期提醒toggle*/
			toggle_med:'togglefield[name="toggle_med"]',
			/*疫苗接种提醒toggle*/
			toggle_vac:'togglefield[name="toggle_vac"]',
			/*提醒声音toggle*/
			toggle_voice:'togglefield[name="toggle_voice"]',
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
			/*生理记录提醒toggle*/
			toggle_phy:{
				change:'changePhy',
			},
			/*药品到期提醒toggle*/
			toggle_med:{
				change:'changeMed',
			},
			/*疫苗接种提醒toggle*/
			toggle_vac:{
				change:'changeVac',
			},
			/*提醒声音toggle*/
			toggle_voice:{
				change:'changeVoice',
			},
			/*静音时间段按钮*/
			muteBtn:{
				tap:'showMuteTimeView',//显示静音设置页面
			},
            remindview:{
                initialize:'showSettingsData',
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

    /*查询缓存中的设置数据，并在页面上更新相应的数据*/
    showSettingsData:function(){
        var phy = localStorage.rm_phy; //生理记录提醒
        var med = localStorage.rm_med; //药品到期提醒
        var vac = localStorage.rm_vac; //疫苗接种提醒
        var voice = localStorage.rm_voice; //提醒声音
        var startTime = localStorage.muteTimeS;//静音开始时间
        var endTime = localStorage.muteTimeE;//静音开始时间
        if(typeof(phy) != "undefined"){
            Ext.getCmp("toggle_phy").setValue(phy);
        }
        if(typeof(med) != "undefined"){
            Ext.getCmp("toggle_med").setValue(med);
        }
        if(typeof(vac) != "undefined"){
            Ext.getCmp("toggle_vac").setValue(vac);
        }
        if(typeof(voice) != "undefined"){
            Ext.getCmp("toggle_voice").setValue(voice);
        }
        if(typeof(startTime) != "undefined" && typeof(endTime) != "undefined"){
           Ext.get("muteBtn").dom.innerHTML = muteStartTime + "-" + muteEndTime;
        }
        
        // var tipsPanel = Ext.getCmp("tipsBox_rm");
        // Ext.data.JsonP.request({
        //     url:domain+'SettingOp/selectSettings',
        //     callbackKey:'callback',
        //     callback:'callback',
        //     params:{
        //         'userId':localStorage.userId,
        //     },
        //     callback:function(success,result){  
        //         if(success&&result.result==0){
        //             Ext.getCmp("toggle_phy").setValue(result.data.physiology);
        //             Ext.getCmp("toggle_med").setValue(result.data.medicine);
        //             Ext.getCmp("toggle_vac").setValue(result.data.vaccine);
        //             Ext.getCmp("toggle_voice").setValue(result.data.voice);
        //             muteStartTime= result.data.remindStart.getHours() + ":" + result.data.remindStart.getMinutes();
        //             muteEndTime =  result.data.remindEnd.getHours() + ":" + result.data.remindEnd.getMinutes();
        //             Ext.get("muteBtn").dom.innerHTML = muteStartTime + "-" + muteEndTime;
        //         }else{
        //             //操作失败(为判断原因1、数据库操作出错 2、网络连接问题 3、没有找到此用户设置)
        //             tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
        //         }  
                
        //     }

        // });
    },

    /*显示静音设置页面-----静音时间段按钮tap事件*/
    showMuteTimeView:function(){
        // var toggle = Ext.query("{cls=toggled}");//toggled
        // console.log(toggle.getValue());
        // var i = localStorage.wer;
        // console.log(i);
        // if("null"=muteStartTime){
        //     var tipsPanel = Ext.getCmp("tipsBox_rm");
        //     tipsPanel.showTipsModal("",2000,"tipsBox_rm");
        // }
    	this.redirectTo('mute');
    },

    /*改变生理记录提醒状态-----toggle_phy的change事件*/
    changePhy:function(toggle, newValue, oldValue, eOpts){
        // console.log("12");
    	var tipsPanel = Ext.getCmp("tipsBox_rm");
    	Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyPhy',
            callbackKey:'callback',
            callback:'callback',
            params:{
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    // Ext.getCmp();
                    localStorage.rm_phy = newValue;
    				tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                }  
                
            }

        });
    },

    /*改变药品到期提醒状态-----toggle_med的change事件*/
    changeMed:function(toggle, newValue, oldValue, eOpts){
    	var tipsPanel = Ext.getCmp("tipsBox_rm");
    	Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyMed',
            callbackKey:'callback',
            callback:'callback',
            params:{
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    localStorage.rm_med = newValue;
    				tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                }  
                
            }

        });
    },

    /*改变疫苗接种提醒状态-----toggle_vac的change事件*/
    changeVac:function(toggle, newValue, oldValue, eOpts){
    	var tipsPanel = Ext.getCmp("tipsBox_rm");
    	Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyVac',
            callbackKey:'callback',
            callback:'callback',
            params:{
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    localStorage.rm_vac = newValue;
    				tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                }  
                
            }

        });
    },

    /*改变提醒声音开启状态-----toggle_voice的change事件*/
    changeVoice:function(toggle, newValue, oldValue, eOpts){
    	var tipsPanel = Ext.getCmp("tipsBox_rm");
    	Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyVoice',
            callbackKey:'callback',
            callback:'callback',
            params:{ 
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    localStorage.rm_voice = newValue;
    				tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                }  
                
            }

        });
    },

    /*显示tips*/
    showTips:function(tips,time){
    	var tipsPanel = Ext.getCmp("tipsBox_rm");
    	tipsPanel.showTipsModal(tips,time,"tipsBox_rm");
    },

});