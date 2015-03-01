/**
* 初始化文件封装方法
* @author Tanshichang
*/
document.addEventListener('deviceready', initializeFileMethods, false);

function initializeFileMethods(){

    //封装读文件的方法
    window.readFileText = function(filePath, successCallback, failCallback){
        var p ;
        if(window.LocalFileSystem == undefined){
            p = window.PERSISTENT ;
        }else{
            p = window.LocalFileSystem.PERSISTENT ;
        }
        window.requestFileSystem( p, 0, function(fileSystem){
            //默认限制在CFA目录下
            fileSystem.root.getFile("CFA/"+filePath, null, function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = function(evt) {
                        successCallback(evt.target.result);
                    };
                    reader.readAsText(file, "UTF8");
                }, failCallback);
            }, failCallback);
        }, failCallback);
    } ;

    //封装写文件的方法,覆盖写法
    window.writeTextToFile = function(filePath, text, successCallback, failCallback){
        var p ;
        if(window.LocalFileSystem == undefined){
            p = window.PERSISTENT ;
        }else{
            p = window.LocalFileSystem.PERSISTENT ;
        }
        window.requestFileSystem( p, 0, function(fileSystem){
            //默认限制在CFA目录下
            fileSystem.root.getFile("CFA/"+filePath, {create:true, exclusice:false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = successCallback ;
                    writer.write(text) ;
                }, failCallback) ;

            }, failCallback);
        }, failCallback);
    }

    //封装写文件的方法,追加写法
    window.appendTextToFile = function(filePath, text, successCallback, failCallback){
        var p ;
        if(window.LocalFileSystem == undefined){
            p = window.PERSISTENT ;
        }else{
            p = window.LocalFileSystem.PERSISTENT ;
        }
        window.requestFileSystem( p, 0, function(fileSystem){
            //默认限制在CFA目录下
            fileSystem.root.getFile("CFA/"+filePath, {create:true, exclusice:false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = successCallback ;
                    writer.seek(writer.length) ;
                    writer.write(text) ;
                }, failCallback) ;

            }, failCallback);
        }, failCallback);
    }

    window.deleteFile = function(filePath, successCallback){
        var p ;
        if(window.LocalFileSystem == undefined){
            p = window.PERSISTENT ;
        }else{
            p = window.LocalFileSystem.PERSISTENT ;
        }
        function failCallback(error){
            console.log("delete file fail : " + filePath + "\t; code : " + error.code) ;
        } ;
        window.requestFileSystem( p, 0, function(fileSystem){
            //默认限制在CFA目录下
            fileSystem.root.getFile("CFA/"+filePath, {create:true, exclusice:false}, function(fileEntry){
                fileEntry.remove(function(evt){
                    // delete file : success callback
                    console.log("delete file done : " + filePath) ;
                    successCallback() ;
                }, failCallback) ;
            }, failCallback);
        }, failCallback);
    }
}//initializeFileMethods