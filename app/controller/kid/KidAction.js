Ext.define('cfa.controller.kid.KidAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			backBtn: "#kidBackBtn", 
			kidMenu: "#kidMenu",  //小宝成长DataView菜单
			kidview:{
        		//引用小宝成长页面
                selector: 'kidview',
                xtype: "kidview",
                autoCreate: true
        	},
        	healthForm 			: "#healthForm",
        	submitHealthBtn 	: "#submitHealthBtn",

        	birthForm 			: "#birthForm",
        	submitBirthFormBtn 	: "#submitBirthFormBtn",

        	scoreForm 			: "#scoreForm",
        	submitScoreFormBtn 	: "#submitScoreFormBtn",

        	vaccineForm 		: "#vaccineForm",
        	submitVaccineFormBtn : "#submitVaccineFormBtn"
		},
		control: {
			backBtn: {
				tap: "backToRecordview"
			},
			kidMenu: { 
				itemsingletap: "showModel"
			},
			submitHealthBtn:{
				tap:"submitHealthForm"
			},
			submitBirthFormBtn:{
				tap:"submitBirthForm"
			},
			submitScoreFormBtn:{
				tap:"submitScoreForm"
			},
			submitVaccineFormBtn:{
				tap:"submitVaccineForm"
			}

		},
		routes:{
        	 'kid': 'showKidview'
        }
	},
	//返回到记录控页面
	backToRecordview: function(){
		this.redirectTo('main');
	},
	//显示小宝成长页面
	showKidview:function(){
    	Ext.Viewport.setActiveItem(this.getKidview());
    	/* 初始化日期控件 */
		var monthbox = Ext.getCmp("dateunit");
		monthbox.initMonth();
    },
    //根据小宝成长菜单点击显示不同输入模板
    showModel:function(dataview,index,item,record,e){
    	if(index==0){
			var birthModal=Ext.getCmp('kidBirthModal');
			birthModal.show();
		}
		else if(index==1){
			var healModal=Ext.getCmp('kidHealModal');
			healModal.show();
		}
		else if(index==2){
			var scoreModal=Ext.getCmp('kidScoreModal');
			scoreModal.show();
		}
		else{
			var vaccineModal=Ext.getCmp('vaccineModal');
			/*vaccineModal.show();*/
			vaccineModal.show();
		}
				
    },

    submitHealthForm: function(){
    	var form = this.getHealthForm() ;
    	var height = parseFloat(Ext.getCmp('height').getValue()) ;
    	var weight = parseFloat(Ext.getCmp('weight').getValue()) ;
    	if(isNaN(height) || isNaN(weight) 
    		|| height <= 0 || weight <= 0){
    		Ext.Msg.alert("ERROR", "身高体重必须为正数") ;
    		return ;
    	}
    	var params = {
    		"model.date" : Ext.getCmp('healthTime').getValue() ,
    		"model.height" : height ,
    		"model.weight" : weight ,
    		"model.babyId" : "BA3DE68086D9464A89E0DFCA9D0CB6F3"
    	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
    },

    submitBirthForm: function(){
    	var form = this.getBirthForm() ;
    	var sex = "female" ;
    	var radios = Ext.ComponentQuery.query("radiofield[name=sex]") ;
    	if(radios[0].getChecked() == true){
    		sex = radios[0].getValue() ;
    	}else{
    		sex = radios[1].getValue() ;
    	}
    	var babyName = Ext.getCmp('babyName').getValue() ;
    	if(babyName.length < 1){
    		Ext.Msg.alert("ERROR", "姓名长度至少为1") ;
    		return ;
    	}
    	var params = {
    		"model.name" 	: babyName ,
    		"model.date" 	: Ext.getCmp('birthDate').getValue(),
    		"model.sex" 	: sex ,
    		"model.userId" 	: localStorage.userId
    	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
    },

    submitScoreForm: function(){
    	var form = this.getScoreForm() ;
    	var mark = parseFloat(Ext.getCmp('mark').getValue()) ;
    	if(isNaN(mark)){
    		Ext.Msg.alert("ERROR", "分数必须是罗马数字") ;
    		return ;
    	}
    	var params = {
    		"model.date" 	: Ext.getCmp('scoreDate').getValue() ,
    		"model.grade" 	: Ext.getCmp('grade').getValue() ,
    		"model.subject" : Ext.getCmp('subject').getValue() ,
    		"model.mark" 	: mark ,
    		"model.babyId" 	: "BA3DE68086D9464A89E0DFCA9D0CB6F3"
    	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
    },

    submitVaccineForm: function(){
    	var form = this.getVaccineForm() ;
    	var content = Ext.getCmp('vaccineContent').getValue() ;
    	if(content.length < 1){
    		Ext.Msg.alert("ERROR", "备注长度至少为1") ;
    		return ;
    	}
    	var params = {
    		"model.date" 	: Ext.getCmp('vaccinTime').getValue() ,
    		"model.content" : content ,
    		"model.babyId" 	: "BA3DE68086D9464A89E0DFCA9D0CB6F3"
    	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
    }



});
