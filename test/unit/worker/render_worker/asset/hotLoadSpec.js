describe("hot load", function () {
    var sandbox = null;
    var state;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var TextureWorkerData = wdrd.TextureWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("test load texture for new added gameObject at runtime", function () {
        var material1, material2;
        var texture1, texture2;

        var width1, height1;
        var width2, height2;
        var arrayBuffer1, arrayBuffer2;

        function createTextureSource(width, height) {
            var source = new Image();
            source.width = width || 100;
            source.height = height || 200;

            return source;
        }

        function getArrayBufferFromImageData(source, width, height) {
            return textureSystemTool.getImageData(source, width, height).data.buffer;
        }

        function addBoxWithOneMapBeforeInit() {
            width1 = 100;
            height1 = 50;
            var source1 = createTextureSource(width1, height1);

            arrayBuffer1 = getArrayBufferFromImageData(source1, width1, height1);


            material1 = basicMaterialTool.create();
            texture1 = textureTool.create();

            textureTool.setSource(texture1, source1);

            basicMaterialTool.setMap(material1, texture1);

            sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material1);
        }

        function addBoxWithOneMap() {
            width2 = 101;
            height2 = 51;
            var source2 = createTextureSource(width2, height2);


            texture2 = textureTool.create();

            textureSystemTool.setSource(texture2, source2);

            arrayBuffer2 = getArrayBufferFromImageData(source2, width2, height2);


            var data = sceneSystemTool.createGameObject(null, null);


            material2 = data.material;
            var gameObject2 = data.gameObject;

            basicMaterialTool.setMap(material2, texture2);



            gameObjectTool.init(gameObject2);

            sceneTool.addGameObject(gameObject2);
        }

        beforeEach(function () {
        });

        describe("send need inited textures data to render worker", function () {
            beforeEach(function () {
                addBoxWithOneMapBeforeInit();


                directorTool.init(sandbox);
                sendDrawRendercommandBufferTool.markInitComplete();


                worker = workerTool.getRenderWorker();
            });

            describe("send textures' sources' imageData's arrayBuffer,width,height and texture index to render worker", function () {
                beforeEach(function () {
                });

                it("test", function () {
                    addBoxWithOneMap();

                    directorTool.loopBody(state);


                    expect(worker.postMessage).toCalledWith({
                        operateType: EWorkerOperateType.DRAW,
                        materialData: sinon.match.any,
                        geometryData: sinon.match.any,
                        lightData: sinon.match.any,
                        renderCommandBufferData: sinon.match.any,
                        disposeData: sinon.match.any,
                        textureData: {
                            index: sinon.match.any,
                            uniformSamplerNameMap: sinon.match.any,
                            materialTextureList: sinon.match.any,
                            needInitedTextureIndexArr: sinon.match.any,
                            needAddedImageDataArr: [
                                {
                                    arrayBuffer: arrayBuffer2,
                                    width: width2,
                                    height: height2,
                                    index: 1
                                }
                            ]
                        }
                    });
                });
                it("send imageData's arraybuffer as transferList", function () {
                    addBoxWithOneMap();

                    directorTool.loopBody(state);

                    expect(worker.postMessage).toCalledWith(sinon.match.any, [arrayBuffer2]);
                });
            });

            it("send need inited texture index array to render worker", function () {
                addBoxWithOneMap();

                directorTool.loopBody(state);


                expect(worker.postMessage).toCalledWith({
                    operateType: EWorkerOperateType.DRAW,
                    materialData: sinon.match.any,
                    geometryData: sinon.match.any,
                    lightData: sinon.match.any,
                    renderCommandBufferData: sinon.match.any,
                    disposeData: sinon.match.any,
                    textureData: {
                        index: sinon.match.any,
                        uniformSamplerNameMap: sinon.match.any,
                        materialTextureList: sinon.match.any,
                        needInitedTextureIndexArr: [
                            texture2.index
                        ],
                        needAddedImageDataArr: sinon.match.any
                    }
                });
            });
        });

        it("send texture count to render worker", function () {
            addBoxWithOneMapBeforeInit();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            addBoxWithOneMap();

            directorTool.loopBody(state);

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                materialData: sinon.match.any,
                geometryData: sinon.match.any,
                lightData: sinon.match.any,
                renderCommandBufferData: sinon.match.any,
                disposeData: sinon.match.any,
                textureData: {
                    index: 2,
                    uniformSamplerNameMap: sinon.match.any,
                    materialTextureList: sinon.match.any,
                    needInitedTextureIndexArr: sinon.match.any,
                    needAddedImageDataArr: sinon.match.any
                }
            });
        });
        it("send materialTextureList to render worker", function () {
            addBoxWithOneMapBeforeInit();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            addBoxWithOneMap();

            directorTool.loopBody(state);

            worker = workerTool.getRenderWorker();

            var materialTextureList = [];
            materialTextureList[material1.index] = [texture1.index];
            materialTextureList[material2.index] = [texture2.index];
            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                materialData: sinon.match.any,
                geometryData: sinon.match.any,
                lightData: sinon.match.any,
                renderCommandBufferData: sinon.match.any,
                disposeData: sinon.match.any,
                textureData: {
                    materialTextureList: materialTextureList,
                    index: sinon.match.any,
                    uniformSamplerNameMap: sinon.match.any,
                    needInitedTextureIndexArr: sinon.match.any,
                    needAddedImageDataArr: sinon.match.any
                }
            });
        });
        it("send uniformSamplerNameMap to render worker", function () {
            addBoxWithOneMapBeforeInit();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            addBoxWithOneMap();

            directorTool.loopBody(state);

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                materialData: sinon.match.any,
                geometryData: sinon.match.any,
                lightData: sinon.match.any,
                renderCommandBufferData: sinon.match.any,
                disposeData: sinon.match.any,
                textureData: {
                    index: sinon.match.any,
                    uniformSamplerNameMap: [
                        "u_sampler2D",
                        "u_sampler2D"
                    ],
                    materialTextureList: sinon.match.any,
                    needInitedTextureIndexArr: sinon.match.any,
                    needAddedImageDataArr: sinon.match.any
                }
            });
        });

        describe("test in render worker", function () {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);


                e = {
                    data: {
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                        materialData: null,
                        geometryData: null,
                        lightData: null,
                        renderData: null,
                        textureData: {
                            index: 2,
                            needAddedImageDataArr: [],
                            uniformSamplerNameMap: [
                                "u_sampler2D0",
                                "u_sampler2D1"
                            ]
                        }
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);

                e = {
                    data: {
                        operateType: EWorkerOperateType.DRAW,
                        materialData: null,
                        geometryData: null,
                        lightData: null,
                        renderCommandBufferData: null,
                        disposeData: null,
                        textureData: {
                            index: 1,
                            needAddedImageDataArr: [],
                            needInitedTextureIndexArr: [],
                            uniformSamplerNameMap: [
                                "u_sampler2D0",
                                "u_sampler2D0"
                            ]
                        }
                    }
                }
            });

            it("save texture count", function () {
                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.index).toEqual(1);
            });
            it("save uniformSamplerNameMap", function () {
                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.uniformSamplerNameMap).toEqual([
                    "u_sampler2D0",
                    "u_sampler2D0"
                ]);
            });

            describe("init need inited texture", function() {
                beforeEach(function(){
                    e.data.textureData.needInitedTextureIndexArr = [1, 2];
                });

                it("create webgl texture", function () {
                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(gl.createTexture.callCount).toEqual(2);
                });
            });

            describe("set TextureWorkerData's sourceMap", function () {
                var postMessage;
                var width1,height1;
                var width2,height2;

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

                it("async create sourceMap", function (done) {
                    if (bowser.firefox) {
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                    setTimeout(function () {
                        expect(TextureWorkerData.sourceMap.length).toEqual(2);

                        done();
                    }, 50);
                });
                it("create ImageData from arrayBuffer and createImageBitmap", function (done) {
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                   setTimeout(function () {
                       var sourceMap1 = TextureWorkerData.sourceMap[0];
                       expect(sourceMap1).toBeInstanceOf(ImageBitmap);
                       expect(sourceMap1.width).toEqual(width1);
                       expect(sourceMap1.height).toEqual(height1);
                       var sourceMap2 = TextureWorkerData.sourceMap[1];
                       expect(sourceMap2).toBeInstanceOf(ImageBitmap);
                       expect(sourceMap2.width).toEqual(width2);
                       expect(sourceMap2.height).toEqual(height2);
                       done();
                   }, 50);
                });
            });
        });
    });
});