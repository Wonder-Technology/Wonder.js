describe("Material", function() {
    var sandbox = null;
    var material = null;
    var gl;

    var ShaderData = wd.WebGL2ShaderData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("init", function() {
        beforeEach(function(){

        });

        describe("init all no material shaders", function () {
            it("init DeferAmbientLightPass,DeferDirectionLightPass,DeferPointLightPass shader", function () {
                deferShadingTool.useDeferShading(sandbox);

                sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

                directorTool.init(state);

                expect(gl.linkProgram.callCount).toEqual(3);
                expect(ShaderData.shaderIndexByShaderNameMap["DeferAmbientLightPass"]).toBeNumber();
                expect(ShaderData.shaderIndexByShaderNameMap["DeferDirectionLightPass"]).toBeNumber();
                expect(ShaderData.shaderIndexByShaderNameMap["DeferPointLightPass"]).toBeNumber();
            });
        });

        describe("init mapManager", function () {
            it("create gl texture", function () {
                deferShadingTool.disableDeferShading(sandbox);

                var mat = lightMaterialTool.create();

                var texture = textureSystemTool.create();
                textureSystemTool.setSource(texture, {});

                lightMaterialTool.setDiffuseMap(mat, texture);

                sceneSystemTool.prepareGameObjectAndAddToScene(false, null, mat);

                directorTool.init(state);


                expect(gl.createTexture.callCount).toEqual(1);
            });
        });
    });
});
