var ratio = 0.65 ;
var pointsAreaWidth = 0 ;
var hblankRatio = 0.25;

var dialContinueBtn = {
    text:"继续",
    cls:'dialBtn disabled', 
    handler:function(){
    if(LockPoint.prototype.toSetup){
        if(LockPoint.prototype.psw2 == null && LockPoint.prototype.psw1 != null){
            // LockPoint.prototype.psw1 = passwd ;
            //这是第一次成功之后的，提示画第二次
            // console.log("请再次绘制图案进行确认") ;
            LockPoint.prototype.resetFor2ndInput() ;
            Ext.getCmp('dial-locker-component').setInfo("请再次绘制图案进行确认") ;
            Ext.getCmp('dialBottomToolBar').removeAll() ;
        }
    }
}} ;
var dialRetryBtn = {
    text:"重试",
    cls:'dialBtn disabled', 
    handler:function(){
    if(LockPoint.prototype.toSetup){
        if(LockPoint.prototype.psw2 == null){
            Ext.getCmp('dial-locker-component').setInfo("绘制解锁图案") ;
            // console.log("绘制解锁图案") ;
            LockPoint.prototype.reset() ;
            Ext.getCmp('dialBottomToolBar').removeAll() ;
        }else{
            //这是第二次绘制失败之后的，回复第二次初始状态
            LockPoint.prototype.resetFor2ndInput() ;
            // console.log("请再次绘制图案进行确认") ;
            Ext.getCmp('dial-locker-component').setInfo("请再次绘制图案进行确认") ;
            Ext.getCmp('dialBottomToolBar').removeAll() ;
        }
    }else{
        LockPoint.prototype.reset() ;
        Ext.getCmp('dialBottomToolBar').removeAll() ;
    }
}} ;
var dialCancelBtn = {
    text:"取消",
    cls:'dialBtn', 
    handler:function(){
    if(LockPoint.prototype.toSetup){
        // console.log("Cancel") ;
        Ext.getCmp('dial-locker-component').cancelCallback() ;
    }
}} ;
var dialConfirmBtn = {
    text:'确定',
    cls:'dialBtn',
    handler:function(){
        // console.log("Confirmed! Everything is done!") ;
        Ext.getCmp('dial-locker-component').successCallback(LockPoint.prototype.psw1) ;
        // Ext.getCmp('dial-locker').destroy() ;
        // Ext.Msg.alert("tt", "passwrod is : " + LockPoint.prototype.psw1) ;
    }
};

function LockPoint(index, rowNum, colNum){
    //index 从0起
    this.index = index ,
    this.alive = false ,
    // this.x = Math.round(( index % colNum + 1 ) / (colNum+1) * LockPoint.prototype.canvasWidth) ,
    // this.y = Math.round(Math.floor( index / rowNum + 1 ) / (rowNum+1) * LockPoint.prototype.canvasHeight) ,
    this.x = Math.round(( index % colNum ) / (colNum - 1)  * pointsAreaWidth  + (LockPoint.prototype.canvasWidth - pointsAreaWidth) / 2) ,
    this.y = Math.round(Math.floor( index / rowNum) / (rowNum - 1)  * pointsAreaWidth  + hblankRatio * LockPoint.prototype.canvasHeight) ,
    this.self = this,

    this.isPointToMe = function(absx, absy){
        // console.log("absx :" + absx + "; absy : " + absy + "; baseX : " + LockPoint.prototype.baseX + "; baseY : " + LockPoint.prototype.baseY) ;
        var transx = parseInt(absx) - LockPoint.prototype.baseX ;
        var transy = parseInt(absy) - LockPoint.prototype.baseY ;
        // console.log("tanse : " + transx + " : " + transy) ;
        // console.log("distance : " + (Math.pow((transx - this.x), 2) + Math.pow((transy - this.y), 2))) ;
        if(Math.pow((transx - this.x), 2) + Math.pow((transy - this.y), 2) <= LockPoint.prototype.radiusSquar){
            return true ;
        }else{
            return false ;
        }
    },

    this.drawPoint = function(alive){
        // console.log("drawPoint x : " + this.x + "\ty : " + this.y) ;
        // console.log("1. " + (this.prototype.surface == window.fface)) ;
        var dfstyle = null ;
        if(alive != undefined && alive == true){
            dfstyle = LockPoint.prototype.fillStyleAlive ;
        }else{
            dfstyle = LockPoint.prototype.fillStyleDead ;
        }
        if(this.self.alive != alive){
            LockPoint.prototype.cmp.getSurface('overlay').element.setStyle({zIndex: 1});
            LockPoint.prototype.cmp.getSurface('overlay').add({
                    type        : 'circle',
                    cx          : this.x,
                    cy          : this.y,
                    lineWidth   : 0.382*LockPoint.prototype.radius ,
                    r           : LockPoint.prototype.radius,
                    strokeStyle : LockPoint.prototype.strokeStyle,
                    fillStyle   : dfstyle
                });
            LockPoint.prototype.cmp.getSurface('overlay').renderFrame() ;
        }
    },

    this.startFromMe = function(){
        // console.log("start : " + this.index) ;
        this.activate() ;
    },

    this.activate = function(){
        this.drawPoint(true) ;
        this.alive = true ;
    },

    this.changeToError = function(){
        LockPoint.prototype.cmp.getSurface('overlay').element.setStyle({zIndex: 1});
        LockPoint.prototype.cmp.getSurface('overlay').add({
                type        : 'circle',
                cx          : this.x,
                cy          : this.y,
                lineWidth   : 0.382*LockPoint.prototype.radius ,
                r           : LockPoint.prototype.radius,
                strokeStyle : LockPoint.prototype.strokeStyle,
                fillStyle   : LockPoint.prototype.fillStyleError
            });
        LockPoint.prototype.cmp.getSurface('overlay').renderFrame() ;
    }

}

