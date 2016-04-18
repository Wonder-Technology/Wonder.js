describe("Texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;
    var mapManager = null;
    var director = null;
    var gl = null;

    function buildTexture(){
        var texture = new Texture();

        texture.allocateSourceToTexture = sandbox.stub();

        return texture;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.Texture;
        texture = buildTexture();
        mapManager = wd.MapManager.create();
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
        cloneTool.extend(gl, testTool.buildFakeGl(sandbox));
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", gl);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("sendSamplerVariable", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    describe("integration test", function(){
        var program = null;
        var gpuDetector = null;

        function load2DTexture(onload){
                                wd.LoaderManager.getInstance().load([
                        {url: testTool.resPath  + "test/res/1.jpg", id:"texture"}
                    ]).subscribe(null, null,
                        function(){
                            var texture = wd.TextureLoader.getInstance().get("texture").toTexture();

                            onload(texture);
                        });
        }
        function loadMultiTexture(onload){
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath  + "test/res/1.jpg", id:"texture"},
                {url: testTool.resPath  + "test/res/disturb_dxt1_mip.dds", id:"compressedTexture"}
            ]).subscribe(null, null,
                function(){
                    var texture1 = wd.TextureLoader.getInstance().get("texture");
                        texture2 = wd.TextureLoader.getInstance().get("compressedTexture");

                    onload(texture1, texture2);
                });
        }

        beforeEach(function(){
            gpuDetector = {
                maxTextureSize: 1000,
                maxTextureUnit:16
            };
            sandbox.stub(wd.GPUDetector, "getInstance").returns(gpuDetector);
        });
        afterEach(function(){
        });
        afterAll(function(){
            //put release cache to the last, so it can use the res cache during testing
            wd.LoaderManager.getInstance().dispose();
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
                    mapManager.addMap(texture1);
                    mapManager.addMap(texture2);

                    mapManager.bindAndUpdate();

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
                sandbox.stub(wd.Log, "warn");

                loadMultiTexture(function(texture1, texture2){
                    mapManager.addMap(texture1);
                    mapManager.addMap(texture2);

                    mapManager.bindAndUpdate();

                    expect(wd.Log.warn).toCalledOnce();

                    done();
                });
            });
        });
    });
});
