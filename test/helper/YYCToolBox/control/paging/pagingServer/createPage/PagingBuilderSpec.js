//* pagingBuilder.js不用写测试了。
//因为这部分比较简单，就是调用pagingProduct的接口，没有逻辑判断（除了构造函数（要判断className，并调用setDiv）和getProduct方法（返回的操作需测试）可以测试）。
//所以只需要测试上一层用户的需求即可（即测试pagingDirector.js的接口和行为）。
//这样就算测试pagingDirector.js时出错，也能比较快速地找到错误（错误可能在pagingBuilder.js和pagingProduct.js中）
//（虽然不如“测试pagingBuilder.js时出错，找到pagingBuilder.js错误”的速度快）。

//如果pagingBuilder.js或者pagingProduct.js变得比较复杂（有很多的逻辑、耦合、层），则再使用TDD开发新的pagingBuilder.js或者pagingProduct.js。



describe("pagingBuilder.js", function () {

    describe("YYC.Control.Paging.PagingBuilderNoStr类", function () {
        var builder = null;

        beforeEach(function () {
            //                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });
        });
        afterEach(function () {
            //                builder = null;
        });

        it("使用时要创建实例", function () {
            builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

            //实例没有prototype属性，而类（函数）有prototype属性
            expect(builder.prototype).toBeUndefined();
        });

//        如果参数config.className!==undefined，则
        describe("构造函数", function () {
            it("调用getProduct的返回值应该是个层，且类名为config.className", function () {
                builder = new YYC.Control.Paging.PagingBuilderNoStr({ className: "style", pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

                var result = builder.getProduct();

                expect(result[0].tagName).toEqual("DIV");
                expect(result.attr("class")).toEqual("style");
            });
            it("如果参数config.className===undefined，调用getProduct的返回值应该是个层，且类名为'page_nav'", function () {
                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

                var result = builder.getProduct();

                expect(result[0].tagName).toEqual("DIV");
                expect(result.attr("class")).toEqual("page_nav");
            });
        });

        describe("getProduct", function () {

            beforeEach(function () {
                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });
            });
            afterEach(function () {
                builder = null;
            });

            it("方法存在", function () {
                expect(builder.getProduct).toBeDefined();
            });
            it("测试调用了P_product.getProduct方法并返回", function () {
                spyOn(builder.P_product, "getProduct").andReturn("DIV");
                var element = builder.getProduct();

                expect(builder.P_product.getProduct).toHaveBeenCalled();
                expect(element).toEqual("DIV");
            });
        });

    });

    describe("YYC.Control.Paging.PagingBuilderWithStr类", function () {
        var builder = null;

        beforeEach(function () {
            //                builder = new YYC.Control.Paging.PagingBuilderWithStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });
        });
        afterEach(function () {
            //                builder = null;
        });

        it("使用时要创建实例", function () {
            builder = new YYC.Control.Paging.PagingBuilderWithStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

            //实例没有prototype属性，而类（函数）有prototype属性
            expect(builder.prototype).toBeUndefined();
        });

        //        如果参数config.className!==undefined，则
        describe("构造函数", function () {
            it("调用getProduct的返回值应该是个层，且类名为config.className", function () {
                builder = new YYC.Control.Paging.PagingBuilderWithStr({ className: "style", pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

                var result = builder.getProduct();

                expect(result[0].tagName).toEqual("DIV");
                expect(result.attr("class")).toEqual("style");
            });
            it("如果参数config.className===undefined，调用getProduct的返回值应该是个层，且类名为'page_nav'", function () {
                builder = new YYC.Control.Paging.PagingBuilderWithStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });

                var result = builder.getProduct();

                expect(result[0].tagName).toEqual("DIV");
                expect(result.attr("class")).toEqual("page_nav");
            });
        });

        describe("getProduct", function () {

            beforeEach(function () {
                builder = new YYC.Control.Paging.PagingBuilderWithStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });
            });
            afterEach(function () {
                builder = null;
            });

            it("方法存在", function () {
                expect(builder.getProduct).toBeDefined();
            });
            it("测试调用了P_product.getProduct方法并返回", function () {
                spyOn(builder.P_product, "getProduct").andReturn("DIV");
                var element = builder.getProduct();

                expect(builder.P_product.getProduct).toHaveBeenCalled();
                expect(element).toEqual("DIV");
            });
        });

    });
});


//describe("pagingBuilder.js", function () {

//    describe("YYC.Control.Paging.PagingBuilderNoStr类", function () {
//        var builder = null;

