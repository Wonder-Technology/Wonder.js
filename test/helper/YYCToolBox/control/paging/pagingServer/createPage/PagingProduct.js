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


    var APagingProduct = YYC.AClass({
        Protected: {
            //*子类实现
            P_config: null,

            //*父类、子类共用
            P_element: null
        },
        Public: {
            setDiv: function (className) {
                this.P_element = $("<div class=" + className + "/>");
            },
            getOnlyOne: function () {
                //                if (this.P_config.pageCount <= 1) {
                return $("<span>共" + this.P_config.totalCount + "条</span>");
                //                }
            },
            getInfo: function () {
                //                this._info = $(tool.format("<span> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", this.P_config.totalCount, this.P_config.pageSize, this.P_config.pageNumber, this.P_config.pageCount));
                return $(tool.format("<span> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", this.P_config.totalCount, this.P_config.pageSize, this.P_config.pageNumber, this.P_config.pageCount));

//                this.P_element.append(info);
            },
            add: function (ob) {
                this.P_element.append(ob);
            },
                        getProduct: function () {
                            return this.P_element;
                        }
        },
        Abstract: {
            getFirst: function () { },
            getPrev: function () { },
            getPrevShow: function () { },
            getMiddle: function () { },
            getNext: function () { },
            getNextShow: function () { },
            getLast: function () { },
            getJumpTo: function () { }
        }
    });


    var PagingProductNoStr = YYC.Class(APagingProduct, {
        Init: function (config) {
            this.P_config = extend({}, config);
        },
        Private: {
        //            P_config: null,
        //            P_element: null,

        //            _first: null,
        //            _prev: null,
        //            _prevShow: null,
        //            _middle: null,
        //            _nextShow: null,
        //            _next: null,
        //            _last: null,
        //            _info: null,
        //            _jumpTo: null
    },
    Public: {
        getFirst: function () {
            return $(tool.format("<a  title='首页' onclick='" + this.P_config.handler + "({0}, {1});'>首页</a>", 1, this.P_config.pageSize));
//            this.P_element.append(first);
        },
        getPrev: function () {
            //                this._prev = $(tool.format("<a  title='上一页' onclick='" + this.P_config.handler + "({0}, {1});'>上一页</a>", this.P_config.pageNumber - 1, this.P_config.pageSize));
            return $(tool.format("<a  title='上一页' onclick='" + this.P_config.handler + "({0}, {1});'>上一页</a>", this.P_config.pageNumber - 1, this.P_config.pageSize));
            //this.P_element.append(prev);
        },
        getPrevShow: function () {
            return $(tool.format("<a  title=\"前" + (this.P_config.showNumber + 1) + "页\" onclick='" + this.P_config.handler + "({0},{1})'>{2}</a>", this.P_config.pageNumber - (this.P_config.showNumber + 1), this.P_config.pageSize, ".."));

            //this.P_element.append(prevShow);
        },
        getMiddle: function () {
            var temp = $("<div>");

            for (i = this.P_config.pageNumber - this.P_config.showNumber; i <= this.P_config.pageNumber + this.P_config.showNumber; i++) {
                //                                    this._getMiddlePage();

                if (i === this.P_config.pageNumber) {
                    temp.append($(tool.format("<a class='current'>{0}</a>", this.P_config.pageNumber)));
                }
                else {
                    if (i > 0 & i <= this.P_config.pageCount)
                        temp.append($(tool.format("<a onclick='" + this.P_config.handler + "({0}, {1});'>{2}</a>", i, this.P_config.pageSize, i)));
                }
            }
            //                this._middle = temp.children();
            return temp.children();
        },
        getNextShow: function () {
            return $(tool.format("<a  title=\"后" + (this.P_config.showNumber + 1) + "页\" onclick='" + this.P_config.handler + "({0},{1})'>{2}</a>", this.P_config.pageNumber + (this.P_config.showNumber + 1), this.P_config.pageSize, ".."));

            //this.P_element.append(nextShow);
        },
        getNext: function () {
            //                            this._last = $(tool.format("<a  title='尾页' onclick='" + this.P_config.handler + "({0}, {1});'>尾页</a>", this.P_config.pageCount, this.P_config.pageSize));
            return $(tool.format("<a  title='下一页' onclick='" + this.P_config.handler + "({0}, {1});'>下一页</a>", this.P_config.pageNumber + 1, this.P_config.pageSize));

            //this.P_element.append(next);
        },
        getLast: function () {
            return $(tool.format("<a  title='尾页' onclick='" + this.P_config.handler + "({0}, {1});'>尾页</a>", this.P_config.pageCount, this.P_config.pageSize));

            //this.P_element.append(last);
        },
        getJumpTo: function () {
            return $(tool.format("<span>&nbsp;&nbsp;跳转到&nbsp;</span><input type='text' id='page_jumpid' size='6' maxlength='10'/>&nbsp;<input type='button' id='jumpid' value='跳转' "
                + "onclick='YYC.Control.Paging.pagingTool.jumpNoStr({pageNumber: {0}, pageSize: {1}, pageCount: {2}});'/>", this.P_config.pageNumber, this.P_config.pageSize, this.P_config.pageCount));

            //this.P_element.append(jumpTo);
        }
    }
});

