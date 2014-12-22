Ext.define('cfa.view.chart.LineChartWithRenderer',{
	extend:'Ext.Panel',

	requires: ['Ext.chart.Chart', 'Ext.chart.series.Line', 'Ext.chart.axis.Numeric', 'Ext.draw.modifier.Highlight',
               'Ext.chart.axis.Time', 'Ext.chart.interactions.ItemHighlight'],

	xtype: 'lineChartWithRenderer',

	config:{
		layout:'vbox',

		items:[
            {
                xtype: 'polar',
                store: 'PieStore',
                series: [
                    {
                        type: 'line',
                        xField: 'name',
                        yField: 'g1',
//                      step:true,
//                      smooth: true,
                        style: {
                            stroke: 'powderblue',
                            fill: 'aliceblue',
                            lineWidth: 4
                        },
                        marker: {
                            type: 'circle',
                            fill: 'yellow',
                            radius: 10
                        },
                        renderer: function(sprite, config, rendererData, index) {
                            var store = rendererData.store,
                                storeItems = store.getData().items,
                                currentRecord = storeItems[index],
                                previousRecord = (index > 0 ? storeItems[index-1] : currentRecord),
                                current = currentRecord && currentRecord.data['g1'],
                                previous = previousRecord && previousRecord.data['g1'],
                                changes = {};
                            switch(config.type) {
                                case "marker":
                                    if (index == 0) {
                                        return null; // keep the default style for the first marker
                                    }
                                    changes.strokeStyle = (current >= previous ? 'green' : 'red');
                                    changes.fillStyle = (current >= previous ? 'palegreen' : 'lightpink');
                                    changes.lineWidth = 2;
                                    break;
                                case "line":
                                    changes.strokeStyle = (current >= previous ? 'green' : 'red');
                                    changes.fillStyle = (current >= previous ? 'palegreen' : 'tomato');
                                    changes.fillOpacity = .1;
                                    break;
                            }
                            return changes;
                        }



                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1'],
                        minimum: 0
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name'
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
                        id:'lastMonthBtn',
                        ui:'plain'
                    },{
                        xtype:'button',
                        text:'下个月',
                        docked:'right',
                        id:'nextMonthBtn',
                        ui:'plain'
                    }
                ]
            }
        ]
	}
})