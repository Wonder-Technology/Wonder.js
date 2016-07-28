/***********************************************
 Select控件（伪Select）

 作者：YYC
 日期：2013-08-16
 电子邮箱：395976266@qq.com
 QQ: 395976266
 博客：http://www.cnblogs.com/chaogex/

 ************************************************/

//创建的dom：
//<div class="ySelect">
//    <span class="title"><span class="text">全部</span><i class="arrow"></i></span>
//    <ul id="fsdiv" class="option">
//        <li>点评</li>
//        <li>团购</li>
//    </ul>
//</div>


//示例：
//<div id="testSelect"></div>

//new YYC.Control.Select({
//    title: "请输入",
//    option: [["HOME", "住宅"], ["WORK", "单位"]]  //第一项为value，第二项为text

//}).renderTo("testSelect");

(function () {
    var Title = YYC.Class({
        Init: function (textStr, isTitleEditable, hasArrow) {
            this._textStr = textStr;
            this._isTitleEditable = isTitleEditable;
            this._hasArrow = hasArrow;
        },
        Private: {
            _title: null,
            _textStr: null,
            _isTitleEditable: null,
            _hasArrow: null,

            _insertToTitle: function (obj) {
                this._title.children().append(obj);
            }
        },
        Public: {
            click: function (func) {
                this._title.click(func);
            },
//            showSelect: function (value, text) {
//                this._text.text(text);
//                this._text.attr("val", value);
//            },
            /**
             获得选中项的text
             */
            getText: function () {
                return this._text.getText();
            },
            /**
             获得选中项的value
             */
            getValue: function () {
                return this._text.getValue();
            },
            setTitle: function (value, text) {
                this._text.setTitle(value, text);
//                this._text.text(text);
            },
            getDom: function () {
                return this._title;
            },
            init: function () {
                this._title = $("<div class='title' value=''><div class='td'></div></div>");

                if (this._isTitleEditable) {
                    /*
                     修复webkit和Safari中bug：
                     此处input的height为100%，它的box-sizing为border-box，它在.td的div中，该div渲染为table cell
                     则input的高度会有双倍的padding和border，从而会造成input不能填充满容器

                     解决方案：
                     1、将input的border、padding设为0
                     还是不行！
                     2、将input的box-sizing设为content-box。
                     可行！但是这样width和height的计算又有问题了！（width/height不包括padding和border）
                     3、将.td的div的display设为block，使其不再渲染为table cell
                     可行！当前采用的是该方案。
                     */

                    this._title.children().css("display", "block");

                    this._text = {
                        dom: $("<input class='text' style='width: 100%;height: 100%;box-sizing: border-box;'/>"),

                        setTitle: function (value, text) {
                            this.dom.attr("val", value);
                            this.dom.val(text);
                        },
                        getText: function () {
                            return this.dom.val();
                        },
                        getValue: function () {
                            return this.dom.attr("val");
                        }
                    };
                    this._text.dom.val(this._textStr);
                }
                else {
//                    this._text = $("<span class='text'>" + this._textStr + "</span>");

                    this._text = {
                        dom: $("<span class='text'></span>"),

                        setTitle: function (value, text) {
                            this.dom.attr("val", value);
                            this.dom.text(text);
                        },
                        getText: function () {
                            return this.dom.text();
                        },
                        getValue: function () {
                            return this.dom.attr("val");
                        }
                    };
                    this._text.dom.text(this._textStr);
                }

                this._insertToTitle(this._text.dom);

                if (this._hasArrow) {
                    this._arrow = $("<i class='arrow'></i>");
                    this._insertToTitle(this._arrow);
                }
            }
        }
    });

    var Option = YYC.Class({
        Init: function (optionArr) {
            this._optionArr = optionArr;
        },
        Private: {
            _option: null,
            _optionArr: null,

            _buildLiStr: function (value, text) {
                var str = "";

                str += "<li val='" + value + "'";
                str += ">" + text + "</li>";

                return str;
            }
        },
        Public: {
            isHide: function () {
                return this._option.css("display") === "none";
            },
            hide: function () {
                this._option.hide();
            },
            show: function () {
                this._option.show();
            },
            click: function (func) {
                this._option.click(func);
            },
            setWidth: function (width) {
                this._option.css("width", width);
            },
            addItem: function (value, text) {
                this._option.append($(this._buildLiStr(value, text)));
            },
            shiftItem: function () {
                return this._option.children("li:first").remove();
            },
            getFirstItem: function () {
                return this.getItemByIndex(0);
            },
            getItemByIndex: function (index) {
                var item = null;

                item = this._option.children("li").eq(index);

                return {value: item.attr("val"), text: item.text()};
            },
            getItemNum: function () {
                return this._option.children("li").length;
            },
            removeItem: function (index) {
                this._option.children("li").eq(index).remove();
            },
            setItems: function (items) {
                var i = 0,
                    len = 0;

                this.clear();

                for (i = 0, len = items.length; i < len; i++) {
                    this.addItem(items[i][0], items[i][1]);
                }
            },
            clear: function () {
                this._option.empty();
            },
            getDom: function () {
                return this._option;
            },
            init: function () {
                var i = 0,
                    len = 0,
                    option = this._optionArr,
                    str = "";

                str += "<ul class='option'>";

                if (option) {
                    for (i = 0, len = option.length; i < len; i++) {
                        str += this._buildLiStr(option[i][0], option[i][1]);
                    }
                }

                str += "</ul>";

                this._option = $(str);
            }
        }
    });

    YYC.namespace("Control").Select = YYC.Class({
        Init: function (config) {
            this._config = YYC.Tool.extend.extend({
                className: "yyc_select1",   //选择的样式
//            width: 300,      //控件的真实宽度（padding+margin+border+width）
//            optionWidth:
                hasArrow: true,
                isChangeText: true, //选中项后，title是否显示该选中项
                isTitleEditable: false,  //用户是否可直接修改title
                title: "请输入",   //显示的项
                option: null    //下拉框项
            }, config || {});

            this._buildSelect();
            this._bindEvents();
//            this._setSelectWidth();
        },
        Private: {
            _config: null,

            _select: null,
            _title: null,
            _text: null,
            _arrow: null,
            _option: null,

            _buildSelect: function () {
                this._buildTitle();
                this._buildOption();

                this._select = $("<div class='" + this._config.className + "'>");
                this._select.append(this._title.getDom());
                this._select.append(this._option.getDom());
            },
            _buildTitle: function () {
                this._title = new Title(this._config.title, this._config.isTitleEditable, this._config.hasArrow);
                this._title.init();
            },
            _buildOption: function () {
                this._option = new Option(this._config.option);
                this._option.init();
            },
            _bindEvents: function () {
                this._bindTitleClick();

                this._bindChange();

                this._bindBodyClick();
            },
            _bindTitleClick: function () {
                var title = this._title,
                    option = this._option,
                    self = this;

                title.click(function (e) {
                    if (option.isHide()) {
                        self.onshow(e);
                        option.show();
                    }
                    else {
                        option.hide();
                    }

                    e.stopPropagation();
                });
            },
            _bindChange: function () {
                var option = this._option,
                    self = this;


                option.click(function (e) {
                    var target = e.target;

                    if (target.tagName !== "LI") {
                        return;
                    }

                    if ($(target).text() === self._title.getText()) {
                        return;
                    }

                    if (self._config.isChangeText) {
                        self.setTitle($(target).attr("val"), $(target).text());
                    }

                    option.hide();

                    self.onchange(e);
                });
            },
//            _showSelect: function (value, text) {
//                this._title.showSelect(value, text);
////                this._text.text(text);
////                this._text.attr("val", value);
//            },
            _bindBodyClick: function () {
                var option = this._option;

                //因为title和change中都阻止了事件冒泡，所以点击select控件时，不触发该事件
                $("html").bind("click.select", function (e) {
                    option.hide();
                });
            }
//            _setSelectWidth: function () {
//                var optionWidth = this._config.optionWidth,
////                title = this._title,
//                    option = this._option;
////                select = this._select,
////                self = this;
//
//                if (optionWidth) {
//                    option.setWidth(optionWidth);
//                }
//
////            setTimeout(function () {
////                self._setWidth(title);
////                self._setWidth(option);
////                option.css("width", optionWidth);
////            }, 0);
//            }
//        _setWidth: function (ob) {
//            /**
//             真正的宽度 = width+padding+margin+border
//             */
//
//            var outerWidth = ob.outerWidth() - ob.width(); //获得padding + margin + border的宽度
//
//            ob.css("width", this._config.width - outerWidth);
//        }
        },
        Public: {
            onchange: function (e) {
            },
            onshow: function (e) {
            },

            renderTo: function (container) {
                YYC.Tool.selector.$(container).append(this._select);
            },
            /**
             获得选中项的text
             */
            getText: function () {
//                return this._text.text();
                return this._title.getText();
            },
            /**
             获得选中项的value
             */
            getValue: function () {
//                return this._text.attr("val");
                return this._title.getValue();
            },
            setTitle: function (value, text) {
//                this._text.attr("val", value);
//                this._text.text(text);

                this._title.setTitle(value, text);
            },
            addItem: function (value, text) {
                this._option.addItem(value, text);
            },
            shiftItem: function () {
                return this._option.shiftItem();
            },
            getFirstItem: function () {
                return this._option.getFirstItem();
            },
            getItemByIndex: function (index) {
                return this._option.getItemByIndex(index);
            },
            getItemNum: function () {
                return this._option.getItemNum();
            },
            removeItem: function (index) {
                this._option.removeItem(index);
            },
            setItems: function (items) {
                this._option.setItems(items);
            },
            hideOption: function () {
                this._option.hide();
            },
            clear: function () {
                this._option.clear();
            },
            dispose: function () {
                $("body").unbind("click.select");

                this._select.remove();
            }
        }
    });

}());
