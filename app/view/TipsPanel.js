Ext.define("cfa.view.TipsPanel",{

	extend: "Ext.Panel",
	requires: ["Ext.TabPanel","Ext.Panel"],
	
	xtype: "tipspanel",
	config:{
		//数据加载提示Model
		layout: "vbox",
		hidden:true,
		hideOnMaskTap:true,
		// showAnimation:'pop',
		hideAnimation:'fadeOut',
		height:30,
		minWidth:80,
		html:'加载失败',
		cls:'infTipsModal',
	},
	 /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout,id){
    	this.setHtml(tips);
		var width = tips.length*13 + 20;
		this.setWidth(width);
		var marginLeft = width/-2;
		var MarginString = "0 0 0 "+ marginLeft;
		this.setMargin(MarginString);
		this.show();
    	setTimeout('Ext.getCmp("'+id+'").hide()',timeout);
    },
});