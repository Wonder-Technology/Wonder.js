describe("light", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var Vector3 = wd.Vector3;
    var DataBufferConfig = wd.DataBufferConfig;

    var AmbientLightData = wd.AmbientLightData;
    var DirectionLightData = wd.DirectionLightData;
    var PointLightData = wd.PointLightData;

    var AmbientLightWorkerData = wdrd.AmbientLightWorkerData;
    var DirectionLightWorkerData = wdrd.DirectionLightWorkerData;
    var PointLightWorkerData = wdrd.PointLightWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("init lights", function () {
        beforeEach(function () {

        });

        it("send light init data to render worker", function () {
            sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            sceneTool.addAmbientLight();
            sceneTool.addDirectionLight();
            sceneTool.addDirectionLight();


            directorTool.init(sandbox);


            worker = workerTool.getRenderWorker();
            expect(worker.postMessage.getCall(0)).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT,
                materialData: sinon.match.any,
                geometryData: sinon.match.any,
                lightData: {
                    ambientLightData: {
                        buffer: AmbientLightData.buffer,
                        count: AmbientLightData.count
                    },
                    directionLightData: {
                        buffer: DirectionLightData.buffer,
                        count: DirectionLightData.count,
                        directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
                    },
                    pointLightData: {
                        buffer: null,
                        count: PointLightData.count
                    }
                }
            });
        });

        describe("test in render worker", function () {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            describe("init light data", function () {
                var ambientLightCount,
                    directionLightCount, directionLightGLSLDataStructureMemberNameArr,
                    pointLightCount;


                var ambientLightBuffer,
                    directionLightBuffer,
                    pointLightBuffer;

                beforeEach(function () {
                    var maxBufferLength = 1000;
                    ambientLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);
                    directionLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);
                    pointLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);

                    ambientLightCount = 1;
                    directionLightCount = 3;
                    directionLightGLSLDataStructureMemberNameArr = [{}];
                    pointLightCount = 0;

                    e = {
                        data: {
                            operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT,
                            geometryData: null,
                            lightData: {
                                ambientLightData: {
                                    buffer: ambientLightBuffer,
                                    count: ambientLightCount
                                },
                                directionLightData: {
                                    buffer: directionLightBuffer,
                                    count: directionLightCount,
                                    directionLightGLSLDataStructureMemberNameArr: directionLightGLSLDataStructureMemberNameArr
                                },
                                pointLightData: {
                                    buffer: pointLightBuffer,
                                    count: pointLightCount

                                }
                            },
                            materialData: null
                        }
                    }

                    workerTool.execRenderWorkerMessageHandler(e);
                });

                it("init ambient light data", function () {
                    expect(AmbientLightWorkerData.count).toEqual(ambientLightCount);

                    var colors = AmbientLightWorkerData.colors;
                    expect(colors).toBeInstanceOf(Float32Array);
                    expect(colors.byteLength).toEqual(DataBufferConfig.ambientLightDataBufferCount * Float32Array.BYTES_PER_ELEMENT * 3);
                });
                it("init direction light data", function () {
                    expect(DirectionLightWorkerData.count).toEqual(directionLightCount);
                    expect(DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr).toEqual(directionLightGLSLDataStructureMemberNameArr);

                    var colors = DirectionLightWorkerData.colors;
                    expect(colors).toBeInstanceOf(Float32Array);
                    expect(colors.byteLength).toEqual(directionLightCount * Float32Array.BYTES_PER_ELEMENT * 3);


                    var intensities = DirectionLightWorkerData.intensities;
                    expect(intensities).toBeInstanceOf(Float32Array);
                    expect(intensities.byteLength).toEqual(directionLightCount * Float32Array.BYTES_PER_ELEMENT * 1);
                });
                it("init point light data", function () {
                    expect(PointLightWorkerData.count).toEqual(pointLightCount);

                    //todo judge type array buffer
                });
            });
        });

        describe("set draw light data", function () {
            beforeEach(function () {

            });

            it("send direction light positionArr", function () {
                var pos1 = Vector3.create(1, 2, 3),
                    pos2 = Vector3.create(2, 2, 4);

                sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
                sceneTool.addDirectionLight(pos1);
                sceneTool.addDirectionLight(pos2);


                directorTool.init(sandbox);

                workerTool.runRender(1);


                worker = workerTool.getRenderWorker();
                expect(worker.postMessage).toCalledWith({
                    operateType: EWorkerOperateType.DRAW,
                    renderCommandBufferData: sinon.match.any,
                    disposeData: sinon.match.any,
                    materialData: sinon.match.any,
                    geometryData: sinon.match.any,
                    lightData: {
                        directionLightData: {
                            positionArr: [
                                pos1.values,
                                pos2.values
                            ]
                        }
                    }
                });
            });


            describe("test in render worker", function () {
                var gl;
                var e;

                beforeEach(function () {
                    gl = workerTool.createGL(sandbox);
                });

                it("set direction light positionArr", function () {
                    var pos1 = Vector3.create(1, 2, 3),
                        pos2 = Vector3.create(2, 2, 4);

                    e = {
                        data: {
                            operateType: EWorkerOperateType.DRAW,
                            renderCommandBufferData: null,
                            disposeData: null,
                            materialData: null,
                            geometryData: null,
                            lightData: {
                                directionLightData: {
                                    positionArr: [
                                        pos1.values,
                                        pos2.values
                                    ]
                                }
                            }
                        }
                    }

                    workerTool.execRenderWorkerMessageHandler(e);


                    expect(DirectionLightWorkerData.positionArr).toEqual([
                        pos1.values,
                        pos2.values
                    ])
                });
            });
        });
    });

    describe("send light uniform data", function() {
        beforeEach(function(){

        });

        describe("test in render worker", function() {
            var gl,
                e;

            beforeEach(function(){
                gl = workerTool.createGL(sandbox);
            });

            describe("send direction uniform data", function(){
                it("send position from DirectionLightData.positionArr", function () {
                    var pos1 = Vector3.create(1, 2, 3),
                        pos2 = Vector3.create(2, 2, 4);

                    e = {
                        data: {
                            operateType: EWorkerOperateType.DRAW,
                            renderCommandBufferData: null,
                            disposeData: null,
                            materialData: null,
                            geometryData: null,
                            lightData: {
                                directionLightData: {
                                    positionArr: [
                                        pos1.values,
                                        pos2.values
                                    ]
                                }
                            }
                        }
                    }


                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(shaderTool.getDirectionLightPositionForSend(0)).toEqual(pos1.values)
                    expect(shaderTool.getDirectionLightPositionForSend(1)).toEqual(pos2.values)
                });
            });
        });
    });
});
