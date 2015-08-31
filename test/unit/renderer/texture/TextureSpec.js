describe("Texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var director = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.Texture;
        texture = new Texture();
        director = dy.Director.getInstance();
        gl = {
            TEXTURE_2D: "TEXTURE_2D",
            TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
            TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
            TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
            TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",
            RGB: "RGB",
            RGBA: "RGBA",
            UNSIGNED_BYTE: "UNSIGNED_BYTE",

            TEXTURE0: "TEXTURE0",
            TEXTURE1: "TEXTURE1",

            REPEAT: "REPEAT",
            MIRRORED_REPEAT: "MIRRORED_REPEAT",
            CLAMP_TO_EDGE: "CLAMP_TO_EDGE",

            NEAREST:"NEAREST",
            NEAREST_MIPMAP_MEAREST:"NEAREST_MIPMAP_MEAREST",
            NEAREST_MIPMAP_LINEAR:"NEAREST_MIPMAP_LINEAR",
            LINEAR:"LINEAR",
            LINEAR_MIPMAP_NEAREST:"LINEAR_MIPMAP_NEAREST",
            LINEAR_MIPMAP_LINEAR:"LINEAR_MIPMAP_LINEAR",

            bindTexture:sandbox.stub(),
            activeTexture:sandbox.stub(),
            texImage2D: sandbox.stub(),
            compressedTexImage2D: sandbox.stub(),
            pixelStorei:sandbox.stub(),
            texParameteri:sandbox.stub(),
            texParameterf:sandbox.stub(),
            generateMipmap:sandbox.stub()

        };
        testTool.extend(gl, testTool.buildFakeGl(sandbox));
        sandbox.stub(director, "gl", gl);
    });
    afterEach(function () {
        dy.Director._instance = null;
        sandbox.restore();
    });

    describe("sendData", function(){
        describe("if sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL", function(){
            var program = null;

            beforeEach(function(){
                texture.width = 100;
                texture.height = 100;

                program = {
                    setUniformData:sandbox.stub()
                };
                sandbox.stub(director.stage, "program", program);
            });

            it("if sourceRegion is based on canvas coordinate system, convert it to webgl coordinate stystem", function(){
                texture.sourceRegionMapping = dy.TextureSourceRegionMapping.CANVAS;
                texture.sourceRegion = dy.RectRegion.create(10, 20, 50, 40);

                texture.sendData(0);

                expect(testTool.getValues(program.setUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.4, 0.5, 0.4 )));
            });
            it("else, directly set it", function(){
                texture.sourceRegionMapping = dy.TextureSourceRegionMapping.UV;
                texture.sourceRegion = dy.RectRegion.create(0.1, 0.1, 0.5, 0.6);

                texture.sendData(0);

                expect(testTool.getValues(texture.sourceRegion)).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.1, 0.5, 0.6)));

            });
        });
    });

    describe("update", function(){
        beforeEach(function(){
            sandbox.stub(texture, "bindToUnit");
            sandbox.stub(texture, "allocateSourceToTexture");
            sandbox.stub(dy.GPUDetector, "getInstance").returns({
                maxTextureSize: 50
            });
        });

        it("bind texture unit and active it", function(){
            texture.update(0);

            expect(texture.bindToUnit).toCalledWith(0);
        });
        it("if source's size exceed max size, then make souce to be canvas and scale the canvas", function(){
            texture.source = new Image();
            texture.source.width = 50;
            texture.source.height = 100;

            texture.update(0);

            expect(texture.source.width).toEqual(25);
            expect(texture.source.height).toEqual(50);
        });
        //todo complete the test
    });

    describe("integration test", function(){
        var program = null;
        var gpuDetector = null;

        function load2DTexture(onload){
                                dy.LoaderManager.getInstance().load([
                        {url: testTool.resPath  + "test/res/1.jpg", id:"texture"}
                    ]).subscribe(null, null,
                        function(){
                            var texture = dy.TextureLoader.getInstance().get("texture").copy();

                            texture.sourceRegion = dy.RectRegion.create(12.8, 25.6, 12.8, 25.6);
                            texture.width = 128;
                            texture.height = 128;

                            onload(texture);
                        });
        }
        function loadCompressedTexture(onload){
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/disturb_dxt1_mip.dds", id:"compressedTexture"}
            ]).subscribe(null, null,
                function(){
                    var texture = dy.TextureLoader.getInstance().get("compressedTexture").copy();

                    texture.sourceRegion = dy.RectRegion.create(12.8, 25.6, 12.8, 25.6);
                    texture.width = 128;
                    texture.height = 128;

                    onload(texture);
                });
        }
        function loadMultiTexture(onload){
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/1.jpg", id:"texture"},
                {url: testTool.resPath  + "test/res/disturb_dxt1_mip.dds", id:"compressedTexture"}
            ]).subscribe(null, null,
                function(){
                    var texture1 = dy.TextureLoader.getInstance().get("texture").copy(),
                        texture2 = dy.TextureLoader.getInstance().get("compressedTexture").copy();

                    texture1.sourceRegion = dy.RectRegion.create(12.8, 25.6, 12.8, 25.6);
                    texture1.width = 128;
                    texture1.height = 128;

                    texture2.sourceRegion = dy.RectRegion.create(12.8, 25.6, 12.8, 25.6);
                    texture2.width = 128;
                    texture2.height = 128;

                    onload(texture1, texture2);
                });
        }

        beforeEach(function(){
            gpuDetector = {
                maxTextureSize: 1000,
                maxTextureUnit:16
            };
            sandbox.stub(dy.GPUDetector, "getInstance").returns(gpuDetector);
        });
        afterEach(function(){
        });
        afterAll(function(){
            //put release cache to the last, so it can use the res cache during testing
            dy.LoaderManager.getInstance().dispose();
        });

        describe("sourceRegion", function(){
            var canvas,ctx;

            beforeEach(function(){
                ctx = {
                    drawImage:sandbox.stub()
                };
                canvas = {
                    getContext: sandbox.stub().returns(ctx)
                };
                sandbox.stub(document, "createElement").returns(canvas);
                texture.width = 100;
                texture.height = 100;

                program = {
                    setUniformData:sandbox.stub()
                };
                sandbox.stub(director.stage, "program", program);
            });

            describe("2d texture", function(){
                it("default sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL.", function(done){
                    load2DTexture(function(texture){
                        /*!
                         in this case, it can't repeat correctly! (because the texture is the whole texture, not the part)

                         texture.repeatRegion = dy.RectRegion.create(0, 0, 2, 2);
                         texture.wrapS = dy.TextureWrapMode.REPEAT;
                         texture.wrapT = dy.TextureWrapMode.REPEAT;
                         */

                        texture.update(0);

                        expect(gl.texImage2D).toCalledWith(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source);

                        texture.sendData(0);

                        expect(testTool.getValues(program.setUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.6, 0.1, 0.2)));

                        done();
                    });
                });
                it("test sourceRegionMethod is DRAW_IN_CANVAS.", function(done){
                    load2DTexture(function(texture){
                        texture.sourceRegionMethod = dy.TextureSourceRegionMethod.DRAW_IN_CANVAS;
                        /*!
                         when sourceRegionMethod is DRAW_IN_CANVAS, the texture will be part of the whole, so it can repeat correctly!
                         */
                        texture.repeatRegion = dy.RectRegion.create(0, 0, 2, 2);
                        texture.wrapS = dy.TextureWrapMode.REPEAT;
                        texture.wrapT = dy.TextureWrapMode.REPEAT;

                        texture.update(0);

                        expect(gl.texImage2D).toCalledWith(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canvas);
                        expect(gl.texParameteri.firstCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, dy.TextureWrapMode.REPEAT);
                        expect(gl.texParameteri.secondCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, dy.TextureWrapMode.REPEAT);

                        texture.sendData(0);

                        expect(testTool.getValues(program.setUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0, 0, 1, 1)));
                        expect(testTool.getValues(program.setUniformData.thirdCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0, 0, 2, 2)));

                        done();
                    });
                });
            });

            describe("compressed texture", function(){
                beforeEach(function(){
                    gpuDetector.extensionCompressedTextureS3TC = {
                        COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
                    };
                });

                it("test sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL.", function(done){
                    loadCompressedTexture(function(texture){
                        texture.format = dy.TextureFormat.RGB_S3TC_DXT1;
                        /*!
                         in this case, it can't repeat correctly! (because the texture is the whole texture, not the part)

                         texture.repeatRegion = dy.RectRegion.create(0, 0, 2, 2);
                         texture.wrapS = dy.TextureWrapMode.REPEAT;
                         texture.wrapT = dy.TextureWrapMode.REPEAT;
                         */

                        texture.update(0);

                        expect(gl.compressedTexImage2D).toCalled();

                        texture.sendData(0);

                        expect(testTool.getValues(program.setUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.6, 0.1, 0.2)));

                        done();
                    });
                });
                it("not support DRAW_IN_CANVAS.", function(done){
                    loadCompressedTexture(function(texture){
                        texture.sourceRegionMethod = dy.TextureSourceRegionMethod.DRAW_IN_CANVAS;

                        expect(function(){
                            texture.update(0);
                        }).toThrow();

                        done();
                    });
                });
            });
        });

        describe("anisotropic", function(){
            it("extension->TextureFilterAnisotropic exist, can set anisotropic which can't exceed the gpu->maxAnisotropy", function(done){
                gpuDetector.extensionTextureFilterAnisotropic = {
                    TEXTURE_MAX_ANISOTROPY_EXT: "TEXTURE_MAX_ANISOTROPY_EXT"
                };
                gpuDetector.maxAnisotropy = 16;

                load2DTexture(function(texture){
                    texture.anisotropy = 20;

                    texture.update(0);

                    expect(gl.texParameterf).toCalledWith(gl.TEXTURE_2D, gpuDetector.extensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, gpuDetector.maxAnisotropy);

                    done();
                });
            });
        });

        describe("mipmap", function(){
            describe("2d texture", function(){
                function buildMipmap(){
                    return {};
                }

                it("auto generate mipmap", function(done){
                    load2DTexture(function(texture){
                        texture.generateMipmaps = true;

                        texture.update(0);

                        expect(gl.generateMipmap).toCalledWith(gl.TEXTURE_2D);

                        done();
                    });
                });
                it("manual set mipmap", function(done){
                    load2DTexture(function(texture){
                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);

                        texture.update(0);

                        expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, mipmap1);
                        expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, mipmap2);
                        expect(texture.generateMipmaps).toBeFalsy();

                        done();
                    });
                });
            });

            describe("compressed texture", function(){
                function buildMipmap(){
                    return {
                        width:128,
                        height:56,
                        data: []
                    };
                }

                beforeEach(function(){
                    gpuDetector.extensionCompressedTextureS3TC = {
                        COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
                    };
                });

                it("can't auto generate mipmap", function(done){
                    loadCompressedTexture(function(texture){
                        texture.update(0);

                        expect(gl.generateMipmap).not.toCalled();

                        done();
                    });
                });
                it("if format is RGBA, use texImage2D", function(done){
                    loadCompressedTexture(function(texture){
                        texture.format = dy.TextureFormat.RGBA;
                        texture.mipmaps.removeAllChildren();

                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);

                        texture.update(0);

                        expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, mipmap1.width, mipmap1.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap1.data);
                        expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 1, gl.RGBA, mipmap2.width, mipmap2.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap2.data);

                        done();
                    });
                });
                it("else, use compressedTexImage2D", function(done){
                    loadCompressedTexture(function(texture){
                        texture.format = dy.TextureFormat.RGB_S3TC_DXT1;
                        texture.mipmaps.removeAllChildren();
                        var format = gpuDetector.extensionCompressedTextureS3TC.
                            COMPRESSED_RGB_S3TC_DXT1_EXT;

                        var mipmap1 = buildMipmap();
                        var mipmap2 = buildMipmap();

                        texture.mipmaps.addChild(mipmap1);
                        texture.mipmaps.addChild(mipmap2);

                        texture.update(0);

                        expect(gl.compressedTexImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, format, mipmap1.width, mipmap1.height, 0, mipmap1.data);
                        expect(gl.compressedTexImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 1, format, mipmap2.width, mipmap2.height, 0, mipmap2.data);

                        done();
                    });
                });
            });
        });

        describe("multi texture", function(){
            var glTexture = null;

            beforeEach(function(){
                glTexture = {};
                gl.createTexture = sandbox.stub().returns(glTexture);
                gpuDetector.extensionCompressedTextureS3TC = {
                    COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
                };
            });

            it("one material can contain multi texture", function(done){
                loadMultiTexture(function(texture1, texture2){
                    var material = dy.Material.create();
                    material.textureManager.addChild(texture1);
                    material.textureManager.addChild(texture2);

                    material.textureManager.update();

                    expect(gl.activeTexture.firstCall).toCalledWith(gl.TEXTURE0);
                    expect(gl.activeTexture.firstCall).toCalledBefore(gl.texImage2D.firstCall);

                    expect(gl.texImage2D).toCalledBefore(gl.activeTexture.secondCall);
                    expect(gl.activeTexture.secondCall).toCalledWith(gl.TEXTURE1);
                    expect(gl.activeTexture.secondCall).toCalledBefore(gl.compressedTexImage2D.firstCall);

                    done();
                });
            });
            it("texture unit shouldn't exceed maxTextureUnit", function(done){
                gpuDetector.maxTextureUnit = 1;
                sandbox.stub(dyCb.Log, "warn");

                loadMultiTexture(function(texture1, texture2){
                    var material = dy.Material.create();
                    material.textureManager.addChild(texture1);
                    material.textureManager.addChild(texture2);

                    material.textureManager.update();

                    expect(dyCb.Log.warn).toCalledOnce();

                    done();
                });
            });
        });
    });
});
