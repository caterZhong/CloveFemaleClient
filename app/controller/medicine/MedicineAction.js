/**
 * 药箱管理
 *
 * @author boxizen
 * @since 2015/01/15
 */
var medboxSelectIndex = null;
var selectMode = 0;
Ext.define('cfa.controller.medicine.MedicineAction',{
	extend:'Ext.app.Controller',
	
	requires:['Ext.data.Store'],
	
	config: {
		refs:{
			// 返回按钮 
			backBtn: 'button[name="medBackBtn"]',
			// 新建药箱
			newBtn: 'button[name="medNewBtn"]',
			// 药箱列表
			medBoxList: 'list[name="medboxList"]',
			// 返回列表按钮
			backListBtn: 'button[name="addMedBoxBtn"]',
			// 药箱增加提交按钮
			addMedBoxSubBtn: 'button[name="addMedBoxSubBtn"]',
			// 主界面
			medicineview: {
        		//引用药箱页面
        		selector: 'medicineview',
                xtype: "medicineview",
                autoCreate: true
        	},
        	// 取消删除按钮
        	medBoxCancel:'button[name="medBoxCancel"]',
        	//列表删除按钮
        	listDelBtn:'button[name="medBoxDel"]'
		},
		
		control: {
			// 返回按钮 (药箱列表页面) 
			backBtn: {
				tap: "backToRecordView"
			},
			// 新建药箱
			newBtn: {
				tap: 'addMedicine'
			},
			// 返回按钮 (添加药箱页面)
			backListBtn: {
				tap: "backToMedBox"
			},
			// 药箱增加提交按钮
			addMedBoxSubBtn: {
				tap: "addMedBoxEvent"
			},
			// 药箱列表
			medBoxList: {
				itemtap: "enterDetail",
				itemtaphold: "holdList"
			},
			// 取消删除按钮
        	medBoxCancel:{
        		tap:"cancelDelBox"
        	},
			//删除按钮
			listDelBtn:{
				tap:"delMedBox"
			}
		},
		
		routes: {
        	 'medicine': 'showMedicineview'
        }
	},
	/* 加载药箱列表 */
	loadMedBoxList: function(){
		// 更新药箱列表数据
    	Ext.getStore("medBoxStore").reload(localStorage.userId);
    	var medboxList = Ext.getCmp('medboxList');
    	medboxList.setStore('medBoxStore');
	},
	/* 消除提示框样式 */
	removeTipStyle: function(){
		Ext.select('.custTipSuc').removeCls('show');
		Ext.select('.custTipFal').removeCls('show');
	},
	/* 显示药箱页面 */
    showMedicineview: function(){
    	// 更新页面
    	Ext.Viewport.setActiveItem(this.getMedicineview());
    	this.loadMedBoxList();
    },
    /* 显示删除信息 */
    holdList: function(obj,index,target,record,e,eOpts){
    	//存储药箱id
		sessionStorage.setItem("medBoxId",record.data.id);
		Ext.getCmp('medBoxDelPanel').removeCls('hidden');
		Ext.getCmp('medBoxComPanel').addCls('hidden');
		Ext.select('.custTipSucDel').removeCls('show');
		Ext.select('.custTipFalDel').removeCls('show');
		selectMode = 1;
	},
	/* 取消删除按钮 */
	cancelDelBox: function(){
		Ext.getCmp('medBoxDelPanel').addCls('hidden');
		Ext.getCmp('medBoxComPanel').removeCls('hidden');
	},
	/* 进入药品列表 */
	enterDetail: function(obj,index, target, record, e, eOpts){
		if(selectMode==0){
			//存储药箱id
			sessionStorage.setItem("medBoxId",record.data.id);
			// 获取药品数据
			this.redirectTo('medicineDetail');
			Ext.Viewport.remove(Ext.getCmp('medicineView'));
		}			
		selectMode = 0;
	}
	,
	/* 返回到记录控页面 */
	backToRecordView: function(){
		this.redirectTo('main');
		Ext.Viewport.remove(Ext.getCmp('medicineView'));
		
	},
    /* 新建药箱页面 */
    addMedicine: function(){
    	Ext.getCmp("medicineView").animateActiveItem(Ext.getCmp('addMedBoxPanel'),{
			type:'slide',
			direction:'left'
		});
    },
    /* 返回药箱列表页面 */
   	backToMedBox: function(){
   		this.removeTipStyle();
    	this.loadMedBoxList();
   		Ext.getCmp("medicineView").animateActiveItem(Ext.getCmp('medBoxListPanel'),{
			type:'slide',
			direction:'right'
		});
   	},
   	/* 向服务器端请求删除药箱 */
   	delMedBox: function(){
   		var action = this;
   		//存储药箱id
		var medBoxId = sessionStorage.getItem("medBoxId");
		//通过JsonP跨域提交数据
		Ext.data.JsonP.request({
			url:domain+'MedicineTestAction/removeMedBox',
			params:{
				medBoxId:medBoxId
			},
			success:function(result){
				if(result.result == 1){
					action.loadMedBoxList();
					Ext.getCmp('medBoxDelPanel').addCls('hidden');
					Ext.getCmp('medBoxComPanel').removeCls('hidden');
					Ext.select('.custTipSucDel').addCls('show');
				}
				else{
					Ext.select('.custTipFalDel').addCls('show');
				}
			}
		});
   	},
   	/* 向服务器端添加药箱信息 */
   	addMedBoxEvent: function(){
   		//html5本地存储
  		if(localStorage.userId){
  			;
  		}
  		else{
  			localStorage.userId = '001';
  		}
		var formValues = Ext.getCmp('medBoxForm').getValues();
		var medBoxName = formValues["medBoxName"];
		var medBoxMark = formValues["medBoxMark"];
		//通过JsonP跨域提交数据
		Ext.data.JsonP.request({
			url:domain+'MedicineTestAction/addMedBox',
			params:{
				medBoxName:medBoxName,
				medBoxMark:medBoxMark,
				userId:localStorage.userId
			},
			success:function(result){
				if(result.result == 1){
					Ext.select('.custTipSuc').addCls('show');
				}
				else{
					Ext.select('.custTipFal').addCls('show');
				}
			}
		});
	}
});
