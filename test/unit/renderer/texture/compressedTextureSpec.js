describe("compressed texture", function() {
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

    describe("integration test", function(){
        var program = null;
        var gpuDetector = null;

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

        beforeEach(function(){
            gpuDetector = {
                maxTextureSize: 1000,
                maxTextureUnit:16
            };
            gpuDetector.extensionCompressedTextureS3TC = {
                COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
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
    });
});

