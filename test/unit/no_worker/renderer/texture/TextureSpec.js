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

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        texture = textureTool.create();

        basicMaterialTool.addMap(material, texture);
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
            sandbox.stub(DataBufferConfig, "textureDataBufferCount", 2);

            textureTool.create();

            expect(function () {
                textureTool.create();
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
        //         expect(textureTool.getWidth(texture)).toEqual(0);
        //     });
        // });
        //
        // describe("getHeight", function () {
        //     beforeEach(function () {
        //     });
        //
        //     it("default value is 0", function () {
        //         expect(textureTool.getHeight(texture)).toEqual(0);
        //     });
        // });

        describe("getIsNeedUpdate", function () {
            beforeEach(function () {
            });

            it("default value is 0", function () {
                expect(textureTool.getIsNeedUpdate(texture)).toEqual(0);
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

                textureTool.setSource(texture, source);
            });

            it("if width is 0, return source.width", function () {
                textureTool.setWidth(texture, 0);

                expect(textureTool.getWidth(texture)).toEqual(source.width);
            });
            it("else, return width", function () {
                textureTool.setWidth(texture, 50);

                expect(textureTool.getWidth(texture)).toEqual(50);
            });
        });

        it("default value is 0", function () {
            expect(textureTool.getWidth(texture)).toEqual(0);
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

                textureTool.setSource(texture, source);
            });

            it("if height is 0, return source.height", function () {
                textureTool.setHeight(texture, 0);

                expect(textureTool.getHeight(texture)).toEqual(source.height);
            });
            it("else, return height", function () {
                textureTool.setHeight(texture, 50);

                expect(textureTool.getHeight(texture)).toEqual(50);
            });
        });

        it("default value is 0", function () {
            expect(textureTool.getHeight(texture)).toEqual(0);
        });
    });

    describe("init glTextures", function () {
        beforeEach(function () {
        });

        describe("create webgl texture", function () {
            it("if already created, not create again", function () {
                directorTool.init(state);
                directorTool.init(state);

                expect(gl.createTexture).toCalledOnce();
            });
            it("else, create", function () {
                directorTool.init(state);

                expect(gl.createTexture).toCalledOnce();
            });
        });
    });

    describe("bindToUnit", function () {
        beforeEach(function () {
            testTool.closeContractCheck();
        });

        it("if texture of the specific unit is cached, not bind and active it again", function () {
            directorTool.init(state);

            directorTool.loopBody(state);


            expect(gl.activeTexture).toCalledOnce();
            expect(gl.bindTexture).toCalledOnce();


            directorTool.loopBody(state);


            expect(gl.activeTexture).toCalledOnce();
            expect(gl.bindTexture).toCalledOnce();
        });

        describe("else", function () {
            var texture2;
            var glUnit0 = "TEXTURE0";
            var glUnit1 = "TEXTURE1";

            beforeEach(function () {
                testTool.closeContractCheck();

                texture2 = textureTool.create();
                basicMaterialTool.addMap(material, texture2);

                glUnit0 = "TEXTURE0";
                glUnit1 = "TEXTURE1";
                gl["TEXTURE0"] = glUnit0;
                gl["TEXTURE1"] = glUnit1;
            });

            it("active texture unit", function () {
                directorTool.init(state);

                directorTool.loopBody(state);


                expect(gl.activeTexture.withArgs(glUnit0)).toCalledOnce();
                expect(gl.activeTexture.withArgs(glUnit1)).toCalledOnce();

                expect(gl.activeTexture.withArgs(glUnit1)).toCalledAfter(gl.activeTexture.withArgs(glUnit0));
            });
            it("bind gl texture", function () {
                var glTarget = 0;
                gl[ETextureTarget.TEXTURE_2D] = glTarget;

                var glTextureObj1 = { obj: 1 };
                var glTextureObj2 = { obj: 2 };

                gl.createTexture.onCall(0).returns(glTextureObj1);
                gl.createTexture.onCall(1).returns(glTextureObj2);

                directorTool.init(state);

                directorTool.loopBody(state);


                expect(gl.bindTexture.withArgs(glTarget, glTextureObj1)).toCalledOnce();
                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledOnce();

                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledAfter(gl.bindTexture.withArgs(glTarget, glTextureObj1));

                expect(gl.bindTexture.withArgs(glTarget, glTextureObj1)).toCalledAfter(gl.activeTexture.withArgs(glUnit0));
                expect(gl.bindTexture.withArgs(glTarget, glTextureObj2)).toCalledAfter(gl.activeTexture.withArgs(glUnit1));
            });
        });
    });

    describe("sendData", function () {
        beforeEach(function(){
            testTool.closeContractCheck();
        });
        
        it("send unit index", function () {
            var pos1 = 0;
            var pos2 = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D0").returns(pos1);
            gl.getUniformLocation.withArgs(sinon.match.any, "u_sampler2D1").returns(pos2);


            var texture2 = textureTool.create();

            basicMaterialTool.addMap(material, texture2);


            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniform1i.getCall(0)).toCalledWith(pos1, 0);
            expect(gl.uniform1i.getCall(1)).toCalledWith(pos2, 1);
        });
    })

    describe("update", function () {
        beforeEach(function () {
            directorTool.init(state);

            textureTool.setSource(texture, {});
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
                    textureTool.setWidth(texture, 2);
                    textureTool.setHeight(texture, 4);
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
                    textureTool.setWidth(texture, 3);
                    textureTool.setHeight(texture, 5);
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

                    textureTool.setSource(texture, source);

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

        it("only update one time", function () {
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
            gameObjectTool.disposeComponent(obj, material);

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
                    texture2 = textureTool.create();
                    basicMaterialTool.addMap(material, texture2);
                });

                describe("test remove from map", function() {
                    beforeEach(function(){
                    });

                    describe("swap with last one and remove the last one", function(){
                        it("remove from sourceMap", function () {
                            var source1 = {};
                            var source2 = {a:1};

                            textureTool.setSource(texture, source1);
                            textureTool.setSource(texture2, source2);

                            textureTool.dispose(texture);

                            judgeNotAlive(texture, "setSource", expect, textureTool);
                            expect(textureTool.getSource(texture2)).toEqual(source2);
                            expect(TextureData.sourceMap.length).toEqual(1);
                        });
                    });
                });

                describe("test remove from textureMap", function() {
                    beforeEach(function(){

                    });

                    it("mark texture removed", function () {
                        textureTool.dispose(texture);

                        componentTool.judgeIsComponentIndexNotRemoved(texture, expect);
                    });
                    it("swap with last one and remove the last one", function () {
                        textureTool.dispose(texture);

                        expect(TextureData.textureMap[0]).toEqual(texture2);
                        expect(TextureData.textureMap.length).toEqual(1);
                    });
                });

                describe("test remove from type array", function() {
                    beforeEach(function(){
                    });

                    describe("reset removed one's value", function(){
                        function judge(getMethodName, setMethodName) {
                            disposeTool.judgeSingleValue(textureTool, getMethodName, setMethodName, TextureData.defaultWidth, texture, texture2, function(texture){
                                textureTool.dispose(texture);
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

                texture2 = textureTool.create();
                basicMaterialTool.addMap(material, texture2);

                glTexture1 = {t:1};
                glTexture2 = {t:2};

                gl.createTexture.onCall(0).returns(glTexture1);
                gl.createTexture.onCall(1).returns(glTexture2);

                directorTool.init(state);
            });

            it("delete texture", function () {
                textureTool.dispose(texture);

                expect(gl.deleteTexture).toCalledWith(glTexture1);
            });
            it("unbind all texture unit", function () {
                var glUnit0 = "TEXTURE0";
                var glUnit1 = "TEXTURE1";
                gl["TEXTURE0"] = glUnit0;
                gl["TEXTURE1"] = glUnit1;

                gpuDetectTool.setGPUDetectData("maxTextureUnit", 2)

                textureTool.dispose(texture);

                expect(gl.activeTexture.withArgs(glUnit0)).toCalledBefore(gl.bindTexture.withArgs(gl.TEXTURE_2D).getCall(0));
                expect(gl.activeTexture.withArgs(glUnit1)).toCalledBefore(gl.bindTexture.withArgs(gl.TEXTURE_2D).getCall(1));

                expect(gl.bindTexture.withArgs(gl.TEXTURE_2D, null)).toCalledTwice();
            });
            it("clear all bind texture unit cache", function () {
                var glUnit0 = "TEXTURE0";
                gl["TEXTURE0"] = glUnit0;

                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(1)

                textureTool.dispose(texture);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(2)



                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs(glUnit0).callCount).toEqual(3)
            });
            it("swap remove from glTextures", function () {
                textureTool.dispose(texture);

                expect(TextureData.glTextures[0]).toEqual(glTexture2);
                expect(TextureData.glTextures.length).toEqual(1);
            });
        });
    });
});
