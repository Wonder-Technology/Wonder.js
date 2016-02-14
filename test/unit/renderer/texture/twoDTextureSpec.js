describe("twoD texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var director = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.Texture;
        texture = new Texture();
        director = wd.Director.getInstance();
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
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function() {
        var program = null;
        var gpuDetector = null;

        function load2DTexture(onload) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/1.jpg", id: "texture"}
            ]).subscribe(null, null,
                function () {
                    var texture = wd.TextureLoader.getInstance().get("texture").toTexture();

                    texture.sourceRegion = wd.RectRegion.create(12, 25, 64, 64);
                    texture.width = 128;
                    texture.height = 128;

                    onload(texture);
                });
        }

        beforeEach(function () {
            gpuDetector = {
                maxTextureSize: 1024,
                maxTextureUnit: 16
            };
            sandbox.stub(wd.GPUDetector, "getInstance").returns(gpuDetector);
        });
        afterEach(function () {
        });
        afterAll(function () {
            //put release cache to the last, so it can use the res cache during testing
            wd.LoaderManager.getInstance().dispose();
        });

        describe("sourceRegion", function () {
            var canvas, ctx;

            beforeEach(function () {
                ctx = {
                    drawImage: sandbox.stub()
                };
                canvas = {
                    getContext: sandbox.stub().returns(ctx)
                };
                sandbox.stub(wd.BasicTextureUtils, "drawPartOfTextureByCanvas").returns(canvas);

                program = {
                    sendUniformData: sandbox.stub()
                };
            });

            it("default sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL.", function (done) {
                load2DTexture(function (texture) {
                    /*!
                     in this case, it can't repeat correctly! (because the texture is the whole texture, not the part)

                     texture.repeatRegion = wd.RectRegion.create(0, 0, 2, 2);
                     texture.wrapS = wd.ETextureWrapMode.REPEAT;
                     texture.wrapT = wd.ETextureWrapMode.REPEAT;
                     */

                    texture.update(0);

                    expect(gl.texImage2D).toCalledWith(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, texture.source);

                    texture.sendData(program, 0);

                    expect(testTool.getValues(program.sendUniformData.secondCall.args[2])).toEqual(testTool.getValues(wd.RectRegion.create(0.09375, 0.3046875, 0.5, 0.5)));

                    done();
                });
            });
            it("test sourceRegionMethod is DRAW_IN_CANVAS.", function (done) {
                load2DTexture(function (texture) {
                    texture.sourceRegionMethod = wd.ETextureSourceRegionMethod.DRAW_IN_CANVAS;
                    /*!
                     when sourceRegionMethod is DRAW_IN_CANVAS, the texture will be part of the whole, so it can repeat correctly!
                     */
                    texture.repeatRegion = wd.RectRegion.create(0, 0, 2, 2);
                    texture.wrapS = wd.ETextureWrapMode.REPEAT;
                    texture.wrapT = wd.ETextureWrapMode.REPEAT;

                    texture.update(0);

                    expect(gl.texImage2D).toCalledWith(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, canvas);
                    expect(gl.texParameteri.firstCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wd.ETextureWrapMode.REPEAT);
                    expect(gl.texParameteri.secondCall).toCalledWith(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wd.ETextureWrapMode.REPEAT);

                    texture.sendData(program, 0);

                    expect(testTool.getValues(program.sendUniformData.secondCall.args[2])).toEqual(testTool.getValues(wd.RectRegion.create(0, 0, 1, 1)));
                    expect(testTool.getValues(program.sendUniformData.thirdCall.args[2])).toEqual(testTool.getValues(wd.RectRegion.create(0, 0, 2, 2)));

                    done();
                });
            });
        });

        describe("mipmap", function () {
            function buildMipmap() {
                return {};
            }

            it("can auto generate mipmap default", function(done){
                load2DTexture(function(texture){
                    expect(texture.generateMipmaps).toBeTruthy();

                    done();
                });
            });
            it("if source isn't power of two or is manual set mipmap, don't generate mipmap", function (done) {
                load2DTexture(function (texture) {
                    texture.generateMipmaps = true;
                    texture.width = 100;
                    texture.height = 50;

                    texture.update(0);

                    expect(gl.generateMipmap).not.toCalled();

                    texture.generateMipmaps = true;
                    texture.width = 128;
                    texture.height = 128;
                    var mipmap1 = buildMipmap();
                    var mipmap2 = buildMipmap();
                    texture.mipmaps.addChild(mipmap1);
                    texture.mipmaps.addChild(mipmap2);

                    texture.update(0);

                    expect(gl.generateMipmap).not.toCalled();

                    done();
                });
            });
            it("test manual set mipmap", function (done) {
                load2DTexture(function (texture) {
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
    });
});

