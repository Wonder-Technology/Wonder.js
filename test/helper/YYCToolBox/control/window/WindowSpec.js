describe("Window.js", function () {
    var Window = YYC.Control.Window,
        dlg = null;

    beforeEach(function () {
    });

    describe("init", function () {
        describe("插入dom元素", function () {
            describe("设置内容", function () {
                it("如果配置信息中包含url，则调用loadUrl", function () {
                    dlg = new Window({
                        isTest: true,
                        url: "a",
                        isShow: false
                    });
                    spyOn(dlg, "loadUrl");

                    dlg.init();

                    expect(dlg.loadUrl).toHaveBeenCalled();
                });
                it("如果配置信息中包含content，则调用loadContent", function () {
                    var div = document.createElement("div");
                    //div.id = "test_div";
                    dlg = new Window({
                        isTest: true,
                        content: div,
                        isShow: false
                    });
                    spyOn(dlg, "loadContent");

                    dlg.init();

                    expect(dlg.loadContent).toHaveBeenCalledWith(div);
                });
            });
        });
    });

    describe("loadContent", function () {
        beforeEach(function () {
            dlg = new Window({
                isTest: true,
                isShow: false
            });

            dlg.init();
        });

        it("如果参数为html字符串，则加入到content中", function () {
            var html = "<div id='test_div'></div>";

            dlg.loadContent(html);

            expect($(dlg.getContent()).children("div").length).toEqual(1);
            //expect(dlg.getContent().getElementsByTagName("div").id).toEqual("test_div");

            $("body").find("#test_div").remove();
        });

        describe("如果参数节点对象为dom对象或jquery对象", function () {
            it("复制节点对象（深拷贝，拷贝事件、子节点），插入到content后，原节点对象依然存在（如果不复制的话，原节点对象会消失（被插入到content中了））", function () {
                expect($("body").find("#test_div").length).toEqual(0);

                var div = $("<div id='test_div'><div id='test_child'>aaa</div></div>")
                $("body").append(div);

                dlg.loadContent(div);

                expect($("body").find("#test_div").length).toEqual(2);
                expect($("body").find("#test_child").length).toEqual(2);
                expect($(dlg.getContent()).children("#test_div").length).toEqual(1);
                expect($(dlg.getContent()).find("#test_child").length).toEqual(1);

               div.remove();
            });
            it("显示复制的节点对象（因为原节点对象可能为隐藏的对象），原节点对象不显示", function () {
                var dom = document.createElement("div");
                dom.id = "test_div";
                dom.style.display = "none";
                document.body.appendChild(dom);
                //spyOn(dlg, "show");

                dlg.loadContent(dom);

                expect(dom.style.display).toEqual("none");
                expect($(dlg.getContent()).children("#test_div").css("display")).toEqual("block");
            });
            it("清空content", function () {
                var dom = document.createElement("div");
                dlg.getContent().appendChild(dom);

                dlg.loadContent(dom);

                expect($(dlg.getContent()).children("div").length).toEqual(1);
            });
            it("如果参数节点对象为dom对象，则插入到content中", function () {
                var dom = document.createElement("div");

                dlg.loadContent(dom);

                expect($(dlg.getContent()).children("div").length).toEqual(1);
            });
            it("如果参数节点对象为jquery对象，则插入到content中", function () {
                var jqueryOb = $("<div/>");

                dlg.loadContent(jqueryOb);

                expect($(dlg.getContent()).children("div").length).toEqual(1);
            });
        });

        it("显示窗体", function () {
            spyOn(dlg, "show");

            dlg.loadContent("aa");

            expect(dlg.show).toHaveBeenCalled();
        });
    });

    //it("测试加载iframe", function () {
    //    var dlg = new YYC.Control.Window({
    //        title: "标题",
    //        isClear: false,
    //        opacity: 0.4,
    //        id: "iframe_window"
    //    });
    //    dlg.init();
    //    dlg.setTitle("用户信息设置");
    //    dlg.loadUrl("Bomber/Index");    //加载页面成功后，会触发页面的js
    //    dlg.resizeTo(300, 500);
    //});
});