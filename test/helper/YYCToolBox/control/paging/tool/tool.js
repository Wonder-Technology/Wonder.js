(function () {

    function bindWithArguments(object, fun, args) {
        var _args = null;
        var self = this;

        _args = Array.prototype.slice.call(arguments, 2);

        return function () {
            return fun.apply(object, _args);
        }
    };
    function jump(config, func) {
        var pageNumber = config.pageNumber,
                    pageSize = config.pageSize,
                    pageCount = config.pageCount,
                    handler = config.handler ? config.handler : "getContentTab";
        //                    str = config.str;

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
                //                window[handler](str, jtext, pageSize);

                func();

                //                        getContentTab(jtext, pageSize);
            }
            else {
                alert("您输入的页号超过了最大页数，请重新输入~");
            }
        }
    };

    var pagingTool = {
        jumpNoStr: function (config) {
            var jtext = jQuery.trim($("#page_jumpid").val());
            var pageSize = config.pageSize;
            var handler = config.handler ? config.handler : "getContentTab";

            jump(config, bindWithArguments(window, window[handler], jtext, pageSize));
        },
        jumpWithStr: function (config) {
            var jtext = jQuery.trim($("#page_jumpid").val());
            var pageSize = config.pageSize;
            var handler = config.handler ? config.handler : "getContentTab";
            var str = config.str;

            jump(config, bindWithArguments(window, window[handler], str, jtext, pageSize));
        }
    };

    YYC.namespace("Control.Paging").pagingTool = pagingTool;
} ());

