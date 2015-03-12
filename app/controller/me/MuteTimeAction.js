Ext.define('cfa.controller.me.MuteTimeAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*返回按钮--返回提醒页面*/
			back_btn:'button[name="backbtn_mute"]',
			/*开始时间按钮*/
			startTimeBtn:'button[name="startTimeBtn"]',
			/*结束时间按钮*/
			endTimeBtn:'button[name="endTimeBtn"]',
			/*picker确定按钮*/
			doneBtn:'button[name="doneBtn"]',
			/*picker取消按钮*/
			cancelBtn:'button[name="cancelBtn"]',
			/*pickerBox*/
			pickerBox:'panel[name="pickerBox"]',
			/*引用静音设置页面*/
			mutetimeview:{
                selector: 'mutetimeview',
                xtype: "mutetimeview",
                autoCreate: true
        	},
   	
		},
		control: {
			/*返回按钮--返回提醒页面*/
			back_btn:{
				tap:'backToRemindView',
			},
			/*开始时间按钮*/
			startTimeBtn:{
				tap:'showStartTimePicker',
			},
			/*结束时间按钮*/
			endTimeBtn:{
				tap:'showEndTimePicker',
			},
			/*picker确定按钮*/
			doneBtn:{
				tap:'setTime',
			},
			/*picker取消按钮*/
			cancelBtn:{
				tap:'hideTimePicker',
			},
			/*pickerBox*/
			pickerBox:{
				// initialize:'setTimeNow',
				show:'setTimeNow',
			},
		},
		routes:{
			'mute':'showMuteTimeview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示静音设置页面*/
	showMuteTimeview:function(){
    	Ext.Viewport.setActiveItem(this.getMutetimeview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

	/*返回提醒页面----返回按钮tap事件*/
    backToRemindView:function(){
    	this.redirectTo('remind');
    	Ext.Viewport.remove(this.getMutetimeview());
    },

    /*显示timePicker modal同时设置timeselection为start*/
    showStartTimePicker:function(){
    	this.getMutetimeview().timeselection = 'start';
    	this.showTimePicker();
    },

     /*显示timePicker modal同时设置timeselection为end*/
     showEndTimePicker:function(){
    	this.getMutetimeview().timeselection = 'end';
    	this.showTimePicker();
    },

    /*显示PickerBox*/
    showTimePicker:function(){
    	Ext.getCmp("pickerBox").show();
    },

    /*隐藏PickerBox*/
    hideTimePicker:function(){
    	Ext.getCmp("pickerBox").hide();
    },

    /*设置时间*/
    setTime:function(){
    	var timePicker = Ext.getCmp("timePicker");
    	value = timePicker.getValues();//获取到timepicker的vlaue，包括时(value.hour)和分(value.minute)两个字段
    	var timeselection = this.getMutetimeview().timeselection;
    	var time;
        var newTime = new Date();
        newTime.setHours(value.hour);
        newTime.setMinutes(value.minute);
        console.log(newTime);
        var result = false;
    	if("start" == timeselection){//设置开始时间
    		time = Ext.get("startTime");
            result = this.modifyStartTime(newTime);//修改数据库提醒开始时间
    		
    	}else{//设置结束时间
    		time = Ext.get("endTime");
            var tipsPanel = Ext.getCmp("tipsBox_mutetime");
            var startTimeString = Ext.get("startTime").dom.innerHTML.split(':');
            var startHours = startTimeString[0];
            var startMinute = startTimeString[1];
            var startTime = new Date();
            startTime.setHours(startHours);
            startTime.setMinutes(startMinute);
            if(newTime>startTime){
                result = this.modifyEndTime(newTime);//修改数据库提醒结束时间
            }else{
                tipsPanel.showTipsModal("结束时间必须大于开始时间",2000,"tipsBox_mutetime");
                result = false;
            }
    	}
    	//在这里修改数据库数据
    	if(result != false && time!=null){
    		time.dom.innerHTML = value.hour + ":" + value.minute;
            Ext.getCmp("pickerBox").hide();
    	}
    	
    },

    /*设置picker的时间为当前时间*/
    setTimeNow:function(){
    	var timePicker = Ext.getCmp("timePicker");
    	var time = new Date();
    	var hour = time.getHours(); 
    	var minute = time.getMinutes();
    	timePicker.setValue({'hour':hour,'minute':minute});
    },

    /*修改数据库开始时间*/
    modifyStartTime:function(remindStart){
        Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyRemindS',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'userId':localStorage.userId,
                'remindStart':remindStart, 
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                    if("修改成功" == result.data){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                    return false;
                }  
                
            }

        });
    },

    /*修改数据库结束时间*/
    modifyEndTime:function(remindEnd){
        Ext.data.JsonP.request({
            url:domain+'SettingOp/modifyRemindE',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'userId':localStorage.userId,
                'remindEnd':remindEnd, 
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    tipsPanel.showTipsModal(result.data,2000,"tipsBox_rm");
                    if("修改成功" == result.data){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    //操作失败
                    tipsPanel.showTipsModal("操作失败",2000,"tipsBox_rm");
                    return false;
                }  
                
            }

        });
    },

});