//        function exist(object) {
//            return object.length > 0;
//        };
//        function fakeElement(builder) {
//            builder.P_element = $("<div>");
//        };
//        //获得创建的页码
//        function getAppendPage() {
//            return builder.P_element.children();
//        };



//        beforeEach(function () {
//            builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 4, totalCount: 33, showNumber: 2, handler: "getContentTab" });
//        });
//        afterEach(function () {
//            builder = null;
//        });

//        it("使用时要创建实例", function () {
//            //实例没有prototype属性，而类（函数）有prototype属性
//            expect(builder.prototype).toBeUndefined();
//        });
//        //        it("获得config", function () {
//        //            expect(builder.P_config).toEqual({ pageNumber: 1, pageCount: 4, showNumber: 2, pageSize: 10, totalCount: 33, handler: "getContentTab" });
//        //        });
//        //        it("P_element已定义", function () {
//        //            expect(builder.P_element).toBeDefined();
//        //        });
//        describe("buildDiv", function () {
//            it("方法存在", function () {
//                expect(builder.buildDiv).toBeDefined();
//            });
//it("调用getProduct获得的product应该包括一个层，样式为'page_nav'", function () {
//    //                spyOn(page, "_insertPaging");
//    //                builder.buildMiddle
//    //                element = page._insertPaging.calls[0].args[1];
//    //                        var element = getElement(page);
//    builder.buildDiv();

//    expect(builder.getProduct()[0].tagName).toEqual("DIV");
//    expect(builder.getProduct().attr("class")).toEqual("page_nav");
//});
//        });

//        describe("buildOnlyOne", function () {
//            it("方法存在", function () {
//                expect(builder.buildOnlyOne).toBeDefined();
//            });
//            //            it("如果pageCount小于等于1，则P_element应该包括“共x条”", function () {
//            //                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 1, totalCount: 8, showNumber: 2, handler: "getContentTab" });

//            //                builder.buildOnlyOne();

//            //                expect(testTool.jqueryToString(builder.P_element)).toMatch(/共8条/);
//            //            });
//            it("element应该包括“共x条”", function () {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 1, pageSize: 10, pageCount: 1, totalCount: 8, showNumber: 2, handler: "getContentTab" });

//                fakeElement(builder);
//                builder.buildOnlyOne();

//                expect(testTool.jqueryToString(builder.P_element)).toMatch(/共8条/);
//            });
//        });

//        describe("首页、上一页、前x页、后x页、下一页、尾页", function () {
//            var temp = null;
//            function fakeGetContentTab() {
//                //创建监控函数getContentTab，用于验证handler
//                window.getContentTab = jasmine.createSpy('getContentTab');
//            };
//            function backUp() {
//                temp = window.getContentTab;
//            };
//            function restore() {
//                window.getContentTab = temp;
//            };

//            beforeEach(function () {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 7, pageSize: 10, totalCount: 200, showNumber: 3, pageCount: 20, handler: "getContentTab" });

//                backUp();
//                fakeGetContentTab();

//                fakeElement(builder);
//            });
//            afterEach(function () {
//                builder = null;
//                restore();
//            });

//            describe("buildFirst", function () {
//                it("方法存在", function () {
//                    expect(builder.buildFirst).toBeDefined();
//                });
//                //                it("_first不为空", function () {
//                //                    builder.buildFirst();

