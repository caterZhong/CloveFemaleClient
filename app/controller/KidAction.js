Ext.define('cfa.controller.KidAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			backBtn: "#kidBackBtn",
			kidMenu: "#kidMenu",
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
	backToRecordview: function(){
		this.redirectTo('record');
	},
	showKidview:function(){
    	Ext.Viewport.setActiveItem(this.getKidview());
    },
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


// itemsingletap:function(dataview,index,item,record,e){
					
			// 		if(index==0){
			// 			var birthModal=Ext.getCmp('kidBirthModal');
			// 			birthModal.show();
			// 		}
			// 		else if(index==1){
			// 			var healModal=Ext.getCmp('kidHealModal');
			// 			healModal.show();
			// 		}
			// 		else if(index==2){
			// 			var scoreModal=Ext.getCmp('kidScoreModal');
			// 			scoreModal.show();
			// 		}
			// 		else{
			// 			var vaccineModal=Ext.getCmp('vaccineModal');
			// 			/*vaccineModal.show();*/
			// 			vaccineModal.show();
			// 		}
			// 	}