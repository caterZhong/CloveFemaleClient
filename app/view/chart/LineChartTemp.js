Ext.define('cfa.view.chart.LineChartTemp',{
	extend:'Ext.Panel',
	requires: ['Ext.chart.series.Line', 'Ext.chart.CartesianChart', 
        'Ext.chart.interactions.Rotate','Ext.Menu','Ext.chart.interactions.PanZoom'],
	xtype: 'lineChartTemp',
	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'chart',
                store: 'LineTempStore',
                // id: 'line_polar',
                interactions: ['panzoom'],
                flex:2,
                series: [
                {
                    type    : 'line',
                    xField  : 'date',
                    yField  : 'temperature',
                    // title   : 'g2',
                    // id      : 'line_sery',
                    animate : true,
                    style   : {
                        smooth: true,
                        stroke: "#3048E8",
                        fillOpacity: 0.6,
                        miterLimit: 3,
                        lineCap: 'miter',
                        lineWidth: 2
                    },
                    marker  : {
                        type: 'circle',
                        stroke: '#0d1f96',
                        fill: '#115fa6',
                        lineWidth: 2,
                        radius: 4,
                        shadowColor: 'rgba(0,0,0,0.7)',
                        shadowBlur: 10,
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        fx: {duration: 300}
                    }
                }
                ],
                axes: [
                    {
                        type     : 'numeric',
                        position : 'left',
                        // id       : 'line_y',
                        grid: {
                            odd: {
                                fill: '#fafafa'
                            }
                        },
                        title:{
                            text:'温度(摄氏度)',
                            fontSize:18
                        }
                    },
                    {
                        type         : 'category',
                        visibleRange : [0, 1],
                        position     : 'bottom',
                        // id           :'line_x',
                        grid         : true,
                        visibleRange: [0, 0.8],
                        title:{
                            text:"时间",
                            fontSize:18
                        }
                    }
                ]
            },{
                xtype:'container',
                html:'<center><span id="line_temp_date1">2014-09-01</span>&nbsp;&nbsp;至&nbsp;&nbsp;<span id="line_temp_date2">2014-09-31</span>&nbsp;&nbsp;孕妇体温线型统计图</center>',
                align:'center',
                docked:'top',
                layout:'hbox',
                items:[
                    {
                        xtype:'button',
                        // text:'上个月',
                        iconCls:'arrow_left',
                        docked:'left',
                        name:'preDataBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        // text:'下个月',
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