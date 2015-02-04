Ext.define("cfa.view.me.PsnInfView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","cfa.view.me.ModifyInf"],
	// views: [],
	
	xtype: "psninfview",
	config:{
			/*个人信息页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			id:'personalPanel',
			scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "个人信息", 
				docked: "top",
				items:[{
					html:'返回',
					name:'back_psnInf',
					ui:'plain',
				}],
			},
			{//头像
				xtype:'button',
				cls:'psnSim',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">头像</div><div class="psnInfcontent"><img class="infHeadImg" src="public/images/headPhoto.jpg" /></div></div>']
			},{//昵称
				xtype:'button',
				name:'nicknameBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">昵称</div><div class="psnInfcontent">丁香妹子</div></div>']
			},{//丁香号
				xtype:'button',
				name:'idBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">丁香号</div><div class="psnInfcontent">37232892</div></div>']
			},{//二维码名片
				xtype:'button',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">二维码名片</div><div class="psnInfcontent">丁香妹子</div></div>']
			},{//性别
				xtype:'button',
				cls:'psnMenu',
				name:'sexBtn',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">性别</div><div class="psnInfcontent">女</div></div>']
			},{//个性签名
				xtype:'button',
				name:'introduceBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">个性签名</div><div class="psnInfcontent">孩子快高长大孩孩子快asdfasdfasdfasdfasdf高长大子快高长大</div></div>']
			}
			,{//性别修改modal
				id:'sexModal',
				xtype:'panel',
				layout: "vbox",
				modal:true,
				hidden:true,
				hideOnMaskTap:true,
				centered:true,
				height:140,
				width:'90%',
				cls:'sexModal',
				items:[{
					xtype:'panel',
					id:'nbModalName',
					cls:'modalPanel',
					html:'性别',
				},{
					xtype:'radiofield',
					id:'babyMale',
					name:'sex',
					label:'男',
					value:'male',
					checked:true,
					cls:'sexLabel bottomLine',
				},{
					xtype:'radiofield',
					id:'babyFemale',
					name:'sex',
					label:'女',
					value:'female',
					check:false,
					cls:'sexLabel',
				}]
			}
			]
	}
});