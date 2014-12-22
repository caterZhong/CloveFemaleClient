Ext.define('cfa.view.chart.PieChart',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 
        'Ext.chart.interactions.Rotate','Ext.Menu','Ext.chart.interactions.ItemHighlight'],

	xtype: 'pieChart',

	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'polar',
                store: 'PieStore',
                colors: cfa.view.ColorPatterns.getBaseColors(),
               interactions: ['rotate', 'itemhighlight'],
                legend: {
                    docked: 'bottom',
                    verticalWidth: 100
                },
                innerPadding: 45,
                flex:2,
                series: [
                    {
                        type: 'pie',
                        xField: 'g1',
                        label: {
                            field: 'name',
                            display: 'rotate'
                        },
                        donut: 30,
                        highlightCfg: {
                            margin: 20
                        },
                        style: {
                            stroke: 'white',
                            miterLimit: 10,
                            lineCap: 'miter',
                            lineWidth: 2
                        }
                    }
                ],
                axes: [
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
                        id:'prePieBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        text:'下个月',
                        docked:'right',
                        id:'nextPieBtn',
                        ui:'plain'
                    }
                ]
            }
        ]
	}
})