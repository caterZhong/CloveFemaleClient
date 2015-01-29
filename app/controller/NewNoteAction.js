Ext.define('cfa.controller.NewNoteAction',{
	extend:'Ext.app.Controller',
	requires:['Ext.DataView'],
	config: {
		refs: {
            /*返回按钮--返回到随手记页面*/
			newnotebackBtn: 'button[name="newnote_back_btn"]',
             /*保存笔记按钮*/
			newnotesaveBtn: 'button[name="newnote_save_btn"]',
             /*笔记selectfield*/
			noteGroup : 'selectfield[name="noteGroup"]',
            /*笔记本名称textfield---在添加笔记本模态对话框*/
            nbNameField:'textfield[name="nbNameField_nn"]',
            /*笔记本名称模态对话框确定按钮*/
            nbNameBtn:'button[name="nbNameBtn_nn"]',
			newnoteview:{
        		//引用新建笔记页面
                selector: 'newnoteview',
                xtype: "newnoteview",
                autoCreate: true
        	}
		},
		control: {
             /*返回按钮--返回到随手记页面*/
			newnotebackBtn: {
						tap : 'backToNotebookview'
			},
			newnotesaveBtn: {
						tap: 'saveNote'
			},
			noteGroup: {
					change : 'showNewGroupModal'	
			},
            /*笔记本名称textfield*/
            nbNameField:{
                    focus:'hideNullTips',
            },
            /*笔记本名称模态对话框确定按钮*/
            nbNameBtn:{
                    tap:'NewNoteBook',
            },
		},
		routes:{
			'newnote':'showNewnoteview'
		}
	},

	/*返回到随手记页面,同时删除新建笔记的页面*/
	backToNotebookview: function(){
        // alert(this);
		this.redirectTo('notebook');
		Ext.Viewport.remove(this.getNewnoteview());
        var list = Ext.getCmp("noteBookList");
        var store = list.getStore();
        store.removeAt(store.getCount()-1);
        var newData = {'id':0,'name':'全部笔记'};
        store.insert(0,newData);
	},

    /*新建笔记*/
	saveNote:function(){
        var noteTitle = Ext.getCmp("noteTitle");
        var noteContent= Ext.getCmp("noteContent");
        var noteBookId = Ext.getCmp("noteGroup");
        var showTipsModal = this.showTipsModal;
        var thisParam = this;
        Ext.data.JsonP.request({
            url:domain+'RandomNote/addNote2',
            callbackKey:'callback',
            callback:'callback',
            params:{
                'noteTitle':noteTitle.getValue(),
                'noteContent':noteContent.getValue(),
                'noteBookId':noteBookId.getValue(),
            },
            callback:function(success,result){  
                if(success&&result.result==0){
                    showTipsModal("保存成功",2000);
                    noteTitle.setValue("");
                    noteContent.setValue("");  
                    //返回到随手记页面
                    // thisParam.redirectTo('notebook');
                    // Ext.Viewport.remove(thisParam.getNewnoteview());
                    // var list = Ext.getCmp("noteBookList");
                    // var store = list.getStore();
                    // store.removeAt(store.getCount()-1);
                    // var newData = {'id':0,'name':'全部笔记'};
                    // store.insert(0,newData);
                    // localStorage.tips = "保存成功";
                    // back();//返回到随手记页面 
                }else{
                    //操作失败
                    showTipsModal("保存失败",2000);
                }  
                
            }

        });
        
	},

	/*显示添加笔记页面*/
	showNewnoteview:function(){
    	Ext.Viewport.setActiveItem(this.getNewnoteview());
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDay()+1;
        var createDay = "" + year + "年" + month + "月" + day + "日";
        Ext.getCmp("note-dateText").setHtml(createDay); //显示创建日期
    },

    /*显示新建笔记本模态框*/
    showNewGroupModal: function(select,newValue,oldValue,eOpts){

        if(newValue == '0'){
            Ext.getCmp("noteGroup").setValue(oldValue);
            Ext.getCmp("nbNameField_nn").setValue("");
            Ext.getCmp('nnbModal').show();
    	}
    },

     /*新建笔记本----笔记本模态对话框的确定按钮*/
    NewNoteBook:function(){
        var nbNameField = Ext.getCmp("nbNameField_nn");
        var nbName = nbNameField.getValue();
        var tips = Ext.getCmp("nbNameTips_nn");
        if("" == nbName){//笔记本名称为空
            tips.setHtml("笔记本名称不能为空");
            tips.show();//显示不为空提示
        }else if(nbName.length >12){
            tips.setHtml("笔记本名称必须少于12字");
            tips.show();//显示名称必须少于12字提示
        }else{           
            var store = Ext.getCmp("noteGroup").getStore();
            if(store.find("name",nbName,0,false,true,true) >= 0){
                 tips.setHtml("此笔记本已存在");
                 tips.show();//已存在此笔记本提示
            }else{
                var showTipsModal = this.showTipsModal;
                var noteGroup = Ext.getCmp("noteGroup");


                Ext.data.JsonP.request({
                            url:domain+'RandomNote/addNoteBook2',
                            callbackKey:'callback',
                            callback:'callback',
                            params:{
                                'userId':localStorage.userId,
                                'noteBookName':nbName,      
                            },
                            callback:function(success,result){
                                nbNameField.setValue(""); //置空
                                Ext.getCmp("nnbModal").hide();  //隐藏模态对话框
                                if(success&&result.result==0){//添加成功则把新建笔记本加入到store中，从而在list上显示
                                    var length = store.getCount();
                                    store.insert(length-1,result.data);//插入到store的倒数第二行，即新建笔记本前面
                                    noteGroup.setValue(result.data.id);
                                    showTipsModal("创建笔记本成功",2000);
                                }else{
                                    //操作失败
                                    showTipsModal("创建笔记本失败",2000);
                                }
                            },
                });
            }
           

        }   
    },

     /*隐藏笔记本名称不能为空的提示---笔记本名称textfield的focus事件*/
    hideNullTips:function(){
        Ext.getCmp("nbNameTips_nn").hide();
    },

     /*
     *消息提示模态对话框显示
     *tips：显示内容，timeout：消失时间
     */
    showTipsModal:function(tips,timeout){
        var tipsModal = Ext.getCmp("nnTipsModal");
        tipsModal.setHtml(tips);
        var width = tips.length*13 + 20;
        tipsModal.setWidth(width);
        var marginLeft = width/-2;
        var MarginString = "0 0 0 "+ marginLeft;
        tipsModal.setMargin(MarginString);
        tipsModal.show();
        setTimeout('Ext.getCmp("nnTipsModal").hide()',timeout);
    },
    

});