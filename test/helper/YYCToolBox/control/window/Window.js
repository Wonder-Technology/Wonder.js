/***********************************************
来自：

DOTA.window v0.1
作者：黄健
日期：2009.09.28
ＱＱ：573704282
Email: freewind22@163.com


修改：

作者：YYC
日期：2012-10-31
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/

/*
    窗口控件，用于弹出子窗口（默认居中）。



    创建的dom：
    <div class="window">
        <div class="titleContainer">
            <div class="title"></div>
            <div class="button"></div>
        </div>

        <div class="toolbar">

        </div>

        <div class="content">

        </div>
    </div>


    使用示例：

        window.menu = new YYC.Control.MENU.Menu({ id: "menuContainer", items: [
		    。。。。。。
    });

        var dlg = new YYC.Control.Window({
            title: "标题",
            isClear: false,
            opacity: 0.4,
            id: "iframe_window"
        });
        //dlg.init();
        dlg.setTitle("用户信息设置");
        dlg.loadUrl("Bomber/Index");    //加载页面成功后，会触发页面的js
        dlg.resizeTo(300, 500);

        dlg.addToolBar({ menu: menu });
*/

//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}




///*重新开发

//需求：

//使用TDD开发
//精简代码
//可以更换css
////增加：content可以为层

//*/


