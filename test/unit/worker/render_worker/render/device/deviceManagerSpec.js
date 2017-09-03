describe("deviceManager", function () {
    var sandbox = null;
    var worker;

    var RectRegion = wd.RectRegion;

    var EWorkerOperateType = wd.EWorkerOperateType;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("set view port", function () {
        describe("test set after first frame", function () {
            var x,y,width,height;

            beforeEach(function(){
                x = 10;
                y = 0;
                width = 50;
                height = 100;

                deviceManagerTool.setViewport(x, y, width, height);
            });

            it("set viewport to state", function () {
                expect(deviceManagerTool.getViewport()).toEqual(RectRegion.create(x, y, width, height));
            });
            it("send viewportData", function () {
                worker = workerTool.getRenderWorker();
                expect(worker.postMessage.getCall(2)).toCalledWith({
                    operateType: EWorkerOperateType.INIT_VIEWPORT,
                    viewportData: {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    }
                })
            });

            describe("test in render worker", function () {
                var gl;
                var e;
                var viewportData;

                beforeEach(function () {
                    gl = workerTool.createGL(sandbox);

                    viewportData = {
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    }

                    e = {
                        data: {
                            operateType: wd.EWorkerOperateType.INIT_VIEWPORT,
                            viewportData: viewportData
                        }
                    }
                });

                it("set viewport of gl", function () {
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
});
