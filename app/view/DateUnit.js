/* 当前选中的日期 */
var cyear = null;
var cmonth = null;
var cday = null;
Ext.define("cfa.view.DateUnit", {

	extend: "Ext.Container",
	requires: ["Ext.TabPanel", "Ext.Panel", ],

	xtype: "dateunit",
	config: {
		xtype: 'panel',
		name: 'monthBox',
		id: 'monthBox',
		width: '100%',
		height: 295,
		normalHeight:295,
		scrollable: 'horizontal',
		cls: 'monthbox',
		items: [{
			xtype: 'container',
			align: 'center',
			docked: 'top',
			layout: 'hbox',
			items: [{
				xtype: 'button',
				iconCls: 'arrow_left',
				docked: 'left',
				name: 'datePrev',
				ui: 'plain'
			}, {
				xtype: 'button',
				iconCls: 'arrow_right',
				docked: 'right',
				name: 'dateAfter',
				ui: 'plain'
			},{
				xtype:'button',
				ui:'plain',
				centered : 'Boolean',
				id:'crtDateBtn',
				text: '2015年3月',
				align:'center',
				name: 'crtDate',
			}]
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: 'hbox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 30
			},
			items: [{
				xtype: 'button',
				text: '日',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '一',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '二',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '三',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '四',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '五',
				ui: 'plain'
			}, {
				xtype: 'button',
				text: '六',
				ui: 'plain'
			}]
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			id: 'firstWeek',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				id: "firstDay",
				items: [{
					xtype: 'button',
					text: '1',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_0",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '2',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_1",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '3',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_2",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '4',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_3",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '5',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_4",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '6',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_5",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '7',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_6",
					name:'dateBtn'
				}]
			}],
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				items: [{
					xtype: 'button',
					text: '8',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_7",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '9',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_8",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '10',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_9",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '11',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_10",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '12',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_11",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '13',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_12",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '14',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_13",
					name:'dateBtn'
				}]
			}],
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				items: [{
					xtype: 'button',
					text: '15',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_14",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '16',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_15",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '17',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_16",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '18',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_17",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '19',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_18",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '20',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_19",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '21',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_20",
					name:'dateBtn'
				}]
			}],
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				items: [{
					xtype: 'button',
					text: '22',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_21",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '23',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_22",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '24',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_23",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '25',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_24",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '26',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_25",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '27',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_26",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					text: '28',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_27",
					name:'dateBtn'
				}]
			}],
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				items: [{
					xtype: 'button',
					text: '29',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_28",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_29",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_30",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_31",
					name:'dateBtn'
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_32",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_33",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_34",
				}]
			}],
		}, {
			xtype: 'panel',
			width: '100%',
			minWidth: 260,
			layout: "hbox",
			cls: 'weekBox',
			defaults: {
				xtype: 'panel',
				width: '14%',
				height: 40,
				cls: 'datebox',
			},
			items: [{
				items: [{
					xtype: 'button',
					// text:'',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_35",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_36",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_37",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_38",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_39",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_40",
				}]
			}, {
				items: [{
					xtype: 'button',
					ui: 'plain',
					width: 40,
					height: 40,
					cls: 'dateBtn',
					id: "dayBtn_41",
				}]
			}],
		},{
			xtype: 'container',
			align: 'center',
			docked: 'bottom',
			layout: 'hbox',
			items: [{
				xtype: 'button',
				docked: 'bottom',
				name: 'dateFlex',
				ui: 'plain',
				text:'ˆ',
				id:'dateFlex'
			}]
		}],
		
	}, //结束config

	//初始化当前月份
	initMonth: function() {
		if(activeDateBtn)
			activeDateBtn.removeCls("activeDayBtn");
		var today = new Date();
		this.setMonth(today.getFullYear(), today.getMonth() + 1);
		var todayBtn = Ext.getCmp("dayBtn_" + (today.getDate() - 1));
		todayBtn.addCls("activeDayBtn");
		activeDateBtn = todayBtn;
		/* 获取当前日期 */
		cyear = today.getFullYear();
		cmonth = today.getMonth()+1;
		cday = today.getDate();
	},
	
	hideBox: function() {
		this.setHeight(180);
	},
    
    showBox: function() {
    	this.setHeight(this.normalHeight);
    },
    
	//把日历控件设置为具体某个月的时间
	setMonth: function(Year, Month) {
		var firstDay = new Date(Year, Month - 1, 1)
		var day = firstDay.getDay();
		var dayCount = this.DayNumOfMonth(Year, Month);
		if (day + dayCount > 35) {
			this.setHeight(330);
			this.normalHeight = 330;
		}else{
			this.setHeight(295);
			this.normalHeight = 295;
		}
		for (var i = 0; i < day; i++) {
			var dayBtn = Ext.getCmp("dayBtn_" + i);
			dayBtn.setText("");
		};
		for (var i = 0; i < dayCount; i++) {
			var dayBtn = Ext.getCmp("dayBtn_" + (day + i));
			dayBtn.setText(i + 1);
		};
		for (var i = dayCount + day; i < 35; i++) {
			var dayBtn = Ext.getCmp("dayBtn_" + i);
			dayBtn.setText("");
		};
		/* 添加顶部年月显示 */
		var dtBtn = Ext.getCmp('crtDateBtn');
		if(Month>=10)
			dtBtn.setText(Year+"年"+Month+"月");
		else
			dtBtn.setText(Year+"年 "+Month+"月");
	},

	//获取具体年月的总天数，格式：eg：2015,3
	DayNumOfMonth: function(Year, Month) {
		Month--;
		var d = new Date(Year, Month, 1);
		d.setDate(d.getDate() + 32 - d.getDate());
		return (32 - d.getDate());
	},
});