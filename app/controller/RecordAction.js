Ext.define('cfa.controller.RecordAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			recordMenu: "#recordMenu"
		},
		control: {

			/*recordMenu: {
				initialize:function(component,options){
					component.element.on({
						itemsingletap:function(dataview,index,item,record,e){
							console.log('您单击了'+index);
						}
						tap:function(){
							console.log('您单击了');
						}
					})
				}
			}*/

			/*recordMenu:{
				tap:'dataviewEvent'
			}*/

		}
	}
	/*dataviewEvent:function(){
		console.log('test')
	}*/
});