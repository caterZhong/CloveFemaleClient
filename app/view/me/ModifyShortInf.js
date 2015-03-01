Ext.define("cfa.view.me.ModifyShortInf",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel"],
	// views: [],
	
	xtype: "psnmdfsinfview",
	title:'更改信息',
	wordCount:20,
	config:{
			/*修改信息页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			// id:'personalPanel',
			cls:'modifyInfContainer',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				id:'modifyInfTitleBar',
				// cls:'note-titleBar',
				title: "修改", 
				docked: "top",
				items:[{
					html:'返回',
					name:'back_psnInf',
					// cls:'backBtn-plain',
					ui:'plain',
				},{
					xtype:'spacer',
				},{
					html:'保存',
					align:'right',
					// name:'back_psnInf',
					// cls:'backBtn-plain',
					ui:'plain',
				}],
			},{
				xtype:'panel',
				layout:'vbox',
				cls:'txtPanel',
				items:[{
					 html:'30',
					 cls:'wordNum',
					 id:'wordNum',
				},{
					xtype:'textareafield',
					maxLength:30,
					name:'infField',
					clearIcon:false,
					cls:'infTxt',
				},{
					// html:'30',
				}]
			},{
				html:'好名字可以让你的朋友更容易记住你哦！',
				id:'inputTips',
				cls:'modifyTips',
			}]
	},

	/*设置页面标题*/
	setTitle:function(title){
		Ext.getCmp("modifyInfTitleBar").setTitle(title);
	},

	/*设置输入信息提示*/
	setInputTips:function(tips){
		Ext.getCmp("inputTips").setHtml(tips);
	},
});