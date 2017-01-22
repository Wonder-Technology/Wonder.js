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

            it("it will open wd-frp contract check", function(){
                sandbox.stub(Main, "isTest", false);

                expect(function(){
                    wdFrp.fromArray([1, 2]).take(-1);
                }).not.toThrow();

                sandbox.stub(Main, "isTest", true);

                expect(function(){
                    wdFrp.fromArray([1, 2]).take(-1);
                }).toThrow();
            });
            it("it will open wd.js contract check", function(){
                //already test in other unit tests
            });
        });
    });

    describe("test set config data", function(){
        var gl;
        var device;
        var canvasDom;

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            device = wd.DeviceManager.getInstance();

            sandbox.stub(device, "setScreen");
            sandbox.stub(wd.GPUDetector.getInstance(), "detect");
        });

        describe("test set canvas id", function(){
            var canvas;

            beforeEach(function(){
                canvas = $("<canvas id='a'></canvas>");

                $("body").append(canvas);
            });
            afterEach(function(){
                canvas.remove();
            });

            it("support pass canvas id", function(){
                Main.setConfig({
                    canvasId:"a"
                });
                Main.init();

                expect(device.gl).toBeDefined();
            });
            it("support pass #canvasId", function(){
                Main.setConfig({
                    canvasId:"#a"
                });
                Main.init();

                expect(device.gl).toBeDefined();
            });
        });

        describe("set context config data", function(){
            beforeEach(function(){
                canvasDom = {
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(wdCb.DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });
            });

            describe("set webgl context options", function(){
                it("test default value", function(){
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

        describe("set useDevicePixelRatio", function(){
            beforeEach(function(){
                canvasDom = {
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(wdCb.DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });
            });

            it("if true, set pixelRatio", function(){
                var devicePixelRatio = 2;
                sandbox.stub(window, "devicePixelRatio", devicePixelRatio)
                sandbox.stub(device, "setPixelRatio");

                Main.setConfig({
                    canvasId:"a",
                    useDevicePixelRatio:true
                });
                Main.init();

                expect(device.setPixelRatio).toCalledWith(devicePixelRatio);
            });
        });

        describe("set isTest", function(){
            beforeEach(function(){
            });

            it("if CompileConfig.closeContractTest === true, set isTest to be false", function(){
                sandbox.stub(wd.CompileConfig, "closeContractTest", true);

                Main.setConfig({
                    isTest:true
                });

                expect(Main.isTest).toBeFalsy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(wd.CompileConfig, "closeContractTest", false);
                });

                it("if not set by config, set isTest = DebugConfig.isTest", function(){
                    sandbox.stub(wd.DebugConfig, "isTest", true);

                    Main.setConfig({
                    });

                    expect(Main.isTest).toBeTruthy();
                });
                it("else,, set isTest by config", function () {
                    sandbox.stub(wd.DebugConfig, "isTest", true);

                    Main.setConfig({
                        isTest:false
                    });

                    expect(Main.isTest).toBeFalsy();
                });
            });
        });
    });
});