LockPoint.prototype.baseX           = 0 ;       //canvas原点相对页面的X坐标
LockPoint.prototype.baseY           = 0 ;       //canvas原点相对页面的Y坐标
LockPoint.prototype.canvasWidth     = 100 ;     //canvas的宽
LockPoint.prototype.canvasHeight    = 100 ;     //canvas的高
LockPoint.prototype.surface         = null ;    //Ext.draw.Surface
LockPoint.prototype.radius          = 10 ;      //范围半径
LockPoint.prototype.radiusSquar     = 100 ;     //半径的平方
LockPoint.prototype.cmp             = null ;    //对绘图组件的引用
// LockPoint.prototype.sprite          = null ;    //
LockPoint.prototype.strokeStyle     = new Ext.draw.Color(224, 224, 224) ;       //圆点外框颜色
LockPoint.prototype.fillStyleAlive  = new Ext.draw.Color(13, 159, 80) ;         //圆点激活时的填充颜色
LockPoint.prototype.fillStyleDead   = new Ext.draw.Color(253, 253, 253) ;       //圆点非激活时的填充颜色
LockPoint.prototype.fillStyleError  = new Ext.draw.Color(224, 62, 62) ;         //圆点错误时的填充颜色
LockPoint.prototype.lineStyleAlive  = new Ext.draw.Color(8, 163, 78, 0.2) ;     //激活状态时的路径颜色
LockPoint.prototype.lineStyleError  = new Ext.draw.Color(255, 48, 48, 0.2) ;     //错误状态时的路径颜色
LockPoint.prototype.toSetup         = true ;        //是否作为设定密码之用，如果是，则此次调用行为是输入两次相同的密码
LockPoint.prototype.points          = [] ;          //九宫格里所有点
LockPoint.prototype.activePoints    = [] ;          //激活的点的数组
LockPoint.prototype.pathEnded       = false ;       //路径已停止了吗
LockPoint.prototype.path            = null ;        //对路径图形的引用
LockPoint.prototype.psw             = null ;        //密码
LockPoint.prototype.psw1            = null ;        //密码
LockPoint.prototype.psw2            = null ;        //密码

/**
设置半径，这时会同步把半径的平方也算出来
*/
LockPoint.prototype.setRadius = function(v){
    LockPoint.prototype.radius = v ;
    LockPoint.prototype.radiusSquar = v*v ;
}

