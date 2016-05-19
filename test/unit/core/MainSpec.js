describe("Main", function () {
    var sandbox = null;
    var Main = wd.Main;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("isTest", function(){
        describe("if it's true", function(){
            beforeEach(function(){
            });

            it("it will open wonder-frp contract check", function(){
                sandbox.stub(Main, "isTest", false);

                expect(function(){
                    wdFrp.fromArray([1, 2]).take(-1);
                }).not.toThrow();

                sandbox.stub(Main, "isTest", true);

                expect(function(){
                    wdFrp.fromArray([1, 2]).take(-1);
                }).toThrow();
            });
            it("it will open wonder.js contract check", function(){
                //already test in other unit tests
            });
        });
    });

    describe("set context config data", function(){
        beforeEach(function(){

        });

        describe("set webgl context options", function(){
            var gl;

            beforeEach(function(){
                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                gl = wd.DeviceManager.getInstance().gl;
            });

            it("test default value", function(){
                var device = wd.DeviceManager.getInstance();
                var canvasDom = {
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(wdCb.DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });

                sandbox.stub(device, "setScreen");
                sandbox.stub(wd.GPUDetector.getInstance(), "detect");

                Main.setConfig({
                    canvasId:"a"
                });
                Main.init();


                expect(canvasDom.getContext).toCalledWith("webgl", {
                    alpha:true,
                    depth:true,
                    stencil:false,
                    antialias:true,
                    premultipliedAlpha:true,
                    preserveDrawingBuffer:false
                });
            });

            it("can set webgl context options", function(){
                var device = wd.DeviceManager.getInstance();
                var canvasDom = {
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(wdCb.DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });

                sandbox.stub(device, "setScreen");
                sandbox.stub(wd.GPUDetector.getInstance(), "detect");

                Main.setConfig({
                    canvasId:"a",
                    contextConfig:{
                        options:{
                            stencil:true,
                            antialias:false,
                            premultipliedAlpha:true,
                            preserveDrawingBuffer:false
                        }
                    }
                });
                Main.init();


                expect(canvasDom.getContext).toCalledWith("webgl", {
                    alpha:true,
                    depth:true,
                    stencil:true,
                    antialias:false,
                    premultipliedAlpha:true,
                    preserveDrawingBuffer:false
                });
            });
        });
    });
});
