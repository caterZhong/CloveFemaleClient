Ext.define('cfa.controller.me.RegisterAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			monthBox:'dateunit[name="dateunit"]',
			/*引用注册页面*/
			registerview:{
                selector: 'registerview',
                xtype: "registerview",
                autoCreate: true
        	},
   	
		},
		control: {
			monthBox:{
				// initialize:'changeDay',
			},
		},
		routes:{
			'register':'showRegisterview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示注册页面*/
	showRegisterview:function(){
    	Ext.Viewport.setActiveItem(this.getRegisterview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    changeDay:function(){
    	var monthbox = Ext.getCmp("dateunit");
    	// monthbox.initMonth();
    	monthbox.setMonth(2015,1);
    	// var first = Ext.getCmp("firstWeek");
    	// var firstDay = Ext.getCmp("firstDay");
    	// console.log(first.getItems());
    	// console.log(firstDay.getItems());
					// var dateArray = new Array();
					// dateArray[0]= "2",
					// dateArray[1]= "2",
					// dateArray[2]= "2",
					// dateArray[3]= "2",
					// dateArray[4]= "2",
					// dateArray[5]= "2",
					// dateArray[6]= "2",
					// first.setItems(dateArray);
					// var myDate = new Date();
		// var today = new Date();
		// var firstDay = new Date(today.getFullYear(),today.getMonth(),1)
		// var day = firstDay.getDay();
		// var dayCount = this.DayNumOfMonth(today.getFullYear(),today.getMonth())
		// for(var i = 0; i < day; i++){
		// 	var dayBtn = Ext.getCmp("dayBtn_" + i);
		// 	dayBtn.setText("");
		// };
		// for(var i = day ; i < dayCount; i++){
		// 	var j = 1;
		// 	var dayBtn = Ext.getCmp("dayBtn_" + i);
		// 	dayBtn.setText(i+1);
		// };
		// for(var i = dayCount; i < 35; i++){
		// 	var dayBtn = Ext.getCmp("dayBtn_" + i);
		// 	dayBtn.setText("");
		// }
		// var todayBtn = Ext.getCmp("dayBtn_" + today.getDay());
		// todayBtn.setCls("activeDayBtn");

		// this.DayNumOfMonth(2015,2);
    },

    DayNumOfMonth:function(Year,Month)
	{
    	// Month--;
    	var d = new Date(Year,Month,1);
    	d.setDate(d.getDate()+32-d.getDate());
    	return (32-d.getDate());
	}

});