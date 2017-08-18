describe("dispose geometry", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var MemoryConfig = wd.MemoryConfig;

    var ArrayBufferWorkerData = wdrd.ArrayBufferWorkerData;
    var IndexBufferWorkerData = wdrd.IndexBufferWorkerData;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount: 200
        });
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
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

                    var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                    var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

                    obj1 = data1.gameObject;
                    obj2 = data2.gameObject;
                })

                it("send disposed geometry index array to render worker", function () {
                    testRenderWorkerTool.closeContractCheck();

                    directorTool.init(sandbox);
                    sendDrawRendercommandBufferTool.markInitComplete();



                    gameObjectTool.dispose(obj1);
                    gameObjectTool.dispose(obj2);




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


                    gameObjectTool.dispose(obj1);


                    expect(function () {
                        gameObjectTool.dispose(obj2);
                    }).toThrow("should not add data twice in one frame");
                });

                describe("test in render worker", function() {
                    var gl;
                    var e;

                    var geo1Index,geo2Index;

                    beforeEach(function () {
                        gl = workerTool.createGL(sandbox);

                        geo1Index = 0;
                        geo2Index = 1;

                        e = {
                            data:{
                                operateType: EWorkerOperateType.DRAW,
                                renderCommandBufferData:null,
                                materialData:null,
                                geometryData:null,
                                lightData:null,
                                disposeData: {
                                    geometryDisposeData:{
                                        disposedGeometryIndexArray: [geo1Index, geo2Index]
                                    },
                                    textureDisposeData: null
                                }
                            }
                        }
                    });

                    describe("dispose buffers", function () {
                        var buffer1, buffer2;

                        function judgeOtherBuffer(buffersName) {
                            var buffer3 = { a: 3 },
                                buffer4 = { a: 4 },
                                buffer5 = { a: 5 },
                                buffer6 = { a: 6 };

                            ArrayBufferWorkerData.vertexBuffer = [];
                            ArrayBufferWorkerData.vertexBuffer[geo1Index] = buffer3;
                            ArrayBufferWorkerData.vertexBuffer[geo2Index] = buffer4;


                            ArrayBufferWorkerData[buffersName] = [];
                            ArrayBufferWorkerData[buffersName][geo1Index] = buffer5;
                            ArrayBufferWorkerData[buffersName][geo2Index] = buffer6;




                            workerTool.execRenderWorkerMessageHandler(e);





                            expect(gl.deleteBuffer.callCount).toEqual(6);
                            expect(gl.deleteBuffer.getCall(0)).toCalledWith(buffer3)
                            expect(gl.deleteBuffer.getCall(1)).toCalledWith(buffer5)
                            expect(gl.deleteBuffer.getCall(2)).toCalledWith(buffer1)
                            expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                            expect(gl.deleteBuffer.getCall(4)).toCalledWith(buffer6)
                        }

                        beforeEach(function(){
                            buffer1 = {};
                            buffer2 = { a: 2 };

                            IndexBufferWorkerData.buffers = [];
                            IndexBufferWorkerData.buffers[geo1Index] = buffer1;
                            IndexBufferWorkerData.buffers[geo2Index] = buffer2;

                        });

                        it("test only with vertex buffer", function () {
                            var buffer3 = { a: 3 },
                                buffer4 = { a: 4 };

                            ArrayBufferWorkerData.vertexBuffer = [];
                            ArrayBufferWorkerData.vertexBuffer[geo1Index] = buffer3;
                            ArrayBufferWorkerData.vertexBuffer[geo2Index] = buffer4;




                            workerTool.execRenderWorkerMessageHandler(e);





                            expect(gl.deleteBuffer.callCount).toEqual(4);
                            expect(gl.deleteBuffer.getCall(0)).toCalledWith(buffer3)
                            expect(gl.deleteBuffer.getCall(1)).toCalledWith(buffer1)
                            expect(gl.deleteBuffer.getCall(2)).toCalledWith(buffer4)
                            expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer2)
                        });
                        it("test with normal buffer", function () {
                            judgeOtherBuffer("normalBuffers");
                        });
                        it("test with texCoord buffer", function () {
                            judgeOtherBuffer("texCoordBuffers");
                        });
                    });
                });
            });
        });
    });
});
