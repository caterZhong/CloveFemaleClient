Ext.define('cfa.controller.PregnantAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			backBtn: "#pregnantBackBtn", 
			pregnantMenu: "#pregnantMenu",  //助孕记录DataView菜单
			pregnantview:{
        		//引用助孕页面
                selector: 'pregnantview',
                xtype: "pregnantview",
                autoCreate: true
        	},
        	mensesForm 				 : "#mensesForm",
        	mensesFormSubmitBtn		 : "#mensesFormSubmitBtn",
        	mensesFormResetBtn		 : "#mensesFormResetBtn",

        	temperatureForm			 : "#temperatureForm",
        	submitTemperatureFormBtn : "#submitTemperatureFormBtn",

        	weightForm 				 : "#weightForm",
        	submitWeightFormBtn		 : "#submitWeightFormBtn",

        	movementForm 			 : "#movementForm",
        	submitMovementFormBtn	 : "#submitMovementFormBtn"

		},
		control: {
			backBtn: {
				tap: "backToRecordview"
			},
			pregnantMenu: { 
				itemsingletap: "showModel"
			},
			mensesFormSubmitBtn:{
				tap:"submitMensesForm"
			},
			mensesFormResetBtn:{
				tap:"resetMensesForm"
			},
			submitTemperatureFormBtn:{
				tap:"submitTemperatureForm"
			},
			submitWeightFormBtn:{
				tap:"submitWeightForm"
			},
			submitMovementFormBtn:{
				tap:"submitMovementForm"
			},
		},
		routes:{
			'pregnant':'showPregnantview'
		}
	},

	//返回到记录控页面
	backToRecordview: function(){
		this.redirectTo('main');
	},

	//显示助孕记录页面
	showPregnantview:function(){
    	Ext.Viewport.setActiveItem(this.getPregnantview());
    },

    //根据助孕记录菜单点击显示不同输入模板
    showModel:function(dataview,index,item,record,e){
    	if(index==0){
			var mensesModal=Ext.getCmp('mensesModal');
			mensesModal.show();
		}
		else if(index==1){
			var temperatureModal=Ext.getCmp('temperatureModal');
			temperatureModal.show();
		}
		else if(index==2){
			var weightModal=Ext.getCmp('weightModal');
			weightModal.show();
		}
		else{
			var movementModal=Ext.getCmp('movementModal');
			/*vaccineModal.show();*/
			movementModal.show();
		}
				
    },

    tapTestEvent:function(){
    // 	 $('.floatTips').html("hahhah");
     },

     resetMensesForm: function(){
     	this.getMensesForm().reset() ;
     },

     submitMensesForm: function(){
     	var form = this.getMensesForm() ;
     	var params = {
	        'model.mColor'		: Ext.getCmp('mcolor').getValue(),
	        'model.mMeasure' 	: Ext.getCmp('mmeasure').getValue(),
	        'model.mPiece' 		: Ext.getCmp('mpiece').getValue()==1 ? 'true' : 'false',
	        'model.isMcramp' 	: Ext.getCmp('ismcramp').getValue()==1 ? 'true':'false',
	        'model.vicidity' 	: Ext.getCmp('vicidity').getValue(),
	        'model.userId' 		: 'EBC0D4432F1F47F0A8DC928CD57A0A5A'
        } ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
     },

     submitTemperatureForm: function(){
     	var form = this.getTemperatureForm() ;
     	var params = {
     		'model.tValue'	: Ext.getCmp('tValue').getValue(),
            'model.userId' 	: 'EBC0D4432F1F47F0A8DC928CD57A0A5A'
     	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
     },

     submitWeightForm: function(){
     	var form = this.getWeightForm() ;
     	var wValue = parseFloat(Ext.getCmp('wValue').getValue()) ;
     	if(isNaN(wValue) || wValue <= 0){
     		Ext.Msg.alert("ERROR", "请输入为正数的孕重数值") ;
     		return ;
     	}
     	var params = {
     		'model.wDate'	: Ext.getCmp('wDate').getValue(),
            'model.wValue'	: wValue,
            'model.userId' 	: 'EBC0D4432F1F47F0A8DC928CD57A0A5A'
     	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
     },

     submitMovementForm: function(){
     	var form = this.getMovementForm() ;
     	var params = {
            'model.num'		: Ext.getCmp('movementNum').getValue(),
            'model.userId' 	: 'EBC0D4432F1F47F0A8DC928CD57A0A5A'
     	} ;
     	Ext.create('cfa.model.RecordModel',{
     		name : '' ,
     		type : ''
     	}).saveRecord(form, params) ;
     }


    // $('.floatTips').click(tapTestEvent);
});