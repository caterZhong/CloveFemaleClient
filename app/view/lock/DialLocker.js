//<feature charts>
window.dialHeadTextPadding = 10 ;
window.dialHeadTextHeight = 60 ;
(function () {

    // var seed = .5, count = 0;

    // function random() {
    //     seed *= 15.1;
    //     seed -= Math.floor(seed);
    //     return seed;
    // }

    // var sprite, list = [], old1 = [0, 0], old2 = [0, 0];

    Ext.define('cfa.view.lock.DialLocker', {
        extend: 'Ext.Panel',
        requires: ['cfa.view.lock.DialLockerComponent'],
        xtype:'dialLocker',
        id:'dial-locker',
        lastEvent: 0,
        config: {
            cls: 'card1',
            layout: 'fit',
            items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    height:47,
                    title:'图案解锁',
                    id:'dialLockToolBar',
                    items: [
                        {
                            text: '返回',
                            handler: function () {
                                /*var draw = Ext.getCmp('dial-locker-component');
                                draw.getSurface().destroy();
                                draw.getSurface('overlay').destroy();
                                draw.renderFrame();*/
                                Ext.getCmp('dial-locker').destroy() ;
                            }
                        }/*,
                        {
                            text: 'Reset',
                            id:'dialResetBtn'
                        }*/
                    ]
                },{
                    xtype:'toolbar',
                    docked: 'bottom',
                    style:'background:white;border:none',
                    height:100,
                    id:'dialBottomToolBar',
                    cls:'dialBottomToolBar',
                    items:[
                    ]
                },{
                    html:'<center id="dialHeadText">&nbsp;</center>',
                    style:'background:white;height:'+ window.dialHeadTextHeight +'px;padding-top:'+window.dialHeadTextPadding+'px;',
                    docked:'top'
                },
                {
                    xclass: 'cfa.view.lock.DialLockerComponent',
                    id: 'dial-locker-component'
                }
            ]
        },

        /**
        是否设置为密码设定模式，默认不是
        如果是，则密码器的行为表现为要求用户输入两次相同的密码
        密码器检验到两次两次密码相同才调用successCallback方法
        */
        setToSetup: function(toSetup){
            LockPoint.prototype.toSetup = toSetup ;
        },

        //设置获取密码之后的响应方法
        //方法的参数是密码字符串
        setSuccessCallback: function(method){
            Ext.getCmp("dial-locker-component").successCallback = method ;
        },

        //可选。设置点击“取消”按钮时的动作
        //默认是退出密码器，设置之后会覆盖默认的方法
        setCancelCallback: function(method){
          Ext.getCmp("dial-locker-component").cancelCallback = method ;  
        },

        //设置屏幕上的提示文本
        setInfo: function(text){
            document.getElementById('dialHeadText').innerHTML = text ;
        },

        //重置密码器
        reset: function(){
            LockPoint.prototype.reset() ;
        },

        //向用户显示警告
        //密码路径会变成红色
        //同时屏幕上会增加“重试”、“取消”两个按钮
        warn: function(text){
            LockPoint.prototype.showError(text) ;
        },

        //销毁密码器
        dispose: function(){
            var locker = Ext.getCmp('dial-locker') ;
            locker.hide() ;
            console.log("locker.hide()") ;
            setTimeout(function(){
                //必须延迟一点调用destroy，否则在安卓的浏览器上会出错
                locker.destroy() ;
                console.log("locker.destroy()") ;
            }, 50) ;
        }
    });
})();
//</feature>


