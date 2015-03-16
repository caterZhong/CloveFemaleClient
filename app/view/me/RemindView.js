Ext.define("cfa.view.me.RemindView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","Ext.field.Toggle","Ext.picker.Picker","cfa.view.me.MuteTimeView"],
	
	xtype: "remindview",
	config:{
			/*提醒页面*/
			layout: "vbox",
			width: "100%",
			height:'100%',
			fullscreen: true,
			// showAnimation:'pop',
			hideAnimation:'popOut',
			// scrollable:'vertical',
			default:{
				styleHtmlContent:true,
			},
			items: [
			{
				xtype: "toolbar",
				title: "提醒", 
				docked: "top",
				items:[{
					html:'返回',
					name:'backToSetingBtn',
					ui:'plain',
				}],
			},{
				xtype:'tipspanel',
				id:'tipsBox_rm',
			},{//生理记录提醒
				xtype:'panel',
				margin:'20 0 0 0',
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					name:'toggle_phy',
					id:'toggle_phy',
					label:'生理记录提醒',
					value:1,
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					// name:'remindBtn',
					ui: 'plain',
				}]
				
			},{//药品到期提醒
				xtype:'panel',
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					name:'toggle_med',
					id:'toggle_med',
					label:'药品到期提醒',
					value:1,
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					// name:'remindBtn',
					ui: 'plain',
				}]
			},{//疫苗接种提醒
				xtype:'panel',
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					name:'toggle_vac',
					id:'toggle_vac',
					label:'疫苗接种提醒',
					value:1,
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					// name:'remindBtn',
					ui: 'plain',
				}]
			},{//提醒声音
				xtype:'panel',
				margin:'20 0 0 0',
				cls:'togglePanel',
				items:[{
					xtype:'togglefield',
					name:'toggle_voice',
					id:'toggle_voice',
					label:'提醒声音',
					labelWidth:'60%',
					width:'100%',
					height:40,
					cls:'toggle',
					labelCls:'backLabel',
					// name:'remindBtn',
					ui: 'plain',
				}]
			},{//静音时间段
				xtype:'button',
				name:'muteBtn',
				id:'muteBtn',
				cls:'psnMenu psninfMenu',
				ui: 'plain',
				html:['<div class="psnInfItem"><div class="psnInfItemTitle">静音时间段</div><div class="psnInfcontent">23:00-8:30</div></div>']
			}],
	}
});