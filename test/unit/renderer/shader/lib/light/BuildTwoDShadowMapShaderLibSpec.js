describe("BuildTwoDShadowMapShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        Lib = wd.BuildTwoDShadowMapShaderLib;
        lib = new Lib();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("setShaderDefinition", function(){
        beforeEach(function(){
        });

        describe("test if webgl_depth_texture extension support", function(){
            beforeEach(function(){
                wd.GPUDetector.getInstance().extensionDepthTexture = true;
            });

            it("fsSource is empty", function () {
                lib.setShaderDefinition({}, {});

                expect(glslTool.contain(lib.fsSourceBody, "")).toBeTruthy();
            });
        });

        describe("test if webgl_depth_texture extension not support", function(){
            beforeEach(function(){
                wd.GPUDetector.getInstance().extensionDepthTexture = false;
            });

            it("fsSource->pack depth", function () {
                lib.setShaderDefinition({}, {});

                    expect(glslTool.contain(lib.fsSourceBody, "gl_FragData[0] = packDepth(gl_FragCoord.z);")).toBeTruthy();
            });
        });
    });
});