/**
检验触摸事件，用于生成路径的起点
*/
LockPoint.prototype.validateTouch = function(absx, absy){
    // console.log("validate touch 1") ;
    if(LockPoint.prototype.pathEnded == false){
        // console.log("validate touch 2") ;
        for(i = 0 ; i < LockPoint.prototype.points.length ; i++){
            // console.log("validate touch 3, isPointToMe("+absx+", "+absy+")" + LockPoint.prototype.points[i].isPointToMe(absx, absy)) ;
            if(LockPoint.prototype.points[i].isPointToMe(absx, absy) && LockPoint.prototype.points[i].alive == false){
                // console.log("validate touch 4") ;
                if(LockPoint.prototype.activePoints.length == 0){
                    // console.log("aaaaaa1") ;
                    LockPoint.prototype.points[i].activate() ;
                    LockPoint.prototype.activePoints.push(LockPoint.prototype.points[i]) ;
                    LockPoint.prototype.points[i].startFromMe() ;
                }
                break ;
            }
        }
        if(i >= LockPoint.prototype.points.length){
            //没有命中
            // console.log("touch missed! absx:" + absx + ", absy:"+absy) ;
        }
    }
} ;

/**
触摸事件停止时进行检验，无论是单点一下还是拖拽之后放手，都会触发
*/
LockPoint.prototype.validateTouchEnd = function(){
    if(LockPoint.prototype.activePoints.length > 0 && LockPoint.prototype.path == null){
        //这时只点击了一个点
        // LockPoint.prototype.activePoints[0].changeToError() ;
        // console.log("只点击了一个点") ;
        LockPoint.prototype.endDrag() ;
    }
};

/**
检验拖拽事件，用于生成持续的路径
*/
LockPoint.prototype.validateDrag = function(absx, absy){
    if(LockPoint.prototype.pathEnded == false && LockPoint.prototype.activePoints.length > 0){
        var shot = false ;
        for(i = 0 ; i < LockPoint.prototype.points.length ; i++){
            // console.log("(" + absx + "," +absy + ") is point " + points[i].index + " : " + points[i].isPointToMe(absx, absy)) ;
            if(LockPoint.prototype.points[i].isPointToMe(absx, absy) && LockPoint.prototype.points[i].alive == false){
                shot = true ;

                //先判断是否跨点了，例如从左上角连到右下角，那么中间的点应该自动加上
                var lastIndex = LockPoint.prototype.activePoints[LockPoint.prototype.activePoints.length - 1].index ;
                //只有三种情况：同行、同列、同对角线
                if(Math.abs(i - lastIndex) == 2 && Math.floor(i/3) == Math.floor(lastIndex/3)){
                    //同行
                    if(LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 1].alive == false){
                        LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 1].activate() ;
                        LockPoint.prototype.activePoints.push(LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 1]) ;
                    }
                }else if(Math.abs(i - lastIndex) == 6 && i % 3 == lastIndex % 3){
                    //同列
                    if(LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 3].alive == false){
                        LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 3].activate() ;
                        LockPoint.prototype.activePoints.push(LockPoint.prototype.points[(i > lastIndex ? i : lastIndex) - 3]) ;
                    }
                }else if((i == 0 && lastIndex == 8) || (i == 8 && lastIndex == 0)){
                    //左上到右下的对角线
                    if(LockPoint.prototype.points[4].alive == false){
                        LockPoint.prototype.points[4].activate() ;
                        LockPoint.prototype.activePoints.push(LockPoint.prototype.points[4]) ;
                    }
                }else if((i == 2 && lastIndex == 6) || (i == 6 && lastIndex == 2)){
                    //右上到左下的对角线
                    if(LockPoint.prototype.points[4].alive == false){
                        LockPoint.prototype.points[4].activate() ;
                        LockPoint.prototype.activePoints.push(LockPoint.prototype.points[4]) ;
                    }
                }

                LockPoint.prototype.activePoints.push(LockPoint.prototype.points[i]) ;
                LockPoint.prototype.points[i].activate() ;
                LockPoint.prototype.drawPath(LockPoint.prototype.generatePathPoints()) ;
                break ;
            }
        }
        if(shot == false && LockPoint.prototype.activePoints.length > 0){
            LockPoint.prototype.lineToFinger(absx, absy) ;
        }
    }
};

/**
生成用于绘制路径的SVG数组
*/
LockPoint.prototype.generatePathPoints = function(){
    var ps = [] ;
    ps.push('M') ;
    ps.push(LockPoint.prototype.activePoints[0].x) ;
    ps.push(LockPoint.prototype.activePoints[0].y) ;
    for(i = 1 ; i < LockPoint.prototype.activePoints.length; i++){
            ps.push(LockPoint.prototype.activePoints[i].x) ;
            ps.push(LockPoint.prototype.activePoints[i].y) ;
    }
    ps.push('C') ;  
    return ps ;
};

