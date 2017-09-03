describe("Main", function() {
    var sandbox = null;

    var worker;

    var Main = wd.Main,
        CompileConfig = wd.CompileConfig,
        fromArray = wd.fromArray,
        DeviceManager = wd.DeviceManager,
        DomQuery = wd.DomQuery,
        DebugConfig = wd.DebugConfig,
        EScreenSize = wd.EScreenSize,
        RectRegion = wd.RectRegion,
        EWebGLVersion = wd.EWebGLVersion;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var DeviceManagerWorkerData = wdrd.DeviceManagerWorkerData;
    var InitConfigWorkerData = wdrd.InitConfigWorkerData;
    var WebGLDetectWorkerData = wdrd.WebGLDetectWorkerData;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function() {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("isTest", function(){
        describe("if it's true", function(){
            beforeEach(function(){
            });

            it("send isTest data", function () {
                Main.setConfig({
                    isTest:true
                });

                worker = workerTool.getRenderWorker();
                expect(worker.postMessage).toCalledWith({
                    operateType: EWorkerOperateType.INIT_CONFIG,
                    isTest: true
                })
            });
            it("it will open wonder.js contract check", function () {
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

            describe("test in render worker", function() {
                var gl;
                var e;

                beforeEach(function () {
                    gl = workerTool.createGL(sandbox);
                });

                it("set config data", function () {
                    e = {
                        data:{
                            operateType: EWorkerOperateType.INIT_CONFIG,
                            isTest: true
                        }
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                expect(InitConfigWorkerData.isTest).toBeTruthy();
                });
            });
        });
    });

    describe("pass data to render worker", function(){
        it("send webgl version", function () {
            var version = EWebGLVersion.WEBGL2;
            webglDetectWorkerTool.setVersion(version);

            Main.setConfig({
                isTest:true
            });

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage.getCall(1)).toCalledWith({
                operateType: EWorkerOperateType.INIT_DATA,
                webglVersion: version
            })
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            it("set webgl version", function () {
                var version = EWebGLVersion.WEBGL2;
                e = {
                    data:{
                        operateType: EWorkerOperateType.INIT_DATA,
                        webglVersion: version
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);

                expect(WebGLDetectWorkerData.version).toEqual(version);
            });
        });
    });

    describe("test set config data", function() {
        var gl;
        var device;
        var canvasDom;
        var offscreen;

        function buildFakeDomQuery(canvasDom) {
            return mainWorkerTool.buildFakeDomQuery(sandbox, canvasDom);
        }

        function buildOffscreen(gl) {
            return mainWorkerTool.buildOffscreen(sandbox, gl);
        }

        function buildMessage(viewportData, options) {
            return mainWorkerTool.buildMessage(offscreen, viewportData, options);
        }

        beforeEach(function () {
            device = DeviceManager.getInstance();

            offscreen = {
            };

            canvasDom = {
                style: {},
                width: 1,
                height: 2,
                transferControlToOffscreen:sandbox.stub().returns(offscreen),
                getContext: sandbox.stub().returns(glslTool.buildFakeGl(sandbox))
            };
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
                Main.setConfig({
                    screenSize:EScreenSize.FULL,
                    canvasId: "#event-test"
                }).init();


                expect(canvasDom.style.cssText).toEqual("position:absolute;left:0;top:0;");
                expect(fakeDomQuery.css).toCalledWith("margin", "0");

                expect(viewTool.getCanvasLeft(canvasDom)).toEqual(0);
                expect(viewTool.getCanvasTop(canvasDom)).toEqual(0);
                expect(viewTool.getCanvasStyleWidth(canvasDom)).toEqual("100%");
                expect(viewTool.getCanvasStyleHeight(canvasDom)).toEqual("100%");


                if(bowser.firefox){
                    return;
                }

                expect(viewTool.getCanvasWidth(canvasDom)).toEqual(100);
                expect(viewTool.getCanvasHeight(canvasDom)).toEqual(200);
            });
            it("support custom screen size and position", function(){
                Main.setConfig({
                    screenSize:RectRegion.create(10, 0, 50, 100),
                    canvasId: "#event-test"
                }).init();

                expect(viewTool.getCanvasLeft(canvasDom)).toEqual(10);
                expect(viewTool.getCanvasTop(canvasDom)).toEqual(0);
                expect(viewTool.getCanvasWidth(canvasDom)).toEqual(50);
                expect(viewTool.getCanvasHeight(canvasDom)).toEqual(100);
                expect(viewTool.getCanvasStyleWidth(canvasDom)).toEqual("50px");
                expect(viewTool.getCanvasStyleHeight(canvasDom)).toEqual("100px");
            });

            describe("set viewport", function() {
                beforeEach(function(){

                });

                it("set viewport to state", function () {
                    Main.setConfig({
                        screenSize:RectRegion.create(10, 0, 50, 100),
                        canvasId: "#event-test"
                    }).init();

                    expect(deviceManagerTool.getViewport()).toEqual(RectRegion.create(10, 0, 50, 100));
                });
                it("send viewportData", function () {
                    Main.setConfig({
                        screenSize:RectRegion.create(10, 0, 50, 100),
                        canvasId: "#event-test"
                    }).init();

                    worker = workerTool.getRenderWorker();
                    expect(worker.postMessage.getCall(2)).toCalledWith({
                        operateType: EWorkerOperateType.INIT_GL,
                        canvas: sinon.match.any,
                        options: sinon.match.any,
                        viewportData:{
                            x:10,
                            y:0,
                            width:50,
                            height:100
                        }
                    })
                });
                // it("if new viewport data equal old data, send viewportData: null to worker", function () {
                //     var screenSize = RectRegion.create(10, 0, 50, 100);
                //     Main.setConfig({
                //         screenSize:screenSize,
                //         canvasId: "#event-test"
                //     }).init();
                //
                //     Main.setConfig({
                //         screenSize:screenSize,
                //         canvasId: "#event-test"
                //     }).init();
                //
                //     worker = workerTool.getRenderWorker();
                //     expect(worker.postMessage.getCall(2)).toCalledWith({
                //         operateType: EWorkerOperateType.INIT_GL,
                //         canvas: offscreen,
                //         options: sinon.match.any,
                //         viewportData:null
                //     })
                // });

                describe("test in render worker", function() {
                    var gl;
                    var e;
                    var viewportData;

                    beforeEach(function(){
                        gl = glslTool.buildFakeGl(sandbox);
                        offscreen = buildOffscreen(gl);

                        viewportData = {
                            x:11,
                            y:12,
                            width:1,
                            height:2
                        }

                        e = buildMessage(viewportData);
                    });

                    it("set viewport of gl", function(){
                        workerTool.execRenderWorkerMessageHandler(e);

                        expect(gl.viewport).toCalledWith(viewportData.x, viewportData.y, viewportData.width, viewportData.height);
                    });
                    it("save viewport data to state in render worker", function () {
                        workerTool.execRenderWorkerMessageHandler(e);

                        var state = stateTool.getState();

                        var data = state.getIn(["DeviceManager", "viewport"]);
                        expect(data.x).toEqual(viewportData.x);
                        expect(data.y).toEqual(viewportData.y);
                        expect(data.width).toEqual(viewportData.width);
                        expect(data.height).toEqual(viewportData.height);
                    });
                });
            });
        });

        describe("test set canvas id", function(){
            describe("if pass canvas id", function() {
                beforeEach(function(){
                    sandbox.stub(DomQuery, "create");

                    DomQuery.create.withArgs("#a").returns(buildFakeDomQuery(canvasDom));
                    DomQuery.create.withArgs("body").returns(buildFakeDomQuery(canvasDom));
                });

                it("support pass canvas id", function(){
                    Main.setConfig({
                        canvasId:"a"
                    });
                    Main.init();

                    expect(DomQuery.create).toCalledWith("#a");
                });
                it("support pass #canvasId", function(){
                    Main.setConfig({
                        canvasId:"#a"
                    });
                    Main.init();

                    expect(DomQuery.create).toCalledWith("#a");
                });
            });

            it("if not pass canvas id, create canvas and prepend to body", function () {
                var dom = buildFakeDomQuery(canvasDom);
                dom.prependTo = sandbox.stub().returns({
                    get:sandbox.stub().returns(canvasDom)
                });
                sandbox.stub(DomQuery, "create").returns(dom);

                Main.setConfig({
                });
                Main.init();

                expect(DomQuery.create).toCalledWith("<canvas></canvas>");
                expect(dom.prependTo).toCalledWith("body");
            });
        });

        describe("set context config data", function(){
            beforeEach(function(){
                sandbox.stub(DomQuery, "create").returns(buildFakeDomQuery(canvasDom));
            });

            describe("test in render worker", function() {
                var gl;
                var e;

                beforeEach(function () {
                    gl = glslTool.buildFakeGl(sandbox);
                    offscreen = buildOffscreen(gl);
                });

                it("set webgl context options", function () {
                    var options = {
                        stencil:true,
                        antialias:false,
                        premultipliedAlpha:true,
                        preserveDrawingBuffer:false
                    };
                    e = buildMessage(null, options);

                    workerTool.execRenderWorkerMessageHandler(e);

                    // expect(offscreen.getContext).toCalledWith("webgl", options);
                    expect(offscreen.getContext).toCalledWith(sinon.match.any, options);
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
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

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

        describe("create gl", function() {
            beforeEach(function(){
                sandbox.stub(DomQuery, "create");

                DomQuery.create.withArgs("#a").returns(buildFakeDomQuery(canvasDom));
                DomQuery.create.withArgs("body").returns(buildFakeDomQuery(canvasDom));
            });

            it("create renderWorker", function(){
                Main.setConfig({
                    canvasId: "#a"
                }).init();

                worker = workerTool.getRenderWorker();
                expect(worker).toBeInstanceOf(window.Worker);
            });

            describe("test render worker's file path", function() {
                beforeEach(function(){

                });

                it("test default file path", function(){
                    var workerFilePath = "/Wonder.js/dist/worker/wd.renderWorker.js";

                    Main.setConfig({
                        canvasId: "#a"
                    }).init();

                    worker = workerTool.getRenderWorker();
                    expect(worker).toBeInstanceOf(window.Worker);
                    expect(worker.filePath).toEqual(workerFilePath);
                });

                describe("set file dir by config", function () {
                    it("test", function () {
                        var workerFileDir = "/aaa/worker/";

                        Main.setConfig({
                            canvasId: "#a",
                            workerConfig:{
                                renderWorkerFileDir:workerFileDir
                            }
                        }).init();

                        worker = workerTool.getRenderWorker();
                        expect(worker.filePath).toEqual(workerFileDir + "wd.renderWorker.js");
                    });
                    it("if file dir not end with '/', add '/'", function () {
                        var workerFileDir = "/aaa/worker";

                        Main.setConfig({
                            canvasId: "#a",
                            workerConfig:{
                                renderWorkerFileDir:workerFileDir
                            }
                        }).init();

                        worker = workerTool.getRenderWorker();
                        expect(worker.filePath).toEqual(workerFileDir + '/' + "wd.renderWorker.js");                    });
                });
            });

            it("send message to render worker", function () {
                Main.setConfig({
                    canvasId: "#a"
                }).init();

                worker = workerTool.getRenderWorker();
                expect(worker.postMessage).toCalledWith({
                    operateType: EWorkerOperateType.INIT_GL,
                    canvas: offscreen,
                    options: sinon.match.any,
                    viewportData:sinon.match.any
                })
            });

            describe("test in render worker", function() {
                var gl;
                var e;

                beforeEach(function(){
                    gl = glslTool.buildFakeGl(sandbox);
                    offscreen = buildOffscreen(gl);

                    e = buildMessage();
                });

                it("set gl to DeviceManagerWorkerData", function(){
                    testTool.clear(sandbox);

                    expect(DeviceManagerWorkerData.gl).toBeNull();

                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(DeviceManagerWorkerData.gl).toEqual(gl);
                });
            });
        });
    });
});
