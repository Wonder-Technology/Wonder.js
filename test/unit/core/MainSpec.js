describe("Main", function() {
    var sandbox = null;
    var CompileConfig = wd.CompileConfig,
        fromArray = wd.fromArray,
        DeviceManager = wd.DeviceManager,
        Main = wd.Main,
        DomQuery = wd.DomQuery,
        DebugConfig = wd.DebugConfig,
        EScreenSize = wd.EScreenSize,
        RectRegion = wd.RectRegion;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function() {
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
                    fromArray([1, 2]).take(-1);
                }).not.toThrow();

                sandbox.stub(Main, "isTest", true);

                expect(function(){
                    fromArray([1, 2]).take(-1);
                }).toThrow();
            });
            it("it will open wonder.js contract check", function(){
                var meg = "configState should exist";
                sandbox.stub(Main, "isTest", false);

                expect(function(){
                    Main.init();
                }).not.toThrow(meg);

                sandbox.stub(Main, "isTest", true);

                expect(function(){
                    Main.init(meg);
                }).toThrow();
            });
        });
    });

    describe("test set config data", function(){
        var gl;
        var device;
        var canvasDom;

        function buildFakeDomQuery(canvasDom){
            return {
                    css:sandbox.stub(),
                    get:sandbox.stub().returns(canvasDom)
                };
        }

        beforeEach(function(){
            DeviceManager.getInstance().gl = testTool.buildFakeGl(sandbox);

            gl = DeviceManager.getInstance().gl;

            device = DeviceManager.getInstance();

            canvasDom = {
                style:{},
                width:1,
                height:2,
                getContext:sandbox.stub().returns(testTool.buildFakeGl(sandbox))
            };
        });

        describe("test set canvas id", function(){
            beforeEach(function(){
                sandbox.stub(DomQuery, "create");

                DomQuery.create.withArgs("#a").returns(buildFakeDomQuery(canvasDom));
                DomQuery.create.withArgs("body").returns(buildFakeDomQuery(canvasDom));
            });
            afterEach(function(){
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
                sandbox.stub(DomQuery, "create").returns(buildFakeDomQuery(canvasDom));
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
            var devicePixelRatio;
            var screenWidth,
                screenHeight;

            beforeEach(function(){
                sandbox.stub(DomQuery, "create").returns(buildFakeDomQuery(canvasDom));

                devicePixelRatio = 2;
                window.devicePixelRatio = devicePixelRatio;

                screenWidth = 50;
                screenHeight = 60;
            });

            it("if true, set pixelRatio", function(){
                Main.setConfig({
                    screenSize:RectRegion.create(0,0,screenWidth,screenHeight),
                    canvasId:"a",
                    useDevicePixelRatio:true
                });
                Main.init();

                expect(canvasDom.width).toEqual(screenWidth * devicePixelRatio);
                expect(canvasDom.height).toEqual(screenHeight * devicePixelRatio);
            });
            it("else, not set it", function(){
                Main.setConfig({
                    screenSize:RectRegion.create(0,0,screenWidth,screenHeight),
                    canvasId:"a",
                    useDevicePixelRatio:false
                });
                Main.init();

                expect(canvasDom.width).toEqual(screenWidth);
                expect(canvasDom.height).toEqual(screenHeight);
            });
        });

        describe("set isTest", function(){
            beforeEach(function(){
            });

            it("if CompileConfig.closeContractTest === true, set isTest to be false", function(){
                sandbox.stub(CompileConfig, "closeContractTest", true);

                Main.setConfig({
                    isTest:true
                });

                expect(Main.isTest).toBeFalsy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(CompileConfig, "closeContractTest", false);
                });

                it("if not set by config, set isTest = DebugConfig.isTest", function(){
                    sandbox.stub(DebugConfig, "isTest", true);

                    Main.setConfig({
                    });

                    expect(Main.isTest).toBeTruthy();
                });
                it("else,, set isTest by config", function() {
                    sandbox.stub(DebugConfig, "isTest", true);

                    Main.setConfig({
                        isTest:false
                    });

                    expect(Main.isTest).toBeFalsy();
                });
            });
        });

        describe("setScreen", function(){
            var fakeDomQuery;

            beforeEach(function(){
                fakeDomQuery = buildFakeDomQuery(canvasDom);

                sandbox.stub(DomQuery, "create").returns(fakeDomQuery);

                testTool.stubGetter(sinon, canvasDom, "clientWidth", function(){
                    return canvasDom.width;
                });
                testTool.stubGetter(sinon, canvasDom, "clientHeight", function(){
                    return canvasDom.height;
                });

                sandbox.stub(window, "innerWidth", 100);
                sandbox.stub(window, "innerHeight", 200);
            });
            afterEach(function(){
            });

            it("support full screen", function(){
                var view = device.view;

                Main.setConfig({
                    screenSize:EScreenSize.FULL,
                    canvasId: "#event-test"
                }).init();


                var dom = canvasDom;

                expect(dom.style.cssText).toEqual("position:absolute;left:0;top:0;");
                expect(fakeDomQuery.css).toCalledWith("margin", "0");
                expect(view.x).toEqual(0);
                expect(view.y).toEqual(0);
                expect(view.width > 0).toBeTruthy();
                expect(view.height > 0).toBeTruthy();
                expect(dom.style.width).toEqual("100%");
                expect(dom.style.height).toEqual("100%");

                expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
                expect(device.gl.viewport).toCalledWith(0, 0, sinon.match.number, sinon.match.number);
            });
            it("support custom screen size and position", function(){
                var view = device.view;

                Main.setConfig({
                    screenSize:RectRegion.create(10, 0, 50, 100),
                    canvasId: "#event-test"
                }).init();

                expect(view.x).toEqual(10);
                expect(view.y).toEqual(0);
                expect(view.width).toEqual(50);
                expect(view.height).toEqual(100);
                expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
                expect(device.viewport).toEqual(RectRegion.create(0, 0, view.width, view.height));
                expect(canvasDom.style.left).toEqual("10px");
                expect(canvasDom.style.top).toEqual("0px");
            });
        });
    });
});

