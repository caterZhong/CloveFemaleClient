Ext.define('cfa.view.SlideNav', {
				extend: 'Ext.List',
				xtype: 'slidenav',
				requires : ['Ext.data.Store'],
				cls : 'slidenav-list',
				// disclosureProperty:'disclosure',
				// onItemDisclosure:function(record,element,index,e){
				// 			alert("2");
				// 		}
				// config: {
				// 				cls : 'slidenav-list',
				// 				itemTpl : '{name}',
				// 				data : [{
				// 								title : '最近'	
				// 				},{
				// 								title : '全部笔记'
				// 				},{
				// 								title : '默认笔记本'
				// 				},{
				// 								title : '菜谱'
				// 				}]
				// }
});