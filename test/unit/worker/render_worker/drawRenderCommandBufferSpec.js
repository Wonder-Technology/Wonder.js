describe("draw render command", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var MaterialData = wd.MaterialData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("commit gl", function () {
        describe("test in render worker", function() {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            it("test", function () {
                e = {
                    data:{
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData:[],
                        geometryData:null,
                        materialData:null,
                        disposeData: null
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);


                expect(gl.commit).toCalledOnce();
            });
        });
    });
});

