describe("cubemap texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var director = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.CubemapTexture;
        texture = new Texture();
        director = dy.Director.getInstance();
        gl = {
            TEXTURE_CUBE_MAP_POSITIVE_X:0,
            TEXTURE_CUBE_MAP_NEGATIVE_X:1,
            TEXTURE_CUBE_MAP_POSITIVE_Y:2,
            TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
            TEXTURE_CUBE_MAP_POSITIVE_Z:4,
            TEXTURE_CUBE_MAP_NEGATIVE_Z:5,

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
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("initWhenCreate", function(){
        beforeEach(function(){
            testTool.openContractCheck(sandbox);
        });

        it("if assets' length isn't 6, error", function(){
            var asset = dy.CompressedTextureAsset.create();

            expect(function(){
                dy.CubemapTexture.create([
                    {asset:asset}
                ]);
            }).toThrow();
            expect(function(){
                dy.CubemapTexture.create([
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset}
                ]);
            }).not.toThrow();
        });
        it("if not all common assets or all compressed assets, error", function(){
            var compressedAsset = dy.CompressedTextureAsset.create();
            var commonAsset = dy.ImageTextureAsset.create({});

            expect(function(){
                dy.CubemapTexture.create([
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:compressedAsset}
                ]);
            }).toThrow();
        });
        it("if not all faces' txture size are equal, error", function(){
            var commonAsset = dy.ImageTextureAsset.create({
                width:200,
                height:200
            });

            expect(function(){
                dy.CubemapTexture.create([
                    {asset:commonAsset},
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    },
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:commonAsset},
                    {asset:commonAsset}
                ]);
            }).toThrow();
            expect(function(){
                dy.CubemapTexture.create([
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    },
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    },
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    },
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 256, 512)
                    },
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    },
                    {
                        asset:commonAsset,
                        sourceRegion:dy.RectRegion.create(0, 0, 512, 512)
                    }
                ]);
            }).toThrow();
        });
        it("add cube face textures", function(){
            var commonAsset = dy.ImageTextureAsset.create({
                width:200,
                height:200
            });
            var region = dy.RectRegion.create(0, 0, 200, 200);
            var type = dy.TextureType.UNSIGNED_SHORT_4_4_4_4;

            var texture = dy.CubemapTexture.create([
                {asset:commonAsset},
                {
                    asset:commonAsset,
                    sourceRegion:region,
                    type: type
                },
                {asset:commonAsset},
                {asset:commonAsset},
                {asset:commonAsset},
                {asset:commonAsset}
            ]);

            expect(texture.textures.getCount()).toEqual(6);
            expect(texture.textures.getChild(1)).toBeInstanceOf(dy.CubemapFaceTwoDTexture);
            expect(texture.textures.getChild(1).sourceRegion).toEqual(region);
            expect(texture.textures.getChild(1).type).toEqual(type);
        });
        it("set ICubemapTextureAsset's attri by the first cube face texture", function(){
            var commonAsset = dy.ImageTextureAsset.create({
                width:200,
                height:200
            });
            var commonAsset2 = dy.ImageTextureAsset.create({
                width: 200,
                height:200
            });

                var texture = dy.CubemapTexture.create([
                    {asset:commonAsset},
                    {asset:commonAsset2},
                    {asset:commonAsset2},
                    {asset:commonAsset2},
                    {asset:commonAsset2},
                    {asset:commonAsset2}
                ]);

            expect(texture.width).toEqual(200);
            expect(texture.height).toEqual(200);
            expect(texture.generateMipmaps).toBeTruthy();
            expect(texture.minFilter).toEqual(commonAsset.minFilter);
            expect(texture.magFilter).toEqual(commonAsset.magFilter);
            expect(texture.wrapS).toEqual(commonAsset.wrapS);
            expect(texture.wrapT).toEqual(commonAsset.wrapT);
            expect(texture.anisotropy).toEqual(commonAsset.anisotropy);
            expect(texture.premultiplyAlpha).toEqual(commonAsset.premultiplyAlpha);
            expect(texture.unpackAlignment).toEqual(commonAsset.unpackAlignment);
            expect(texture.needUpdate).toEqual(commonAsset.needUpdate);
        });

        describe("if is all compressed cube face textures", function(){
            it("generateMipmaps is false", function(){
                var asset = dy.CompressedTextureAsset.create();
                asset.minFilter = dy.TextureFilterMode.LINEAR_MIPMAP_LINEAR;

                var texture = dy.CubemapTexture.create([
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset}
                ]);

                expect(texture.generateMipmaps).toBeFalsy();
                expect(texture.minFilter).toEqual(dy.TextureFilterMode.LINEAR_MIPMAP_LINEAR);
            });
            it("if there is one no mipmap asset at least, minFilter will convert to be non-mipmap filter", function(){
                var asset = dy.CompressedTextureAsset.create();
                asset.minFilter = dy.TextureFilterMode.LINEAR_MIPMAP_LINEAR;
                var asset2 = dy.CompressedTextureAsset.create();
                asset2.minFilter = dy.TextureFilterMode.LINEAR;

                var texture = dy.CubemapTexture.create([
                    {asset:asset},
                    {asset:asset},
                    {asset:asset2},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset}
                ]);

                expect(texture.generateMipmaps).toBeFalsy();
                expect(texture.minFilter).toEqual(dy.TextureFilterMode.LINEAR);
            });
        });
        it("else, generateMipmaps is true", function(){
            var asset = dy.ImageTextureAsset.create({});

            var texture = dy.CubemapTexture.create([
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset}
            ]);

            expect(texture.generateMipmaps).toBeTruthy();
        });
        it("set flipY false", function(){
            var asset = dy.ImageTextureAsset.create({});

            var texture = dy.CubemapTexture.create([
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset},
                {asset:asset}
            ]);

            expect(texture.flipY).toBeFalsy();
        });
    });

    describe("integration test", function(){
        var program = null;
        var canvas,ctx;


        function load2DTexture(onload, onSetAsset, onCreateTexture){
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/1.jpg", id:"texture"}
            ]).subscribe(null, null,
                function(){
                    var asset = dy.LoaderManager.getInstance().get("texture");

                    asset.width = 128;
                    asset.height = 128;

                    onSetAsset && onSetAsset(asset);


                    var texture = null;

                    if(onCreateTexture){
                        texture = onCreateTexture(asset);
                    }
                    else{
                        texture = dy.CubemapTexture.create([
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset}
                        ]);
                    }

                    onload(texture);
                });
        }
        function loadCompressedTexture(onload, onSetAsset, onCreateTexture){
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/disturb_dxt1_mip.dds", id:"compressedTexture"}
            ]).subscribe(null, null,
                function(){
                    var asset = dy.LoaderManager.getInstance().get("compressedTexture");
                    asset.width = 128;
                    asset.height = 128;

                    onSetAsset && onSetAsset(asset);

                    if(onCreateTexture){
                        texture = onCreateTexture(asset);
                    }
                    else{
                        texture = dy.CubemapTexture.create([
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset},
                            {asset:asset}
                        ]);
                    }

                    onload(texture);
                });
        }
        function getCubemapFaceTexture(texture, index){
            return texture.textures.getChild(index);
        }

        beforeEach(function(){
            sandbox.stub(dy.GPUDetector.getInstance(), "extensionCompressedTextureS3TC", {
                COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
            });
            sandbox.stub(dy.GPUDetector.getInstance(), "maxCubemapTextureSize", 1024);

            sandbox.stub(dy.GPUDetector.getInstance(), "maxTextureUnit", 16);

            ctx = {
                drawImage:sandbox.stub()
            };
            canvas = {
                getContext: sandbox.stub().returns(ctx)
            };
        });
        afterEach(function(){
        });
        afterAll(function(){
            //put release cache to the last, so it can use the res cache during testing
            dy.LoaderManager.getInstance().dispose();
        });

        describe("sendData", function() {
            beforeEach(function () {
                program = {
                    sendUniformData: sandbox.stub()
                };
            });

            it("send cube texture unit index", function () {
                texture.sendData(program, 100, 1);

                expect(program.sendUniformData.firstCall).toCalledWith(100, dy.VariableType.SAMPLER_CUBE, 1);
            });
            it("send u_repeatRegion", function(){
                texture.repeatRegion = dy.RectRegion.create(0, 1, 2, 3);

                texture.sendData(program, 100, 1);

                expect(program.sendUniformData).toCalledWith("u_repeatRegion", dy.VariableType.FLOAT_4, texture.repeatRegion);
            });
        });

        describe("sourceRegion", function(){
            beforeEach(function(){
                //texture.width = 100;
                //texture.height = 100;

                program = {
                    sendUniformData:sandbox.stub()
                };
            });

                it("cube compressed texture not support sourceRegion", function(done){
                    sandbox.stub(dy.BasicTextureUtils, "drawPartOfTextureByCanvas").returns(canvas);

                    loadCompressedTexture(function(texture){
                        //texture.sourceRegion = dy.RectRegion.create(0, 0, 128, 128);
                        //texture.sourceRegionMethod = dy.TextureSourceRegionMethod.DRAW_IN_CANVAS;

                        texture.update(0);

                        texture.sendData(program, 0);

                        expect(dy.BasicTextureUtils.drawPartOfTextureByCanvas).not.toCalled();
                        expect(program.sendUniformData).toCalledTwice();

                        done();
                    }, function(asset){
                    }, function(asset){
                        return dy.CubemapTexture.create([
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            },
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            },
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            },
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            },
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            },
                            {
                                asset:asset,
                                sourceRegion: dy.RectRegion.create(0, 0, 64, 64)
                            }
                        ]);
                    });
                });
                it("cube twoD texture only and default support DRAW_IN_CANVAS", function(done){
                    sandbox.stub(dy.BasicTextureUtils, "drawPartOfTextureByCanvas").returns(canvas);

                    load2DTexture(function(texture){
                        /*!
                         when sourceRegionMethod is DRAW_IN_CANVAS, the texture will be part of the whole, so it can repeat correctly!
                         */
                        texture.repeatRegion = dy.RectRegion.create(0, 0, 2, 2);
                        texture.wrapS = dy.TextureWrapMode.REPEAT;
                        texture.wrapT = dy.TextureWrapMode.REPEAT;

                        texture.update(0);

                        expect(gl.texImage2D.callCount).toEqual(6);
                        expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canvas);
                        expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canvas);
                        expect(gl.texParameteri.firstCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, dy.TextureWrapMode.REPEAT);
                        expect(gl.texParameteri.secondCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, dy.TextureWrapMode.REPEAT);

                        texture.sendData(program, 0);

                        expect(testTool.getValues(program.sendUniformData.secondCall.args[2])).toEqual(testTool.getValues(dy.RectRegion.create(0, 0, 2, 2)));

                        done();
                    }, function(asset){
                        asset.sourceRegion = dy.RectRegion.create(0, 0, 128, 128);
                    });
                });
        });

        describe("mipmap", function(){
            function buildMipmap(){
                return {
                    width:128,
                    height:56,
                    data: []
                };
            }

            describe("compressed texture", function(){
                it("can't auto generate mipmap", function(done){
                    loadCompressedTexture(function(texture){
                        texture.update(0);

                        expect(gl.generateMipmap).not.toCalled();

                        done();
                    });
                });
                it("if format is RGBA, use texImage2D", function(done){
                    var mipmap1 = buildMipmap();
                    var mipmap2 = buildMipmap();

                    loadCompressedTexture(function(texture){
                        texture.update(0);

                        expect(gl.texImage2D.callCount).toEqual(2 * 6);
                        expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, mipmap1.width, mipmap1.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap1.data);
                        expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 1, gl.RGBA, mipmap2.width, mipmap2.height, 0,  gl.RGBA, gl.UNSIGNED_BYTE, mipmap2.data);

                        done();
                    }, function(asset){
                        asset.format = dy.TextureFormat.RGBA;
                        asset.mipmaps.removeAllChildren();

                        asset.mipmaps.addChild(mipmap1);
                        asset.mipmaps.addChild(mipmap2);
                    });
                });
                it("else, use compressedTexImage2D", function(done){
                    var mipmap1 = buildMipmap();
                    var mipmap2 = buildMipmap();
                    var format = dy.GPUDetector.getInstance().extensionCompressedTextureS3TC.
                        COMPRESSED_RGB_S3TC_DXT1_EXT;

                    loadCompressedTexture(function(texture){
                        texture.update(0);

                        expect(gl.compressedTexImage2D.callCount).toEqual(2 * 6);
                        expect(gl.compressedTexImage2D.firstCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, format, mipmap1.width, mipmap1.height, 0, mipmap1.data);
                        expect(gl.compressedTexImage2D.secondCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 1, format, mipmap2.width, mipmap2.height, 0, mipmap2.data);

                        done();
                    }, function(asset){
                        asset.format = format;
                        asset.mipmaps.removeAllChildren();

                        asset.mipmaps.addChild(mipmap1);
                        asset.mipmaps.addChild(mipmap2);
                    });
                });
            });

            it("twoD texture not support mipmap", function(done){
                var mipmap1 = buildMipmap();
                var mipmap2 = buildMipmap();

                load2DTexture(function(texture){
                    texture.update(0);

                    expect(gl.texImage2D.callCount).toEqual(6);
                    expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, getCubemapFaceTexture(texture, 0).source);
                    expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, getCubemapFaceTexture(texture, 1).source);

                    done();
                }, function(asset){
                    asset.mipmaps = dyCb.Collection.create([mipmap1, mipmap2]);
                });
            });
        });

        describe("clampToMaxSize", function(){
            it("if cube face texture's size exceed max size, then make it to be canvas and scale the canvas", function(done){
                sandbox.stub(dy.GPUDetector.getInstance(), "maxCubemapTextureSize", 50);

                load2DTexture(function(texture){
                    texture.update(0);

                    texture.textures.forEach(function(face){
                        expect(face.source.width).toEqual(25);
                        expect(face.source.height).toEqual(50);
                    });

                    done();
                }, function(asset){
                    asset.source.width = 50;
                    asset.source.height = 100;
                });
            });
            it("if cube face texture's size exceed max size and the cube face texture is compressed texture, then just warn and not clamp to max size", function(done){
                sandbox.stub(dy.GPUDetector.getInstance(), "maxCubemapTextureSize", 50);
                sandbox.spy(dy.Log, "warn");

                loadCompressedTexture(function(texture){
                    texture.update(0);

                    expect(dy.Log.warn.callCount).toEqual(6);

                    texture.textures.forEach(function(face){
                        expect(face.width).toEqual(128);
                        expect(face.height).toEqual(128);
                    });

                    done();
                }, function(asset){
                });
            });
        });

        it("if sourceRegion's width/height is not be power of two, then it shouldn't generateMipmap", function(done){
            sandbox.stub(dy.GPUDetector.getInstance(), "maxCubemapTextureSize", 1024);

            load2DTexture(function(texture){
                texture.update(0);

                expect(gl.texParameteri.withArgs(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[dy.TextureFilterMode.LINEAR])).toCalledOnce()
                expect(gl.generateMipmap).not.toCalled();

                done();
            }, null, function(asset){
                return dy.CubemapTexture.create([
                    {
                        asset:asset,
                        sourceRegion: dy.RectRegion.create(0, 0, 100, 256)
                    },
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset},
                    {asset:asset}
                ]);
            });
        });
    });
});