/**
把路径画到手指所在之处
*/
LockPoint.prototype.lineToFinger = function(absx, absy){
    // console.log("line to fingure") ;
    if(LockPoint.prototype.pathEnded == false){
        var ps = [] ;
        ps = LockPoint.prototype.generatePathPoints() ;
        var transx = absx - LockPoint.prototype.baseX ;
        var transy = absy - LockPoint.prototype.baseY ;
        var len = ps.length ;
        ps.splice(len-1, 0, transx) ;
        ps.splice(len, 0, transy) ;
        LockPoint.prototype.drawPath(ps) ;
    }
}

/**
终止路径，不再响应触摸和拖拽动作，开始检验结果
*/
LockPoint.prototype.endDrag = function(){
    if(LockPoint.prototype.activePoints.length == 0){
        return ;
    }
    LockPoint.prototype.pathEnded = true ;
    var ps = LockPoint.prototype.generatePathPoints() ;
    LockPoint.prototype.drawPath(ps) ;
    if(LockPoint.prototype.activePoints.length < 4){
        //至少需要四位长度
        // console.log("至少需要四位长度") ;
        Ext.getCmp('dial-locker-component').setInfo("至少需要连接4个点，请重试") ;
        Ext.getCmp('dialBottomToolBar').removeAll() ;
        Ext.getCmp('dialBottomToolBar').add(dialContinueBtn) ;
        Ext.getCmp('dialBottomToolBar').add(dialRetryBtn) ;
        LockPoint.prototype.changePathToError() ;
    }else{
        var passwd = "" ;
        //把图形转换为数字密码
        for(i = 0 ; i < LockPoint.prototype.activePoints.length ; i++){
            passwd += LockPoint.prototype.activePoints[i].index ;
        }
        // console.log("password is : " + passwd) ;

        if(LockPoint.prototype.toSetup){
            if(LockPoint.prototype.psw1 == null){
                LockPoint.prototype.psw1 = passwd ;
                // LockPoint.prototype.resetFor2ndInput() ;

                //第一次输入合法
                // console.log("现在输入第二次密码") ;
                Ext.getCmp('dial-locker-component').setInfo("图案已记录") ;
                Ext.getCmp('dialBottomToolBar').removeAll() ;
                Ext.getCmp('dialBottomToolBar').add(dialContinueBtn) ;
                Ext.getCmp('dialBottomToolBar').add(dialRetryBtn) ;
            }else{
                if(LockPoint.prototype.psw1 == passwd){
                    //密码核对一致
                    // console.log("密码一致") ;
                    Ext.getCmp('dial-locker-component').setInfo("您的新解锁图案") ;
                    LockPoint.prototype.psw2 = passwd ;
                    Ext.getCmp('dialBottomToolBar').removeAll() ;
                    Ext.getCmp('dialBottomToolBar').add(dialConfirmBtn) ;
                    Ext.getCmp('dialBottomToolBar').add(dialCancelBtn) ;
                }else{
                    // console.log("与第一次输入不一致，请重输") ;
                    // console.log("第一次：" + LockPoint.prototype.psw1 + ", 第二次：" + passwd) ;
                    Ext.getCmp("dial-locker-component").setInfo("两次输入不一致，请重新绘制") ;
                    LockPoint.prototype.changePathToError() ;
                    /*setTimeout(function(){
                        LockPoint.prototype.resetFor2ndInput() ;
                    }, 2000) ;*/
                    LockPoint.prototype.psw2 = passwd ;
                    Ext.getCmp('dialBottomToolBar').removeAll() ;
                    Ext.getCmp('dialBottomToolBar').add(dialContinueBtn) ;
                    Ext.getCmp('dialBottomToolBar').add(dialRetryBtn) ;
                }
            }
        }else{
            //不是用于设定密码的，即用于验证密码
            Ext.getCmp('dial-locker-component').successCallback(passwd) ;
            // Ext.getCmp('dial-locker').destroy() ;
        }
    }
}