//                //                    expect(builder._first).toBeDefined();
//                //                    expect(builder._first).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    //                            builder.buildMiddle
//                    builder.buildFirst();
//                    //                    builder._first.click();    //触发click事件
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(1, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildFirst();

//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/首页/);
//                });
//            });

//            describe("buildPrev", function () {

//                it("方法存在", function () {
//                    expect(builder.buildPrev).toBeDefined();
//                });
//                //                it("_prev不为空", function () {
//                //                    builder.buildPrev();

//                //                    expect(builder._prev).toBeDefined();
//                //                    expect(builder._prev).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    //                            builder.buildMiddle
//                    builder.buildPrev();
//                    //                    builder._prev.click();    //触发click事件
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(6, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildPrev();

//                    //                    expect(testTool.jqueryToString(builder.P_element).contain("上一页")).toBeTruthy();
//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/上一页/);
//                });
//            });

//            describe("buildPrevShow", function () {
//                it("方法存在", function () {
//                    expect(builder.buildPrevShow).toBeDefined();
//                });
//                //                it("_prevShow不为空", function () {
//                //                    builder.buildPrevShow();

//                //                    expect(builder._prevShow).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    builder.buildPrevShow();
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(3, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildPrevShow();

//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/前\d+页/);
//                });
//            });

//            describe("buildNextShow", function () {
//                it("方法存在", function () {
//                    expect(builder.buildNextShow).toBeDefined();
//                });
//                //                it("_prevShow不为空", function () {
//                //                    builder.buildNextShow();

//                //                    expect(builder._nextShow).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    builder.buildNextShow();
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(11, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildNextShow();

//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/后\d+页/);
//                });
//            });

//            describe("buildNext", function () {

//                it("方法存在", function () {
//                    expect(builder.buildNext).toBeDefined();
//                });
//                //                it("_next不为空", function () {
//                //                    builder.buildNext();

//                //                    expect(builder._next).toBeDefined();
//                //                    expect(builder._next).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    //                            builder.buildMiddle
//                    builder.buildNext();
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(8, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildNext();

//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/下一页/);
//                });
//            });

//            describe("buildLast", function () {
//                it("方法存在", function () {
//                    expect(builder.buildLast).toBeDefined();
//                });
//                //                it("_first不为空", function () {
//                //                    builder.buildLast();

//                //                    expect(builder._last).toBeDefined();
//                //                    expect(builder._last).not.toBeNull();
//                //                });
//                it("验证handler", function () {
//                    builder.buildLast();
//                    //                    builder._last.click();    //触发click事件
//                    getAppendPage().click();

//                    expect(window.getContentTab).toHaveBeenCalled();
//                    expect(window.getContentTab).toHaveBeenCalledWith(20, 10);
//                });
//                it("插入到element中", function () {
//                    builder.buildLast();

//                    expect(testTool.jqueryToString(builder.P_element)).toMatch(/尾页/);
//                });
//            });
//        });

//        describe("buildMiddle", function () {
//            var temp = null;

//            function construct(pageNumber) {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: pageNumber, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 5, handler: "getContentTab" });
//                fakeElement(builder);
//                builder.buildMiddle()
//            };
//            function fakeGetContentTab() {
//                //创建监控函数getContentTab，用于验证handler
//                window.getContentTab = jasmine.createSpy('getContentTab');
//            };
//            function backUp() {
//                temp = window.getContentTab;
//            };
//            function restore() {
//                window.getContentTab = temp;
//            };

//            beforeEach(function () {

//            });
//            afterEach(function () {
//            });

//            it("方法存在", function () {
//                expect(builder.buildMiddle).toBeDefined();
//            });
//            //            it("_middle不为空", function () {
//            //                //                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 10, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 5, handler: "getContentTab" });
//            //                //                fakeElement(builder);

//            //                //                builder.buildMiddle()
//            //                construct(10);


//            //                expect(getAppendPage()).toBeDefined();
//            //                expect(getAppendPage()).not.toBeNull();
//            //            });
//            it("如果pageNumber为10，当前页码应该为10", function () {
//                //                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 10, pageSize: 10, totalCount: 200, pageCount: 20, showNumber: 5, handler: "getContentTab" });
//                //                builder.buildMiddle()
//                construct(10);


//                //                        var current = getAppendPage().siblings(".current");
//                var current = getAppendPage().filter(".current");

//                expect(current.length).toEqual(1);  //验证当前页码只有1个
//                expect(current.text()).toEqual("10");
//            });
//            it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该为5 6 7 8 9 10 11 12 13 14 15，其中10为当前页", function () {
//                construct(10);

//                //                        var middle = getAppendPage();
//                var current = getAppendPage().filter(".current");

//                expect(current.text()).toEqual("10");
//                expect(testTool.jqueryToString(getAppendPage())).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);

//                //                        console.log(getAppendPage());
//            });
//            it("如果pageNumber为2、pageCount为20、showNumber为5，则中间页码应该为1234567，其中2为当前页", function () {
//                construct(2);

//                //                        var middle = getAppendPage();
//                var current = getAppendPage().filter(".current");

//                expect(current.text()).toEqual("2");
//                expect(testTool.jqueryToString(getAppendPage())).toMatch(/.+1.+current.+2.+3.+4.+5.+6.+7/);
//            });
//            it("如果pageNumber为20、pageCount为20、showNumber为5，则中间页码应该为151617181920，其中20为当前页", function () {
//                construct(20);

//                //                        var middle = getAppendPage();
//                var current = getAppendPage().filter(".current");

//                expect(current.text()).toEqual("20");
//                expect(testTool.jqueryToString(getAppendPage())).toMatch(/.+15.+16.+17.+18.+19.+current.+20(?!.+21)/);  //页码不能包含21
//            });
//            it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该有11个", function () {
//                construct(10);

//                expect(getAppendPage().length).toEqual(11);

//                //                        console.log(getAppendPage());
//            });
//            it("验证handler", function () {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 10, pageSize: 10, totalCount: 200, pageCount: 20, showNumber: 5, handler: "getContentTab" });

//                //                //创建监控函数getContentTab，用于验证handler
//                //                window.getContentTab = jasmine.createSpy('getContentTab');

//                backUp();
//                fakeGetContentTab();
//                //构造假P_element
//                fakeElement(builder);

//                builder.buildMiddle()

//                var p = getAppendPage().filter(function () {
//                    if ($(this).text() == "9") {
//                        return true;
//                    }

//                    return false;
//                });
//                p.click();    //触发click事件

//                expect(window.getContentTab).toHaveBeenCalled();
//                expect(window.getContentTab).toHaveBeenCalledWith(9, 10);

//                restore();
//            });
//            it("插入到element中", function () {
//                construct(10);
//                //                var element = getElement(builder);

//                expect(testTool.jqueryToString(builder.P_element)).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);
//            });
//        });

//        describe("buildInfo", function () {
//            var regex = /共33条\s每页显示10条\s当前第2\/4页/;

//            beforeEach(function () {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });
//                fakeElement(builder);
//                builder.buildInfo();
//            });
//            afterEach(function () {
//                builder = null;
//            });

//            it("方法存在", function () {
//                expect(builder.buildInfo).toBeDefined();
//            });
//            //            it("_info不为空", function () {
//            //                expect(builder._info).toBeDefined();
//            //                expect(builder._info).not.toBeNull();
//            //            });
//            it("显示正确的页码信息", function () {
//                expect(testTool.jqueryToString(getAppendPage())).toMatch(regex);
//            });
//            it("插入到element中", function () {
//                expect(testTool.jqueryToString(builder.P_element)).toMatch(regex);
//            });
//        });

//        describe("buildJumpTo", function () {
//            //            function fakePage() {
//            //                $("#page_jumpid").val("3");
//            //            };

//            var temp = null;

//            function fakeJump() {
//                //创建YYC.Control.Paging.pagingTool的监视函数jumpNoStr，从而不依赖YYC.Control.Paging.pagingTool的jumpNoStr方法
//                YYC.Control.Paging.pagingTool.jumpNoStr = jasmine.createSpy('jumpNoStr');
//            };
//            function backUp() {
//                temp = YYC.Control.Paging.pagingTool.jumpNoStr;
//            };
//            function restore() {
//                YYC.Control.Paging.pagingTool.jumpNoStr = temp;
//            };

//            beforeEach(function () {
//                builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });



//                fakeElement(builder);

//                //                spyOn(builder, "jump");


//                backUp();
//                fakeJump();

//                builder.buildJumpTo();
//            });
//            afterEach(function () {
//                builder = null;
//                restore();
//            });

//            it("方法存在", function () {
//                expect(builder.buildJumpTo).toBeDefined();
//            });
//            //            it("_jumpTo不为空", function () {
//            //                expect(builder._jumpTo).not.toBeNull();
//            //            });
//            it("验证handler", function () {
//                //                window.page = page;
//                //                spyOn(page, "jump");

//                //                page.renderTo(container);

//                //                //跳转到第3页
//                //                fakePage();

//                getAppendPage().click();    //触发click事件

//                expect(YYC.Control.Paging.pagingTool.jumpNoStr).toHaveBeenCalled();
//                expect(YYC.Control.Paging.pagingTool.jumpNoStr).toHaveBeenCalledWith({ pageNumber: 2, pageSize: 10, pageCount: 4 });
//            });
//            it("插入到element中", function () {
//                expect(testTool.jqueryToString(builder.P_element)).toMatch(/跳转/);
//            });
//        });

//describe("getProduct", function () {

//    beforeEach(function () {
//        builder = new YYC.Control.Paging.PagingBuilderNoStr({ pageNumber: 2, pageSize: 10, totalCount: 33, pageCount: 4, handler: "getContentTab" });

//        //                fakeElement(builder);
//    });
//    afterEach(function () {
//        builder = null;
//    });

//    it("方法存在", function () {
//        expect(builder.getProduct).toBeDefined();
//    });
//    it("测试返回值", function () {
//        spyOn(builder.P_product, "getProduct").andReturn("DIV");

//        var element = builder.getProduct();

//        expect(builder.P_product.getProduct).toHaveBeenCalled();
//        expect(element).toEqual("DIV");
//    });
//});
//    });
//});