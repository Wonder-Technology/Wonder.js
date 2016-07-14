describe("sdf bitmapFont test", function () {
    var sandbox = null;
    var director;
    var material,cmd;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.closeContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    beforeEach(function(){

        material = wd.SdfBitmapFontMaterial.create();

        cmd = rendererTool.createSingleDrawCommand(sandbox);

        cmd.material = material;

        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });

    describe("send glsl data", function(){
        beforeEach(function(){
        });

        describe("test glsl source", function(){
            beforeEach(function(){
            });

            describe("add alpha test", function () {
                it("if set alphaTest, use it", function () {
                    material.alphaTest = 0.1;
                    material.init();


                    material.updateShader(cmd);

                    expect(glslTool.contain(material.shader.fsSource, "gl_FragColor.a < 0.1")).toBeTruthy();
                });
                it("else, use 0.0001", function () {
                    material.init();

                    material.updateShader(cmd);

                    expect(glslTool.contain(material.shader.fsSource, "gl_FragColor.a < 0.0001")).toBeTruthy();
                });
            });
            it("if extensionStandardDerivatives enable, glsl enable this extension and use dFdx,dFdy function", function(){
                wd.GPUDetector.getInstance().extensionStandardDerivatives = true;
                material.init();

                material.updateShader(cmd);

                var fsSource = material.shader.fsSource;
                shaderTool.judgeGLSLExtension(fsSource, "GL_OES_standard_derivatives");
                expect(glslTool.contain(fsSource, "float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;")).toBeTruthy();
            });
            it("else, handle fallback", function(){
                wd.GPUDetector.getInstance().extensionStandardDerivatives = false;
                material.init();

                material.updateShader(cmd);

                var fsSource = material.shader.fsSource;
                expect(glslTool.contain(fsSource, "GL_OES_standard_derivatives")).toBeFalsy();
                expect(glslTool.contain(fsSource, "float afwidth = (1.0 / 32.0) * (1.4142135623730951 / (2.0 * gl_FragCoord.w));")).toBeTruthy();
            });
        });
    });
});


