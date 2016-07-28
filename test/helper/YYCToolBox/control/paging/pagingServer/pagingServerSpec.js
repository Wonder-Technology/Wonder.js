/* 重构之前


//*使用了createSpy创建监控函数getContentTab

describe("pagingServer.js", function () {

    describe("YYC.Control.PagingServer类", function () {
        var page = null;

        function createInstance() {
            return new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 });
        };

        beforeEach(function () {
        });
        afterEach(function () {
        });

        //    pageNumber, pageCount, pageSize, totalCount, showNumber, handler, str

        it("使用时要创建实例", function () {
            //实例没有prototype属性，而类（函数）有prototype属性
            expect(createInstance().prototype).toBeUndefined();
        });

        describe("Init", function () {
            it("参数多于1个时抛出异常", function () {
                var func = function () {
                    new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 }, 1);
                };

                expect(func).toThrow();
            });
            describe("checkAndSetConfig", function () {
                it("参数为undefined时创建默认的_config", function () {
                    expect(createInstance()._config).toBeDefined();
                    expect(createInstance()._config).not.toBeNull();
                });
                it("参数没有pageNumber/totalCount时抛出异常", function () {
                    var func1 = function () {
                        new YYC.Control.PagingServer({});
                    };
                    var func2 = function () {
                        new YYC.Control.PagingServer({ pageNumber: 1 });
                    };
                    var func3 = function () {
                        new YYC.Control.PagingServer({ totalCount: 1 });
                    };

                    expect(func1).toThrow();
                    expect(func2).toThrow();
                    expect(func3).toThrow();
                });
                it("计算pageCount", function () {
                    expect(new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 22 })._config.pageCount).toEqual(3);
                });
                it("参数的totalCount不等于0且pageNumber大于pageCount时抛出异常", function () {
                    var func = function () {
                        new YYC.Control.PagingServer({ pageNumber: 4, pageSize: 10, totalCount: 22 })
                    };

                    expect(func).toThrow();
                });
                it("参数的totalCount等于0时抛出异常", function () {
                    var func = function () {
                        new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 0 })
                    };

                    expect(func).not.toThrow();
                });
            });


            it("构造函数参数如果没有str属性，则_type为0，否则_type为1", function () {
                expect(new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 })._type).toEqual(0);
                expect(new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1, str: "test" })._type).toEqual(1);
            });
        });

        describe("renderTo", function () {
            var container = "test_container";

            function insertContainer() {
                var dom = $("<div id='test_container'></div>")
                $("body").append(dom);
            };
            function removeContainer() {
                $("#test_container").remove();
            };

            beforeEach(function () {
                insertContainer();
                page = createInstance();
            });
            afterEach(function () {
                removeContainer();
                page = null;
            });

            it("方法存在", function () {
                expect(page.renderTo).toBeDefined();
            });
            it("将分页element插入到container中", function () {
                spyOn(page, "_insertPaging");

                page.renderTo(container);

                expect(page._insertPaging.calls.length).toEqual(1);     //调用1次
                expect(page._insertPaging.calls[0].args[1]).toBejQuery();
            });
            it("如果有_type为0，则调用_createPagingNoStr", function () {
                page._type = 0;
                spyOn(page, "_createPagingNoStr");

                page.renderTo(container);

                expect(page._createPagingNoStr).toHaveBeenCalled();
            });
            it("如果_type为1，则调用_createPagingWithStr", function () {
                page._type = 1;
                spyOn(page, "_createPagingWithStr");

                page.renderTo(container);

                expect(page._createPagingWithStr).toHaveBeenCalled();
            });

            describe("调用createPagingNoStr", function () {
                //            var element = null;

                function getElement(page) {
                    spyOn(page, "_insertPaging");
                    page.renderTo(container);
                    return page._insertPaging.calls[0].args[1];
                };
                function exist(object) {
                    return object.length > 0;
                };
                function testTool.jqueryToString(jq) {
                    var d = $("<div>");
                    //                    str = "";

                    d.html(jq);
                    //                str = d.html();
                    //                d = null;

                    return d.html();
                };

                beforeEach(function () {
                });
                afterEach(function () {
                });

                it("分页element应该包括一个层，样式为'page_nav'", function () {
                    //                spyOn(page, "_insertPaging");
                    //                page.renderTo(container);
                    //                element = page._insertPaging.calls[0].args[1];
                    var element = getElement(page);

                    expect(element.attr("class")).toEqual("page_nav");
                });
                it("如果pageCount小于等于1，则分页element应该包括“共x条”", function () {
                    var page = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 0 });
                    var element = getElement(page);

                    var page2 = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 8 });

                    //                spyOn(page, "_insertPaging");
                    //                page.renderTo(container);
                    //                element = page._insertPaging.calls[0].args[1];
                    var element2 = getElement(page2);
                    //                console.log(element[0]);
                    //                console.log(testTool.jqueryToString(element));

                    //                expect(testTool.jqueryToString(element).contain("共0条")).toBeTruthy();
                    expect(testTool.jqueryToString(element)).toMatch(/共0条/);
                    expect(testTool.jqueryToString(element2)).toMatch(/共8条/);
                });

                describe("pageCount大于1时", function () {
                    beforeEach(function () {
                        //                    page = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 33, handler: "getContentTab" });

                        //创建监控函数getContentTab，用于验证handler
                        window.getContentTab = jasmine.createSpy('getContentTab');
                    });
                    afterEach(function () {
                        //                    page = null;
                    });

                    it("如果pageNumber等于1，则分页element不包含首页和上一页", function () {
                        page = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 33, handler: "getContentTab" });

                        page.renderTo(container);

                        expect(page._first).toBeNull();
                        expect(page._prev).toBeNull();
                    });
                    describe("pageNumber大于1", function () {
                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 33, handler: "getContentTab" });
                        });
                        afterEach(function () {
                            page = null;
                        });

                        describe("首页", function () {

                            it("_first不为空", function () {
                                page.renderTo(container);

                                expect(page._first).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._first.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(1, 10);
                            });
                            it("插入到element中", function () {
                                var element = getElement(page);

                                expect(testTool.jqueryToString(element).contain("首页")).toBeTruthy();
                            });
                        });
                        describe("上一页", function () {
                            it("_prev不为空", function () {
                                page.renderTo(container);

                                expect(page._prev).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._prev.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(1, 10);
                            });
                            it("插入到element中", function () {
                                var element = getElement(page);

                                //                            expect(testTool.jqueryToString(element).contain("上一页")).toBeTruthy();
                                expect(testTool.jqueryToString(element)).toMatch(/上一页/);
                            });
                        });
                    });
                    it("如果pageNumber <= (showNumber + 1)，则分页element不包含前x页", function () {
                        var page = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 33, showNumber: 5, handler: "getContentTab" });
                        var element = getElement(page);

                        expect(testTool.jqueryToString(element)).not.toMatch(/前\d+页/);
                    });
                    describe("pageNumber > (showNumber + 1)", function () {
                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 7, pageSize: 10, totalCount: 200, showNumber: 3, handler: "getContentTab" });
                        });
                        afterEach(function () {
                            page = null;
                        });
                        describe("前x页", function () {
                            it("_prevShow不为空", function () {
                                page.renderTo(container);

                                expect(page._prevShow).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._prevShow.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(3, 10);
                            });
                        });

                        it("插入到element中，“首页”在“上一页”前面", function () {
                            var element = getElement(page);

                            expect(testTool.jqueryToString(element)).toMatch(/首页.*前\d+页/);
                        });
                    });

                    //*中间页码不知如何测试！需要看下《测Javascript》后再来写测试

                    describe("中间页码", function () {
                        beforeEach(function () {
                        });
                        afterEach(function () {
//                            page = null;
                        });

                        //                                    it("循环(pageNumber + showNumber) - (pageNumber - showNumber) + 1次", function () {
                        //                                        var num = (page._config.pageNumber + page._config.showNumber) + -(page._config.pageNumber - page._config.showNumber) + 1;
                        //                                        spyOn(page, "_buildMiddlePage");

                        //                                        page.renderTo(container);

                        //                                        expect(page._buildMiddlePage.calls.length).toEqual(num);

                        //                                    });

                        //                                    it("如果i == pageNumber，则");

                        it("_middle不为空", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            expect(page._middle).toBeDefined();
                            expect(page._middle).not.toBeNull();
                        });
                        it("如果pageNumber为10，当前页码应该为10", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);
                            //                        var current = page._middle.siblings(".current");
                            var current = page._middle.filter(".current");

                            expect(current.length).toEqual(1);  //验证当前页码只有1个
                            expect(current.text()).toEqual("10");
                        });
                        it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该为5 6 7 8 9 10 11 12 13 14 15，其中10为当前页", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            //                        var middle = page._middle;
                            var current = page._middle.filter(".current");

                            expect(current.text()).toEqual("10");
                            expect(testTool.jqueryToString(page._middle)).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);

                            //                        console.log(page._middle);
                        });
                        it("如果pageNumber为2、pageCount为20、showNumber为5，则中间页码应该为1234567，其中2为当前页", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            //                        var middle = page._middle;
                            var current = page._middle.filter(".current");

                            expect(current.text()).toEqual("2");
                            expect(testTool.jqueryToString(page._middle)).toMatch(/.+1.+current.+2.+3.+4.+5.+6.+7/);
                        });
                        it("如果pageNumber为20、pageCount为20、showNumber为5，则中间页码应该为151617181920，其中20为当前页", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 20, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            //                        var middle = page._middle;
                            var current = page._middle.filter(".current");

                            expect(current.text()).toEqual("20");
                            expect(testTool.jqueryToString(page._middle)).toMatch(/.+15.+16.+17.+18.+19.+current.+20(?!.+21)/);  //页码不能包含21
                        });
                        it("如果pageNumber为10、pageCount为20、showNumber为5，则中间页码应该有11个", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            expect(page._middle.length).toEqual(11);

                            //                        console.log(page._middle);
                        });
                        it("验证handler", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            page.renderTo(container);

                            var p = page._middle.filter(function () {
                                if ($(this).text() == "9") {
                                    return true;
                                }

                                return false;
                            });
                            p.click();    //触发click事件

                            expect(window.getContentTab).toHaveBeenCalled();
                            expect(window.getContentTab).toHaveBeenCalledWith(9, 10);
                        });
                        it("插入到element中", function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 10, pageSize: 10, totalCount: 200, showNumber: 5, handler: "getContentTab" });
                            var element = getElement(page);

                            expect(testTool.jqueryToString(element)).toMatch(/.+5.+6.+7.+8.+9.+current.+10.+11.+12.+13.+14.+15/);
                        });
                    });


                    it("如果pageNumber >= (pageCount - showNumber)，则分页element不包含后x页", function () {
                        var page = new YYC.Control.PagingServer({ pageNumber: 3, pageSize: 10, totalCount: 33, showNumber: 2, handler: "getContentTab" });
                        var element = getElement(page);

                        expect(testTool.jqueryToString(element)).not.toMatch(/后\d+页/);
                    });

                    describe("pageNumber < (pageCount - showNumber)", function () {
                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 7, pageSize: 10, totalCount: 200, showNumber: 3, handler: "getContentTab" });
                        });
                        afterEach(function () {
                            page = null;
                        });
                        describe("后x页", function () {
                            it("_nextShow不为空", function () {
                                page.renderTo(container);

                                expect(page._nextShow).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._nextShow.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(11, 10);
                            });
                            it("插入到element中", function () {
                                var element = getElement(page);

                                expect(testTool.jqueryToString(element)).toMatch(/后\d+页/);
                            });
                        });
                    });

                    it("如果pageNumber === pageCount，则分页element不包含尾页和下一页", function () {
                        var page = new YYC.Control.PagingServer({ pageNumber: 4, pageSize: 10, totalCount: 33, handler: "getContentTab" });

                        page.renderTo(container);

                        expect(page._last).toBeNull();
                        expect(page._next).toBeNull();
                    });

                    describe("pageNumber< pageCount", function () {
                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 33, handler: "getContentTab" });
                        });
                        afterEach(function () {
                            page = null;
                        });

                        describe("尾页", function () {

                            it("_last不为空", function () {
                                page.renderTo(container);

                                expect(page._last).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._last.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(4, 10);
                            });
                            it("插入到element中", function () {
                                var element = getElement(page);

                                expect(testTool.jqueryToString(element).contain("尾页")).toBeTruthy();
                            });
                        });

                        describe("下一页", function () {
                            it("_next不为空", function () {
                                page.renderTo(container);

                                expect(page._next).not.toBeNull();
                            });
                            it("验证handler", function () {
                                page.renderTo(container);
                                page._next.click();    //触发click事件

                                expect(window.getContentTab).toHaveBeenCalled();
                                expect(window.getContentTab).toHaveBeenCalledWith(3, 10);
                            });
                        });
                        it("插入到element中，“下一页”在“尾页”前面", function () {
                            var element = getElement(page);

                            //                            expect(testTool.jqueryToString(element).contain("上一页")).toBeTruthy();
                            expect(testTool.jqueryToString(element)).toMatch(/下一页.+尾页/);
                        });
                    });


                    describe("显示页码信息", function () {
                        var regex = /共33条\s每页显示10条\s当前第2\/4页/;

                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 33, handler: "getContentTab" });
                            page.renderTo(container);
                        });
                        afterEach(function () {
                            page = null;
                        });

                        it("_info不为空", function () {
                            //                        page.renderTo(container);
                            expect(page._info).not.toBeNull();
                        });
                        it("显示正确的页码信息", function () {
                            //                        var element = getElement(page);

                            expect(testTool.jqueryToString(page._info)).toMatch(regex);
                        });
                        it("插入到element中", function () {
                            var element = getElement(page);

                            expect(testTool.jqueryToString(element)).toMatch(regex);
                        });
                    });

                    describe("跳转页码", function () {
                        //                    var regex = /共33条\s每页显示10条\s当前第2\/4页/;

                        beforeEach(function () {
                            page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 33, handler: "getContentTab" });
                            page.renderTo(container);
                        });
                        afterEach(function () {
                            page = null;
                        });

                        it("_jumpTo不为空", function () {
//                            page.renderTo(container);

                            expect(page._jumpTo).not.toBeNull();
                        });
                        it("验证handler", function () {
                            window.page = page;
                            spyOn(page, "jump");

                            page.renderTo(container);
                            page._jumpTo.click();    //触发click事件

                            expect(page.jump).toHaveBeenCalled();
                            expect(page.jump).toHaveBeenCalledWith(2, 10, 4);
                        });
                        it("插入到element中", function () {
                            var element = getElement(page);

                            expect(testTool.jqueryToString(element)).toMatch(/跳转/);
                        });
                    });


                });

                it("页码顺序 -> 首页、上一页、前x页、中间页码、后x页、 下一页、尾页、页码信息、跳转", function () {
                    var page = new YYC.Control.PagingServer({ pageNumber: 8, totalCount: 200, pageSize: 10, showNumber: 3 });
                    var element = getElement(page);
                    //                console.log(testTool.jqueryToString(element));
                    expect(testTool.jqueryToString(element)).toMatch(/首页.+上一页.+前\d+页.+后\d+页.+下一页.+尾页.+共\d+条\s每页显示\d+条\s当前第\d+\/\d+页/);
                });
            });
        });

        describe("jump", function () {
            function insertPage() {
                $("body").append($("<input/>", { id: "page_jumpid", type: "text", size: "6", maxlength: "10" }));
            };
            function removePage() {
                $("#page_jumpid").remove();
            };

            beforeEach(function () {

                insertPage();
            });
            afterEach(function () {
                removePage();
            });

            it("如果跳转页号为空，则提示", function () {
                spyOn(window, "alert");

                page = new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 10 });

                $("#page_jumpid").val("");
                page.jump(1, 10, 1);

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号非数字，或者 <= 0，则提示", function () {
                spyOn(window, "alert");

                page = new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 10 });

                $("#page_jumpid").val("a");
                page.jump(1, 10, 1);
                $("#page_jumpid").val("a221");
                page.jump(1, 10, 1);
                $("#page_jumpid").val("0");
                page.jump(1, 10, 1);
                $("#page_jumpid").val("-1");
                page.jump(1, 10, 1);

                expect(window.alert.calls.length).toEqual(4);
            });
            it("如果跳转页号 === pageNumber，则提示", function () {
                spyOn(window, "alert");

                page = new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 120 });

                $("#page_jumpid").val("1");
                page.jump(1, 10, 2);

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号 > pageCount，则提示", function () {
                spyOn(window, "alert");

                page = new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 12 });

                $("#page_jumpid").val("3");
                page.jump(1, 10, 2);

                expect(window.alert.calls.length).toEqual(1);
            });
            it("否则，则调用handler并验证", function () {
                window.testHandler = jasmine.createSpy('testHandler');

                page = new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 12, handler: "testHandler" });

                $("#page_jumpid").val("2");
                page.jump(1, 10, 2);

                expect(window.testHandler).toHaveBeenCalledWith(2, 10);
            });
        });

    });
});



*/





