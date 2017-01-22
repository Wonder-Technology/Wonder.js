describe("deviceManager", function() {
    var sandbox = null;
    var device = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });
    
    describe("scissorTest(setter)", function(){
        beforeEach(function(){
            
        });
        
        it("if old one === new one, return", function(){
            device.scissorTest = true;

            device.scissorTest = true;

            expect(gl.enable.withArgs(gl.SCISSOR_TEST)).toCalledOnce();
        });

        describe("else", function () {
            it("if set to be false, disable gl.SCISSOR_TEST", function () {
                device.scissorTest = true;

                device.scissorTest = false;

                expect(gl.disable.withArgs(gl.SCISSOR_TEST)).toCalledOnce();
            });
        });
    });

    describe("setScissor", function(){
        beforeEach(function(){

        });

        it("if already set the same one, return", function(){
            device.setScissor(1,2,3,4);
            device.setScissor(1,2,3,4);

            expect(gl.scissor).toCalledOnce();
        });

        describe("else", function () {
            it("set gl", function () {
                device.setScissor(1,2,3,4);

                expect(gl.scissor.withArgs(1,2,3,4)).toCalledOnce();
            });
            it("set scissorTest to be true", function () {
                device.scissorTest = false;

                device.setScissor(1,2,3,4);

                expect(device.scissorTest).toBeTruthy();
                expect(gl.enable.withArgs(gl.SCISSOR_TEST)).toCalledOnce();
            });
        });
    });

    describe("clear", function(){
        describe("set clear color passed from options", function(){
            it("if already setted this color, not set again", function () {
                device.clear({
                    color:wd.Color.create("#ffffff")
                });

                device.clear({
                    color:wd.Color.create("#ffffff")
                });

                expect(gl.clearColor.withArgs(1, 1, 1, 1)).toCalledOnce();
            });
        });
        it("enable all color and alpha write to ensure the clear buffer will not be affected by it", function(){
            device.clear({
                color:wd.Color.create("#ffffff")
            });

            expect(gl.colorMask).toCalledWith(true, true, true, true);
        });
        it("clear buffer", function(){
            sandbox.stub(gl, "COLOR_BUFFER_BIT", 1);
            sandbox.stub(gl, "DEPTH_BUFFER_BIT", 10);

            device.clear({
                color:wd.Color.create("#ffffff")
            });

            expect(gl.clear).toCalledWith(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        });
    });

    describe("setScreen", function(){
        function insertDom() {
            $("html").append($("<canvas id='event-test'></canvas>"));
        }

        function removeDom() {
            $("#event-test").remove();
        }

        beforeEach(function(){
            insertDom();
            //sandbox.stub(window, "innerWidth", 100);
            //sandbox.stub(window, "innerHeight", 200);

            sandbox.stub(device, "createGL");
            sandbox.stub(wd.GPUDetector.getInstance(), "detect");

            device.view = wd.ViewWebGL.create($("#event-test").get(0));
            device.gl = testTool.buildFakeGl(sandbox);

        });
        afterEach(function(){
            removeDom();
        });

        it("support full screen", function(){
            var view = device.view;

            wd.Main.setConfig({
                screenSize:wd.EScreenSize.FULL,
                canvasId: "#event-test"
            }).init();


            var dom = $("#event-test");

            expect(view.x).toEqual(0);
            expect(view.y).toEqual(0);
            expect(view.width > 0).toBeTruthy();
            expect(view.height > 0).toBeTruthy();
            expect(dom.get(0).style.width).toEqual("100%");
            expect(dom.get(0).style.height).toEqual("100%");

            //expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
            expect(device.gl.viewport).toCalledWith(0, 0, sinon.match.number, sinon.match.number);
        });
        it("support custom screen size and position", function(){
            var view = device.view;

            wd.Main.setConfig({
                screenSize:{width:50, x:10},
                canvasId: "#event-test"
            }).init();

            expect(view.x).toEqual(10);
            expect(view.y).toEqual(0);
            expect(view.width).toEqual(50);
            expect(view.height > 0).toBeTruthy();
            expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
            expect(device.getViewport()).toEqual(wd.RectRegion.create(0, 0, view.width, view.height));
            expect($("#event-test").css("left")).toEqual("10px");
            expect($("#event-test").css("top")).toEqual("0px");
        });
    });

    describe("setHardwareScaling", function(){
        beforeEach(function(){
        });

        it("scale canvas and reset viewport", function(){
            var width = 100;
            var height = 50;
            sandbox.stub(device, "view", {
                width:width,
                height:height
            });

            device.setHardwareScaling(2);

            expect(device.view.width).toEqual(width / 2);
            expect(device.view.height).toEqual(height / 2);
            expect(device.gl.viewport).toCalledWith(0, 0, width / 2, height / 2);
        });
    });

    describe("setViewport", function(){
        beforeEach(function(){
        });

        it("if old viewport equal new one, return", function () {
            device.setViewport(1,2,3,4);

            device.setViewport(1,2,3,4);

            expect(gl.viewport).toCalledOnce();
        });

        describe("else", function(){
            beforeEach(function(){
            });

            it("save viewport data", function(){
                device.setViewport(1,2,3,4);

                expect(device.getViewport().x).toEqual(1);
                expect(device.getViewport().y).toEqual(2);
                expect(device.getViewport().width).toEqual(3);
                expect(device.getViewport().height).toEqual(4);
            });
            it("set gl->viewport", function () {
                device.setViewport(1,2,3,4);

                expect(device.gl.viewport).toCalledWith(1,2,3,4);
            });
        });
    });

    describe("setPixelRatio", function(){
        beforeEach(function(){
        });

        it("set view->width, height by pixelRatio", function(){
            device.view = {
                width:5,
                height:6
            };

            device.setPixelRatio(2.1);

            expect(device.view.width).toEqual(Math.round(5 * 2.1));
            expect(device.view.height).toEqual(Math.round(6 * 2.1));
            expect(device.getPixelRatio()).toEqual(2.1);
        });
    });

    describe("createGL", function(){
        beforeEach(function(){
        });

        it("if not get gl, info not support webgl", function(){
            sandbox.stub(wd.ViewWebGL, "create").returns({
                getContext: sandbox.stub().returns(null)
            });

            device.createGL(null, null, false);

            expect($("p.not-support-webgl").text()).toEqual("Your device doesn't support WebGL");


            $("p.not-support-webgl").remove();
        });
    });
});
