describe("light", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var Vector3 = wd.Vector3;
    var DataBufferConfig = wd.DataBufferConfig;

    var AmbientLightData = wd.AmbientLightData;
    var DirectionLightData = wd.DirectionLightData;
    var PointLightData = wd.WebGL1PointLightData;

    var AmbientLightWorkerData = wdrd.AmbientLightWorkerData;
    var DirectionLightWorkerData = wdrd.DirectionLightWorkerData;
    var PointLightWorkerData = wdrd.WebGL1PointLightWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("init lights", function () {
        beforeEach(function () {
        });

        it("send light init data to render worker", function () {
            testTool.clearAndOpenContractCheck(sandbox, {
                transformDataBufferCount:20
            });

            sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            sceneTool.addAmbientLight();
            sceneTool.addDirectionLight();
            sceneTool.addDirectionLight();
            sceneTool.addPointLight();
            sceneTool.addPointLight();
            sceneTool.addPointLight();
            sceneTool.addPointLight();


            directorTool.init(sandbox);


            worker = workerTool.getRenderWorker();
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData: sinon.match.any,
                geometryData: sinon.match.any,
                textureData: sinon.match.any,
                renderData: sinon.match.any,
                lightData: {
                    ambientLightData: {
                        buffer: AmbientLightData.buffer,
                        bufferCount: DataBufferConfig.ambientLightDataBufferCount,
                        lightCount: AmbientLightData.count
                    },
                    directionLightData: {
                        buffer: DirectionLightData.buffer,
                        bufferCount: DataBufferConfig.directionLightDataBufferCount,
                        lightCount: DirectionLightData.count,
                        directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
                    },
                    pointLightData: {
                        buffer: PointLightData.buffer,
                        bufferCount: DataBufferConfig.pointLightDataBufferCount,
                        lightCount: PointLightData.count,
                        pointLightGLSLDataStructureMemberNameArr: PointLightData.lightGLSLDataStructureMemberNameArr
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
                    pointLightCount,
                    pointLightGLSLDataStructureMemberNameArr = [{a:1}];

                var ambientLightBufferCount,
                    directionLightBufferCount, pointLightBufferCount;


                var ambientLightBuffer,
                    directionLightBuffer,
                    pointLightBuffer;

                function judgeIsDirtys(dataName, bufferCount, LightWorkerData) {
                    var isDirtys = LightWorkerData[dataName];

                    expect(isDirtys).toBeInstanceOf(Uint8Array);
                    expect(isDirtys.byteLength).toEqual(bufferCount * Uint8Array.BYTES_PER_ELEMENT * 1);
                }

                beforeEach(function () {
                    var maxBufferLength = 10000;

                    ambientLightBufferCount = 10;
                    directionLightBufferCount = 20;
                    pointLightBufferCount = 30;

                    ambientLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);
                    directionLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);
                    pointLightBuffer = bufferTool.createSharedArrayBuffer(maxBufferLength);

                    ambientLightCount = 1;
                    directionLightCount = 3;
                    directionLightGLSLDataStructureMemberNameArr = [{}];
                    pointLightCount = 0;

                    e = {
                        data: {
                            operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                            geometryData: null,
                            textureData: null,
                            lightData: {
                                ambientLightData: {
                                    buffer: ambientLightBuffer,
                                    bufferCount: ambientLightBufferCount,
                                   lightCount: ambientLightCount
                                },
                                directionLightData: {
                                    buffer: directionLightBuffer,
                                    bufferCount: directionLightBufferCount,
                                    lightCount: directionLightCount,
                                    directionLightGLSLDataStructureMemberNameArr: directionLightGLSLDataStructureMemberNameArr
                                },
                                pointLightData: {
                                    buffer: pointLightBuffer,
                                    bufferCount: pointLightBufferCount,
                                    lightCount: pointLightCount,
                                    pointLightGLSLDataStructureMemberNameArr: pointLightGLSLDataStructureMemberNameArr

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
                    expect(colors.byteLength).toEqual(ambientLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 3);

                    judgeIsDirtys("isColorDirtys", ambientLightBufferCount, AmbientLightWorkerData);
                });
                it("init direction light data", function () {
                    expect(DirectionLightWorkerData.count).toEqual(directionLightCount);
                    expect(DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr).toEqual(directionLightGLSLDataStructureMemberNameArr);

                    var colors = DirectionLightWorkerData.colors;
                    expect(colors).toBeInstanceOf(Float32Array);
                    expect(colors.byteLength).toEqual(directionLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 3);


                    var intensities = DirectionLightWorkerData.intensities;
                    expect(intensities).toBeInstanceOf(Float32Array);
                    expect(intensities.byteLength).toEqual(directionLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);


                    judgeIsDirtys("isPositionDirtys", directionLightBufferCount, DirectionLightWorkerData);
                    judgeIsDirtys("isColorDirtys", directionLightBufferCount, DirectionLightWorkerData);
                    judgeIsDirtys("isIntensityDirtys", directionLightBufferCount, DirectionLightWorkerData);
                });
                it("init point light data", function () {
                    expect(PointLightWorkerData.count).toEqual(pointLightCount);
                    expect(PointLightWorkerData.lightGLSLDataStructureMemberNameArr).toEqual(pointLightGLSLDataStructureMemberNameArr);

                    var colors = PointLightWorkerData.colors;
                    expect(colors).toBeInstanceOf(Float32Array);
                    expect(colors.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 3);


                    var intensities = PointLightWorkerData.intensities;
                    expect(intensities).toBeInstanceOf(Float32Array);
                    expect(intensities.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);

                    var constants = PointLightWorkerData.constants;
                    expect(constants).toBeInstanceOf(Float32Array);
                    expect(constants.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);

                    var linears = PointLightWorkerData.linears;
                    expect(linears).toBeInstanceOf(Float32Array);
                    expect(linears.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);

                    var quadratics = PointLightWorkerData.quadratics;
                    expect(quadratics).toBeInstanceOf(Float32Array);
                    expect(quadratics.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);

                    var ranges = PointLightWorkerData.ranges;
                    expect(ranges).toBeInstanceOf(Float32Array);
                    expect(ranges.byteLength).toEqual(pointLightBufferCount * Float32Array.BYTES_PER_ELEMENT * 1);


                    judgeIsDirtys("isPositionDirtys", pointLightBufferCount, PointLightWorkerData);
                    judgeIsDirtys("isColorDirtys", pointLightBufferCount, PointLightWorkerData);
                    judgeIsDirtys("isIntensityDirtys", pointLightBufferCount, PointLightWorkerData);
                    judgeIsDirtys("isAttenuationDirtys", pointLightBufferCount, PointLightWorkerData);
                });
            });
        });
    });

    describe("set draw light data", function () {
        beforeEach(function () {

        });

        it("send direction light positionArr", function () {
            var pos1 = Vector3.create(1, 2, 3),
                pos2 = Vector3.create(2, 2, 4),
                pos3 = Vector3.create(10, 2, 3),
                pos4 = Vector3.create(20, 2, 4);

            sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            sceneTool.addDirectionLight(pos1);
            sceneTool.addDirectionLight(pos2);
            sceneTool.addPointLight(pos3);
            sceneTool.addPointLight(pos4);

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();


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
                    },
                    pointLightData: {
                        positionArr: [
                            pos3.values,
                            pos4.values
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
                    pos2 = Vector3.create(2, 2, 4),
                    pos3 = Vector3.create(10, 2, 3),
                    pos4 = Vector3.create(20, 2, 4);

                e = {
                    data: {
                        operateType: EWorkerOperateType.DRAW,
                        renderCommandBufferData: null,
                        disposeData: null,
                        materialData: null,
                        geometryData: null,
                        textureData: null,
                        lightData: {
                            directionLightData: {
                                positionArr: [
                                    pos1.values,
                                    pos2.values
                                ]
                            },
                            pointLightData: {
                                positionArr: [
                                    pos3.values,
                                    pos4.values
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
                expect(PointLightWorkerData.positionArr).toEqual([
                    pos3.values,
                    pos4.values
                ])
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
                        pos2 = Vector3.create(2, 2, 4),
                        pos3 = Vector3.create(10, 2, 3),
                        pos4 = Vector3.create(20, 2, 4);

                    e = {
                        data: {
                            operateType: EWorkerOperateType.DRAW,
                            renderCommandBufferData: null,
                            disposeData: null,
                            materialData: null,
                            geometryData: null,
                            textureData: null,
                            lightData: {
                                directionLightData: {
                                    positionArr: [
                                        pos1.values,
                                        pos2.values
                                    ]
                                },
                                pointLightData: {
                                    positionArr: [
                                        pos3.values,
                                        pos4.values
                                    ]
                                }
                            }
                        }
                    }


                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(shaderTool.getDirectionLightPositionForSend(0)).toEqual(pos1.values)
                    expect(shaderTool.getDirectionLightPositionForSend(1)).toEqual(pos2.values)

                    expect(shaderTool.getPointLightPositionForSend(0)).toEqual(pos3.values)
                    expect(shaderTool.getPointLightPositionForSend(1)).toEqual(pos4.values)
                });
            });
        });
    });
});
