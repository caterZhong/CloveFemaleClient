Ext.define('cfa.view.chart.PieChartGrade',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 
        'Ext.chart.interactions.Rotate','Ext.Menu','Ext.chart.interactions.ItemHighlight'],

	xtype: 'pieChartGrade',

	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'polar',
                store: 'PieGradeStore',
                // id:'pie_polar',
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
                        xField: 'time',
                        id: 'pie_sery',
                        label: {
                            field: 'grade',
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
                html:'<center><span id="pie_grade_date1">2014-09-01</span>&nbsp;&nbsp;至&nbsp;&nbsp;<span id="pie_grade_date2">2014-09-31</span>&nbsp;&nbsp;孩子成绩统计图</center>',
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