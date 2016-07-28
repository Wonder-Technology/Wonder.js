/*分页控件（与服务器端交互）

2013-02-27
构建了初步的测试与产品代码

2013-02-28 - 2013-03-01
构建了测试与产品代码


2013-03-02 - 2013-03-03
使用建造者模式重构



用法：

  <div class="info_paging_right" style="text-align:right;">
          <div id="divPage" class="info_paging">
          </div> 
  </div>

              <script type="text/javascript">
                  var page = new YYC.Control.Paging.PagingServer({ 
                      str: "a",     //如果有str，则调用PagingBuilderWithStr，否则调用PagingBuilderNoStr
                      pageNumber: <%= Convert.ToInt32(HttpContext.Current.Request["p"] == null ? "1" : HttpContext.Current.Request["p"]) %>, 
                      totalCount: <%= Convert.ToInt32(Session["total"]) %>
                  });
                  page.renderTo("divPage");
            </script>
*/

/* 重构前
(function () {
    //*方法库

    function extend(destination, source) {
        //            var temp = {};

        var property = "";

        for (property in source) {
            //                temp[property] = source[property];  //用中间对象来保存source
            destination[property] = source[property];
        }
        return destination;
    };
    function isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    };
    function format(s, pars) {
        if (!s) return "";  //如果s为空，则s=""
        if (pars == null) return s;

        var i = 0, j = 1;
        while (j < arguments.length) {
            var arg = arguments[j];
            if (!arg) arg = '';
            if (isArray(arg)) {
                for (var k = 0; k < arg.length; k++) {
                    s = s.replace(new RegExp("\\\{" + (i++) + "\\\}", "g"), arg[k]);
                }
            } else {
                s = s.replace(new RegExp("\\\{" + (i++) + "\\\}", "g"), arg.toString());
            }
            j++;
        }
        return s;
    };
    function bindWithArguments(object, fun, args) {
        var _args = null;
        var self = this;

        _args = Array.prototype.slice.call(arguments, 2);

        return function () {
            return fun.apply(object, _args);
        }
    };


    var IPagingServer = YYC.Interface("renderTo", "dispose");

    var PagingServer = YYC.Class(IPagingServer, {
        Init: function (config) {
            if (arguments.length > 1) {
                throw new Error("参数不能多于1个");
            }
            this._checkAndSetConfig(config);
            //根据config.str是否存在来设置标志为_type，从而判断this._config.handler的类型
            this._judgeType();

        },
        Private: {
            _config: null,
            _type: 0,   //表示this._config.handler的类型

            //*加入下面属性，方便进行测试

            _first: null,   //第一页
            _prev: null,    //上一页
            _prevShow: null,    //前几页
            _middle: null,
            _next: null,    //下一页
            _nextShow: null,    //后几页
            _last: null,    //最后一页
            _info: null,    //页码信息
            _jumpTo: null,    //跳转页码


            _judgeType: function () {
                if (this._config.str === undefined) {
                    this._type = 0;
                }
                else {
                    this._type = 1;
                }
            },
            _checkAndSetConfig: function (config) {
                this._config = extend({
                    pageSize: 10,   //每页个数
                    showNumber: 2,    //一次显示show + 1页
                    handler: "getContentTab"    //与服务器进行ajax请求的js函数
                }, config || {});

                if (this._config.pageNumber === undefined || this._config.totalCount === undefined) {
                    throw new Error("参数必须具有pageNumber, totalCount属性");
                }
                this._calculatePageCount();
                if (this._config.totalCount !== 0 && this._config.pageNumber > this._config.pageCount) {
                    throw new Error("pageNumber必须小于等于pageCount");
                }
            },
            _calculatePageCount: function () {
                var pageCount = Math.ceil(this._config.totalCount / this._config.pageSize);
                this._config.pageCount = pageCount;
            },
            _insertPaging: function (container, element) {
                $("#" + container).append(element);
            },
            _createPagingNoStr: function () {
                var element = $("<div class='page_nav'/>"),
                    config = this._config,
                    temp = null,
                    i = 0;
                //                    str = ""

                if (config.pageCount <= 1) {
                    return this._onlyOnePage(element);
                }


                //                str = tool.format("<a  title='首页' onclick='" + config.handler + "({0}, {1});'/>", config.pageNumber, config.pageSize);

                if (config.pageNumber > 1) {
                    this._first = $(tool.format("<a  title='首页' onclick='" + config.handler + "({0}, {1});'/>", 1, config.pageSize));
                    this._prev = $(tool.format("<a  title='上一页' onclick='" + config.handler + "({0}, {1});'/>", config.pageNumber - 1, config.pageSize));


                    element.append(this._first);
                    element.append(this._prev);
                }
                if (config.pageNumber > (config.showNumber + 1)) {
                    this._prevShow = $(tool.format("<a  title=\"前" + (config.showNumber + 1) + "页\" onclick='" + config.handler + "({0},{1})'>{2}</a>", config.pageNumber - (config.showNumber + 1), config.pageSize, ".."));

                    element.append(this._prevShow);
                }

                temp = $("<div>");

                for (i = config.pageNumber - config.showNumber; i <= config.pageNumber + config.showNumber; i++) {
                    //                                    this._buildMiddlePage();

                    if (i === config.pageNumber) {
                        temp.append($(tool.format("<a class='current'>{0}</a>", config.pageNumber)));
                    }
                    else {
                        if (i > 0 & i <= config.pageCount)
                            temp.append($(tool.format("<a>{0}</a>", i)));
                    }
                }
                this._middle = temp.children();
                //                console.log(this._middle);

                //                for (i = config.pageNumber - config.showNumber; i <= config.pageNumber + config.showNumber; i++) {
                //                    this._buildMiddlePage();
                //                }
                if (config.pageNumber < (config.pageCount - config.showNumber)) {
                    this._nextShow = $(tool.format("<a  title=\"后" + (config.showNumber + 1) + "页\" onclick='" + config.handler + "({0},{1})'>{2}</a>", config.pageNumber + (config.showNumber + 1), config.pageSize, ".."));

                    element.append(this._nextShow);
                }
                if (config.pageNumber < config.pageCount) {
                    this._next = $(tool.format("<a  title='下一页' onclick='" + config.handler + "({0}, {1});'/>", config.pageNumber + 1, config.pageSize));
                    this._last = $(tool.format("<a  title='尾页' onclick='" + config.handler + "({0}, {1});'/>", config.pageCount, config.pageSize));

                    element.append(this._next);
                    element.append(this._last);
                }
                this._info = $(tool.format("<span> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", config.totalCount, config.pageSize, config.pageNumber, config.pageCount));

                element.append(this._info);


                this._jumpTo = $(tool.format("<span>&nbsp;&nbsp;跳转到&nbsp;</span><input type='text' id='page_jumpid' size='6' maxlength='10'/>&nbsp;<input type='button' id='jumpid' value='跳转' "
                + "onclick='page.jump({0}, {1}, {2});'/>", config.pageNumber, config.pageSize, config.pageCount));

                element.append(this._jumpTo);

                return element;
            },
            _onlyOnePage: function (element) {
                return element.append($("<span>共" + this._config.totalCount + "条</span>"));
            },
            _buildMiddlePage: function () {

            },
            _createPagingWithStr: function () {
            }
        },
        Public: {
            renderTo: function (container) {
                var element = null;

                if (this._type === 0) {
                    element = this._createPagingNoStr();
                }
                else if (this._type === 1) {
                    element = this._createPagingWithStr();
                }

                this._insertPaging(container, element);
            },
            jump: function () {

                var pageNumber = arguments[0];
                var pageSize = arguments[1];
                var pageCount = arguments[2];
                var self = this;

                //                var where = arguments[2];

                var jtext = jQuery.trim($("#page_jumpid").val());
                //                if (jtext.length > 0) {
                //                    var jtest = /^\d{1,4}$/;
                var jtest = /^\d+$/;
                if (!jtest.test(jtext) || jtext === "0") {  //页号为0也不行
                    alert("请输入正确的页号，谢谢!");
                }
                else {
                    jtext = parseInt(jtext);    //jtext为String型，要转换为整型
                    if (jtext == pageNumber) {     //输入的页码为当前页
                        alert("您输入的是当前页，请重新输入~");
                    }
                    else if (jtext <= pageCount) {
//                        bindWithArguments(window, getContentTab, jtext, pageSize)();
                        window[self._config.handler](jtext, pageSize);
                        //                        getContentTab(jtext, pageSize);
                    }
                    else {
                        alert("您输入的页号超过了最大页数，请重新输入~");
                    }
                }
                //                }
                //                else {
                //                    window.alert("请输入要跳转的页号，谢谢~");
                //                }
            }
        }
    });

    window.PagingServer = PagingServer;
} ());
*/








