Ext.define('cfa.controller.NotebookAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
			backBtn: 'button[name="bookBack_btn"]',
			newBtn : 'button[name="new_btn"]',
			bookfirstview : 'bookfirstview',
			slidenav:'slidenav',
			navBtn : 'button[name="nav_btn"]',
			notebookview:{
        		//引用随手记页面
                selector: 'notebookview',
                xtype: "notebookview",
                autoCreate: true
        	}
		},
		control: {
			backBtn: {
						tap : 'backToRecordview'
			},
			navBtn : {
						tap : 'toggleNav'
			},
			newBtn : {
						tap : 'showNewnoteView'
			},
												
			slidenav : {
						itemtap : function(list, index, target, record){
										this.toggleNav();
						}
			}
		},
		routes:{
			'notebook':'showNotebookview'
		}
	},

	//返回到记录控页面,同时删除笔记本的页面
	backToRecordview: function(){
		this.redirectTo('main');
		Ext.Viewport.remove(this.getNotebookview());
	},

	//显示随手记页面
	showNotebookview:function(){
    	Ext.Viewport.setActiveItem(this.getNotebookview());
    },

    //切换到新建笔记页面
    showNewnoteView:function(){
    	this.redirectTo('newnote');
    },
    /**
	 * 切换展示导航栏
	 */
	toggleNav : function(){
					var me = this,
					mainEl = me.getBookfirstview().element;
									
					if (mainEl.hasCls('out')) {

						mainEl.removeCls('out').addCls('in'); 
						me.getBookfirstview().setMasked(false);
					} else {
						mainEl.removeCls('in').addCls('out');  
						me.getBookfirstview().setMasked(true);
					}
				}

});