Ext.define('cfa.view.SlideNav', {
				extend: 'Ext.List',
				xtype: 'slidenav',
				requires : ['Ext.data.Store'],
				config: {
								cls : 'slidenav-list',
								itemTpl : '{title}',
								data : [{
												title : '最近'	
								},{
												title : '全部笔记'
								},{
												title : '默认笔记本'
								},{
												title : '菜谱'
								}]
				}
});