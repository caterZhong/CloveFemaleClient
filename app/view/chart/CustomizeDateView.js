Ext.define('cfa.view.chart.CustomizeDateView', {
	extend:'Ext.Panel',

	xtype: 'customizeDateView',
	config:{
		layout: 'vbox',
        width: "100%",
        style: 'background: white',
        items: [
        	{
                xtype: 'titlebar',
                docked: 'top',
                title:'自定义时间',
                cls: 'charttoolbar',
                flex:1,
                style: {
                    background: '#E24949'
                },
                items: [
                    {
                        // iconCls:'action',
                        xtype:'button',
                        text:'〈 返回',
                        align: 'left',
                        name:'backToChartBtn',
                        id:'backToChartBtn',
                        cls:'backBtn-plain',
                        ui: 'plain'
                    },
                    {
                        // iconCls:'action',
                        // xtype:'button',
                        text:'确定',
                        align: 'right',
                        name:'saveDateBtn',
                        id:'saveDateBtn',
                        ui: 'plain'
                    }
                ]
            },
            {
            	xtype: 'fieldset',
                title: '设置日期区间',
                // instructions: 'Please enter the information above.',
                defaults: {
                    labelWidth: '35%'
                },
                items: [
                	{
                        xtype: 'datepickerfield',
                        destroyPickerOnHide: true,
                        name : 'startDate',
                        id:'startDatePicker',
                        dateFormat:'Y-m-d',
                        label: '起始日期',
                        value: Ext.Date.clone(window.customizedDate1),
                        picker: {
                            yearFrom: 1990
                        }
                    },
                    {
                        xtype: 'datepickerfield',
                        destroyPickerOnHide: true,
                        name : 'endDate',
                        id:'endDatePicker',
                        dateFormat:'Y-m-d',
                        label: '结束日期',
                        value: Ext.Date.clone(window.customizedDate2),
                        picker: {
                            yearFrom: 1990
                        }
                    }
                ]
            }
        ]
	}
})