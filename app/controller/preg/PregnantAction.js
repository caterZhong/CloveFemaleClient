Ext.define('cfa.controller.preg.PregnantAction', {
	extend: 'Ext.app.Controller',
	requires: ['Ext.DataView'],
	config: {

		refs: {
			backBtn: "#pregnantBackBtn",
			pregnantMenu: "#pregnantMenu", //助孕记录DataView菜单
			pregnantview: {
				//引用助孕页面
				selector: 'pregnantview',
				xtype: "pregnantview",
				autoCreate: true
			},
			mensesForm: "#mensesForm",
			mensesFormSubmitBtn: "#mensesFormSubmitBtn",
			mensesFormResetBtn: "#mensesFormResetBtn",

			temperatureForm: "#temperatureForm",
			submitTemperatureFormBtn: "#submitTemperatureFormBtn",

			weightForm: "#weightForm",
			submitWeightFormBtn: "#submitWeightFormBtn",

			movementForm: "#movementForm",
			submitMovementFormBtn: "#submitMovementFormBtn",
			/*温度picker*/
			tmpPicker: 'picker[name="tmpPicker"]',
			/*温度pickerbox的cancel按钮*/
			cancelBtn_tmp: 'button[name="cancelBtn_tmp"]',
			/*孕重pickerbox的cancel按钮*/
			cancelBtn_weight: 'button[name="cancelBtn_weight"]',
			/*胎动pickerbox的cancel按钮*/
			cancelBtn_move: 'button[name="cancelBtn_move"]',
			
			
			/* 分析按钮 */
			pregAna: '#pregAna',
			
 			/* 日期控件 */
			dateunit: "#dateunit",
			
			/* 当前日期按钮 */
			crtDate: "button[name='crtDate']",
			
			/* 日期向前按钮 */
			dateBefore: "button[name='datePrev']",
			
			/* 日期向后按钮 */
			dateAfter: "button[name='dateAfter']",
			
			/* 日期按钮 */
			dateBtn: "button[name='dateBtn']",
			
			/* 日期伸缩按钮 */
			dateFlex: "#dateFlex",
			
			/* 月经分析按钮 */
			pregMenseAnaBtn: "#pregMenseAnaBtn"
		},
		control: {
			backBtn: {
				tap: "backToRecordview"
			},
			pregnantMenu: {
				itemsingletap: "showModel"
			},
			mensesFormSubmitBtn: {
				tap: "submitMensesForm"
			},
			mensesFormResetBtn: {
				tap: "resetMensesForm"
			},
			submitTemperatureFormBtn: {
				tap: "submitTemperatureForm"
			},
			submitWeightFormBtn: {
				tap: "submitWeightForm"
			},
			submitMovementFormBtn: {
				tap: "submitMovementForm"
			},
			/*温度picker*/
			tmpPicker: {
				change: 'tmpPickerChange',
			},
			/*温度pickerbox的cancel按钮*/
			cancelBtn_tmp: {
				tap: 'hideTmpModal',
			},
			/*孕重pickerbox的cancel按钮*/
			cancelBtn_weight: {
				tap: 'hideWeightModal',
			},
			/*胎动pickerbox的cancel按钮*/
			cancelBtn_move: {
				tap: 'hideMoveModal',
			},
			
			/* 分析按钮 */
			pregAna:{
				tap: 'pregAnalysis',
			},
			/* 日期向前按钮 */
			dateBefore: {
				tap: function() {
					var dateunit = Ext.getCmp('dateunit');
					var dayBtn = Ext.getCmp('crtDateBtn');
					var dateStr = dayBtn.getText();
					cyear = dateStr.substring(0, 4);
					cmonth = dateStr.substring(5, 7);
					if (cmonth == 1) {
						cyear = cyear - 1;
						cmonth = 12;
					} else {
						cmonth = cmonth - 1;
					}
					dateunit.setMonth(cyear, cmonth);
				}
			},
			/* 日期向后按钮 */
			dateAfter: {
				tap: function() {
					var dateunit = Ext.getCmp('dateunit');
					var dayBtn = Ext.getCmp('crtDateBtn');
					var dateStr = dayBtn.getText();
					cyear = dateStr.substring(0, 4);
					cmonth = dateStr.substring(5, 7);
					if (cmonth == 12) {
						cyear = parseInt(cyear) + parseInt(1);
						cmonth = 1;
					} else {
						cmonth = parseInt(cmonth) + parseInt(1);
					}
					dateunit.setMonth(cyear, cmonth);
				}
			},
			/* 日期伸缩按钮 */
			dateFlex: {
				tap: function(button, e, eOpts) {
					if (button.getText() == "ˆ") {
						Ext.getCmp('dateunit').hideBox();
						button.setText('ˇ');
					} else {
						Ext.getCmp('dateunit').showBox();
						button.setText('ˆ');
					}
				},

			},
			/* 点击日期按钮 */
			dateBtn: {
				tap: 'changeDateEvent'
			},
			/* 月经分析按钮 */
			pregMenseAnaBtn:{
				tap: function(){
					window.location.href = "http://www.baidu.com"
				}
			}
		},
		routes: {
			'pregnant': 'showPregnantview'
		}
	},

	//返回到记录控页面
	backToRecordview: function() {
		this.redirectTo('main');
	},

	//显示助孕记录页面
	showPregnantview: function() {
		Ext.Viewport.setActiveItem(this.getPregnantview());
		/* 初始化日期控件 */
		var monthbox = Ext.getCmp("dateunit");
		monthbox.initMonth();
		/* 加载助孕记录数据 */
		this.loadPregMsg();
	},

	//根据助孕记录菜单点击显示不同输入模板
	showModel: function(dataview, index, item, record, e) {
		if (index == 0) {
			var mensesModal = Ext.getCmp('mensesModal');
			mensesModal.show();
		} else if (index == 1) {
			var temperatureModal = Ext.getCmp('temperatureModal');
			temperatureModal.show();
		} else if (index == 2) {
			var weightModal = Ext.getCmp('weightModal');
			weightModal.show();
		} else {
			var movementModal = Ext.getCmp('movementModal');
			/*vaccineModal.show();*/
			movementModal.show();
		}

	},

	resetMensesForm: function() {
		this.getMensesForm().reset();
	},

	submitMensesForm: function() {
		var form = this.getMensesForm();
		var params = {
			'model.mColor': Ext.getCmp('mcolor').getValue(),
			'model.mMeasure': Ext.getCmp('mmeasure').getValue(),
			'model.mPiece': Ext.getCmp('mpiece').getValue() == 1 ? 'true' : 'false',
			'model.isMcramp': Ext.getCmp('ismcramp').getValue() == 1 ? 'true' : 'false',
			'model.vicidity': Ext.getCmp('vicidity').getValue(),
			'model.userId': localStorage.userId,
			'model.dateStr': cyear + "-" + cmonth + "-" + cday
		};
		Ext.create('cfa.model.RecordModel', {
			name: '',
			type: ''
		}).saveRecord(form, params);
		this.loadPregMsg();
	},

	submitTemperatureForm: function() {
		var tempPicker = Ext.getCmp("tmpPicker");
    	var value = tempPicker.getValues();//获取到timepicker的vlaue，包括时(value.hour)和分(value.minute)两个字段
		var form = this.getTemperatureForm() ;
     	var params = {
     		'model.tValue'	: value.tempInpart+"."+value.tempFloat,
            'model.userId' 	: localStorage.userId,
            'model.dateStr'		: cyear+"-"+cmonth+"-"+cday
     	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
     	this.loadPregMsg();
	},

	submitWeightForm: function() {
		var form = this.getWeightForm();
		/*var wValue = parseFloat(Ext.getCmp('wValue').getValue());
		if (isNaN(wValue) || wValue <= 0) {
			Ext.Msg.alert("ERROR", "请输入为正数的孕重数值");
			return;
		}*/
		var wPicker = Ext.getCmp('weiPicker');
		var value1 = wPicker.innerItems[0].selectedNode.textContent;
		var value2 = wPicker.innerItems[1].selectedNode.textContent;
		var params = {
			'model.wValue': value1+"."+value2,
			'model.userId': localStorage.userId,
			'model.dateStr': cyear + "-" + cmonth + "-" + cday
		};
		Ext.create('cfa.model.RecordModel', {
			name: '',
			type: ''
		}).saveRecord(form, params);
		this.loadPregMsg();
	},

	submitMovementForm: function() {
		var mPicker = Ext.getCmp('mPicker');
		var num = mPicker.innerItems[0].selectedNode.textContent;
		var form = this.getMovementForm();
		var params = {
			'model.num': num,
			'model.userId': localStorage.userId,
			'model.dateStr': cyear + "-" + cmonth + "-" + cday
		};
		Ext.create('cfa.model.RecordModel', {
			name: '',
			type: ''
		}).saveRecord(form, params);
		this.loadPregMsg();
	},

	/*隐藏温度的temperatureModal---cancelBtn_tmp的tap事件*/
	hideTmpModal: function() {
		Ext.getCmp("temperatureModal").hide();
	},

	/*隐藏温度的weightModal---cancelBtn_weight的tap事件*/
	hideWeightModal: function() {
		Ext.getCmp("weightModal").hide();
	},

	/*隐藏胎动的weightModal---cancelBtn_move的tap事件*/
	hideMoveModal: function() {
		Ext.getCmp("movementModal").hide();
	},
	/* 跳转到图表分析页面*/
	pregAnalysis: function() {
		this.redirectTo('chart');
	},
	/* 改变不同日期的事件 */
	changeDateEvent: function(button, e, eOpts) {
		cday = button.getText();
		activeDateBtn.removeCls("activeDayBtn");
		activeDateBtn = button;
		button.addCls("activeDayBtn");
		this.loadPregMsg();
	},
	/* 加载助孕记录信息 */
	loadPregMsg: function() {
		/* 加载助孕记录信息 */
		/*Ext.getStore("pregDetailStore").reload(new Date(2015,3,13));*/
		Ext.data.JsonP.request({
			url: domain + 'FgPregAction/showPregMsg',
			params: {
				dateStr: cyear + "-" + cmonth + "-" + cday
			},
			success: function(result) {
				if (result.result == 0) {
					//输出月经信息
					console.log(result.data);
					if (typeof(result.data.mense) == "undefined")
						document.getElementById('pregItem-0').innerHTML = "...";
					else {
						document.getElementById('pregItem-0').innerHTML = result.data.mense.mColor + "," + result.data.mense.mMeasure + "," + result.data.mense.vicidity;
					}
					if (typeof(result.data.temp) == "undefined")
						document.getElementById('pregItem-1').innerHTML = "...";
					else{
						document.getElementById('pregItem-1').innerHTML = result.data.temp.tValue+" ℃";
					}
					if (typeof(result.data.weight) == "undefined")
						document.getElementById('pregItem-2').innerHTML = "...";
					else{
						document.getElementById('pregItem-2').innerHTML = result.data.weight.wValue+" 克";
					}
					if (typeof(result.data.condition) == "undefined")
						document.getElementById('pregItem-3').innerHTML = "...";
					else{
						document.getElementById('pregItem-3').innerHTML = result.data.condition.num+" 次";
					}
				} else {
					Ext.Msg.alert("添加失败!");
					console.log(result);
				}
			}
		});
	}
});