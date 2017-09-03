describe("dispose geometry", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var MemoryConfig = wd.MemoryConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount: 200
        });
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("disposeComponent", function () {
        describe("if dispose too many components", function () {
            beforeEach(function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);
            });

            describe("dispose buffers", function () {
                var geo1,geo2;
                var geo1Index,geo2Index;
                var obj1,obj2;

                beforeEach(function(){
                    geo1 = boxGeometryTool.create();
                    geo2 = boxGeometryTool.create();

                    geo1Index = geo1.index;
                    geo2Index = geo2.index;

                    var data1 = sceneSystemTool.prepareGameObjectAndAddToScene(false, geo1);
                    var data2 = sceneSystemTool.prepareGameObjectAndAddToScene(true, geo2);

                    obj1 = data1.gameObject;
                    obj2 = data2.gameObject;
                })

                it("send disposed geometry index array to render worker", function () {
                    testTool.closeContractCheck();

                    directorTool.init(sandbox);
                    sendDrawRendercommandBufferTool.markInitComplete();



                    gameObjectSystemTool.dispose(obj1);
                    gameObjectSystemTool.dispose(obj2);




                    workerTool.runRender(1);

                    worker = workerTool.getRenderWorker();

                    expect(worker.postMessage).toCalledWith({
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData:sinon.match.any,
                        materialData:sinon.match.any,
                        geometryData:sinon.match.any,
                        lightData:sinon.match.any,
                        disposeData: {
                            geometryDisposeData:{
                                disposedGeometryIndexArray: [geo1Index, geo2Index],
                            },
                            textureDisposeData:null
                        }
                    })
                });
                it("if disposed geometry index array multi times in one frame, contract error", function () {
                    sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 1);

                    directorTool.init(sandbox);


                    gameObjectSystemTool.dispose(obj1);


                    expect(function () {
                        gameObjectSystemTool.dispose(obj2);
                    }).toThrow("should not add data twice in one frame");
                });
            });
        });
    });
});