//绘制路径
//ps为SVG数组
//error指明是否为错误路径，默认为false，即正确
LockPoint.prototype.drawPath = function(ps, error){
    if(LockPoint.prototype.path == undefined){
        var pstyle = LockPoint.prototype.lineStyleAlive ;
        if(error != undefined && error == true){
            pstyle = LockPoint.prototype.lineStyleError ;
        }
        LockPoint.prototype.path = LockPoint.prototype.cmp.getSurface('overlay').add({
            type: 'path',
            path: ps,
            lineWidth: LockPoint.prototype.radius * 2 ,
            lineCap: 'round',
            lineJoin: 'round',
            strokeStyle: pstyle
        });
    }else{
        if(error != undefined && error == true){
            LockPoint.prototype.path.setAttributes({
                strokeStyle:LockPoint.prototype.lineStyleError
            });
        }
        LockPoint.prototype.path.setAttributes({
            path: ps
        });
    }
    if (Ext.os.is.Android) {
        Ext.draw.Animator.schedule(function () {
            this.getSurface('overlay').renderFrame();
        }, LockPoint.prototype.cmp);
    } else {
        LockPoint.prototype.cmp.getSurface('overlay').renderFrame();
    }
}

LockPoint.prototype.showError = function(text){
    LockPoint.prototype.changePathToError() ;
    Ext.getCmp('dialBottomToolBar').removeAll() ;
    Ext.getCmp('dialBottomToolBar').add(dialCancelBtn) ;
    Ext.getCmp('dialBottomToolBar').add(dialRetryBtn) ;
    Ext.getCmp('dial-locker-component').setInfo(text) ;
}

LockPoint.prototype.reset = function(){
    // var draw = Ext.getCmp('dial-locker-component');
    LockPoint.prototype.cmp.getSurface().destroy();
    LockPoint.prototype.cmp.getSurface('overlay').destroy();
    LockPoint.prototype.cmp.renderFrame();
    LockPoint.prototype.init() ;
}

LockPoint.prototype.resetFor2ndInput = function(){
    var passwd = LockPoint.prototype.psw ;
    var passwd1 = LockPoint.prototype.psw1 ;
    if(passwd1 != null && passwd1.length >= 4){
        LockPoint.prototype.reset() ;
        LockPoint.prototype.psw1 = passwd1 ;
    }else if(passwd != null && passwd.length >= 4){
        LockPoint.prototype.reset() ;
        LockPoint.prototype.psw1 = passwd1 ;
    }else{
        console.error("错误的调用(LockPoint.prototype.resetFor2ndInput,passwd=" + passwd + ",passwd1=" + passwd1 + ")") ;
    }
}

LockPoint.prototype.init = function(){
    if(LockPoint.prototype.canvasHeight > LockPoint.prototype.canvasWidth){
        ratio = 0.6 ;
        hblankRatio = 0.35;
    }else{
        ratio = 0.35 ;
    }
    pointsAreaWidth = Math.round(ratio * (LockPoint.prototype.canvasWidth < LockPoint.prototype.canvasHeight ? LockPoint.prototype.canvasWidth : LockPoint.prototype.canvasHeight )) ;
    if(hblankRatio * LockPoint.prototype.canvasHeight + pointsAreaWidth > LockPoint.prototype.canvasHeight - LockPoint.prototype.radius * 2){
        hblankRatio = (LockPoint.prototype.canvasHeight - LockPoint.prototype.radius * 2 - pointsAreaWidth) / LockPoint.prototype.canvasHeight ;
    }
    // console.log("ratio : " + ratio + ", pointsAreaWidth : " + pointsAreaWidth) ;
    // console.log("canvasWidth : " + LockPoint.prototype.canvasWidth + ", canvasHeight : " + LockPoint.prototype.canvasHeight) ;
    LockPoint.prototype.points          = [] ;      //九宫格里所有点
    LockPoint.prototype.activePoints    = [] ;      //激活的点的数组
    LockPoint.prototype.pathEnded       = false ;       //路径已停止了吗
    LockPoint.prototype.path            = null ;        //对路径图形的引用
    LockPoint.prototype.psw             = null ;        //密码
    LockPoint.prototype.psw1             = null ;        //密码
    LockPoint.prototype.psw2             = null ;        //密码
    for(i = 0 ; i < 9 ; i++){
        var point = new LockPoint(i, 3, 3) ;
        point.drawPoint() ;
        LockPoint.prototype.points.push(point) ;
    }
    Ext.getCmp('dial-locker-component').setInfo("绘制解锁图案") ;
}

