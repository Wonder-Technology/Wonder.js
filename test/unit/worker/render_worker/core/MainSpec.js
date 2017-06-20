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
        RectRegion = wd.RectRegion;

    var renderWorkerConfig = wd.renderWorkerConfig;
    var EWorkerOperateType = wd.EWorkerOperateType;

    var GPUDetector = wdrd.GPUDetector;
    var DeviceManagerWorkerData = wdrd.DeviceManagerWorkerData;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function() {
        testRenderWorkerTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test set config data", function() {
        var gl;
        var device;
        var canvasDom;
        var offscreen;

        function buildFakeDomQuery(canvasDom) {
            return {
                css: sandbox.stub(),
                get: sandbox.stub().returns(canvasDom)
            };
        }

        function buildOffscreen(gl) {
            return {
                style:{},
                width:1,
                height:2,
                getContext:sandbox.stub().returns(gl),
            }
        }

        function buildMessage(viewportData, options) {
            return {
                data: {
                    operateType: EWorkerOperateType.INIT_GL,
                    canvas: offscreen,
                    options: options || {},
                    viewportData: viewportData || {}
                }
            }
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
                expect(dom.style.width).toEqual("100%");
                expect(dom.style.height).toEqual("100%");


                if(bowser.firefox){
                    return;
                }

                expect(view.width).toEqual(100);
                expect(view.height).toEqual(200);
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
                expect(canvasDom.style.left).toEqual("10px");
                expect(canvasDom.style.top).toEqual("0px");
            });

            describe("set viewport", function() {
                beforeEach(function(){

                });

                it("set viewport", function () {
                    Main.setConfig({
                        screenSize:RectRegion.create(10, 0, 50, 100),
                        canvasId: "#event-test"
                    }).init();

                    expect(device.viewport).toEqual(RectRegion.create(10, 0, 50, 100));
                });
                it("if new viewport data equal old data, send viewportData: null to worker", function () {
                    var screenSize = RectRegion.create(10, 0, 50, 100);
                    Main.setConfig({
                        screenSize:screenSize,
                        canvasId: "#event-test"
                    }).init();

                    Main.setConfig({
                        screenSize:screenSize,
                        canvasId: "#event-test"
                    }).init();

                    worker = workerTool.getRenderWorker();
                    expect(worker.postMessage.getCall(1)).toCalledWith({
                        operateType: EWorkerOperateType.INIT_GL,
                        canvas: offscreen,
                        options: sinon.match.any,
                        viewportData:null
                    })
                });

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

                    expect(offscreen.getContext).toCalledWith("webgl", options);
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
                    expect(DeviceManagerWorkerData.gl).toBeNull();

                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(DeviceManagerWorkerData.gl).toEqual(gl);
                });
                it("detect gpu", function () {
                    sandbox.stub(GPUDetector.getInstance(), "detect");

                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(GPUDetector.getInstance().detect).toCalledOnce();
                });
            });
        });
    });
});
