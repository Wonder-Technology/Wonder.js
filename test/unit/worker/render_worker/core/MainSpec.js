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
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("create gl", function() {
        var canvasDom;
        var offscreen;

        function buildFakeDomQuery(canvasDom){
            return {
                css:sandbox.stub(),
                get:sandbox.stub().returns(canvasDom)
            };
        }

        beforeEach(function(){
            offscreen = {
            };

            canvasDom = {
                style:{},
                width:1,
                height:2,
                transferControlToOffscreen:sandbox.stub().returns(offscreen)
            };

            sandbox.stub(DomQuery, "create");

            DomQuery.create.withArgs("#a").returns(buildFakeDomQuery(canvasDom));
        });

        it("create renderWorker", function(){
            var workerFilePath = "/Wonder.js/dist/worker/wd.renderWorker.js";
            renderWorkerConfig.workerFilePath = workerFilePath;

            Main.setConfig({
                canvasId: "#a"
            }).init();

            worker = workerTool.getRenderWorker();
            expect(worker).toBeInstanceOf(window.Worker);
            expect(worker.filePath).toEqual(workerFilePath);
        });
        it("post message to render worker", function () {
            Main.setConfig({
                canvasId: "#a"
            }).init();

            worker = workerTool.getRenderWorker();
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_GL,
                canvas: offscreen,
                options: sinon.match.any
            })
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            beforeEach(function(){
                gl = glslTool.buildFakeGl(sandbox);
                offscreen = {
                    style:{},
                    width:1,
                    height:2,
                    getContext:sandbox.stub().returns(gl),
                };

                e = {
                    data:{
                        operateType: EWorkerOperateType.INIT_GL,
                        canvas: offscreen,
                        options: sinon.match.any
                    }
                }
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

            //todo test more
        });
    });
});
