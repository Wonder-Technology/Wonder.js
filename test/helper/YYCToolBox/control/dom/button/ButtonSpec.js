describe("Button.js", function () {
    var Button = YYC.Control.Button,
        but = null;

    beforeEach(function () {
        but = new YYC.Control.Button({
            className: "button1"
        });
    });

    describe("init", function () {
            beforeEach(function () {
                but = new YYC.Control.Button({
                    className: "button1",
                    width: 100,
                    height: 30
                });
            });

            it("根据配置中的width、height，设置按钮的宽度和高度、行高和background-size", function () {
            });
    });

    describe("绑定事件", function () {
        function triggerEvent(eventName) {
            $(but._button)[eventName]();
        };

        describe("click", function () {
            //function set(val) {
            //    window.test_click = val;
            //}

            it("设置button的click事件", function () {
                window.test_click = 1;
                but.click(function (e) {
                    set(2);
                });
                var set = jasmine.createSpy().andCallFake(function (val) {
                    window.test_click = val;
                });

                triggerEvent("click");

                expect(window.test_click).toEqual(2);
                expect(set.calls.length).toEqual(1);

                testTool.delete(window, "test_click");
            });
            it("取代初始化控件时，config中的onclick", function () {
                window.test_click = 1;
                but = new YYC.Control.Button({
                    onclick: function () {
                        window.test_click = 100;
                    }
                });
                but.click(function (e) {
                    window.test_click = 200;
                });

                triggerEvent("click");

                expect(window.test_click).toEqual(200);

                testTool.delete(window, "test_click");
            });
        });
    });

    describe("renderTo", function () {
        it("返回this", function () {
            var result = but.renderTo("");

            expect(result.getClass).toBeFunction();
        });
    });



    describe("onMouseOver", function () {
        it("如果Button的样式为按下，则不设置Button的样式为hover（保留为按下的样式）", function () {
            but.setDown();

            but.onMouseOver();

            expect(but.getClass()).toEqual("button1_down");
        });
    });

    describe("onMouseOut", function () {
        it("如果Button的样式为hover，则恢复Button样式为默认的样式", function () {
            but.onMouseOver();

            but.onMouseOut();

            expect(but.getClass()).toEqual("button1");
        });
        it("否则，保留样式", function () {
            but.onMouseDown();

            but.onMouseOut();

            expect(but.getClass()).toEqual("button1_down");
        });
    });

    describe("onMouseUp", function () {
        it("恢复Button样式为默认的样式", function () {
            but.onMouseUp();

            expect(but.getClass()).toEqual("button1");
        });
    });

    describe("setDown", function () {
        it("设置Button的class为按下的样式", function () {
            but.setDown();

            expect(but.getClass()).toEqual("button1_down");
        });
        it("返回this，这样就可以链式调用了。如.setDown().renderTo('xx')", function () {
            var result = but.setDown();

            expect(result.renderTo).toBeFunction();
        });
    });

    describe("setUp", function () {
        it("设置Button的class为默认的样式", function () {
            but.setUp();

            expect(but.getClass()).toEqual("button1");
        });
        it("返回this，这样就可以链式调用了。如.setUp().renderTo('xx')", function () {
            var result = but.setUp();

            expect(result.renderTo).toBeFunction();
        });
    });

    describe("isDown", function () {
        it("如果按钮按下，返回true；否则返回false", function () { });
    });

    describe("isUp", function () {
        it("如果按钮抬起，返回true；否则返回false", function () { });
    });

    describe("getClass", function(){
        it("获得button的class", function(){
            expect(but.getClass()).toEqual("button1");
        });
    });
});