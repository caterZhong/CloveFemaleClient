//启动10秒后，等待一切均已初始化成功之后测试
setTimeout(testAddAgenda, 1000*10) ;


function testAddAgenda(){
    var user = Ext.getStore('User') ;
    var userRefreshListener =  function(){
        var userId = user.getAt(0).data.id ;
        var userName = user.getAt(0).data.userName ;
        var email = user.getAt(0).data.email ;
        window.writeTextToFile("user.txt", "id="+userId+"\nname="+userName+"\nemail="+email, function(evt){
            //success callback
            console.log("write user id(" + userId + ") to file done!") ;
            addTestAgenda(userId) ;
        }, function(error){
            //fail callback
            console.log("fail to write userId to file.") ;
        }) ;
        user.removeListener("refresh", userRefreshListener) ;
    }
    user.addListener("refresh", userRefreshListener) ;
    user.getTestUser() ;
    
}

function addTestAgenda(userId){
    var title = "test add agenda 021" ;
    var description = "this is test add agenda 021's description." ;
    var startTime = new Date().getTime() ;
    var endTime = startTime + 30*60*1000 ;
    var type = Agenda.prototype.AGENDA_TYPE_MEDECINE_STALE ;
    var remindMinutes = 30 ;

    console.log("开始: addTestAgenda") ;
    var agenda = new Agenda(title, description, startTime, endTime, type, remindMinutes, userId) ;
    agenda.create(function(){
        //agenda.create's success callback
        console.log("agenda.create success") ;
    }, function(){
        //agenda.create's fail callback
        console.log("agenda.create fail") ;
    }) ;
}