/***********************************************
 来自：

 DOTA.Button v0.1
 作者：黄健
 日期：2009.09.26
 ＱＱ：573704282
 Email: freewind22@163.com


 修改：

 作者：YYC
 日期：2012-10-31
 电子邮箱：395976266@qq.com
 QQ: 395976266
 博客：http://www.cnblogs.com/chaogex/

 ************************************************/

//示例：

//new YYC.Control.Button({
//    text: "普通视图",

//    className: "button2",
//    width: 80,
//    height: 24
//}).renderTo("commonView");


(function () {
    var Button = YYC.Class({
        Init: function (config) {
            this.config = YYC.Tool.extend.extend({
                id: "",     //按钮的id
                text: "按钮",
                //        value: [],  //传递给onclick的参数
                position: "",
                left: 0,
                top: 0,
                width: 57,
                height: 24,
                //className: ["button1", "button_hover1", "button_down1"],    //正常状态  鼠标移动到按钮上面  鼠标按下按钮
                className: "button1",    //样式类名
                addClass: null,   //增加的css类，用于用户增加按钮样式
                //buttonStyle: 1, //使用第几套默认的Button样式（现在有两套默认样式）；-1表示使用自定义的样式（从className中传入）
                onMouseOver: function (e) {
                },
                onMouseOut: function (e) {
                },
                onclick: function (e) {
                }
            }, config || {});

            this.init();
        },
        Private: {
            _button: null,

            _hoverClass: null,
            _downClass: null,

            _setClass: function () {
                var b = this._button,
                    c = this.config;

                b.className = c.className;

                this._hoverClass = c.className + "_hover";
                this._downClass = c.className + "_down";

                //增加样式
                this.addClass(b, c.addClass);
            },
            _initEvent: function () {
                var b = this._button,
                    evt = YYC.Tool.event;

                this._onMouseOver = evt.bindEvent(this, this.onMouseOver);
                this._onMouseOut = evt.bindEvent(this, this.onMouseOut);
                this._onMouseDown = evt.bindEvent(this, this.onMouseDown);
                this._onMouseUp = evt.bindEvent(this, this.onMouseUp);

                this._initEventClick();

                evt.addEvent(b, "mouseover", this._onMouseOver);
                evt.addEvent(b, "mouseout", this._onMouseOut);
                evt.addEvent(b, "mousedown", this._onMouseDown);
                evt.addEvent(b, "mouseup", this._onMouseUp);
            },
            _initEventClick: function () {
                var evt = YYC.Tool.event;

                this._onclick = evt.bindEvent(this, this.onclick);     //传递参数

                evt.addEvent(this._button, "click", this._onclick);
            },
            _setSize: function () {
                var b = this._button,
                    c = this.config;

                b.style.width = c.width + "px";
                b.style.height = c.height + "px";
                b.style.lineHeight = c.height + "px";

                b.style.backgroundSize = c.width + "px " + c.height * 3 + "px"; //css3属性
            }
        },
        Public: {
            init: function () {
                var b = this._button = document.createElement("div"), c = this.config, evt = YYC.Tool.event;

                //if (c.buttonStyle !== -1) {
                //    c.className = ["DOTA_Button" + c.buttonStyle.toString(), "DOTA_Button_Hover" + c.buttonStyle.toString(), "DOTA_Button_Down" + c.buttonStyle.toString()];
                //}

                this._setClass();


                b.innerHTML = c.text;
                c.id && b.setAttribute("id", c.id);

                if (c.position) {
                    b.style.position = c.position;
                    b.style.left = c.left + "px";
                    b.style.top = c.top + "px";
                }

                this._setSize();

                this._initEvent();
            },
            addClass: function (ob, className) {
                if (className) {
                    if (!$(ob).hasClass(className)) {
                        $(ob).addClass(className);
                    }
                }
            },
            getClass: function () {
                return this._button.className;
            },
            getWidth: function () {
                return parseInt($(this._button).width());
            },
            getHeight: function () {
                return parseInt($(this._button).height());
            },
            setText: function (text) {
                this._button.innerHTML = text;
            },
            setPosition: function (x, y) {
                this._button.style.left = x + "px";
                this._button.style.top = y + "px";
            },
            show: function () {
                this._button.style.display = "";
            },
            hide: function () {
                this._button.style.display = "none";
            },
            setDown: function () {
                this._button.className = this._downClass;

                return this;
            },
            setUp: function () {
                this._button.className = this.config.className;

                return this;
            },
            isDown: function () {
                return this._button.className === this._downClass;
            },
            isUp: function () {
                return this._button.className === this.config.className;
            },
            renderTo: function (container) {
                YYC.Tool.selector.$(container).append(this._button);

                return this;
            },
            onMouseOver: function (e) {
                if (this._button.className !== this._downClass) {
                    this._button.className = this._hoverClass;
                }

                this.addClass(this._button, this.config.addClass);

                this.config.onMouseOver.call(this, e);
            },
            onMouseOut: function (e) {
                if (this._button.className === this._hoverClass) {
                    this._button.className = this.config.className;
                }

                this.addClass(this._button, this.config.addClass);

                this.config.onMouseOut.call(this, e);
            },
            onclick: function (e) {
                this.config.onclick.call(this, e);
            },
            onMouseDown: function () {
                this._button.className = this._downClass;

                this.addClass(this._button, this.config.addClass);

            },
            onMouseUp: function () {
                this._button.className = this.config.className;

                this.addClass(this._button, this.config.addClass);
            },
            click: function (handle) {
                /*
                 重新设置click事件有以下两种方法：
                 1、先移除之前绑定的click事件，然后再重新绑定（如果不移除之前的click，则在click事件触发时，之前绑定
                 的click的handle和现在绑定的handle都会触发）

                 代码：
                 YYC.Tool.event.removeEvent(this._button, "click", this._onclick);
                 this._initEventClick();

                 2、修改之前绑定的click的handle -> _onclick -> onclick中调用的this.config.onclick。

                 代码：
                 this.onclick = handle;

                 此处采用的是第二种方法。

                 注意！
                 直接修改_onclick或onclick：
                 this._onclick = handle;
                 或：this.onclick = handle;

                 新绑定的handle不会起作用，而之前绑定的handle仍然有效！

                 这是因为这里只是将_onclick或onclick指向了handle，但是click事件上的handle仍然为原来的handle！
                 */
                this.config.onclick = handle;
            },


            dispose: function () {
                var b = this._button, evt = YYC.Tool.event;

                evt.removeEvent(b, "mouseover", this._onMouseOver);
                evt.removeEvent(b, "mouseout", this._onMouseOut);
                evt.removeEvent(b, "click", this._onclick);
                evt.removeEvent(b, "mousedown", this._onMouseDown);
                evt.removeEvent(b, "mouseup", this._onMouseUp);

                b.innerHTML = "";
                b.parentNode && b.parentNode.removeChild(b);
            }
        }
    });

    YYC.namespace("Control").Button = Button;
}());