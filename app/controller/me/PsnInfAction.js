// var txtSize = 0;
Ext.define('cfa.controller.me.PsnInfAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			/*返回按钮----返回到我页面*/
			back_btn:'button[name="back_psnInf"]',
			/*性别按钮*/
			sexBtn:'button[name="sexBtn"]',
			/*昵称按钮*/
			nicknameBtn:'button[name="nicknameBtn"]',
			/*丁香号按钮*/
			idBtn:'button[name="idBtn"]',
			/*个性签名按钮*/
			introduceBtn:'button[name="introduceBtn"]',
			/*引用个人信息页面*/
			psninfview:{
        		//引用个人信息页面
                selector: 'psninfview',
                xtype: "psninfview",
                autoCreate: true
        	},

        	/*-------------------以下开始为修改页面控件----------------------*/
        	/*返回按钮----返回到个人信息页面*/
			back_modify_btn:'button[name="back_psnInfModify"]',
			/*信息输入field---修改信息页面*/
			infField:'textfield[name="infField"]',
			/*信息输入textareafield---修改信息页面*/
			infareaField:'textareafield[name="infAreaField"]',
   	
		},
		control: {
			/*返回按钮----返回到我页面*/
			back_btn:{
				tap:'backToMe',
			},
			/*性别按钮*/
			sexBtn:{
				tap:'showSexModal',
			},
			/*昵称按钮*/
			nicknameBtn:{
				tap:'showNnModifyPage',
			},
			/*丁香号按钮*/
			idBtn:{
				tap:'showIdModifyPage',
			},
			/*个性签名按钮*/
			introduceBtn:{
				tap:'showIntroduceModifyPage',
			},
			/*-----------以下开始为修改信息页面控件--------------*/
			/*信息输入field---修改信息页面*/
			infField:{
				keyup:'changeRemarinWords',
				// initialize:'addKeyDown',
				// tap:'check',
			},
			/*信息输入textareafield---修改信息页面*/
			infareaField:{
				keyup:'changeRemarinWords',
			},
			/*返回按钮----返回到个人信息页面*/
			back_modify_btn:{
				tap:'closeModifyPage',
			},
		},
		routes:{
			'psninf':'showPsnInfview',
			// 'psninfmodify':'showModifyPage',
		}
	},

	/*显示个人信息页面*/
	showPsnInfview:function(){
    	Ext.Viewport.setActiveItem(this.getPsninfview());
    	// Ext.Viewport.animateActiveItem(this.getPsninfview(),{type:'slide',duration:300});
    },

    /*返回到我页面---返回按钮的tap事件*/
    backToMe:function(){
    	modular = MINE;//返回的页面的我tab
    	this.redirectTo("main"); //返回的main页面
    },

    /*展示修改性别modal----性别按钮的tap事件*/
    showSexModal:function(){
    	Ext.getCmp("sexModal").show();
    },

    /*显示昵称修改页面----昵称按钮的tap事件*/
    showNnModifyPage:function(){
    	// var psninfview = this.getPsninfview();
    	// psninfview.setHideAnimation('');
    	var modifyPage = new cfa.view.me.ModifyInf();
		modifyPage.setTitle("更改昵称");
		modifyPage.changeToShortModel();
		modifyPage.setInputTips("好名字可以让你的朋友更容易记住你哦！");
		Ext.Viewport.setActiveItem(modifyPage);
    },

    /*显示丁香号修改页面----昵称按钮的tap事件*/
    showIdModifyPage:function(){
    	var modifyPage = new cfa.view.me.ModifyInf();
		modifyPage.setTitle("设置丁香号");
		modifyPage.setInputTips("丁香号是账号的唯一凭证，只能设置一次哦！");
		Ext.Viewport.setActiveItem(modifyPage);
    },


	/*显示更新个性签名页面---昵称按钮的tap事件*/
    showIntroduceModifyPage:function(){
    	var modifyPage = new cfa.view.me.ModifyInf();
		modifyPage.setTitle("更新个性签名");
		modifyPage.setInputTips("天天好心情！");
		modifyPage.changeToLongModel();
		Ext.Viewport.setActiveItem(modifyPage);
    },


    /*显示修改页面*/
	showModifyPage:function(){
		// this.redirectTo();
		Ext.Viewport.setActiveItem(this.getPsnmodifyview());
		// var modifyPage = new cfa.view.me.ModifyInf();
		// modifyPage.setTitle("更改昵称");
		// Ext.Viewport.setActiveItem(modifyPage);
		// setTitle
		// , {
		// 			type:'cover',
		// 			direction:'right'
		// 		});
	},

	/*改变剩余字数*/
	changeRemarinWords:function(textarea,e, eOpts ){
		var txtSize = 0; 
		var lastIndex = 0;
		var maxCount = Ext.getCmp("wordNum").wordcount;
		var value = textarea.getValue();	
		if(value!=null){
			var length = value.length;
			for(var i = 0; i < length; i++){	
				if(value.charCodeAt(i)>255){
					txtSize += 2;
				}else{
					txtSize += 1;
				}
				if(txtSize>=maxCount){
					lastIndex = i;
					break;
				}

			}
		}
		var remainder = maxCount - txtSize;
		if(remainder <= 0){
			textarea.setValue(value.substring(0,lastIndex+1));
			remainder = 0;
		}
		var remainWord = Ext.getCmp("wordNum");
		remainWord.setHtml(remainder);
	},

	/*关闭信息修改页面*/
	closeModifyPage:function(){
		this.redirectTo("psninf");
		Ext.getCmp("psnmodify").destroy();
	},

});