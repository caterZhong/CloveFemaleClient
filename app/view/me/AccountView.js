Ext.define("cfa.view.me.AccountView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel"],
	// views: [],
	
	xtype: "accountview",
	config:{
			/*账号与安全页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			// id:'personalPanel',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "账号与安全", 
				docked: "top",
				items:[{
					html:'返回',
					name:'backToSetingBtn',
					ui:'plain',
				}],
			},{
				html:'账号',
				cls:'btnGroupTitle',
			},{//丁香号
				xtype:'button',
				// name:'idBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">丁香号</div><div class="psnInfcontent">37232892</div></div>']
			},{//QQ号
				xtype:'button',
				// name:'nicknameBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">QQ号</div><div class="psnInfcontent">1232112</div></div>']
			},{//微信号
				xtype:'button',
				// name:'nicknameBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">微信号</div><div class="psnInfcontent">dx12312321</div></div>']
			},{//微博号
				xtype:'button',
				// name:'nicknameBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">微博号</div><div class="psnInfcontent">未绑定</div></div>']
			},{//手机号
				xtype:'button',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">手机号</div><div class="psnInfcontent">13722321231</div></div>']
			},{//邮件地址
				xtype:'button',
				cls:'psnMenu psninfMenu',
				// name:'sexBtn',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">邮件地址</div><div class="psnInfcontent">1232112@qq.com</div></div>']
			},{
				html:'安全',
				cls:'btnGroupTitle',
			},{//丁香密码
				xtype:'button',
				// name:'introduceBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">丁香密码</div></div>']
			},{//加V认证
				xtype:'button',
				cls:'psnMenu psninfMenu',
				// name:'sexBtn',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">加V认证</div><div class="psnInfcontent">未加V</div></div>']
			}]
	}
});