(function () {
    var WindowMgr = {
        activeWindow: null,
        maxzIndex: 0,
        register: function (pWin, zIndex) {
            this.maxzIndex = Math.max(this.maxzIndex, zIndex);
        },
        getzIndex: function (pWin) {
            if (pWin !== this.activeWindow) {
                this.maxzIndex++;
            }
            return this.maxzIndex;
        }
    };

    var Window = YYC.Class({
        Init: function (config) {
            //	var width = DOTA.F.getOffsetWidth();    //获得总宽度
            //	var height = DOTA.F.getOffsetHeight();  //获得总高度
            //var width = $(document).width();
            //var height = $(document).height();

            //    //必须设置框架iframe的id值
            //    if (!config.id) {
            //        throw new Error("The id of iframe must be set!");
            //    }

            this.config = YYC.Tool.extend.extend({
                parent: document.body,
                title: "title",
                left: 0,
                top: 0,
                width: 400,
                height: 300,
                zIndex: 1000,
                //		animate : (DOTA.Browser.ie ? false : true) && DOTA.Animation,   //动画
                className: "window1",
                animate: null,
                content: "content",
                isTest: false,    //是否在测试
                isShow: true,     //是否显示
                isClear: true,      //点击关闭时，是否清除控件（如果为false，则不清除控件而隐藏）
                isShowMask: true,  //是否显示遮罩层
                opacity: 0.5,
                contentPadding: 2,
                url: "",
                id: "",     //iframe的id
                onload: function () { },    //加载控件时
                onclear: function () { },   //点击关闭，清除控件之前
                onclose: function () { }   //点击关闭时
            }, config || {});

            //this.config.onload();   //调用onload
            this.config.onload.call(this);   //调用onload

            //初始化
            if (!this.config.isTest) {
                this.init();
            }
        },
        Private: {
            _titleContainer: null,
            _title: null,
            _closeButton: null,
            _toolBar: null,
            _content: null,
            _window: null,
            _overLayer: null,
            _drag: null,
            _animate: null,

            _showFrame: function () {
                var self = this;

                var iframe = this.frame;


                //        console.log(this.config.id, iframe.length);

                //框架iframe加载完成后才显示iframe
                if (iframe[0].attachEvent) {
                    iframe[0].attachEvent("onload", function () {
                        if (self.config.isShowMask) {
                            self._showOverLayer();   //创建并显示罩层
                        }
                        if (self.config.animate) {    //使用动画效果
                            self._animate.show();
                        } else {
                            self._window.style.display = "block";
                        }
                    });
                }
                else {
                    iframe[0].onload = function () {
                        if (self.config.isShowMask) {
                            self._showOverLayer();   //创建并显示罩层
                        }
                        if (self.config.animate) {    //使用动画效果
                            self._animate.show();
                        } else {
                            self._window.style.display = "block";
                        }
                    };
                }
            },
            _setContent: function () {
                var config = this.config;

                if (config.url) {
                    this.loadUrl(config.url);
                }
                else if (config.content) {
                    //b.innerHTML = o.content;
                    this.loadContent(config.content);
                }
            },
            //插入dom元素
            _initHtml: function () {
                var o = this.config;

                //var v = this.window = this._window = document.createElement("div");
                var v = this._window = document.createElement("div");
                //v.className = "DOTA_Window";
                v.className = o.className;
                v.style.zIndex = o.zIndex;

                var tc = this._titleContainer = document.createElement("div");
                tc.className = "titleContainer";

                var t = this._title = document.createElement("div");
                t.className = "title";
                t.innerHTML = o.title;

                //关闭按钮
                var c = this._closeButton = document.createElement("div");
                c.className = "button";
                c.innerHTML = "&nbsp;";

                var tool = this._toolBar = document.createElement("div");
                tool.className = "toolbar";
                //        $(this._toolBar).css("height", "30");
                //        $(this._toolBar).css("width", "200px");
                //                $(this._toolBar).css("border", "1px solid red");
                //                        tool.style.display = "none";

                var b = this._content = document.createElement("div");
                b.className = "content";
                //        b.style.padding = 0 + "px";

                this._setContent();

                //先插父元素，再插子元素。这样不会引起ie内存泄露
                document.body.appendChild(v);

                v.appendChild(tc);
                v.appendChild(tool);
                tc.appendChild(t);
                tc.appendChild(c);
                v.appendChild(b);

                //		document.body.appendChild(v);
            },
            //设置this._window的坐标
            _initPosition: function () {
                var o = this.config, v = this._window;
                v.style.left = o.left + "px";
                v.style.top = o.top + "px";

                v.style.width = o.width + "px";
                v.style.height = o.height + "px";


                //        v.style.left = (o.left - o.width) / 2;
                //        v.style.top = (o.top - o.height) / 2;

            },
            _initEvent: function () {
                var evt = YYC.Tool.event, v = this._window, btn = this._closeButton, tc = this._title;

                this._onCloseMouseOver = evt.bindEvent(this, this._onCloseMouseOver);
                this._onCloseMouseOut = evt.bindEvent(this, this._onCloseMouseOut);
                this._onCloseClick = evt.bindEvent(this, this._onCloseClick)
                this._onMouseDown = evt.bindEvent(this, this._onMouseDown);

                //绑定关闭按钮的事件
                evt.addEvent(btn, "mouseover", this._onCloseMouseOver);
                evt.addEvent(btn, "mouseout", this._onCloseMouseOut);
                evt.addEvent(btn, "click", this._onCloseClick);
                //绑定this._window窗体的事件
                evt.addEvent(v, "mousedown", this._onMouseDown);

                //加载拖动控件，this._title（标题层）绑定拖动
                this._drag = YYC.Control.Drag ? new YYC.Control.Drag(v, { handler: tc, cancelBubble: false }) : null;
                //        console.log(this._drag);
            },
            //创建遮罩层
            _showOverLayer: function () {
                var l = this._overLayer,
                    o = this.config;
                //创建遮罩层

                if (!this._overLayer) {
                    l = this._overLayer = document.createElement("div");
                    //l.className = "DOTA_OverLayer";
                    l.className = o.className + "_overLayer";
                    l.style.zIndex = o.zIndex - 1;
                    //                DOTA.F.setOpacity(l, o.opacity);    //设置透明度
                    //                console.log(o.opacity);
                    $(l).css({ opacity: o.opacity });

                    document.body.appendChild(l);
                }
                //网页正文全文宽： document.body.scrollWidth;
                //网页正文全文高： document.body.scrollHeight
                //            l.style.width = DOTA.F.getScrollWidth() + "px";
                //            l.style.height = DOTA.F.getScrollHeight() + "px";

                l.style.width = $(document).width() + "px";
                l.style.height = $(document).height() + "px";

                l.style.display = "block";
            },
            _onMouseDown: function () {
                this._window.style.zIndex = WindowMgr.getzIndex(this);
            },
            _onCloseMouseOver: function () {
                this._closeButton.className = "hover";
            },
            _onCloseMouseOut: function () {
                this._closeButton.className = "button";
            },
            _onCloseClick: function (e) {
                if (this.config.isClear) {
                    //this.config.onclear();     //调用onclear
                    this.config.onclear.call(this, e);     //调用onclear
                    this.dispose();
                } else {
                    this.hide();
                }
                //this.config.onclose();     //调用onclose
                this.config.onclose.call(this, e);     //调用onclose
            }
        },
        Public: {
            frame: null,
            config: null,
            //window: null,

            init: function () {
                this._initHtml();
                this._initPosition();
                this.resize();
                this._initEvent();

                //工具条，可以加入菜单项
                this._toolBar = YYC.Control.ToolBar ? new YYC.Control.ToolBar(this._toolBar) : null;
                //        console.log(YYC.namespace("Control").ToolBar);
                //        console.log(this._toolBar);
                //动画
                //		this._animate = DOTA.Animation ? new DOTA.Animation({element: this._window, css: "DOTA_Window_MoveBG"}) : null;
                this._animate = null;    //不用动画


                if (this.config.isShow) {
                    this.show();
                } else {
                    this._window.style.display = "none";
                }

                WindowMgr.register(this, this.config.zIndex); 	//??
                //        console.log(this._drag);
            },
            hide: function () {
                if (this.config.isShowMask && this._overLayer) {
                    this._overLayer.style.display = "none";
                }
                if (this.config.animate) {
                    this._animate.hide();
                } else {
                    this._window.style.display = "none";
                }
            },
            show: function () {
                if (this.config.isShowMask) {
                    this._showOverLayer();   //创建并显示罩层
                    this._overLayer.style.display = "block";
                }
                if (this.config.animate) {
                    this._animate.show();
                } else {
                    this._window.style.display = "block";
                }

                //this._window.style.display = "block";
            },
            //加入工具条。
            //获得工具条的高度，并修改窗体的高度。
            addToolBar: function (o) {
                var height = 0;

                this._toolBar.add(o);

                height = o.menu.getHeight();

                this.config.height += height;


                $(this._window).css("height", this.config.height);
            },
            //设置content及iframe的高度
            resize: function () {
                var o = this.config, v = this._window, c = this._content,
                t = this._titleContainer,
                th = 0;

                if (this._toolBar && this._toolBar.getHeight) {
                    th = this._toolBar.getHeight();
                }
                else {
                    th = 0;
                }
                //var sh = this.statusBar ? this.statusBar.getHeight() : 0;



                //        var th = 30;
                //DOTA.F.currentStyle(t).height可以改为“$(t).css("height")”
                //        var hei = o.height - parseInt(DOTA.F.currentStyle(t).height) - th - sh - o.contentPadding * 2;
                //                var hei = o.height - parseInt($(t).height()) - th - sh - o.contentPadding * 2;

                //        console.log(th);

                var hei = o.height - parseInt($(t).height());

                c.style.height = hei + "px"; //设置正文（content）的高度
                if (o.url && this.frame) {
                    hei -= 4;
                    c.getElementsByTagName("iframe")[0].style.height = hei + "px";  //设置正文里内联框架(iframe)的高度
                    //this.frame[0].style.height = hei + "px";  //设置正文里内联框架(iframe)的高度
                }
            },
            //窗体显示在显示器中间
            resizeTo: function (width, height) {
                var isMove = arguments.length > 2 ? arguments[2] : true;    //是否能够拖动
                var o = this.config,
                    scrollTop = 0;
                o.width = width, o.height = height;
                //如果能拖动，则重定位this._window（居中）。
                //因为拖动后可能不居中，所以需要重定位。
                if (isMove) {
                    if (navigator.userAgent.indexOf("Chrome") >= 0) {
                        scrollTop = document.body.scrollTop;
                    }
                    else {
                        scrollTop = document.documentElement.scrollTop;
                    }
                    //            o.left = (DOTA.F.getOffsetWidth() - width) / 2;
                    //            o.top = (DOTA.F.getOffsetHeight() - height) / 2;

                    //            o.left = ($(document).width() - width) / 2;
                    //            o.top = ($(document).height() - height) / 2;

                    o.left = ($(window).width() - width) / 2;
                    //            console.log($(window).width(), $(window).height(), height);
                    o.top = ($(window).height() - height) / 2 + scrollTop;     //加上页面滚动条的距离
                    //            console.log(document.body.scrollTop, document.documentElement.scrollTop);
                    this._initPosition();
                }
                this.resize();  //设置content及iframe的高度
            },
            setOpacity: function (n) {
                //        DOTA.F.setOpacity(this._window, n);
                $(this._window).css({ opacity: n });
            },
            setTitle: function (title) {
                this._title.innerHTML = title;
            },
            //加载并显示
            loadUrl: function (url) {
                //        console.log("loadUrl", url);
                var self = this;

                this.config.url = url;
                //        console.log($("#iframe_window").length);
                //        //如果框架已经加载，则直接改变url
                //        if ($("#" + this.config.id).length > 0) {
                //            $("#" + this.config.id).attr("src", url);
                //        }
                //        else {
                this.frame = $("<iframe src='" + url + "' style='background-color:#FFFFFF; margin:0px; padding:0px;' width = '100%' frameborder='0' border='0'></iframe>");
                //        }

                $(this._content).empty();

                $(this._content).append(this.frame);
                //显示
                //使用setTimeout 0 的技巧，跳出队列（因为此时iframe还没有加入）
                setTimeout(function () { self._showFrame(); }, 0);
                //        console.log($("#iframe_window").length);
            },
            loadContent: function (content) {
                //this._content.innerHTML = content;

                var cloneNode = null;

                if (YYC.Tool.judge.isString(content)) {
                    $(this._content).html(content);
                }
                else {
                    cloneNode = $(content).clone(true);
                    cloneNode.show();
                    $(this._content).empty();
                    $(this._content).append(cloneNode);
                }

                this.show();
            },
            getContent: function(){
                return this._content;
            },
            setContentColor: function (foreColor, bgColor) {
                if (foreColor) {
                    this._content.style.color = foreColor;
                }
                if (bgColor) {
                    this._content.style.backgroundColor = bgColor;
                }
            },
            //close: function () {
            //    this.dispose();
            //},
            //    AppendChild: function (element) {
            //        this._content.appendChild(element);
            //    },
            dispose: function () {
                /* 需要dispose的内容：
                调用所用插件的dispose()、
                移除事件绑定、
                插入的元素移除。
        
        
                这里调用dispose方法的目的是为了避免ie内存泄露。
        
                以下情况会造成ie内存泄露：
        
                1、给DOM对象添加的属性是一个对象的引用。范例：
        
                var MyObject = {};
        
                document.getElementById('myDiv').myProp = MyObject;
        
                解决方法：
        
                在window.onunload事件中写上: document.getElementById('myDiv').myProp = null;
        
                2、DOM对象与JS对象相互引用。范例：
        
                function Encapsulator(element) {
        
                this.elementReference = element;
        
                element.myProp = this;
        
                }
        
                new  Encapsulator(document.getElementById('myDiv'));
        
                解决方法：
        
                在onunload事件中写上: document.getElementById('myDiv').myProp = null;
        
                3、给DOM对象用attachEvent绑定事件。范例：
        
                function doClick() {}
        
                element.attachEvent("onclick", doClick);
        
                解决方法：
        
                在onunload事件中写上: element.detachEvent('onclick', doClick);
        
                4、从内到外执行appendChild。这时即使调用removeChild也无法释放。范例：
        
                var parentDiv =  document.createElement("div");
        
                var childDiv = document.createElement("div");
        
                parentDiv.appendChild(childDiv);
        
                document.body.appendChild(parentDiv);
        
        
                解决方法：
        
                从外到内执行appendChild:
        
                var parentDiv =  document.createElement("div");
        
                var childDiv = document.createElement("div");
        
                document.body.appendChild(parentDiv);
        
                parentDiv.appendChild(childDiv);
        
                5、反复重写同一个属性会造成内存大量占用(但关闭IE后内存会被释放)。范例：
        
                for(i = 0; i < 5000; i++) {
        
                hostElement.text = "asdfasdfasdf";
        
                }
        
                这种方式相当于定义了5000个属性！
        
                */
                var evt = YYC.Tool.event, btn = this._closeButton, v = this._window;
                if (arguments.length == 0 && this.config.animate) {
                    this._animate.hide(null, YYC.Tool.event.bindEvent(this, this.dispose, true));
                    return;
                }
                this._drag && this._drag.dispose();
                this._drag = null;
                //        this._animate.dispose();

                evt.removeEvent(btn, "mouseover", this._onCloseMouseOver);
                evt.removeEvent(btn, "mouseout", this._onCloseMouseOut);
                evt.removeEvent(btn, "click", this._onCloseClick);

                if (this._toolBar) {
                    this._toolBar.dispose();
                }

                v.innerHTML = "";
                document.body.removeChild(v);
                if (this._overLayer) {
                    document.body.removeChild(this._overLayer);
                    this._overLayer = null;
                }

                //this._window = this.window = null;
                this._window = null;
                this._titleContainer = null;
                this._title = null;
                this._closeButton = null;
                this._content = null;
            }
        }
    });


    YYC.namespace("Control").Window = Window;
}());



