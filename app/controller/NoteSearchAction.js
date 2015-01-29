Ext.define('cfa.controller.NoteSearchAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView','Ext.data.JsonP','Ext.data.reader.Json','Ext.data.Store'],
	config: {
		refs: {
			/*返回按钮——返回到随手记页面*/
			backBtn: 'button[name="notesearchBack_btn"]',
			/*搜素按钮*/
			searchBtn:'button[name="notesearch_btn"]',
			/*搜索结果列表*/
			searchList:'list[name="searchnoteList"]',
			/*删除按钮*/
			delBtn:'button[name="delNote_ns_btn"]',
			/*关闭按钮——关闭删除模式*/
			closeBtn:'button[name="closeDel_ns_btn"]',
			/*删除的TitleBar*/
			delBar : 'titlebar[name="nsDelBar"]',
			/*搜索页面*/
			notesearchview:{
        		//引用笔记搜索页面
                selector: 'notesearchview',
                xtype: "notesearchview",
                autoCreate: true
        	}
		},
		control: {
			/*返回按钮——返回到随手记页面*/
			backBtn: {
						tap : 'backToNoteBookview'
			},
			/*搜素按钮*/
			searchBtn:{
						tap : 'loadSearchResult'
			},
			/*关闭按钮——关闭删除模式*/
			closeBtn:{
						tap:'closeDelModel',
			},
			/*删除按钮*/
			delBtn:{
					    tap:'delNote',
			},
			/*搜索结果列表*/
			searchList:{
						itemtap:'noteListTap',
						/*切换到删除模式*/
						itemtaphold:'changeToDelModel',
			}

		},
		routes:{
			'searchnote':'showNoteSearchView'
		}
	},

	//返回到随手记页面,同时删除笔记搜索的页面
	backToNoteBookview: function(){
		this.redirectTo('notebook');
		Ext.Viewport.remove(this.getNotesearchview());
	},

	//显示笔记搜索页面
	showNoteSearchView:function(){
    	Ext.Viewport.setActiveItem(this.getNotesearchview());
    },

    /*加载搜索结果*/
    loadSearchResult: function(){
    	var keyWord = Ext.getCmp("notesearch_field").getValue();
    	localStorage.keyword = keyWord;
    	var list = Ext.getCmp("searchnoteList");
    	var store = Ext.getStore('NoteStore');
    	
        var showTipsModal = this.showTipsModal;
    	Ext.data.JsonP.request({
    		url:domain+'RandomNote/findNoteByKeyWord',
    		callbackKey:'callback',
    		callback:'callback',
    		params:{
				'userId':localStorage.userId,
				'keyword': keyWord
			},
    		callback:function(success,result){
    			if(success&&result.data != ""){
    				store.loadData(result.data);
    				list.setStore(store);
    			}else if(result.result==0 && result.data == ""){
    				store.removeAll();
                    showTipsModal("没有找到相关内容",2000);//输出提示
    			}else{
 					store.removeAll();
                    showTipsModal("搜索失败",2000);//输出提示
    			}
    		},
    	})	
    },

	/*切换到笔记搜索的全部内容页面*/
    showsearchdetailview:function(list, index, target, record){
    	var noteStore = list.getStore();
		noteId = noteStore.getAt(index).get('id');
		localStorage.notesearchId = noteId;
    	this.redirectTo('notesearchdetail');
    },

    /*长按笔记list时切换到删除模式*/
    changeToDelModel:function(list, index, target, record){
    	localStorage.noteModel = 1;//删除模式
    	var noteBar =  Ext.getCmp("ns_titleBar");
    	noteBar.hide();
    	var delBar = Ext.getCmp("nsDelBar");
    	delBar.show();

    	list.getItemAt(index).addCls("Listitem-del");
    	list.addCls("DelNoteList");
    	// .Listitem-del
    },

    /*关闭搜索笔记页面的删除模式*/
    closeDelModel:function(){
    	var noteBar =  Ext.getCmp("ns_titleBar");
    	noteBar.show();
    	var delBar = Ext.getCmp("nsDelBar");
    	delBar.hide();

    	localStorage.noteModel = 0; //改变模式

    	//取消置灰的选项
    	var length = delNoteList.length;
    	var list = Ext.getCmp("searchnoteList");
    	for(var index in delNoteList){
    		list.getItemAt(delNoteList[index]).removeCls("Listitem-del");
    	}

    	list.removeCls("DelNoteList");//取消选中置白的样式

    	//恢复title
    	Ext.getCmp("nsDelBar").setTitle("已选择1个");
    },

     /*重置删除列表*/
    resetDelNote:function(){
        //清空两个装载index和Id的数组
        delNoteList.splice(0,delNoteList.length);
        delNoteIdList.splice(0,delNoteIdList.length);
    },

    /*笔记搜索结果列表的tap事件*/
    noteListTap:function(list, index, target, record){
    	var model = localStorage.noteModel;
    	if(model == 0){
    		//切换到笔记搜索的全部内容页面
    		this.showsearchdetailview(list, index, target, record);
    	}else{
    		//让选中的item置灰表示选中 	
    		var inSelected = false;	
    		for(var selectedIndex in delNoteList){
    			if(index == delNoteList[selectedIndex]){
    				delNoteList.splice(selectedIndex,1);
    				delNoteIdList.splice(selectedIndex,1);
    				list.getItemAt(index).removeCls("Listitem-del");
    				inSelected = true;
    				break;
    			}
    		}
    		if(!inSelected){
    			list.getItemAt(index).addCls("Listitem-del");
    			var noteId = list.getStore().getAt(index).get("id");
    			delNoteList.push(index);
    			delNoteIdList.push(noteId);
    		}
    		if(delNoteList.length == 0){
    			this.closeDelModel();
    		}else{
    			var title = "已选择"+delNoteList.length+"个";
    			Ext.getCmp("nsDelBar").setTitle(title);
    		}
    		
    	}	
    },

    /*删除笔记*/
    delNote:function(){
        var showTipsModal = this.showTipsModal;
    	if(delNoteIdList.length==0){
            showTipsModal("请选择要删除的笔记",2000);//输出提示
    		// Ext.Msg.alert("消息","请选择要删除的笔记");
    	}else{
            var resetDelNote = this.resetDelNote;
            this.closeDelModel();
    		Ext.data.JsonP.request({
	    		url:domain+'RandomNote/delNote',
	    		callbackKey:'callback',
	    		callback:'callback',
	    		params:{
					'noteIdList':delNoteIdList,
				},
	    		callback:function(success,result){
	    			if(result.result == 0){
	    				var store = Ext.getCmp("searchnoteList").getStore();
                        delNoteList.sort(function(a,b){
                            return a<b?1:-1;
                        });
                        for(var index in delNoteList){
                            store.removeAt(delNoteList[index]);
                        }
	    			}else{
                        showTipsModal("删除失败",2000);//输出提示
	    			}
                    resetDelNote();//重置删除列表
	    		}
			});
    	}
    },

    /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout){
        var tipsModal = Ext.getCmp("nbSearchTipsModal");
        tipsModal.setHtml(tips);
        var width = tips.length*13 + 20;
        var marginLeft = width/-2;
        var MarginString = "0 0 0 "+ marginLeft;
        tipsModal.setMargin(MarginString);
        tipsModal.setWidth(width);
        tipsModal.show();
        setTimeout('Ext.getCmp("nbSearchTipsModal").hide()',timeout);
    },

});