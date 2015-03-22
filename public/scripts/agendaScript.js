/**
* 日程脚本，封装方法用于读写日程
* @author Tanshichang
* @since 2015-02-27
*/
// console.log("开始定义Agenda") ;
function Agenda(title, description, startTime, endTime, type, remindMinutes, userId){
	this.title = title;
	this.description = description ;
	this.startTime = startTime ;
	this.endTime = endTime ;
	this.type = type ;
	this.remindMinutes = remindMinutes ;
	this.userId = userId ;
	this.id = "" ;

	me = this ;
	this.create = function(successCallback, failCallback){
		/*创建日程
			先保存到服务器，再保存到本地
		*/
		//保存到服务器
		//...
		// console.log("开始1: Agenda.create") ;
		var am = Ext.create('cfa.model.AgendaModel',{
     		name : '' ,
     		type : ''
     	}) ;
     	// console.log("开始2: Agenda.create") ;

     	am.create(me.title, me.description, me.startTime, me.endTime, me.type, me.remindMinutes, me.userId, function(resultId){
     		//create agenda to server : success callback
     		//保存到本地

            var sa = "" ; 	//string of agenda

            /* 必须按照这样的顺序：
			 * title, description, startTime, endTime, type, remindMinutes, userId
             */
            sa = "id="+ resultId+"\ntitle=" + title + "\ndescription=" + description + "\nstartTime="
            	+ startTime + "\nendTime=" + endTime + "\ntype=" + type 
            	+ "\nremindMinutes=" + remindMinutes + "\nuserId=" + userId ;
            // console.log("writeCommandToFile") ;
            me.writeCommandToFile(sa, me.OP_TYPE_ADD, successCallback, failCallback) ;

			
     	}, function(result){
     		//create agenda to server : faile callback
     		console.log("服务器：创建日程失败") ;
     		failCallback() ;
     	}) ;
     	// console.log("开始3: Agenda.create") ;
     }; //this.create

	this.update = function(successCallback, failCallback){
		/*
			更改日程
		*/
		var am = Ext.create('cfa.model.AgendaModel',{
     		name : '' ,
     		type : ''
     	}) ;
     	am.update(this.id, this.title, this.description, this.startTime, this.endTime, this.type, this.remindMinutes, this.userId, function(resultId){
     		// update server agenda : success
     		var sa = "id="+ resultId+"\ntitle=" + title + "\ndescription=" + description + "\nstartTime="
            	+ startTime + "\nendTime=" + endTime + "\ntype=" + type 
            	+ "\nremindMinutes=" + remindMinutes + "\nuserId=" + userId ;

            me.writeCommandToFile(sa, me.OP_TYPE_UPDATE, successCallback, failCallback) ;
     	}, function(result){
     		// update server agenda : fail
     		console.log("服务器：更新日程失败") ;
     		failCallback() ;
     	}) ;
	} ; // this.update

	this.delete = function(successCallback, failCallback){
		/*
			删除日程
		*/
		var am = Ext.create('cfa.model.AgendaModel',{
     		name : '' ,
     		type : ''
     	}) ;
     	am.delete(this.id, function(){
     		// delete server agenda : success
     		var sa = "id=" + id + "\ntitle=" + title + "\ndescription=" + description + "\nstartTime="
            	+ startTime + "\nendTime=" + endTime + "\ntype=" + type 
            	+ "\nremindMinutes=" + remindMinutes + "\nuserId=" + userId ;

            me.writeCommandToFile(sa, me.OP_TYPE_DELETE, successCallback, failCallback) ;
     	}, function(){
     		// delete server agenda : fail
     		failCallback() ;
     	}) ;

	} ; //this.delete



	this.writeCommandToFile = function(str, opType, successCallback, failCallback){
		var fname = "" ;
		// signal file name， 用于标记命令正在写入，Java代码先不读取文件内容，确保同步
		var sfname = "" ;
		if(opType == Agenda.prototype.OP_TYPE_ADD){
			fname = "agenda/addAgenda_" + new Date().getTime() ;
		}else if(opType == Agenda.prototype.OP_TYPE_UPDATE){
			fname = "agenda/updateAgenda_" + new Date().getTime() ;
		}else if(opType == Agenda.prototype.OP_TYPE_DELETE){
			fname = "agenda/deleteAgenda_" + new Date().getTime() ;
		}else{
			return ;
		}
		sfname = fname + "_s" ;
		window.writeTextToFile(sfname, "1", function(evt){
	            // create signal file : success callback
	            // console.log("write user id(" + userId + ") to file done!") ;
	            window.appendTextToFile(fname, str, function(evt){
	            	// write to command file : success callback
	            	//写入命令完毕，删除记号文件
	            	window.deleteFile(sfname, successCallback) ;
	            }, function(error){
	            	// write to command file : fail callback
	            	console.log("fail to write to file : " + fname) ;
	            	failCallback() ;
	            }) ;

	        }, function(error){
	            // create signal file : fail callback
	            console.log("fail to write to file : " + sfname) ;
	            failCallback() ;
	        }) ;
	} // this.writeCommandToFile
}// function Agenda

/** 日程事件类型：接种疫苗 */
Agenda.prototype.AGENDA_TYPE_VACCINATION = 1 ;
/** 日程事件类型：药品过期 */
Agenda.prototype.AGENDA_TYPE_MEDECINE_STALE = 2 ;
Agenda.prototype.OP_TYPE_ADD = 1 ;
Agenda.prototype.OP_TYPE_DELETE = 2 ;
Agenda.prototype.OP_TYPE_UPDATE = 3 ;
// console.log("定义Agenda完成") ;