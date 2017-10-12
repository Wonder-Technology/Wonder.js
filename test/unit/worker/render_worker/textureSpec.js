describe("texture", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

    var TextureWorkerData = wdrd.TextureWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("send texture data to render worker", function () {
        var texture1, texture2, texture3;

        function createTextureSource(width, height) {
            var source = new Image();
            source.width = width || 100;
            source.height = height || 200;

            return source;
        }

        function getArrayBufferFromImageData(source, width, height) {
            return textureSystemTool.getImageData(source, width, height).data.buffer;
        }

        beforeEach(function () {
            texture1 = textureSystemTool.create();
            texture2 = textureSystemTool.create();
            texture3 = textureSystemTool.create();
        });

        describe("send all sources' imageData's arrayBuffer,width,height and texture index to render worker", function () {
            var width1,height1;
            var width2,height2;
            var arrayBuffer1,arrayBuffer2;

            beforeEach(function(){
                width1 = 100;
                height1 = 50;
                var source1 = createTextureSource(width1, height1);

                width2 = 101;
                height2 = 51;
                var source2 = createTextureSource(width2, height2);

                textureSystemTool.setSource(texture2, source1);
                textureSystemTool.setSource(texture3, source2);

                arrayBuffer1 = getArrayBufferFromImageData(source1, width1, height1);
                arrayBuffer2 = getArrayBufferFromImageData(source2, width2, height2);


                sceneSystemTool.prepareGameObjectAndAddToScene();

                directorTool.init(sandbox);
                sendDrawRendercommandBufferTool.markInitComplete();



                worker = workerTool.getRenderWorker();
            });

            it("test", function () {
                expect(worker.postMessage).toCalledWith({
                    operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                    materialData:sinon.match.any,
                    geometryData:sinon.match.any,
                    lightData:sinon.match.any,
                    renderData:sinon.match.any,
                    textureData: {
                        mapManagerBuffer: sinon.match.any,
                        textureBuffer: sinon.match.any,
                        index: sinon.match.any,
                        uniformSamplerNameMap: sinon.match.any,
                        needAddedImageDataArr:[
                            {
                                arrayBuffer:arrayBuffer1,
                                width:width1,
                                height: height1,
                                index:0
                            },
                            {
                                arrayBuffer:arrayBuffer2,
                                width:width2,
                                height: height2,
                                index:1
                            }
                        ]
                    }
                });
            });
            it("send imageData's arraybuffer as transferList", function () {
                expect(worker.postMessage).toCalledWith(sinon.match.any, [arrayBuffer1, arrayBuffer2]);
            });
        });

        it("send texture count to render worker", function () {
            sceneSystemTool.prepareGameObjectAndAddToScene();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                renderData:sinon.match.any,
                textureData: {
                    mapManagerBuffer: sinon.match.any,
                    textureBuffer: sinon.match.any,
                    index: 3,
                    uniformSamplerNameMap: sinon.match.any,
                    needAddedImageDataArr: sinon.match.any
                }
            });
        });
        it("send uniformSamplerNameMap to render worker", function () {
            var data = sceneSystemTool.prepareGameObjectAndAddToScene();
            var mat = data.material;

            basicMaterialTool.setMap(mat, texture2);
            // basicMaterialTool.setMap(mat, texture3);

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage.withArgs({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                renderData:sinon.match.any,
                textureData: sinon.match.any
            }).args[0][0].textureData.uniformSamplerNameMap).toEqual(
                [
                    undefined,
                    "u_sampler2D"
                ]
            )
        });

        describe("test in render worker", function () {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);

                var mapManagerBuffer = MapManagerData.buffer;
                var textureBuffer = TextureData.buffer;

                e = {
                    data: {
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                        materialData: materialWorkerTool.buildSendInitMaterialData(),
                        geometryData: null,
                        lightData: null,
                        textureData: {
                            mapManagerBuffer: mapManagerBuffer,
                            textureBuffer: textureBuffer,
                            index: 3,
                            needAddedImageDataArr: [],
                            uniformSamplerNameMap: [
                                undefined,
                                "u_sampler2D"
                            ]
                        }
                    }
                }
            });

            it("save texture count", function () {
                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.index).toEqual(3);
            });
            it("save uniformSamplerNameMap", function () {
                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.uniformSamplerNameMap).toEqual([
                    undefined,
                    "u_sampler2D"
                ]);
            });

            describe("create webgl texture", function () {
                it("test create", function () {
                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(gl.createTexture.callCount).toEqual(3);
                });
            });

            describe("set TextureWorkerData's sourceMap", function () {
                var postMessage;
                var width1,height1;
                var width2,height2;

                function judgeWaitForInitComplete(done, judgeFunc, expect){
                    renderWorkerTool.judgeWaitForInitComplete(done, postMessage, judgeFunc, expect);
                }

                function createArrayBuffer(width, height) {
                    return new ArrayBuffer(4 * width * height);
                }

                beforeEach(function(){
                    testTool.closeContractCheck();

                    width1 = 100;
                    height1 = 200;
                    width2 = 1;
                    height2 = 2;

                    e.data.textureData.needAddedImageDataArr = [
                        {
                            arrayBuffer:createArrayBuffer(width1, height1),
                            width:width1,
                            height: height1,
                            index:0
                        },
                        {
                            arrayBuffer:createArrayBuffer(width2, height2),
                            width:width2,
                            height: height2,
                            index:1
                        }
                    ]

                    postMessage = workerTool.getWorkerPostMessage();
                })

                it("create ImageData from arrayBuffer and createImageBitmap", function (done) {
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                    judgeWaitForInitComplete(done, function(expect){
                        expect(TextureWorkerData.sourceMap.length).toEqual(2);
                        var sourceMap1 = TextureWorkerData.sourceMap[0];
                        expect(sourceMap1).toBeInstanceOf(ImageBitmap);
                        expect(sourceMap1.width).toEqual(width1);
                        expect(sourceMap1.height).toEqual(height1);
                        var sourceMap2 = TextureWorkerData.sourceMap[1];
                        expect(sourceMap2).toBeInstanceOf(ImageBitmap);
                        expect(sourceMap2.width).toEqual(width2);
                        expect(sourceMap2.height).toEqual(height2);

                    }, expect)
                });

                if(bowser.chrome){
                    it("if filpY, filpY the imageBitmap by set createImageBitmap's option's imageOrientation", function (done) {
                        if(bowser.firefox){
                            done();
                            return;
                        }

                        //todo set flipY

                        sandbox.spy(window, "createImageBitmap");

                        workerTool.execRenderWorkerMessageHandler(e);

                        judgeWaitForInitComplete(done, function(expect){
                            expect(window.createImageBitmap.getCall(0).args[1]).toEqual({
                                imageOrientation: "flipY"
                            })
                            expect(window.createImageBitmap.getCall(1).args[1]).toEqual({
                                imageOrientation: "flipY"
                            })
                        }, expect)
                    });
                }
                else if(bowser.firefox){
                }
            });
        });
    });

    describe("update", function () {
        beforeEach(function () {
        });

        describe("test in render worker", function () {
            var gl;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            if(bowser.chrome){
                it("not set pixelStorei", function () {
                    var textureIndex = 0;

                    TextureWorkerData = {
                        index:1,
                        glTextures:[{}],
                        sourceMap:[{}],
                        widths: [0],
                        heights: [0],
                        widths: [0],
                        isNeedUpdates: [0]
                    }

                    textureWorkerTool.update(gl, textureIndex, TextureWorkerData);

                    expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL)).not.toCalled();
                });
            }
            else if(bowser.firefox){
                it("set pixelStorei", function () {
                    var textureIndex = 0;

                    TextureWorkerData = {
                        index:1,
                        glTextures:[{}],
                        sourceMap:[{}],
                        widths: [0],
                        heights: [0],
                        widths: [0],
                        isNeedUpdates: [0]
                    }

                    textureWorkerTool.update(gl, textureIndex, TextureWorkerData);

                    expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL, true)).toCalledOnce();
                });
            }
        });
    });
});
