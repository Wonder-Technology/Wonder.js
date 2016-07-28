//*使用了createSpy创建监控函数getContentTab

describe("pagingTool.js", function () {

    describe("PagingTool类", function () {

        describe("jumpNoStr", function () {
            var temp = null;

            function insertPage() {
                $("body").append($("<input/>", { id: "page_jumpid", type: "text", size: "6", maxlength: "10" }));
            };
            function removePage() {
                $("#page_jumpid").remove();
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
            function fakePage(page) {
                $("#page_jumpid").val(page);
            };
            function jump() {
                YYC.Control.Paging.pagingTool.jumpNoStr({ pageNumber: 1, pageSize: 10, pageCount: 2, handler: "getContentTab" });
            };

            beforeEach(function () {
                insertPage();
            });
            afterEach(function () {
                removePage();
            });

            it("方法存在", function () {
                expect(YYC.Control.Paging.pagingTool.jumpNoStr).toBeDefined();
            });
            it("如果参数config没有handler属性，则handler默认为getContentTab", function () {
                backUp();
                fakeGetContentTab();
                fakePage("2");

                YYC.Control.Paging.pagingTool.jumpNoStr({ pageNumber: 1, pageSize: 10, pageCount: 20 });

                expect(window.getContentTab).toHaveBeenCalled();

                restore();
            });
            it("如果跳转页号为空，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 10 });

                fakePage("");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号非数字，或者 <= 0，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 10 });

                //                            $("#page_jumpid").val("a");
                fakePage("a");
                jump();
                //                            $("#page_jumpid").val("a221");
                fakePage("a221");
                jump();
                //                            $("#page_jumpid").val("0");
                fakePage("0");
                jump();
                //                            $("#page_jumpid").val("-1");
                fakePage("-1");
                jump();

                expect(window.alert.calls.length).toEqual(4);
            });
            it("如果跳转页号 === pageNumber，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 120 });

                fakePage("1");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号 > pageCount，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 12 });

                fakePage("3");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("否则，则调用handler并验证", function () {
                //                var temp = window.getContentTab;
                //                window.getContentTab = jasmine.createSpy('getContentTab');

                backUp();
                fakeGetContentTab();

                //                page = new PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 12, handler: "testHandler" });

                $("#page_jumpid").val("2");
                fakePage("2");
                //                YYC.Control.Paging.pagingTool.jumpNoStr({ pageNumber: 1, pageSize: 10, pageCount: 2, handler: "testHandler" });

                jump();

                expect(window.getContentTab).toHaveBeenCalledWith("2", 10);

                //                window.getContentTab = temp;
                restore();
            });
        });

        describe("jumpWithStr", function () {
            var temp = null;

            function insertPage() {
                $("body").append($("<input/>", { id: "page_jumpid", type: "text", size: "6", maxlength: "10" }));
            };
            function removePage() {
                $("#page_jumpid").remove();
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
            function fakePage(page) {
                $("#page_jumpid").val(page);
            };
            function jump() {
                YYC.Control.Paging.pagingTool.jumpWithStr({ str: "a", pageNumber: 1, pageSize: 10, pageCount: 2, handler: "getContentTab" });
            };


            beforeEach(function () {
                insertPage();
            });
            afterEach(function () {
                removePage();
            });

            it("方法存在", function () {
                expect(YYC.Control.Paging.pagingTool.jumpWithStr).toBeDefined();
            });
            it("如果参数config没有handler属性，则handler默认为getContentTab", function () {
                backUp();
                fakeGetContentTab();
                fakePage("2");

                YYC.Control.Paging.pagingTool.jumpWithStr({ str: "a", pageNumber: 1, pageSize: 10, pageCount: 20 });

                expect(window.getContentTab).toHaveBeenCalled();

                restore();
            });
            it("如果跳转页号为空，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 10 });

                fakePage("");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号非数字，或者 <= 0，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 10 });

                //                            $("#page_jumpid").val("a");
                fakePage("a");
                jump();
                //                            $("#page_jumpid").val("a221");
                fakePage("a221");
                jump();
                //                            $("#page_jumpid").val("0");
                fakePage("0");
                jump();
                //                            $("#page_jumpid").val("-1");
                fakePage("-1");
                jump();

                expect(window.alert.calls.length).toEqual(4);
            });
            it("如果跳转页号 === pageNumber，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 120 });

                fakePage("1");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("如果跳转页号 > pageCount，则提示", function () {
                spyOn(window, "alert");

                //                page = new PagingServer({ pageNumber: 1, totalCount: 12 });

                fakePage("3");
                jump();

                expect(window.alert.calls.length).toEqual(1);
            });
            it("否则，则调用handler并验证", function () {
                backUp();
                fakeGetContentTab();

                //                page = new PagingServer({ pageNumber: 1, pageSize: 10, totalCount: 12, handler: "testHandler" });

                $("#page_jumpid").val("2");
                fakePage("2");
                jump();

                expect(window.getContentTab).toHaveBeenCalledWith("a", "2", 10);

                restore();
            });
        });
    });
});