//*重构之后

//*使用了createSpy创建监控函数getContentTab

describe("pagingServer.js", function () {

    describe("YYC.Control.PagingServer类", function () {
        var page = null;

        function createInstance() {
            return new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 });
        };

        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("使用时要创建实例", function () {
            //实例没有prototype属性，而类（函数）有prototype属性
            expect(createInstance().prototype).toBeUndefined();
        });

        describe("Init", function () {
            it("参数多于1个时抛出异常", function () {
                var func = function () {
                    new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 }, 1);
                };

                expect(func).toThrow();
            });

            describe("checkAndSetConfig", function () {
                it("参数为undefined时创建默认的_config", function () {
                    expect(createInstance()._config).toBeDefined();
                    expect(createInstance()._config).not.toBeNull();
                });
                it("参数没有pageNumber/totalCount时抛出异常", function () {
                    var func1 = function () {
                        new YYC.Control.PagingServer({});
                    };
                    var func2 = function () {
                        new YYC.Control.PagingServer({ pageNumber: 1 });
                    };
                    var func3 = function () {
                        new YYC.Control.PagingServer({ totalCount: 1 });
                    };

                    expect(func1).toThrow();
                    expect(func2).toThrow();
                    expect(func3).toThrow();
                });
                it("计算pageCount", function () {
                    expect(new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 22 })._config.pageCount).toEqual(3);
                });
                it("参数的totalCount不等于0且pageNumber大于pageCount时抛出异常", function () {
                    var func = function () {
                        new YYC.Control.PagingServer({ pageNumber: 4, pageSize: 10, totalCount: 22 })
                    };

                    expect(func).toThrow();
                });
                it("参数的totalCount等于0时抛出异常", function () {
                    var func = function () {
                        new YYC.Control.PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 0 })
                    };

                    expect(func).not.toThrow();
                });
            });

            it("构造函数参数如果没有str属性，则_builder属于YYC.Control.Paging.PagingBuilderNoStr的实例；否则_builder属于YYC.Control.Paging.PagingBuilderWithStr", function () {
                expect(new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1 })._builder).toBeInstanceOf(YYC.Control.Paging.PagingBuilderNoStr);
                expect(new YYC.Control.PagingServer({ pageNumber: 1, totalCount: 1, str: "test" })._builder).toBeInstanceOf(YYC.Control.Paging.PagingBuilderWithStr);
            });
        });

        describe("renderTo", function () {
            var container = "test_container";

            function insertContainer() {
                var dom = $("<div id='test_container'></div>")
                $("body").append(dom);
            };
            function removeContainer() {
                $("#test_container").remove();
            };
            function getContainerContent() {
                return $("#" + container).html();
            };

            beforeEach(function () {
                insertContainer();
                page = createInstance();
            });
            afterEach(function () {
                removeContainer();
                page = null;
            });

            it("方法存在", function () {
                expect(page.renderTo).toBeDefined();
            });
            //            it("保存container", function () {
            //                page.renderTo(container);

            //                expect(page._container).toEqual(container);
            //            });

            //            describe("config.str为undefined时，验证container中的内容", function () {

            //                function createPagingServer(pageNumber) {
            //                    return new YYC.Control.PagingServer({ pageNumber: pageNumber, pageSize: 10, totalCount: 200, showNumber: 2, handler: "getContentTab" });
            //                };


            //                describe("验证页码顺序", function () {
            //                    it("config为{ pageNumber: 5, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、3 4 5 6 7、后3页、 下一页、尾页、共200条 每页显示10条 当前第5/20页 、跳转”", function () {
            //                        page = createPagingServer(5);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+前3页.+3.+4.+5.+6.+7.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第5\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 1, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“123、后3页、 下一页、尾页、共200条 每页显示10条 当前第1/20页 、跳转”", function () {
            //                        page = createPagingServer(1);
            //                        page.renderTo(container);



            //                        expect(getContainerContent()).toMatch(/page_nav.+1.+2.+3.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第1\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 2, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、1234、后3页、 下一页、尾页、共200条 每页显示10条 当前第2/20页 、跳转”", function () {
            //                        page = createPagingServer(2);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+1.+2.+3.+4.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第2\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 19, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、17 18 19 20、下一页、尾页、共200条 每页显示10条 当前第19/20页 、跳转”", function () {
            //                        page = createPagingServer(19);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+17.+18.+19.+20.+下一页.+尾页.+共200条\s每页显示10条\s当前第19\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 20, pageSize: 10, pageCount: 20, totalCount: 200, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、18 19 20、共200条 每页显示10条 当前第20/20页 、跳转”", function () {
            //                        page = createPagingServer(20);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+18.+19.+20.+共200条\s每页显示10条\s当前第20\/20页/);
            //                    });
            //                });

            //                describe("验证handler", function () {

            //                    it("如果config.str为undefined，则handler的参数为2个", function () {
            //                        page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 200, showNumber: 2, handler: "getContentTab" });

            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/getContentTab\([^,]+,[^\)]+\)/);
            //                    });
            //                });
            //            });

            //            describe("config.str不为undefined时，验证container中的内容", function () {

            //                function createPagingServer(pageNumber) {
            //                    return new YYC.Control.PagingServer({ pageNumber: pageNumber, pageSize: 10, totalCount: 200, showNumber: 2, str: "", handler: "getContentTab" });
            //                };


            //                describe("验证页码顺序", function () {
            //                    it("config为{ pageNumber: 5, pageSize: 10, pageCount: 20, totalCount: 200, str:“”, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、3 4 5 6 7、后3页、 下一页、尾页、共200条 每页显示10条 当前第5/20页 、跳转”", function () {
            //                        page = createPagingServer(5);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+前3页.+3.+4.+5.+6.+7.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第5\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 1, pageSize: 10, pageCount: 20, totalCount: 200, str:“”, showNumber: 2 }时， 返回值顺序为“123、后3页、 下一页、尾页、共200条 每页显示10条 当前第1/20页 、跳转”", function () {
            //                        page = createPagingServer(1);
            //                        page.renderTo(container);



            //                        expect(getContainerContent()).toMatch(/page_nav.+1.+2.+3.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第1\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 2, pageSize: 10, pageCount: 20, totalCount: 200, str:“”, showNumber: 2 }时， 返回值顺序为“首页、上一页、1234、后3页、 下一页、尾页、共200条 每页显示10条 当前第2/20页 、跳转”", function () {
            //                        page = createPagingServer(2);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+1.+2.+3.+4.+后3页.+下一页.+尾页.+共200条\s每页显示10条\s当前第2\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 19, pageSize: 10, pageCount: 20, totalCount: 200, str:“”, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、17 18 19 20、下一页、尾页、共200条 每页显示10条 当前第19/20页 、跳转”", function () {
            //                        page = createPagingServer(19);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+17.+18.+19.+20.+下一页.+尾页.+共200条\s每页显示10条\s当前第19\/20页/);
            //                    });
            //                    it("config为{ pageNumber: 20, pageSize: 10, pageCount: 20, totalCount: 200, str:“”, showNumber: 2 }时， 返回值顺序为“首页、上一页、前3页、18 19 20、共200条 每页显示10条 当前第20/20页 、跳转”", function () {
            //                        page = createPagingServer(20);
            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/page_nav.+首页.+上一页.+18.+19.+20.+共200条\s每页显示10条\s当前第20\/20页/);
            //                    });
            //                });

            //                describe("验证handler", function () {

            //                    it("如果config.str不为undefined，则handler的参数为3个", function () {
            //                        page = new YYC.Control.PagingServer({ pageNumber: 2, pageSize: 10, totalCount: 200, showNumber: 2, str: "", handler: "getContentTab" });

            //                        page.renderTo(container);

            //                        expect(getContainerContent()).toMatch(/getContentTab\([^,]+,[^,]+,[^\)]+\)/);
            //                    });
            //                });
            //            });

            it("调用了pagingDirector的createPaging方法", function () {
                spyOn(page._pagingDirector, "createPaging");

                page.renderTo(container);

                expect(page._pagingDirector.createPaging).toHaveBeenCalled();
            });
            it("插入到container中", function () {
                page.renderTo(container);

                expect($("#" + container).children().length > 0).toBeTruthy();
            });

        });

        //dispose方法暂不实现
        describe("dispose", function () {
            beforeEach(function () {
                page = createInstance();
            });
            afterEach(function () {
            });

            it("方法存在", function () {
                expect(page.dispose).toBeDefined();
            });
        });

    });
});