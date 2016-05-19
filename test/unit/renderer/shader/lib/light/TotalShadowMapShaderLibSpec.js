describe("TotalShadowMapShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.TotalShadowMapShaderLib;
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

            it("fsSource->handleDepthMap not unpack depth, instead return r component of depth texture", function () {
                lib.setShaderDefinition({}, {});

                expect(glslTool.contain(lib.fsSourceDefine, "unpack")).toBeFalsy();
                expect(glslTool.contain(lib.fsSourceDefine, "return rgbaDepth.r;")).toBeTruthy();
            });
        });

        describe("test if webgl_depth_texture extension not support", function(){
            beforeEach(function(){
                wd.GPUDetector.getInstance().extensionDepthTexture = false;
            });

            it("fsSource->handleDepthMap unpack depth", function () {
                lib.setShaderDefinition({}, {});

                    expect(glslTool.contain(lib.fsSourceDefine, "unpack")).toBeTruthy();
            });
        });
    });
});

