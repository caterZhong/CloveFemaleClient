Ext.define("cfa.view.me.ModifyInf",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel"],
	// views: [],
	
	xtype: "psnmodifyview",
	id:'psnmodify',
	title:'更改信息',
	config:{
			/*修改信息页面*/
			// xtype:"panel",
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			// hideAnimation:'fadeOut',
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
					name:'back_psnInfModify',
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
					 html:'20',
					 wordcount:20,
					 cls:'wordNum',
					 id:'wordNum',
				},{
					xtype:'textfield',
					maxLength:20,
					name:'infField',
					id:'infField',
					clearIcon:false,
					cls:'infTxt',
				},{
					xtype:'textareafield',
					maxLength:30,
					name:'infAreaField',
					id:'infAreaField',
					hidden:true,
					clearIcon:false,
					cls:'infTxt',
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

	/*设置最大字数限制*/
	setWordCount:function(wordcount){
		var inputWordCount = Ext.getCmp("wordNum");
		inputWordCount.setHtml(wordcount);
		inputWordCount.wordcount = wordcount;
	},

	/*切换textFiled状态*/
	changeToShortModel:function(){
		Ext.getCmp("infAreaField").hide();
		Ext.getCmp("infField").show();
		this.setWordCount(20);
	},

	/*切换textareaFiled状态*/
	changeToLongModel:function(){
		Ext.getCmp("infField").hide();
		Ext.getCmp("infAreaField").show();
		this.setWordCount(30);
	},
});