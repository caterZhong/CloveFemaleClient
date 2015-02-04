Ext.define("cfa.view.me.AboutView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel",],
	// views: [],
	
	xtype: "aboutview",
	config:{
			/*设置页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "关于软件", 
				docked: "top",
				items:[{
					html:'返回',
					name:'back_about',
					ui:'plain',
				}],
			},{//版本及图标
				html:'<div class="logoImg center"><img src="public/images/logo.png" alt="" /></div><div class="edition center">丁香女性助手1.0</div>',
			},{//评分
				xtype:'button',
				name:'scorebtn',
				cls:'psnMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">评分</div></div>']
			},{//版本检测
				xtype:'button',
				name:'editionbtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">版本检测</div></div>']
			},{//责任声明
				xtype:'button',
				name:'responsibilitybtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">责任声明</div></div>']
			},{//使用协议
				xtype:'button',
				name:'agreementbtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">使用协议</div></div>']
			},{
				html:'<div class="copyright center"><div>***&nbsp;版权所有</div><div>Copyright &copy;2015-2019 TIK</div><div>All Rights Reserved</div></div>'
			}]
	}
});