var PagingProductWithStr = YYC.Class(APagingProduct, {
    Init: function (config) {
        this.P_config = extend({}, config);
    },
    Private: {
},
Public: {
    getFirst: function () {
        return $(tool.format("<a  title='首页' onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2});'>首页</a>", this.P_config.str, 1, this.P_config.pageSize));
//        this.P_element.append(first);
    },
    getPrev: function () {
        //                this._prev = $(tool.format("<a  title='上一页' onclick='" + this.P_config.handler + "({0}, {1});'>上一页</a>", this.P_config.pageNumber - 1, this.P_config.pageSize));
        return $(tool.format("<a  title='上一页' onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2});'>上一页</a>", this.P_config.str, this.P_config.pageNumber - 1, this.P_config.pageSize));
        //this.P_element.append(prev);
    },
    getPrevShow: function () {
        return $(tool.format("<a  title=\"前" + (this.P_config.showNumber + 1) + "页\" onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2})'>{2}</a>", this.P_config.str, this.P_config.pageNumber - (this.P_config.showNumber + 1), this.P_config.pageSize, ".."));

        //this.P_element.append(prevShow);
    },
    getMiddle: function () {
        var temp = $("<div>");

        for (i = this.P_config.pageNumber - this.P_config.showNumber; i <= this.P_config.pageNumber + this.P_config.showNumber; i++) {
            //                                    this._getMiddlePage();

            if (i === this.P_config.pageNumber) {
                temp.append($(tool.format("<a class='current'>{0}</a>", this.P_config.pageNumber)));
            }
            else {
                if (i > 0 & i <= this.P_config.pageCount)
                    temp.append($(tool.format("<a onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2});'>{3}</a>", this.P_config.str, i, this.P_config.pageSize, i)));
            }
        }
        //                this._middle = temp.children();
        return temp.children();
    },
    getNextShow: function () {
        return $(tool.format("<a  title=\"后" + (this.P_config.showNumber + 1) + "页\" onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2})'>{3}</a>", this.P_config.str, this.P_config.pageNumber + (this.P_config.showNumber + 1), this.P_config.pageSize, ".."));

        //this.P_element.append(nextShow);
    },
    getNext: function () {
        //                            this._last = $(tool.format("<a  title='尾页' onclick='" + this.P_config.handler + "({0}, {1});'>尾页</a>", this.P_config.pageCount, this.P_config.pageSize));
        return $(tool.format("<a  title='下一页' onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2});'>下一页</a>", this.P_config.str, this.P_config.pageNumber + 1, this.P_config.pageSize));

        //this.P_element.append(next);
    },
    getLast: function () {
        return $(tool.format("<a  title='尾页' onclick='" + this.P_config.handler + "(\"{0}\", {1}, {2});'>尾页</a>", this.P_config.str, this.P_config.pageCount, this.P_config.pageSize));

        //this.P_element.append(last);
    },
    getJumpTo: function () {
        return $(tool.format("<span>&nbsp;&nbsp;跳转到&nbsp;</span><input type='text' id='page_jumpid' size='6' maxlength='10'/>&nbsp;<input type='button' id='jumpid' value='跳转' "
                + "onclick='YYC.Control.Paging.pagingTool.jumpWithStr({str: \"{0}\", pageNumber: {1}, pageSize: {2}, pageCount: {3}});'/>", this.P_config.str, this.P_config.pageNumber, this.P_config.pageSize, this.P_config.pageCount));

        //this.P_element.append(jumpTo);
    }
}
});

YYC.namespace("Control.Paging").PagingProductNoStr = PagingProductNoStr;
YYC.namespace("Control.Paging").PagingProductWithStr = PagingProductWithStr;
} ());

