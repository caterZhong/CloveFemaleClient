Ext.define('cfa.view.chart.ChartView', {
    extend: 'Ext.Container',

    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 'Ext.chart.interactions.Rotate',
            'Ext.Menu','Ext.chart.axis.Numeric','Ext.chart.axis.Category'],

    xtype: 'chartView',

    config: {
        cls: 'card1',
        layout: 'vbox',
        width: "100%",
        style: 'background: white',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                cls: 'charttoolbar',
                flex:1,
                style: {
                    background: '#E24949'
                },
                items: [
                    {
                        iconCls:'action',
                        text:'Back',
                        align: 'left',
                        name:'bookBack_btn',
                        cls:'backBtn-plain',
                        ui: 'plain'
                    },
                    {
                        align: 'right',
                        xtype:'button',
                        text: '饼图',
                        id:"pieChartBtn",
                        ui:'plain'
                    },
                    {
                        align: 'right',
                        xtype:'button',
                        text: '线图',
                        id:"lineChartBtn",
                        ui:'plain'
                    },
                    {
                        align: 'right',
                        xtype:'button',
                        text: '柱图',
                        id:"barChartBtn",
                        ui:'plain'
                    },
                    {
                        align: 'right',
                        iconCls: 'list',
                        text:'更多',
                        ui: 'plain',
                        handler: function() {
                            Ext.Viewport.toggleMenu('right');
                        }
                    }
                ]
            },
            {
                xtype:'panel',
                layout:{
                    type:'card',
                    animation:{
                        type:'flip'
                    }
                },
                id:'chartsPanel',
                flex:2,
                items:[
                    {
                        xtype:'pieChart'
                    },
                    {
                        xtype:'lineChart'
                    },
                    {
                        xtype:'barChart'
                    }
                ]
            }

        ]
    },
    show: function () {
     //   Ext.create('cfa.controller.chart.PieChartAction');
        this.callParent();
        Ext.getStore('PieStore').generateData(8);
    },
    doSetHidden: function(hidden) {
        this.callParent(arguments);

        if (hidden) {
            Ext.Viewport.removeMenu('right');
        } else {
            Ext.Viewport.setMenu(this.menuForSide('right'), {
                side: 'right',
                reveal: true
            });
        }
    },
    hideRightMenu: function(){
        Ext.Viewport.hideMenu('right');
    },
    menuForSide: function(side) {
        var items = [
            {
                text: '自定义时间段',
                iconCls: 'compose',
                id:'customizeTimeBtn',
                scope: this
            },
            {
                text: '胎动次数统计',
                iconCls: 'star',
                id:'babyMoveDataBtn',
                scope: this
            },
            {
                xtype: 'button',
                text: '体温变化统计',
                id:'tempDataBtn',
                iconCls: 'star',
                scope: this
            },
            {
                text: '体重变化统计',
                iconCls: 'star',
                id:'weightDataBtn',
                scope: this
            },
            {
                text: '睡眠时间统计',
                iconCls: 'star',
                id:'sleepDataBtn',
                scope: this
            },
            {
                text: '收起菜单',
                iconCls: 'action',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu(side);
                }
            }
        ];

        var className = 'Ext.Menu';
        if (Ext.theme.name == "Windows") {
            if (['top', 'bottom'].indexOf(side) != -1) {
                className = 'Ext.ux.ApplicationMenu';
            } else {
                className = 'Ext.ux.ContextMenu';
            }
        }

        return Ext.create(className, {
            items: items
        });
    }
});
