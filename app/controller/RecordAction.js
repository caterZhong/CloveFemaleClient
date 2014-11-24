Ext.define('cfa.controller.RecordAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			recordMenu: "#recordMenu",
			recordview:{
        		//引用记录控页面
                selector: 'recordview',
                xtype: "recordview",
                autoCreate: true
        	}
		},
		control: {
			recordMenu: {
				itemsingletap: "nextMenuView"
			}
		},
		routes:{
			'record':'showRecordview'
		}
	},
	nextMenuView: function(dataview,index,item,record,e){
		switch(index){
			case 0: Ext.Msg.alert("Tips","功能尚未开发");break;
			case 1: this.redirectTo('kid'); break;
			case 2: Ext.Msg.alert("Tips","功能尚未开发");break;
			case 3: Ext.Msg.alert("Tips","功能尚未开发");break;
			default:Ext.Msg.alert("Tips","功能尚未开发");break;
		};
	},
	showRecordview:function(){
    	Ext.Viewport.setActiveItem(this.getRecordview());
    }
});