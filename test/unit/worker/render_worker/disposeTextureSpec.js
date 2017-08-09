describe("dispose texture", function () {
    var sandbox = null;
    // var state;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var ERenderWorkerState = wd.ERenderWorkerState;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

    var TextureWorkerData = wdrd.TextureWorkerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);

        // state = stateTool.createAndSetFakeGLState(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("dispose texture", function() {
        var texture1, texture2, texture3;

        beforeEach(function(){
            texture1 = textureTool.create();
            texture2 = textureTool.create();
            texture3 = textureTool.create();
        });

        it("send disposed texture data array to render worker", function () {
            sceneTool.prepareGameObjectAndAddToScene();

            directorTool.init(sandbox);
            sendDrawRendercommandBufferTool.markInitComplete();


            textureTool.dispose(texture1);
            textureTool.dispose(texture3);



            workerTool.runRender(1);

            worker = workerTool.getRenderWorker();

            expect(worker.postMessage).toCalledWith({
                operateType: EWorkerOperateType.DRAW,
                renderCommandBufferData:sinon.match.any,
                materialData:sinon.match.any,
                geometryData:sinon.match.any,
                lightData:sinon.match.any,
                disposeData: {
                    geometryDisposeData:null,
                    textureDisposeData:{
                        disposedTextureDataMap: [
                            {
                                sourceIndex: 0,
                                lastComponentIndex: 2
                            },
                            {
                                sourceIndex: 0,
                                lastComponentIndex: 1
                            }
                        ]
                    }
                }
            })
        });

        describe("test in render worker", function() {
            var gl;
            var e;

            var postMessage;

            function judgeWaitForInitComplete(done, judgeFunc, expect){
                renderWorkerTool.judgeWaitForInitComplete(done, postMessage, judgeFunc, expect);
            }

            function buildDrawData() {
                return {
                    data:{
                        operateType: EWorkerOperateType.DRAW,
                            renderCommandBufferData:null,
                            materialData:null,
                            geometryData:null,
                            lightData:null,
                            disposeData: {
                                geometryDisposeData: null,
                                textureDisposeData:{
                                    disposedTextureDataMap: [
                                        {
                                            sourceIndex: 0,
                                            lastComponentIndex: 2
                                        },
                                        {
                                            sourceIndex: 0,
                                            lastComponentIndex: 1
                                        }
                                    ]
                                }
                            }
                    }
                }
            }

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
                            imageSrcIndexArr: [
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
                        }
                    }
                }


                postMessage = workerTool.getWorkerPostMessage();

            });

            describe("dispose gl texture", function(){
                var glTexture1;
                var glTexture2;
                var glTexture3;

                beforeEach(function(){
                });

                it("delete texture", function (done) {
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);


                    judgeWaitForInitComplete(done, function(expect){
                        glTexture1 = TextureWorkerData.glTextures[0];
                        glTexture2 = TextureWorkerData.glTextures[1];
                        glTexture3 = TextureWorkerData.glTextures[2];

                        e = buildDrawData();


                        workerTool.execRenderWorkerMessageHandler(e);

                        expect(gl.deleteTexture.callCount).toEqual(2);
                        expect(gl.deleteTexture.getCall(0)).toCalledWith(glTexture1);
                        expect(gl.deleteTexture.getCall(1)).toCalledWith(glTexture3);
                    }, expect)
                });
                it("unbind all texture unit", function () {
                //     //already test in no worker
                });
                it("clear all bind texture unit cache", function () {
                    //already test in no worker
                });
                it("swap remove from glTextures", function (done) {
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                    judgeWaitForInitComplete(done, function(expect){
                        glTexture1 = TextureWorkerData.glTextures[0];
                        glTexture2 = TextureWorkerData.glTextures[1];
                        glTexture3 = TextureWorkerData.glTextures[2];

                        e = buildDrawData();


                        workerTool.execRenderWorkerMessageHandler(e);

                        expect(TextureWorkerData.glTextures[0]).toEqual(glTexture2);
                        expect(TextureWorkerData.glTextures.length).toEqual(1);
                    }, expect)
                });
            });

            describe("dispose source map", function(){
                beforeEach(function(){

                });

                it("swap remove from sourceMap", function(done){
                    if(bowser.firefox){
                        done();
                        return;
                    }

                    workerTool.execRenderWorkerMessageHandler(e);

                    judgeWaitForInitComplete(done, function(expect){
                        var source2 = TextureWorkerData.sourceMap[1];

                        e = buildDrawData();

                        workerTool.execRenderWorkerMessageHandler(e);

                        expect(TextureWorkerData.sourceMap[0]).toEqual(source2);
                        expect(TextureWorkerData.sourceMap.length).toEqual(1);
                    }, expect)
                });
            });
        });
    });
});
