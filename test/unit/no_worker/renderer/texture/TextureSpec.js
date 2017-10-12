describe("Texture", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var texture;

    var gl;
    var state;

    var DataBufferConfig = wd.DataBufferConfig;
    var TextureData = wd.TextureData;
    var ETextureWrapMode = wd.ETextureWrapMode;
    var ETextureFilterMode = wd.ETextureFilterMode;
    var ETextureFormat = wd.ETextureFormat;
    var ETextureType = wd.ETextureType;
    var ETextureTarget = wd.ETextureTarget;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        texture = textureSystemTool.create();

        basicMaterialTool.setMap(material, texture);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("create", function () {
        beforeEach(function () {
            testTool.openContractCheck();
        });

        it("should not exceed buffer count", function () {
            sandbox.stub(DataBufferConfig, "textureDataBufferCount", 1);

            textureSystemTool.create();

            expect(function () {
                textureSystemTool.create();
            }).toThrow("index should <= max count");
        });
    });

    describe("set default data", function () {
        beforeEach(function () {

        });

        // describe("getWidth", function () {
        //     beforeEach(function () {
        //     });
        //
        //     it("default value is 0", function () {
        //         expect(textureSystemTool.getWidth(texture)).toEqual(0);
        //     });
        // });
        //
        // describe("getHeight", function () {
        //     beforeEach(function () {
        //     });
        //
        //     it("default value is 0", function () {
        //         expect(textureSystemTool.getHeight(texture)).toEqual(0);
        //     });
        // });

        describe("getIsNeedUpdate", function () {
            beforeEach(function () {
            });

            it("default value is 0", function () {
                expect(textureSystemTool.getIsNeedUpdate(texture)).toEqual(0);
            });
        });
    });

    describe("getWidth", function() {
        beforeEach(function(){

        });

        describe("if set source", function(){
            var source;

            beforeEach(function(){
                source = {
                    width:100
                };

                textureSystemTool.setSource(texture, source);
            });

            it("if width is 0, return source.width", function () {
                textureSystemTool.setWidth(texture, 0);

                expect(textureSystemTool.getWidth(texture)).toEqual(source.width);
            });
            it("else, return width", function () {
                textureSystemTool.setWidth(texture, 50);

                expect(textureSystemTool.getWidth(texture)).toEqual(50);
            });
        });

        it("default value is 0", function () {
            expect(textureSystemTool.getWidth(texture)).toEqual(0);
        });
    });

    describe("getHeight", function() {
        beforeEach(function(){

        });

        describe("if set source", function(){
            var source;

            beforeEach(function(){
                source = {
                    height:100
                };

                textureSystemTool.setSource(texture, source);
            });

            it("if height is 0, return source.height", function () {
                textureSystemTool.setHeight(texture, 0);

                expect(textureSystemTool.getHeight(texture)).toEqual(source.height);
            });
            it("else, return height", function () {
                textureSystemTool.setHeight(texture, 50);

                expect(textureSystemTool.getHeight(texture)).toEqual(50);
            });
        });

        it("default value is 0", function () {
            expect(textureSystemTool.getHeight(texture)).toEqual(0);
        });
    });

    describe("update", function () {
        beforeEach(function () {
            directorTool.init(state);

            textureSystemTool.setSource(texture, {});
        });

        it("if source not exist, return", function () {
            textureSystemTool.setSource(texture, undefined);

            directorTool.loopBody(state);

            expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL, true)).not.toCalled();
        });
        // it("if repeat texture and draw part of texture by changing texcoords in glsl, warn", function () {
        //     testTool.openContractCheck(sandbox);
        //     sandbox.stub(wd.Log, "warn");
        //     texture.sourceRegion = wd.RectRegion.create(100, 0, 100, 200);
        //     texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
        //     texture.repeatRegion = wd.RectRegion.create(0, 0.5, 1, 2);
        //
        //     texture.update();
        //
        //     expect(wd.Log.warn).toCalledWith("the glsl->texCoord data may be wrong due to both repeating texture and drawing part of texture by changing texcoords in glsl");
        // });
        it("set pixelStorei", function () {
            // testTool.closeContractCheck();

            directorTool.loopBody(state);

            expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL, true)).toCalledOnce();
        });

        // it("if source's size exceed max size, then make souce to be canvas and scale the canvas", function(done){
        //     texture.source = new Image();
        //     texture.source.src = testTool.resPath + "test/res/1.jpg";
        //
        //     texture.source.width = 50;
        //     texture.source.height = 100;
        //
        //     texture.source.onload = function(){
        //         texture.update(0);
        //
        //         expect(texture.source.width).toEqual(25);
        //         expect(texture.source.height).toEqual(50);
        //
        //         done();
        //     }
        //
        // });

        describe("set texture parameters", function () {
            var textureType;

            beforeEach(function () {
                textureType = gl.TEXTURE_2D;
            });

            describe("if source is power of two", function () {
                beforeEach(function () {
                    textureSystemTool.setWidth(texture, 2);
                    textureSystemTool.setHeight(texture, 4);
                });

                it("set wrap by data", function () {
                    gl[ETextureWrapMode.CLAMP_TO_EDGE] = 0;

                    directorTool.loopBody(state);

                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_WRAP_S, 0)).toCalledOnce();
                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_WRAP_T, 0)).toCalledOnce();
                });
                it("set filter by data", function () {
                    gl[ETextureFilterMode.LINEAR] = 0;
                    gl[ETextureFilterMode.NEAREST] = 1;

                    directorTool.loopBody(state);

                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MAG_FILTER, 0)).toCalledOnce();
                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MIN_FILTER, 1)).toCalledOnce();
                });
            });

            describe("else", function () {
                beforeEach(function () {
                    textureSystemTool.setWidth(texture, 3);
                    textureSystemTool.setHeight(texture, 5);
                });

                it("set wrap to CLAMP_TO_EDGE", function () {
                    gl[ETextureWrapMode.CLAMP_TO_EDGE] = 0;

                    directorTool.loopBody(state);

                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_WRAP_S, 0)).toCalledOnce();
                    expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_WRAP_T, 0)).toCalledOnce();
                });

                describe("set filter by data and filter fallback", function () {
                    beforeEach(function () {
                        gl[ETextureFilterMode.LINEAR] = 0;
                        gl[ETextureFilterMode.NEAREST] = 1;
                    });

                    it("if filter === NEAREST or NEAREST_MIPMAP_MEAREST or NEAREST_MIPMAP_LINEAR, set NEAREST", function () {
                        //todo set filter data

                        directorTool.loopBody(state);

                        expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MAG_FILTER, 0)).toCalledOnce();
                        expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MIN_FILTER, 1)).toCalledOnce();
                    });
                    it("else, set LINEAR", function () {
                        //todo set filter data

                        directorTool.loopBody(state);

                        expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MAG_FILTER, 0)).toCalledOnce();
                        expect(gl.texParameteri.withArgs(textureType, gl.TEXTURE_MIN_FILTER, 1)).toCalledOnce();
                    });
                });
            });
        });

        describe("allocate source to texture", function () {
            beforeEach(function () {
            });

            describe("draw no mipmap twoD texture", function () {
                it("test", function () {
                    //todo set format,type

                    var source = {};

                    textureSystemTool.setSource(texture, source);

                    var glTarget = "TEXTURE_2D";
                    gl.TEXTURE_2D = glTarget;

                    var glFormat = "RGBA";
                    gl[ETextureFormat.RGBA] = glFormat;

                    var glType = "UNSIGNED_BYTE";
                    gl[ETextureType.UNSIGNED_BYTE] = glType;

                    directorTool.loopBody(state);

                    expect(gl.texImage2D.withArgs(glTarget, 0, glFormat, glFormat, glType, source)).toCalledOnce();
                });
            });
        });

        it("only update once", function () {
            directorTool.loopBody(state);
            directorTool.loopBody(state);
            directorTool.loopBody(state);

            expect(gl.pixelStorei.withArgs(gl.UNPACK_FLIP_Y_WEBGL, true)).toCalledOnce();
        });
    });

    describe("dispose texture", function () {
        beforeEach(function () {
        });

        it("dispose material shouldn't dispose its texture", function () {
            gameObjectSystemTool.disposeComponent(obj, material);

            expect(TextureData.index).toEqual(1);
        });

        describe("test remove data", function() {
            beforeEach(function(){
            });

            describe("remove by swap with last one", function() {
                var texture2;

                function judgeNotAlive(mat, methodName, expect, tool) {
                    componentTool.judgeNotAlive(mat, methodName, tool, expect);
                }

                beforeEach(function(){
                    texture2 = textureSystemTool.create();
                    basicMaterialTool.setMap(material, texture2);
                });

                describe("test remove from map", function() {
                    beforeEach(function(){
                    });

                    describe("swap with last one and remove the last one", function(){
                        it("remove from sourceMap", function () {
                            var source1 = {};
                            var source2 = {a:1};

                            textureSystemTool.setSource(texture, source1);
                            textureSystemTool.setSource(texture2, source2);

                            textureSystemTool.dispose(texture);

                            judgeNotAlive(texture, "setSource", expect, textureSystemTool);
                            expect(textureSystemTool.getSource(texture2)).toEqual(source2);
                            expect(TextureData.sourceMap.length).toEqual(1);
                        });
                    });
                });

                describe("test remove from textureMap", function() {
                    beforeEach(function(){

                    });

                    it("mark texture removed", function () {
                        textureSystemTool.dispose(texture);

                        componentTool.judgeIsComponentIndexNotRemoved(texture, expect);
                    });
                    it("swap with last one and remove the last one", function () {
                        textureSystemTool.dispose(texture);

                        expect(TextureData.textureMap[0]).toEqual(texture2);
                        expect(TextureData.textureMap.length).toEqual(1);
                    });
                });

                describe("test remove from type array", function() {
                    beforeEach(function(){
                    });

                    describe("reset removed one's value", function(){
                        function judge(getMethodName, setMethodName) {
                            disposeTool.judgeSingleValue(textureSystemTool, getMethodName, setMethodName, TextureData.defaultWidth, texture, texture2, function(texture){
                                textureSystemTool.dispose(texture);
                            })
                        }

                        it("remove from widths", function () {
                            judge("getWidth", "setWidth");
                        });
                        it("remove from heights", function () {
                            judge("getHeight", "setHeight");
                        });
                        it("remove from isNeedUpdates", function () {
                            judge("getIsNeedUpdate", "setIsNeedUpdate");
                        });
                    });
                });
            });
        });

        describe("dispose gl texture object", function () {
            var texture2;
            var glTexture1;
            var glTexture2;

            beforeEach(function () {
                testTool.closeContractCheck();

                texture2 = textureSystemTool.create();
                basicMaterialTool.setMap(material, texture2);

                glTexture1 = {t:1};
                glTexture2 = {t:2};

                gl.createTexture.onCall(0).returns(glTexture1);
                gl.createTexture.onCall(1).returns(glTexture2);

                directorTool.init(state);
            });

            it("delete texture", function () {
                textureSystemTool.dispose(texture);

                expect(gl.deleteTexture).toCalledWith(glTexture1);
            });
            it("unbind all texture unit", function () {
                var glUnit0 = "TEXTURE0";
                var glUnit1 = "TEXTURE1";
                gl["TEXTURE0"] = glUnit0;
                gl["TEXTURE1"] = glUnit1;

                gpuDetectTool.setGPUDetectData("maxTextureUnit", 2)

                textureSystemTool.dispose(texture);

                expect(gl.activeTexture.withArgs(glUnit0)).toCalledBefore(gl.bindTexture.withArgs(gl.TEXTURE_2D).getCall(0));
                expect(gl.activeTexture.withArgs(glUnit1)).toCalledBefore(gl.bindTexture.withArgs(gl.TEXTURE_2D).getCall(1));

                expect(gl.bindTexture.withArgs(gl.TEXTURE_2D, null)).toCalledTwice();
            });
            it("clear all bind texture unit cache", function () {
                var glUnit0 = "TEXTURE0";
                gl["TEXTURE0"] = glUnit0;

                var callCount = gl.activeTexture.withArgs(glUnit0).callCount;

                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(callCount + 1)

                textureSystemTool.dispose(texture);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(callCount + 2)



                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(callCount + 3)
            });
            it("swap remove from glTextures", function () {
                textureSystemTool.dispose(texture);

                expect(TextureData.glTextures[0]).toEqual(glTexture2);
                expect(TextureData.glTextures.length).toEqual(1);
            });
        });
    });
});
