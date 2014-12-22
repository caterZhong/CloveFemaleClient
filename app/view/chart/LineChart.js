Ext.define('cfa.view.chart.LineChart',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.series.Line', 'Ext.chart.CartesianChart', 'Ext.chart.interactions.Rotate','Ext.Menu','Ext.chart.interactions.PanZoom'],

	xtype: 'lineChart',

	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'chart',
                store: 'PieStore',
                interactions: ['panzoom'],
                flex:2,
                series: [
                {
                    type: 'line',
                    xField: 'name',
                    yField: 'g2',
                    title: 'Smooth',
                    animate:true,
                    style: {
                        smooth: true,
                        stroke: "#94ae0a",
                        fillOpacity: 0.6,
                        miterLimit: 3,
                        lineCap: 'miter',
                        lineWidth: 2
                    },
                    marker: {
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
                        type: 'numeric',
                        position: 'left',
                        grid: {
                            odd: {
                                fill: '#fafafa'
                            }
                        },
                        title:{
                            text:'aaa',
                            fontSize:20
                        }
                    },
                    {
                        type: 'category',
                        visibleRange: [0, 1],
                        position: 'bottom',
                        grid: true,
                        visibleRange: [0, 0.8],
                        title:{
                            text:'bbbbb',
                            fontSize:20
                        }
                    }
                ]
            },{
                xtype:'container',
                html:'<center>2014年9月</center>',
                align:'center',
                docked:'top',
                layout:'hbox',
                items:[
                    {
                        xtype:'button',
                        text:'上个月',
                        docked:'left',
                        id:'preLineBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        text:'下个月',
                        docked:'right',
                        id:'nextLineBtn',
                        ui:'plain'
                    }
                ]
            }
        ]
	}
})