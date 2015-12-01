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
        testTool.clearInstance();
        sandbox.restore();
    });
    
    describe("clear", function(){
        it("clear color passed from options", function(){
            device.clear({
                color:wd.Color.create("#ffffff")
            });

            expect(gl.clearColor).toCalledWith(1, 1, 1, 1);
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
            sandbox.stub(window, "innerWidth", 100);
            sandbox.stub(window, "innerHeight", 200);

            sandbox.stub(device, "createGL");
            sandbox.stub(wd.GPUDetector.getInstance(), "detect");

            device.view = wd.ViewWebGL.create($("#event-test").get(0));
            device.gl = testTool.buildFakeGl(sandbox);

        });
        afterEach(function(){
            removeDom();
        });

        it("support full screen", function(){
            wd.Main.setConfig({
                screenSize:wd.ScreenSize.FULL,
                canvasId: "#event-test"
            }).init();

            expect(device.view.x).toEqual(0);
            expect(device.view.y).toEqual(0);
            expect(device.view.width).toEqual(100);
            expect(device.view.height).toEqual(200);
            expect(device.gl.viewport).toCalledWith(0, 0, 100, 200);
        });
        it("support custom screen size and position", function(){
            wd.Main.setConfig({
                screenSize:{width:50, x:10},
                canvasId: "#event-test"
            }).init();

            expect(device.view.x).toEqual(10);
            expect(device.view.y).toEqual(0);
            expect(device.view.width).toEqual(50);
            expect(device.view.height).toEqual(200);
            expect(device.gl.viewport).toCalledWith(0, 0, 50, 200);
        });
    });
});
