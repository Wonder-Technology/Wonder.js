/***********************************************
 来自：

 Dota.Drag.js v0.1
 日期：2009.09.15
 修改自cloudgamer的Drag.js


 修改：

 作者：YYC
 电子邮箱：395976266@qq.com
 QQ: 395976266
 日期：2012-10-31
 博客：http://www.cnblogs.com/chaogex/

 ************************************************/

//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}

//加载拖动控件，this._title（标题层）绑定拖动
//handler是dom对象！
//this.drag = new YYC.Control.Drag(v, { handler: tc, cancelBubble: false });

YYC.namespace("Control").Drag = function (dragElement, config) {
    this.drag = YYC.Tool.selector.getDom(dragElement);
    //    this.drag = dragElement;
    this._x = this._y = 0;
    this._martinLeft = this._marginTop = 0;
    this.config = YYC.Tool.extend.extend({
        handler: null, //设置触发对象（不设置则使用拖放对象）
        limit: false, //是否设置范围限制(为true时下面参数有用,可以是负数)
        mxLeft: 0, //左边限制
        mxRight: 9999, //右边限制
        mxTop: 0, //上边限制
        mxBottom: 9999, //下边限制
        mxContainer: "", //指定限制在容器内
        lockX: false, //是否锁定水平方向拖放
        lockY: false, //是否锁定垂直方向拖放
        lock: false, //是否锁定
        transparent: true, //拖动时是否半透明
        cancelBubble: true, //取消冒泡
        onStart: function () {
        }, //开始移动时执行
        onMove: function () {
        }, //移动时执行
        onStop: function () {
        } //结束移动时执行
    }, config || {});

    //如果this.config.handler为jquery对象，则转化为dom对象
//    this.config.handler = (MyGameEngine.Base.IsjQuery(this.config.handler) ? this.config.handler[0] : this.config.handler) || this.drag;
    this.config.handler = YYC.Tool.selector.getDom(this.config.handler) || this.drag;

    this.config.mxContainer = YYC.Tool.selector.getDom(this.config.mxContainer) || null;

    this.drag.style.position = "absolute";
    //如果有容器必须设置position为relative或absolute来相对或绝对定位，并在获取offset之前设置
    //    !this.config.mxContainer || YYC.Tool.selector.getCurrentStyle(this.config.mxContainer).position == "relative" || YYC.Tool.selector.getCurrentStyle(this.config.mxContainer).position == "absolute" || (this.config.mxContainer.style.position = "relative");

    !this.config.mxContainer || $(this.config.mxContainer).css("position") == "relative" || $(this.config.mxContainer).css("position") == "absolute" || ($(this.config.mxContainer).css("position", "relative"));


    this._startHandler = YYC.Tool.event.bindEvent(this, this.start);
    this._moveHandler = YYC.Tool.event.bindEvent(this, this.move);
    this._stopHandler = YYC.Tool.event.bindEvent(this, this.stop);
    this._clickHandler = YYC.Tool.event.bindEvent(this, this.onclick);

    YYC.Tool.event.addEvent(this.config.handler, "mousedown", this._startHandler);
    YYC.Tool.event.addEvent(this.config.handler, "click", this._clickHandler);

//    this.start();
};
YYC.Control.Drag.prototype = {
    isopacity: false,

    setOpacity: function (opacity) {
        //        DOTA.F.setOpacity(this.drag, opacity);
        $(this.drag).css("opacity", opacity);
    },
    onclick: function (oEvent) {
        if (this.config.cancelBubble) {
            //            oEvent.stopPropagation();
            oEvent.stopBubble();
        }
    },
    start: function (oEvent) {
        //        console.log("start");
        //        console.log(oEvent.target);
        var cfg = this.config;
        if (cfg.lock) {
            return;
        }
        //        var evt = YYC.Tool.event.getEvent();
        var evt = oEvent;
        this._x = evt.pageX - $(evt.target).offset().left;
        this._y = evt.pageY - $(evt.target).offset().top;

        //        console.log(this._x, this._y);

        //半透明
        if (cfg.transparent) {
            //            DOTA.F.getOpacity(this.drag);

            //            this.oldOpacity = $(this.drag).css("opacity");

            this.oldOpacity = 1;


            //            this.setOpacity(50);
            this.setOpacity(0.5);
        }

        YYC.Tool.event.addEvent(document, "mousemove", this._moveHandler);
        YYC.Tool.event.addEvent(document, "mouseup", this._stopHandler);

        //console.log(this.drag);

        //$(this.drag).css("cursor", "pointer");

//        console.log(window.frames[0].length);

//        YYC.Tool.event.addEvent(window.frames[0].document, "mousemove", function () {
//            alert("iframe");
//        });
//        YYC.Tool.event.addEvent(cfg.iframe, "mousemove", function () {
//            alert("iframe");
//        });

//        YYC.Tool.event.addEvent(window.frames[0].document, "mousemove", this._moveHandler);

//        YYC.Tool.event.addEvent(cfg.iframe[0].document, "mousemove", this._moveHandler);

//        YYC.Tool.event.addEvent(cfg.iframe.find("iframe").document, "mousemove", function () {
//            alert("iframe");
//        });

        if (cfg.cancelBubble) {
            //			oEvent.stopPropagation();
            oEvent.stopBubble();
        }
        cfg.onStart(evt);
    },

    move: function (oEvent) {
        //        console.log("move");
        //        console.log(arguments[0].pageX);
        var cfg = this.config,
        //			evt = YYC.Tool.event.getEvent();
            evt = oEvent;
        //        console.log(evt);
        //        var x = evt.pageX, y = evt.pageY, o, c;

        var x = evt.pageX - this._x, y = evt.pageY - this._y, o, c;

        //                console.log("this._x = ", this._x, "x = " + x);
        //        console.log("this._y = ", this._y, "y = " + y);

        //        var s = YYC.Tool.selector.getCurrentStyle(this.drag);
        //        x += parseInt(s.left, 10), y += parseInt(s.top, 10);
        //        x = isNaN(x) ? this.drag.offsetLeft : x, y = isNaN(y) ? this.drag.offsetTop : y;

        //清除选择
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        //限制范围
        if (cfg.limit || cfg.mxContainer) {
            o = YYC.Tool.extend.extend({}, cfg);
            if (cfg.mxContainer) {
                if (!this.limit) {
                    o.mxLeft = 0, o.mxTop = 0, o.mxBottom = 9999, o.mxRight = 9999;
                }
                c = YYC.Tool.selector.getCurrentStyle(cfg.mxContainer);

                o.mxLeft = Math.max(o.mxLeft, (isNaN(parseInt(c.left, 10)) ? 0 : parseInt(c.left, 10)));
                o.mxTop = Math.max(o.mxTop, (isNaN(parseInt(c.top, 10)) ? 0 : parseInt(c.top, 10)));
                o.mxRight = Math.min(o.mxRight, cfg.mxContainer.offsetWidth);
                o.mxBottom = Math.min(o.mxBottom, cfg.mxContainer.offsetHeight);
            }
            x = Math.min(Math.max(x, o.mxLeft), o.mxRight - this.drag.offsetWidth);
            y = Math.min(Math.max(y, o.mxTop), o.mxBottom - this.drag.offsetHeight);
        }
        cfg.lockX || (this.drag.style.left = x + "px");
        cfg.lockY || (this.drag.style.top = y + "px");


        //        console.log(evt.pageX);
        //        console.log(evt.offsetLeft);
        //        this._x = evt.pageX, this._y = evt.pageY;

        cfg.onMove(evt);
    },

    stop: function () {
        var cfg = this.config;

        //取消半透明
        if (cfg.transparent) {
            this.setOpacity(this.oldOpacity);
        }

        YYC.Tool.event.removeEvent(document, "mousemove", this._moveHandler);

//        console.log(window.frames[0].length);

//        YYC.Tool.event.removeEvent(window.frames[0], "mousemove", function () {
//            alert("iframe");
//        });


        YYC.Tool.event.removeEvent(document, "mouseup", this._stopHandler);

        //回调事件
        cfg.onStop();
    },

    dispose: function () {
        YYC.Tool.event.removeEvent(this.config.handler, "mousedown", this._startHandler);
        YYC.Tool.event.removeEvent(this.config.handler, "click", this._clickHandler);

        this.drag = this.config.handler = null;
        this._moveHandler = null;
        this._stopHandler = null;
        this._startHandler = null;
        this._clickHandler = null;
    }
};