Ext.define('cfa.controller.KidAction',{
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
		},
		control: {
			backBtn: {
				tap: "backToRecordview"
			},
			kidMenu: { 
				itemsingletap: "showModel"
			}

		},
		routes:{
        	 'kid': 'showKidview'
        }
	},
	//返回到记录控页面
	backToRecordview: function(){
		this.redirectTo('record');
	},
	//显示小宝成长页面
	showKidview:function(){
    	Ext.Viewport.setActiveItem(this.getKidview());
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

});
