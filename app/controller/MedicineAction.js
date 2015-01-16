/**
 * 药箱管理
 *
 * @author boxizen
 * @since 2015/01/15
 */
Ext.define('cfa.controller.MedicineAction',{
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
        	}
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
				itemtap: function(obj,index, target, record, e, eOpts){
							//存储药箱id
							sessionStorage.setItem("medBoxId",record.data.id);
							// 获取药品数据
							this.redirectTo('medicineDetail');
							Ext.Viewport.remove(Ext.getCmp('medicineView'));
						},
			}
		},
		
		routes: {
        	 'medicine': 'showMedicineview'
        }
	},
	
	/* 显示药箱页面 */
    showMedicineview: function(){
    	// 更新页面
    	Ext.Viewport.setActiveItem(this.getMedicineview());
    	// 更新药箱列表数据
    	Ext.getStore("medBoxStore").reload();
    	var medboxList = Ext.getCmp('medboxList');
    	medboxList.setStore('medBoxStore');
    },
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
    	// 更新药箱列表数据
    	Ext.getStore("medBoxStore").reload();
    	var medboxList = Ext.getCmp('medboxList');
   		Ext.getCmp("medicineView").animateActiveItem(Ext.getCmp('medBoxListPanel'),{
			type:'slide',
			direction:'right'
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
			url:'http://localhost:9000/MedicineAction/addMedBox',
			params:{
				medBoxName:medBoxName,
				medBoxMark:medBoxMark,
				userId:localStorage.userId
			},
			success:function(result){
				if(result.result == 1){
					Ext.Msg.alert("添加成功!");
				}
				else{
					Ext.Msg.alert("添加失败!");
				}
			}
		});
	}
});
