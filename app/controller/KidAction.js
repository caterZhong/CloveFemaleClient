Ext.define('cfa.controller.KidAction',{
	extend:'Ext.app.Controller',
	config: {
		refs: {
			backBtn: "#backBtn"
		},
		control: {
			backBtn: {
				initialize:function(component,options){
					component.element.on({
						tap:function(){
							console.log('您单击了返回按钮');
						}
					})
				}
			}

		}
	}
});