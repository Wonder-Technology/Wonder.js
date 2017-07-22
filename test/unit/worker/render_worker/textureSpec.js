describe("texture", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var ERenderWorkerState = wd.ERenderWorkerState;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

    var TextureWorkerData = wdrd.TextureWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("send texture data to render worker", function () {
        var texture1, texture2, texture3;

        beforeEach(function () {
            texture1 = textureTool.create();
            texture2 = textureTool.create();
            texture3 = textureTool.create();
        });

        it("send source's src and index to render worker", function () {
            var source1 = {
                src:"a.jpg"
            }
            var source2 = {
                src:"b.jpg"
            }

            textureTool.setSource(texture2, source1);
            textureTool.setSource(texture3, source2);



            sceneTool.prepareGameObjectAndAddToScene();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();


            // workerTool.runRender(1);


            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                textureData: {
                    mapManagerBuffer: sinon.match.any,
                    textureBuffer: sinon.match.any,
                    index: sinon.match.any,
                    uniformSamplerNameMap: sinon.match.any,
                    imageSrcIndexArr:[
                        {
                            src:source1.src,
                            index:1
                        },
                        {
                            src:source2.src,
                            index:2
                        },
                    ]
                }
            });
        });
        it("send texture count to render worker", function () {
            sceneTool.prepareGameObjectAndAddToScene();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                textureData: {
                    mapManagerBuffer: sinon.match.any,
                    textureBuffer: sinon.match.any,
                    index: 3,
                    uniformSamplerNameMap: sinon.match.any,
                    imageSrcIndexArr:sinon.match.any
                }
            });
        });
        it("send uniformSamplerNameMap to render worker", function () {
            var data = sceneTool.prepareGameObjectAndAddToScene();
            var mat = data.material;

            basicMaterialTool.addMap(mat, texture2);
            basicMaterialTool.addMap(mat, texture3);

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage.withArgs({
                operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                textureData: sinon.match.any
            }).args[0][0].textureData.uniformSamplerNameMap).toEqual(
                [
                    undefined,
                    "u_sampler2D0",
                    "u_sampler2D1"
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
                            imageSrcIndexArr: [],
                            uniformSamplerNameMap: [
                                undefined,
                                "u_sampler2D0",
                                "u_sampler2D1"
                            ]
                        }
                    }
                }
            });

            it("save texture count", function () {
                testRenderWorkerTool.closeContractCheck();

                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.index).toEqual(3);
            });
            it("save uniformSamplerNameMap", function () {
                testRenderWorkerTool.closeContractCheck();

                workerTool.execRenderWorkerMessageHandler(e);

                expect(TextureWorkerData.uniformSamplerNameMap).toEqual([
                    undefined,
                    "u_sampler2D0",
                    "u_sampler2D1"
                ]);
            });

            describe("create webgl texture", function () {
                it("test create", function () {
                    testRenderWorkerTool.closeContractCheck();

                    workerTool.execRenderWorkerMessageHandler(e);

                    expect(gl.createTexture.callCount).toEqual(3);
                });
            });

            describe("set TextureWorkerData's sourceMap", function () {
                var postMessage;

                function judgeWaitForInitComplete(done, judgeFunc, expect){
                    renderWorkerTool.judgeWaitForInitComplete(done, postMessage, judgeFunc, expect);
                }

                beforeEach(function(){
                    e.data.textureData.imageSrcIndexArr = [
                        {
                            src:resUtls.getRes("1.jpg"), index: 1
                        },
                        {
                            src:resUtls.getRes("2.png"), index: 2
                        },
                        {
                            src:resUtls.getRes("2.png"), index: 3
                        }
                    ]

                    postMessage = workerTool.getWorkerPostMessage();
                })

                it("fetch src and createImageBitmap", function (done) {
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                    judgeWaitForInitComplete(done, function(expect){
                        expect(TextureWorkerData.sourceMap.length).toEqual(3);
                        expect(TextureWorkerData.sourceMap[0]).toBeInstanceOf(ImageBitmap);
                        expect(TextureWorkerData.sourceMap[1]).toBeInstanceOf(ImageBitmap);
                        expect(TextureWorkerData.sourceMap[2]).toBeInstanceOf(ImageBitmap);
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
            // var e;

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
