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
            it("init DeferDirectionLightPass,DeferPointLightPass shader", function () {
                deferShadingTool.useDeferShading(sandbox);

                sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

                directorTool.init(state);

                expect(gl.linkProgram).toCalledTwice();
                expect(ShaderData.shaderIndexByShaderNameMap["DeferDirectionLightPass"]).toBeNumber();
                expect(ShaderData.shaderIndexByShaderNameMap["DeferPointLightPass"]).toBeNumber();
            });
        });

        describe("init mapManager", function () {
            it("create gl texture", function () {
                deferShadingTool.disableDeferShading(sandbox);

                var mat = lightMaterialTool.create();

                var texture = textureTool.create();
                textureTool.setSource(texture, {});

                lightMaterialTool.setDiffuseMap(mat, texture);

                sceneTool.prepareGameObjectAndAddToScene(false, null, mat);

                directorTool.init(state);


                expect(gl.createTexture.callCount).toEqual(1);
            });
        });
    });
});
