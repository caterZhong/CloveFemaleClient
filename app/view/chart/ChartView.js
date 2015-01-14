Ext.define('cfa.view.chart.ChartView', {
    extend: 'Ext.Container',

    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 'Ext.chart.interactions.Rotate',
            'Ext.Menu','Ext.chart.axis.Numeric','Ext.chart.axis.Category'],

    xtype: 'chartView',

    config: {
        showed: false ,
        requestQuota: 0 ,
        layout: 'vbox', 
        width: "100%",
        id:'chartView',
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
                        // iconCls:'action',
                        text:'〈 返回',
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
                        xtype:'pieChartBabyMove'
                        //0
                    },
                    {
                        xtype:'pieChartGrade'
                    },
                    {
                        xtype:'pieChartTemp'
                    },

                    {
                        xtype:'barChartBabyMove'
                        //3
                    },
                    {
                        xtype:'barChartGrade'
                    },
                    {
                        xtype:'barChartTemp'
                    },

                    {
                        xtype:'lineChartBabyMove'
                        //6
                    },
                    {
                        xtype:'lineChartGesWeight'
                    },
                    {
                        xtype:'lineChartGrade'
                    },
                    {
                        xtype:'lineChartHeight'
                    },
                    {
                        xtype:'lineChartTemp'
                        //10
                    },

                    {
                        xtype:'panel',
                        html:'<br><br><br><br><center><h2><span id="only_line_title"></span>数据只有线形图的表示</h2></center>'
                        //11
                    }
                ]
            }

        ]
    },
    show: function () {
        this.callParent();
        var showed = this.getShowed() ;
        if(!showed){
            var storeList = ['PieTempStore','PieGradeStore','PieBabyMoveStore','LineTempStore',
                'LineHeightStore','LineGradeStore','LineGesWeightStore','LineBabyMoveStore'] ;
            for(i = 0 ; i < storeList.length ; i++){
                Ext.getStore(storeList[i]).load() ;
            }
            window.initDateLabels() ;
            Ext.getStore('ChartSubjectsStore').load() ;
            this.setShowed(true) ;
        }
    },
    doSetHidden: function(hidden) {
        this.callParent(arguments);

        if (hidden) {
            Ext.Viewport.removeMenu('right');
        } else {
            var menu = Ext.getCmp('closeMenuBtn') ;
            if(!menu){
                // menu = this.menuForSide('right') ;
                window.chartMenu = this.menuForSide('right') ;
            }else{
                // do nothing
                //菜单的组件已经创建了一次，界面再次被调用的时候就不必再创建
            }
            Ext.Viewport.setMenu(window.chartMenu, {
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
                text: '孩子成绩统计',
                iconCls: 'star',
                id:'babyGradeBtn',
                scope: this
            },
            {
                xtype: 'button',
                text: '孩子身高统计',
                id:'babyHeightBtn',
                iconCls: 'star',
                scope: this
            },
            {
                text: '孕重变化统计',
                iconCls: 'star',
                id:'fetalWeightBtn',
                scope: this
            },
            {
                text: '胎动次数统计',
                iconCls: 'star',
                id:'fetalMoveBtn',
                scope: this
            },
            {
                text: '孕妇体温统计',
                iconCls: 'star',
                id:'temperatureBtn',
                scope: this
            },
            {
                text: '〉收起菜单',
                // iconCls: 'action',
                id:'closeMenuBtn',
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
