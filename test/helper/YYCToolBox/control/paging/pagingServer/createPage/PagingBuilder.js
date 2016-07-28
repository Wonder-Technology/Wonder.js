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


    //    var IPagingBuilder = YYC.Interface("builDdiv", "getOnlyOne", "getFirst", "getPrev", "getPrevShow", "getMiddle", "getNext", "getNextShow", "getLast", "getInfo", "getJumpTo", "getProduct");
    //    { Interface: IPagingBuilder }, 


    var APagingBuilder = YYC.AClass({
        Protected: {
            Abstract: {
                //*子类实现

                P_product: null
            }
        },
        Public: {
//            buildDiv: function () {
//                //                this.P_element = $("<div class='page_nav'/>");
//                this.P_product.setDiv();
//            },
            buildOnlyOne: function () {
                //                if (this.P_config.pageCount <= 1) {
                //                this.P_element.append($("<span>共" + this.P_config.totalCount + "条</span>"));
                this.P_product.add(this.P_product.getOnlyOne());
                //                }
            },
            buildFirst: function () {
                this.P_product.add(this.P_product.getFirst());
            },
            buildPrev: function () {
                this.P_product.add(this.P_product.getPrev());
            },
            buildPrevShow: function () {
                this.P_product.add(this.P_product.getPrevShow());
            },
            buildMiddle: function () {
                this.P_product.add(this.P_product.getMiddle());
            },
            buildNextShow: function () {
                this.P_product.add(this.P_product.getNextShow());
            },
            buildNext: function () {
                this.P_product.add(this.P_product.getNext());
            },
            buildLast: function () {
                this.P_product.add(this.P_product.getLast());
            },
            buildJumpTo: function () {
                this.P_product.add(this.P_product.getJumpTo());
            },
            buildInfo: function () {
                //                this._info = $(tool.format("<span> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", this.P_config.totalCount, this.P_config.pageSize, this.P_config.pageNumber, this.P_config.pageCount));
                //                var info = $(tool.format("<span> 共{0}条 每页显示{1}条 当前第{2}/{3}页</span>", this.P_config.totalCount, this.P_config.pageSize, this.P_config.pageNumber, this.P_config.pageCount));

                //                this.P_element.append(info);
                this.P_product.add(this.P_product.getInfo());
            },
            getProduct: function () {
                //                return this.P_element;
                return this.P_product.getProduct();
            }
        }
    });

    var PagingBuilderNoStr = YYC.Class(APagingBuilder, {
        Init: function (config) {
            //            this.P_config = extend({}, config);
            var className = "";

            this.P_product = new YYC.Control.Paging.PagingProductNoStr(config);
            if (config.className === undefined) {
                className = "page_nav";
            }
            else {
                className = config.className;
            }
            this.P_product.setDiv(className);

        }
        //Protected: {
        //    //*实现父类抽象成员

        //    P_product: null
        //}
    });

    var PagingBuilderWithStr = YYC.Class(APagingBuilder, {
        Init: function (config) {
            this.P_product = new YYC.Control.Paging.PagingProductWithStr(config);
            if (config.className === undefined) {
                className = "page_nav";
            }
            else {
                className = config.className;
            }
            this.P_product.setDiv(className);
        }
        //Protected: {
        //    //*实现父类抽象成员

        //    P_product: null
        //}
    });


    YYC.namespace("Control.Paging").PagingBuilderNoStr = PagingBuilderNoStr;
    YYC.namespace("Control.Paging").PagingBuilderWithStr = PagingBuilderWithStr;
} ());

