Ext.define('cfa.view.chart.BarChart',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.series.Bar', 'Ext.chart.interactions.Rotate','Ext.chart.interactions.PanZoom'],

	xtype: 'barChart',

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
                    type: 'bar',
                    xField: 'name',
                    yField: 'g2',
                    highlight: true,
                    animate:true,
                    style: {
                   //   fill: 'rgba(164,211,255,0.7)',
                        fill: 'rgba(99,184,255,0.7)',
                        maxBarWidth: 80
                    }
                }],
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
                        visibleRange: [0, 0.7],
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
                        id:'preBarBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        text:'下个月',
                        docked:'right',
                        id:'nextBarBtn',
                        ui:'plain'
                    }
                ]
            }
        ]
	}
})