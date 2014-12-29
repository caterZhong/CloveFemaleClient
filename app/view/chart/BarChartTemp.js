Ext.define('cfa.view.chart.BarChartTemp',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.series.Bar', 'Ext.chart.interactions.Rotate','Ext.chart.interactions.PanZoom'],

	xtype: 'barChartTemp',

	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'chart',
                store: 'PieTempStore',
                // id: 'bar_polar',
                interactions: ['panzoom'],
                flex:2,
                series: [
                {
                    type: 'bar',
                    xField: 'temperature',
                    yField: 'time',
                    id:'bar_sery',
                    highlight: true,
                    animate:true,
                    style: {
                   //   fill: 'rgba(164,211,255,0.7)',
                        fill: 'rgba(29,44,255,0.6)',
                        maxBarWidth: 80
                    }
                }],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        // id:'bar_y',
                        grid: {
                            odd: {
                                fill: '#fafafa'
                            }
                        },
                        title:{
                            text:'次数',
                            fontSize:20
                        }
                    },
                    {
                        type: 'category',
                        // visibleRange: [0, 1],
                        position: 'bottom',
                        // id:'bar_x',
                        visibleRange: [0, 0.7],
                        title:{
                            text:'温度',
                            fontSize:20
                        }
                    }
                ]
            },{
                xtype:'container',
                html:'<center><span id="bar_temp_date1">2014-09-01</span>&nbsp;&nbsp;至&nbsp;&nbsp;<span id="bar_temp_date2">2014-09-31</span>&nbsp;&nbsp;孕妇体温柱状统计图</center>',
                align:'center',
                docked:'top',
                layout:'hbox',
                items:[
                    {
                        xtype:'button',
                        iconCls:'arrow_left',
                        docked:'left',
                        name:'preDataBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        iconCls:'arrow_right',
                        docked:'right',
                        name:'nextDataBtn',
                        ui:'plain'
                    }
                ]
            }
        ]
	}
})