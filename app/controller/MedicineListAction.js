/**
 * 药品管理
 *
 * @author boxizen
 * @since 2015/01/15
 */
Ext.define('cfa.controller.MedicineListAction',{
	extend:'Ext.app.Controller',
	
	requires:['Ext.data.Store'],
	
	config: {
		refs:{
			// 主界面
			medicinelistview: {
        		//引用药箱页面
        		selector: 'medicinelistview',
                xtype: "medicinelistview",
                autoCreate: true
        	},
			// 返回按钮(药品列表)
			backBtn: 'button[name="medDetailBackBtn"]',
			// 药品列表
			medList : 'list[name="medList"]',
			// 返回按钮(药品详情)
			detailBackBtn: 'button[name="showMedDetailRtnBtn"]',
			// 删除按钮
			deleteBtn: 'button[name="medDetailDeleteBtn"]',
			// 显示提示面板按钮
			showTipViewBtn: 'button[name="showTipViewBtn"]',
			// 关闭提示面板按钮
			cancelTipViewBtn: 'button[name="cancelTipView"]',
			// 手动输入按钮
			medManualBtn: 'button[name="medManual"]',
			// 二维码输入按钮
			med2code: 'button[name="med2code"]',
			// 增加药品按钮
			addMedBtn: 'button[name="addMedBtn"]',
			// 修改药品按钮
			alterMedDetailBtn: 'button[name="saveMedDetailBtn"]'
		},
		
		control: {
			// 返回按钮(药品列表)
			backBtn: {
				tap: 'backToMedBox'
			},
			// 返回按钮(药品详情)
			detailBackBtn: {
				tap: 'backToMedList'
			},
			// 删除按钮
			deleteBtn: {
				tap:'delMed'
			},
			// 药品列表
			medList: {
				itemtap: 'showMedDetail'
			},
			// 显示提示面板按钮
			showTipViewBtn: {
				tap:'showAnimateTip'
			},
			// 关闭提示面板按钮 
			cancelTipViewBtn: {
				tap:'cancelTipView'
			},
			// 手动输入按钮
			medManualBtn: {
				tap:'showAddMedPanel'
			},
			// 二维码输入按钮
			med2code: {
				
			},
			// 增加药品按钮
			addMedBtn: {
				tap: 'addMed'
			},
			//修改药品按钮
			alterMedDetailBtn: {
				tap: 'alterMed'
			}
		},
		
		routes: {
        	 'medicineDetail': 'showMedicineListview'
       },
	},
	
	/* 返回到药箱列表页面 */
	backToMedBox: function(){
		this.redirectTo('medicine');
		Ext.Viewport.remove(Ext.getCmp('medicineListView'));
	},
	/* 加载药品列表 */
	loadMedListL: function(){
		// 获取药箱Id
    	var medBoxId = sessionStorage.getItem("medBoxId");
    	// 更新药品列表数据
    	Ext.getStore("medDetailStore").reload(medBoxId);
    	var medList = Ext.getCmp('medList');
    	medList.setStore('medDetailStore');
	},
	/* 返回到药品列表页面 */
	backToMedList: function(){
		this.loadMedListL();
		Ext.getCmp("medicineListView").animateActiveItem(Ext.getCmp('medDetailListPanel'),{
			type:'slide',
			direction:'right'
		});
	},
	/* 显示药品页面列表 */
    showMedicineListview: function(){
    	// 更新页面
    	Ext.Viewport.setActiveItem(this.getMedicinelistview());
    	this.loadMedListL();
    },
    /* 显示药品详情*/
    showMedDetail:function(obj,index, target, record, e, eOpts){
		var medId = record.data.id;
		sessionStorage.setItem("medId",medId);
		console.log(medId);
		// 查看药品详情
		Ext.getCmp("medicineListView").animateActiveItem(Ext.getCmp('showMedDetailPanel'),{
			type:'slide',
			direction:'left'
		});
		//显示药品详情
		Ext.getStore("medSingleStore").load({
		 	params:{medId:medId},
			callback: function(records,operation,success){
		 		Ext.getCmp('medType').setValue(records[0].data.type);
		   		Ext.getCmp('medNameFeild').setValue(records[0].data.name);
				Ext.getCmp('medDeadline').setValue(records[0].data.deadline);
				Ext.getCmp('medFunctionFeild').setValue(records[0].data.function);
			}
		});
							
	 },
	 /* 动画显示添加药品列表 */
	 showAnimateTip:function(){
		Ext.getCmp('medAddTip').addCls('show');
	 },
	 /* 关闭提示面板 */
	 cancelTipView: function(){
		Ext.getCmp('medAddTip').removeCls('show');
	 },
	 /* 手动输入面板 */
	showAddMedPanel: function(){
		Ext.getCmp("medicineListView").animateActiveItem(Ext.getCmp('addMedDetailPanel'),{
			type:'slide',
			direction:'left'
		});
	},
	/* 增加药品 */
     addMed: function(){
   		// 获取药箱Id
    	var medBoxId = sessionStorage.getItem("medBoxId");
   		var name = Ext.getCmp('medNameFeild2').getValue();
   		var type = Ext.getCmp('medType2').getValue();
   		var deadline = Ext.getCmp('medDeadline2').getValue();
   		var func = Ext.getCmp('medFunctionFeild2').getValue();
   		var medAction = this;
   		Ext.data.JsonP.request({
			url:domain+'MedicineTestAction/addMedicine',
			params:{
				name:name,
				func:func,
				type:type,
				deadline:deadline,
				medBoxId:medBoxId
			},
			success:function(result){
				if(result.result == 1){
					medAction.backToMedList();
				}
				else{
					Ext.Msg.alert("添加失败!");
				}
			}
		});
     },
     /* 修改药品 */
    alterMed: function(){
    	//获取药品Id
   		var medId = sessionStorage.getItem("medId");
    	// 获取药箱Id
    	var medBoxId = sessionStorage.getItem("medBoxId");
   		var name = Ext.getCmp('medNameFeild').getValue();
   		var type = Ext.getCmp('medType').getValue();
   		var deadline = Ext.getCmp('medDeadline').getValue();
   		var func = Ext.getCmp('medFunctionFeild').getValue();
   		var medAction = this;
   		Ext.data.JsonP.request({
			url:domain+'MedicineTestAction/alterMedicine',
			params:{
				name:name,
				func:func,
				type:type,
				deadline:deadline,
				medBoxId:medBoxId,
				medId:medId
			},
			success:function(result){
				if(result.result == 1){
					medAction.backToMedList();
				}
				else{
					Ext.Msg.alert("添加失败!");
				}
			}
		});
    },
     /* 删除药品 */
     delMed: function(){
   		//获取药品Id
   		var medId = sessionStorage.getItem("medId");
   		var medAction = this;
   		Ext.data.JsonP.request({
			url:domain+'MedicineTestAction/delMedById',
			params:{
				id:medId
			},
			success:function(result){
				if(result.result == 1){
					medAction.backToMedList();
				}
				else{
					Ext.Msg.alert("删除失败!");
				}
			}
		});
      }
});
