Ext.define("cfa.view.me.LoginView",{

	extend: "Ext.Container",
	requires: ["Ext.TabPanel","Ext.Panel","Ext.Img","Ext.form.Panel","Ext.field.Password"],
	
	xtype: "loginview",
	config:{
			/*登录页面*/
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
				xtype: "titlebar",
				title: "登录", 
				docked: "top",
				items:[{
					html:'返回',
					name:'backToMeBtn',
					ui:'plain',
				},{
					html:'注册',
					align:'right',
					ui:'plain',
				}],
			},{//第三方登录logoBox
				xtype:'panel',
				width:'100%',
				minWidth:250,
				cls:'loginWayBox',
				items:[{
					xtype:'panel',
					minWidth:250,
					width:'75%',
					cls:'loginLogoBox',
					items:[{
						xtype:'img',
						height:64,
						width:64,
						cls:'img-left',
						src:'public/images/qq.png',
					},{
						xtype:'img',
						height:64,
						width:64,
						centered:true,
						src:'public/images/wechat.png',
					},{
						xtype:'img',
						height:64,
						width:64,
						cls:'img-right',
						src:'public/images/weibo.png',
					}],
				}]
				
			},{
				xtype: 'fieldset',
	            title: '登录信息',
	            cls:'logidFieldset',
	            // instructions: 'Tell us all about yourself',
	            defaults:{
	            	labelWidth:69,
	            },
	            items: [{
	                xtype: 'textfield',
	                name : 'firstName',
	                label: '用户名',
	                placeHolder:'邮箱/手机号/丁香号',
	            },{
	                xtype: 'passwordfield',
	                name : 'lastName',
	                label: '密&nbsp;&nbsp;&nbsp;码',
	                placeHolder:'请输入密码',
	            }]
				
			},{
				xtype:'panel',
				cls:'loginBtnBox',
				items:[{
					xtype:'button',
	            	text:'登录',
	            	cls:'subBtn loginBtn',
				},{
					xtype:'button',
					text:'忘记密码？',
					cls:'findPassword',
					ui:'plain',
				}]
				
	            	// ui:'plain',
			}]//结束items


	}//结束config
});