LockPoint.prototype.changePathToError = function(){
    var aps = LockPoint.prototype.activePoints ;
    for(i = 0 ; i < aps.length ; i++){
        aps[i].changeToError() ;
    }
    var ps = LockPoint.prototype.generatePathPoints() ;
    LockPoint.prototype.drawPath(ps, true) ;
}

LockPoint.prototype.setRadius(20) ;     //设置半径为20

//<feature charts>
(function () {

    function smoothenList(points) {
        if (points.length < 3) {
            return ["M", points[0], points[1]];
        }
        var dx = [], dy = [], result = ['M'],
            i, ln = points.length;
        for (i = 0; i < ln; i += 2) {
            dx.push(points[i]);
            dy.push(points[i + 1]);
        }
        dx = Ext.draw.Draw.spline(dx);
        dy = Ext.draw.Draw.spline(dy);
        result.push(dx[0], dy[0], "C");
        for (i = 1, ln = dx.length; i < ln; i++) {
            result.push(dx[i], dy[i]);
        }
        return result;
    }

    var sprite, list = [], old1 = [0, 0], old2 = [0, 0];
    /**
     * Demonstrates smoothening and cubic bezier Curve rendering
     */
    Ext.define('cfa.view.lock.DialLockerComponent', {
        extend: 'Ext.draw.Component',
        config: {
            background: 'white',
            width:400,
            height:400,
            cantered:true,
            listeners: {
                element: 'element',
                'touchstart': function (e) {
                    // console.log("touchStart") ;
                    LockPoint.prototype.validateTouch(e.pageX, e.pageY) ;
                },
                'touchend': function(e){
                    // console.log("touch end") ;
                    // console.log("path == null ? " + (LockPoint.prototype.path == null)) ;
                    LockPoint.prototype.validateTouchEnd() ;
                },
                'drag': function (e) {
                    var p = e.touches[0].point;
                    LockPoint.prototype.validateDrag(p.x, p.y) ;
                },
                'dragend': function (e) {
                    // console.log("dragend") ;
                    LockPoint.prototype.endDrag() ;
                }
            }
        },

        onResize: function () {
            var size = this.element.getSize();
            this.getSurface().setRegion([0, 0, size.width, size.height]);
            this.getSurface('overlay').setRegion([0, 0, size.width, size.height]);
            this.renderFrame();
        },

        initialize: function(){
            // console.log("component initialize") ;
            var canvas = Ext.getCmp('dial-locker-component') ;
            var len ;
            if(screen.width < screen.height){
                len = 0.92 * screen.width
            }else{
                len = 0.7 * (screen.width < screen.height ? screen.width : screen.height) ;
            }
            canvas.setHeight(screen.height - Ext.getCmp('dialLockTooBak').getHeight() - Ext.getCmp('dialBottomToolBar').getHeight()- window.dialHeadTextPadding - window.dialHeadTextHeight) ; 
            canvas.setWidth(screen.width) ; 

            LockPoint.prototype.baseX = 0 ;
            LockPoint.prototype.baseY = Ext.getCmp('dialLockTooBak').getHeight() + window.dialHeadTextPadding + window.dialHeadTextHeight ;
            LockPoint.prototype.canvasWidth = canvas.getWidth() ;
            LockPoint.prototype.canvasHeight = canvas.getHeight() ;
            LockPoint.prototype.cmp = this ;

            var father = this ;
            setTimeout(function(){
                father.initDraw() ;
                if(LockPoint.prototype.toSetup){
                    father.setInfo("绘制解锁图案") ;
                }else{
                    father.setInfo("请绘制图案") ;
                }
                // LockPoint.prototype.init();
                //必须等到画面出来才能画东西，所以设置个定时，确保画面出来之后才调用
            }, 500) ;
 
        },

        initDraw: function(){
            // console.log("dddddddddd") ;
            LockPoint.prototype.init();
        },

        reset: function(){
            LockPoint.prototype.reset();
        },

        setInfo: function(text){
            //设置提示信息
            document.getElementById('dialHeadText').innerHTML = text ;
        },

        successCallback: function(psw){
            Ext.Msg.alert("OK", "successCallback(" + psw + ")") ;
        },

        cancelCallback: function(){
            // Ext.Msg.alert("OK", "Cancel") ;
            Ext.getCmp("dial-locker").destroy() ; ;
        }

    });
})();


//</feature>