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
        	}
		},
		control: {
			backBtn: {
				tap: "backToRecordview"
			},
			pregnantMenu: { 
				itemsingletap: "showModel"
			}
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

    // $('.floatTips').click(tapTestEvent);
});