(function () {
    function extend(destination, source) {
        //            var temp = {};

        var property = "";

        for (property in source) {
            //                temp[property] = source[property];  //用中间对象来保存source
            destination[property] = source[property];
        }
        return destination;
    };

    var PagingDirector = YYC.Class({
        Init: function (config, builder) {      //传入builder
            this._config = extend({}, config);

            this._builder = builder;
        },
        Private: {
            _config: null,
            _builder: null
        },
        Public: {
            createPaging: function () {
//                this._builder.buildDiv();
                if (this._config.pageCount <= 1) {
                    this._builder.buildOnlyOne();

                    return this._builder.getProduct();
                }
                if (this._config.pageNumber > 1) {
                    this._builder.buildFirst();
                    this._builder.buildPrev();
                }
                if (this._config.pageNumber > (this._config.showNumber + 1)) {
                    this._builder.buildPrevShow();
                }
                this._builder.buildMiddle();
                if (this._config.pageNumber < (this._config.pageCount - this._config.showNumber)) {
                    this._builder.buildNextShow();
                }
                if (this._config.pageNumber < this._config.pageCount) {
                    this._builder.buildNext();
                    this._builder.buildLast();
                }
                this._builder.buildInfo();
                this._builder.buildJumpTo();

                return this._builder.getProduct();
            }
        }
    });

    //    window.pagingDirector = new YYC.Control.Paging.PagingDirector();
    YYC.namespace("Control.Paging").PagingDirector = PagingDirector;
} ());