(function () {
    //*方法库

    function extend(destination, source) {
        //            var temp = {};

        var property = "";

        for (property in source) {
            //                temp[property] = source[property];  //用中间对象来保存source
            destination[property] = source[property];
        }
        return destination;
    };
    function isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    };
    function format(s, pars) {
        if (!s) return "";  //如果s为空，则s=""
        if (pars == null) return s;

        var i = 0, j = 1;
        while (j < arguments.length) {
            var arg = arguments[j];
            if (!arg) arg = '';
            if (isArray(arg)) {
                for (var k = 0; k < arg.length; k++) {
                    s = s.replace(new RegExp("\\\{" + (i++) + "\\\}", "g"), arg[k]);
                }
            } else {
                s = s.replace(new RegExp("\\\{" + (i++) + "\\\}", "g"), arg.toString());
            }
            j++;
        }
        return s;
    };


    var IPagingServer = YYC.Interface("renderTo", "dispose");

    var PagingServer = YYC.Class({ Interface: IPagingServer }, {
        Init: function (config) {
            if (arguments.length > 1) {
                throw new Error("参数不能多于1个");
            }

            this._config = extend({
                pageSize: 10,   //每页个数
                pageNumber: 1,  //当前页码
                totalCount: 100,    //页码总数
                showNumber: 2,    //一次显示show + 1页
                handler: "getContentTab"    //与服务器进行ajax请求的js函数
            }, config || {});

            this._checkAndSetConfig(config);
            this._createBuilderAndDirector();
        },
        Private: {
            _config: null,
//            _container: null,
            _pagingDirector: null,
            _builder: null,

            _createBuilderAndDirector: function () {
                if (this._config.str === undefined) {
                    this._builder = new YYC.Control.Paging.PagingBuilderNoStr(this._config);
                }
                else {
                    this._builder = new YYC.Control.Paging.PagingBuilderWithStr(this._config);
                }
                this._pagingDirector = new YYC.Control.Paging.PagingDirector(this._config, this._builder);
            },
            _checkAndSetConfig: function (config) {
                if (this._config.pageNumber === undefined || this._config.totalCount === undefined) {
                    throw new Error("参数必须具有pageNumber, totalCount属性");
                }
                this._calculatePageCount();
                if (this._config.totalCount !== 0 && this._config.pageNumber > this._config.pageCount) {
                    throw new Error("pageNumber必须小于等于pageCount");
                }
            },
            _calculatePageCount: function () {
                var pageCount = Math.ceil(this._config.totalCount / this._config.pageSize);
                this._config.pageCount = pageCount;
            },
            _insertPaging: function (container, element) {
                $("#" + container).append(element);
            }
        },
        Public: {
            renderTo: function (container) {
//                this._container = container;
                this._insertPaging(container, this._pagingDirector.createPaging());
            },
            //暂不实现
            dispose: function(){
            }
        }
    });

    YYC.namespace("Control.Paging").PagingServer = PagingServer;
} ());
