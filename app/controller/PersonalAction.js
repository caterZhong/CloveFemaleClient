Ext.define('cfa.controller.PersonalAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			psnSim:'#psnSim',
			// personalPanel:'#personalPanel',
			personalview:{
        		//引用记录控页面
                selector: 'personalview',
                xtype: "personalview",
                autoCreate: true
        	}
		},
		control: {		
			psnSim:{
				tap:'testest'
			}
		},
		// routes:{
		// 	'record':'showRecordview'
		// }
	},

});