describe("detect gpu", function () {
    var sandbox = null;
    var Main = wd.Main,
        DeviceManager = wd.DeviceManager;

    var GPUDetectWorkerData = wdrd.GPUDetectWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("detect extension", function () {
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

        describe("detect EXT_color_buffer_float", function () {
            describe("test in render worker", function() {
                var gl;
                var e;

                beforeEach(function(){
                    gl = glslTool.buildFakeGl(sandbox);
                    offscreen = buildOffscreen(gl);

                    e = buildMessage();
                });

                it("detect gpu", function () {
                    gl.getExtension.withArgs("EXT_color_buffer_float").returns(true);

                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(GPUDetectWorkerData.extensionColorBufferFloat).toBeTruthy();
                });
            });
        });
    });
});
