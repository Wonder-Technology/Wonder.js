describe("PagingDirectorSpec.js", function () {

    describe("YYC.Control.Paging.PagingDirector类", function () {

        //        it("已经创建了实例，（实例只有一个）", function () {
        //            expect(pagingDirector).toBeDefined();
        //        });
        var pagingDirector = null;

        function createPagingDirector(pageNumber) {
            return new YYC.Control.Paging.PagingDirector({ pageNumber: pageNumber, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2, handler: "getContentTab" }, new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: pageNumber, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2, handler: "getContentTab" }));
        }


        beforeEach(function () {
            pagingDirector = createPagingDirector(1);
        });
        afterEach(function () {
            pagingDirector = null;
        });

        it("使用时要创建实例", function () {
            //实例没有prototype属性，而类（函数）有prototype属性
            expect(pagingDirector.prototype).toBeUndefined();
        });
        it("获得config", function () {
            expect(pagingDirector._config).toEqual({ pageNumber: 1, pageCount: 20, showNumber: 2, pageSize: 10, totalCount: 200, handler: "getContentTab" });
        });

        describe("createPaging", function () {
            it("方法存在", function () {
                expect(pagingDirector.createPaging).toBeDefined();
            });

            describe("验证返回值", function () {

                describe("验证页码建造顺序", function () {
                    it("config为{ pageNumber: 5, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、3 4 5 6 7、后3页、 下一页、尾页、共200条 每页显示10条 当前第5/20页 、跳转”", function () {
                        pagingDirector = createPagingDirector(5);
                        var pageControl = pagingDirector.createPaging();

                        expect(testTool.jqueryToString(pageControl)).toMatch(/page_nav.+首页.+上一页.+前3页.+3.+4.+5.+6.+7.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第5\/20页/);
                    });
                    it("config为{ pageNumber: 1, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“123、后3页、 下一页、尾页、共200条 每页显示10条 当前第1/20页 、跳转”", function () {
                        pagingDirector = createPagingDirector(1);
                        var pageControl = pagingDirector.createPaging();

                        expect(testTool.jqueryToString(pageControl)).toMatch(/page_nav.+1.+2.+3.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第1\/20页/);
                    });
                    it("config为{ pageNumber: 2, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、1234、后3页、 下一页、尾页、共200条 每页显示10条 当前第2/20页 、跳转”", function () {
                        pagingDirector = createPagingDirector(2);
                        var pageControl = pagingDirector.createPaging();

                        expect(testTool.jqueryToString(pageControl)).toMatch(/page_nav.+首页.+上一页.+1.+2.+3.+4.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第2\/20页/);
                    });
                    it("config为{ pageNumber: 19, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、17 18 19 20、下一页、尾页、共200条 每页显示10条 当前第19/20页 、跳转”", function () {
                        pagingDirector = createPagingDirector(19);
                        var pageControl = pagingDirector.createPaging();

                        expect(testTool.jqueryToString(pageControl)).toMatch(/page_nav.+首页.+上一页.+17.+18.+19.+20.+下一页.+尾页.+共200条\s每页显示10条\s当前第19\/20页/);
                    });
                    it("config为{ pageNumber: 20, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、18 19 20、共200条 每页显示10条 当前第20/20页 、跳转”", function () {
                        pagingDirector = createPagingDirector(20);
                        var pageControl = pagingDirector.createPaging();

                        expect(testTool.jqueryToString(pageControl)).toMatch(/page_nav.+首页.+上一页.+18.+19.+20.+共200条\s每页显示10条\s当前第20\/20页/);
                    });
                });

                it("验证handler的参数为2个", function () {
                    pagingDirector = new createPagingDirector(5);
                    var pageControl = pagingDirector.createPaging();

                    expect(testTool.jqueryToString(pageControl)).toMatch(/getContentTab\([^,]+,[^\)]+\)/);
                });
            });

        });
    });
});