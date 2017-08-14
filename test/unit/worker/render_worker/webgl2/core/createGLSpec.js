describe("create gl", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testRenderWorkerTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("get webgl2 context", function () {
        var offscreen;

        function buildOffscreen(gl) {
            return mainWorkerTool.buildOffscreen(sandbox, gl);
        }

        function buildMessage(viewportData, options) {
            return mainWorkerTool.buildMessage(offscreen, viewportData, options);
        }

        describe("test in render worker", function () {
            var gl;
            var e;

            beforeEach(function () {
                gl = glslTool.buildFakeGl(sandbox);
                offscreen = buildOffscreen(gl);
            });

            it("get context", function () {
                var options = {};
                e = buildMessage(null, options);

                workerTool.execRenderWorkerMessageHandler(e);

                expect(offscreen.getContext).toCalledWith("webgl2");
            });
        });
    });
});
