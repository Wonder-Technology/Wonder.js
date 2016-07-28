//*测试子类
//此处用函数来封装it()或者describe，从而实现多态。。。。。。（太麻烦了！）
//如果测试类也能实现继承、多态就好了！


describe("pagingProduct.js", function () {

    function createProductNoStr(pageNumber) {
        return new YYC.Control.Paging.PagingProductNoStr({ pageNumber: pageNumber, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 3, handler: "getContentTab" });
    };

    function judgeConfigNostr(product) {
        expect(product.P_config).toEqual({ pageNumber: 1, pageCount: 20, showNumber: 3, pageSize: 10, totalCount: 200, handler: "getContentTab" });
    };
    function judgeHandlerNostr(pageNumber) {
        expect(window.getContentTab).toHaveBeenCalledWith(pageNumber, 10);
    };
    function jumpNoStr() {
        return "jumpNoStr";
    };
    function judgeJumpHandlerNoStr() {
        expect(YYC.Control.Paging.pagingTool.jumpNoStr).toHaveBeenCalledWith({ pageNumber: 2, pageSize: 10, pageCount: 20 });
    };





    function createProductWithStr(pageNumber) {
        return new YYC.Control.Paging.PagingProductWithStr({ pageNumber: pageNumber, pageSize: 10, str: "a", pageCount: 20, totalCount: 200, showNumber: 3, handler: "getContentTab" });
    };
    function judgeConfigWithstr(product) {
        expect(product.P_config).toEqual({ pageNumber: 1, str: "a", pageCount: 20, showNumber: 3, pageSize: 10, totalCount: 200, handler: "getContentTab" });
    };
    function judgeHandlerWithstr(pageNumber) {

        expect(window.getContentTab).toHaveBeenCalledWith("a", pageNumber, 10);
    };
    function jumpWithStr() {
        return "jumpWithStr";
    };
    function judgeJumpHandlerWithStr() {
        expect(YYC.Control.Paging.pagingTool.jumpWithStr).toHaveBeenCalledWith({ str: "a", pageNumber: 2, pageSize: 10, pageCount: 20 });
    };



    function test(createProduct, judgeConfig, judgeHandler, jump, judgeJumpHandler) {

        var product = null;

        function exist(object) {
            return object.length > 0;
        };
        function fakeElement(product) {
            product.P_element = $("<div>");
        };
        //        //获得创建的页码
        //        function getAppendPage() {
        //            return product.P_element.children();
        //        };



        beforeEach(function () {
            //            product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });
            product = createProduct(1);
        });
        afterEach(function () {
            product = null;
        });

        it("使用时要创建实例", function () {
            //实例没有prototype属性，而类（函数）有prototype属性
            expect(product.prototype).toBeUndefined();
        });
        it("获得config", function () {
            //            expect(product.P_config).toEqual({ pageNumber: 1, pageCount: 20, showNumber: 3, pageSize: 10, totalCount: 200, handler: "getContentTab" });
            judgeConfig(product);
        });
        //        it("P_element已定义", function () {
        //            expect(product.P_element).toBeDefined();
        //        });
        describe("setDiv", function () {
            it("方法存在", function () {
                expect(product.setDiv).toBeDefined();
            });
            it("返回页码应该包括一个层，样式为传入的参数", function () {
                //                spyOn(page, "_insertPaging");
                //                product.getMiddle
                //                element = page._insertPaging.calls[0].args[1];
                //                        var element = getElement(page);
                product.setDiv("style");

                //                expect(product.P_element.attr("class")).toEqual("page_nav");
                expect(product.getProduct()[0].tagName).toEqual("DIV");
                expect(product.getProduct().attr("class")).toEqual("style");
            });
        });

        describe("getOnlyOne", function () {
            it("方法存在", function () {
                expect(product.getOnlyOne).toBeDefined();
            });
            //            it("如果pageCount小于等于1，则P_element应该包括“共x条”", function () {
            //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 1, pageSize: 10, pageCount: 1, totalCount: 8, showNumber: 2, handler: "getContentTab" });

            //                product.getOnlyOne();

            //                expect(testTool.jqueryToString(product.P_element)).toMatch(/共8条/);
            //            });
            it("返回页码应该包括“共x条”", function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 1, pageSize: 10, pageCount: 1, totalCount: 8, showNumber: 2, handler: "getContentTab" });
                product = createProduct(1);

                fakeElement(product);
                //                product.getOnlyOne();

                expect(testTool.jqueryToString(product.getOnlyOne())).toMatch(/共200条/);
            });
        });

        describe("首页、上一页、前x页、后x页、下一页、尾页", function () {
            var temp = null;
            function fakeGetContentTab() {
                //创建监控函数getContentTab，用于验证handler
                window.getContentTab = jasmine.createSpy('getContentTab');
            };
            function backUp() {
                temp = window.getContentTab;
            };
            function restore() {
                window.getContentTab = temp;
            };


            function judgeMethod(methodStr, pageNumber) {
                describe(methodStr, function () {
                    it("方法存在", function () {
                        expect(product[methodStr]).toBeDefined();
                    });
                    it("返回页码", function () {
                        var page = product[methodStr]();

                        expect(page).toBejQuery();
                    });
                    it("验证handler", function () {
                        product[methodStr]().click();

                        judgeHandler(pageNumber);
                    });
                });
            };



            beforeEach(function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 7, pageSize: 10, totalCount: 200, showNumber: 3, pageCount: 20, handler: "getContentTab" });
                product = createProduct(7);

                backUp();
                fakeGetContentTab();

                fakeElement(product);
            });
            afterEach(function () {
                product = null;
                restore();
            });

            judgeMethod("getFirst", 1);

            judgeMethod("getPrev", 6);

            judgeMethod("getPrevShow", 3);

            judgeMethod("getNextShow", 11);

            judgeMethod("getNext", 8);

            judgeMethod("getLast", 20);
        });

        describe("getMiddle", function () {
            var temp = null;

            function construct(pageNumber) {
                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: pageNumber, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                fakeElement(product);
                return product.getMiddle();
            };
            function fakeGetContentTab() {
                //创建监控函数getContentTab，用于验证handler
                window.getContentTab = jasmine.createSpy('getContentTab');
            };
            function backUp() {
                temp = window.getContentTab;
            };
            function restore() {
                window.getContentTab = temp;
            };

            function judge(pageNumber, regex) {
                var current = construct(pageNumber).filter(".current");

                expect(current.text()).toEqual(pageNumber.toString());
                expect(testTool.jqueryToString(construct(pageNumber))).toMatch(regex);
            };


            beforeEach(function () {

            });
            afterEach(function () {
            });

            it("方法存在", function () {
                expect(product.getMiddle).toBeDefined();
            });
            it("如果pageNumber为10，当前页码应该为10", function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 10, pageSize: 10, totalCount: 200, pageCount: 20, showNumber: 5, handler: "getContentTab" });
                //                product.getMiddle()



                //                        var current = getAppendPage().siblings(".current");
                var current = construct(10).filter(".current");

                expect(current.length).toEqual(1);  //验证当前页码只有1个
                expect(current.text()).toEqual("10");
            });
            it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该为5 6 7 8 9 10 11 12 13 14 15，其中10为当前页", function () {
                //                construct(10);

                //                        var middle = getAppendPage();
                //                var current = construct(10).filter(".current");

                //                expect(current.text()).toEqual("10");
                //                expect(testTool.jqueryToString(construct(10))).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);

                judge(10, /.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);

                //                        console.log(getAppendPage());
            });
            it("如果pageNumber为2、pageCount为20、showNumber为5，则中间页码应该为1234567，其中2为当前页", function () {
                //                construct(2);

                //                //                        var middle = getAppendPage();
                //                var current = getAppendPage().filter(".current");

                //                expect(current.text()).toEqual("2");
                //                expect(testTool.jqueryToString(getAppendPage())).toMatch(/.+1.+current.+2.+3.+4.+5.+6.+7/);
                judge(2, /.+1.+current.+2.+3.+4.+5.+6.+7/);
            });
            it("如果pageNumber为20、pageCount为20、showNumber为5，则中间页码应该为151617181920，其中20为当前页", function () {
                //                construct(20);

                //                //                        var middle = getAppendPage();
                //                var current = getAppendPage().filter(".current");

                //                expect(current.text()).toEqual("20");
                //                expect(testTool.jqueryToString(getAppendPage())).toMatch(/.+15.+16.+17.+18.+19.+current.+20(?!.+21)/);  //页码不能包含21
                judge(20, /.+15.+16.+17.+18.+19.+current.+20(?!.+21)/);     //页码不能包含21
            });
            it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该有11个", function () {
                //                construct(10);

                expect(construct(10).length).toEqual(11);

                //                        console.log(getAppendPage());
            });
            it("验证handler", function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 10, pageSize: 10, totalCount: 200, pageCount: 20, showNumber: 5, handler: "getContentTab" });
                product = createProduct(10);

                //                //创建监控函数getContentTab，用于验证handler
                //                window.getContentTab = jasmine.createSpy('getContentTab');

                backUp();
                fakeGetContentTab();
                //构造假P_element
                fakeElement(product);

                //                product.getMiddle()

                var p = product.getMiddle().filter(function () {
                    if ($(this).text() == "9") {
                        return true;
                    }

                    return false;
                });
                p.click();    //触发click事件

                //                expect(window.getContentTab).toHaveBeenCalled();
                //                expect(window.getContentTab).toHaveBeenCalledWith(9, 10);
                judgeHandler(9);

                restore();
            });
            //            it("插入到element中", function () {
            //                construct(10);
            //                //                var element = getElement(product);

            //                expect(testTool.jqueryToString(product.P_element)).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);
            //            });
        });

        describe("getInfo", function () {
            var regex = /共200条\s每页显示10条\s当前第2\/20页/;

            beforeEach(function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });
                product = createProduct(2);


                fakeElement(product);
                product.getInfo();
            });
            afterEach(function () {
                product = null;
            });

            it("方法存在", function () {
                expect(product.getInfo).toBeDefined();
            });
            //            it("_info不为空", function () {
            //                expect(product._info).toBeDefined();
            //                expect(product._info).not.toBeNull();
            //            });
            it("显示正确的页码信息", function () {
                expect(testTool.jqueryToString(product.getInfo())).toMatch(regex);
            });
            //            it("插入到element中", function () {
            //                expect(testTool.jqueryToString(product.P_element)).toMatch(regex);
            //            });
        });

        describe("getJumpTo", function () {
            //            function fakePage() {
            //                $("#page_jumpid").val("3");
            //            };

            var temp = null;

            function fakeJump() {
                //创建YYC.Control.Paging.pagingTool的监视函数jumpNoStr，从而不依赖YYC.Control.Paging.pagingTool的jumpNoStr方法
                YYC.Control.Paging.pagingTool[jump()] = jasmine.createSpy('jumpNoStr');
            };
            function backUp() {
                temp = YYC.Control.Paging.pagingTool[jump()];
            };
            function restore() {
                YYC.Control.Paging.pagingTool[jump()] = temp;
            };

            beforeEach(function () {
                //                product = new YYC.Control.Paging.PagingProductNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });
                product = createProduct(2);


                fakeElement(product);

                //                spyOn(product, "jump");


                backUp();
                fakeJump();

                //                product.getJumpTo();
            });
            afterEach(function () {
                product = null;
                restore();
            });

            it("方法存在", function () {
                expect(product.getJumpTo).toBeDefined();
            });
            //            it("_jumpTo不为空", function () {
            //                expect(product._jumpTo).not.toBeNull();
            //            });
            it("验证handler", function () {
                //                window.page = page;
                //                spyOn(page, "jump");

                //                page.renderTo(container);

                //                //跳转到第3页
                //                fakePage();

                product.getJumpTo().click();    //触发click事件

                //                expect(YYC.Control.Paging.pagingTool.jumpNoStr).toHaveBeenCalled();
                //                expect(YYC.Control.Paging.pagingTool[jump()]).toHaveBeenCalledWith({ pageNumber: 2, pageSize: 10, pageCount: 20 });
                judgeJumpHandler()


            });
            //            it("插入到element中", function () {
            //                expect(testTool.jqueryToString(product.P_element)).toMatch(/跳转/);
            //            });
        });

        describe("add", function () {
            beforeEach(function () {
                product = createProduct(1);

                fakeElement(product);
            });
            afterEach(function () {
                product = null;
            });

            it("方法存在", function () {
                expect(product.add).toBeDefined(); ;
            });
            it("插入到element中", function () {
                product.add($("<span>"));

                expect(product.P_element.children().length).toEqual(1);
            });
        });

        describe("getProduct", function () {
            beforeEach(function () {
                product = createProduct(1);
            });
            afterEach(function () {
                product = null;
            });

            it("方法存在", function () {
                expect(product.getProduct).toBeDefined();
            });
            it("返回element", function () {
                fakeElement(product);

                var result = product.getProduct();

                expect(result[0].tagName).toEqual("DIV");
            });
        });


    };

    describe("YYC.Control.Paging.PagingProductNoStr类", function () {
        test(createProductNoStr, judgeConfigNostr, judgeHandlerNostr, jumpNoStr, judgeJumpHandlerNoStr);
    });

    describe("YYC.Control.Paging.PagingProductWithStr类", function () {
        test(createProductWithStr, judgeConfigWithstr, judgeHandlerWithstr, jumpWithStr, judgeJumpHandlerWithStr);
    });
});