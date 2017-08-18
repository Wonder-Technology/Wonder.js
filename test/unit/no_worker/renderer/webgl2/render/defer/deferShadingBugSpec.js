describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GBufferData = wd.GBufferData;
    var ShaderData = wd.ShaderData;
    var ProgramData = wd.ProgramData;
    var DeferLightPassData = wd.DeferLightPassData;
    var Log = wd.Log;

    function buildGLSL(sandbox, state) {
        return glslWebGL2Tool.buildGLSL(sandbox, state);
    }

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    function getDeferLightPassProgram() {
        var shaderIndex = ShaderData.shaderIndexByMaterialIndexAndShaderNameMap["DeferLightPass"];

        return ProgramData.programMap[shaderIndex];
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL2Tool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        enableDeferShading(sandbox);
    });
    afterEach(function () {
        testWebGL2Tool.clear(sandbox);
        sandbox.restore();
    });

    describe("fix bug", function() {
        var DataBufferConfig = wd.DataBufferConfig;

        beforeEach(function(){
        });
        
        it("expand max light count to be bigger than the one defined in front render", function(){
            testWebGL2Tool.openContractCheck();

            DataBufferConfig.pointLightDataBufferCount = 1;

            sceneTool.addPointLight();
            sceneTool.addPointLight();

            expect(function () {
                directorTool.init(state);
            }).not.toThrow();

            expect(DataBufferConfig.pointLightDataBufferCount).toEqual(1000);

            //todo test direction, ambient
        });
        it("if one material set diffuse map, one not, then the two should has different shaders", function(){
            function getFirstGBufferFsSource(gl) {
                return gl.shaderSource.getCall(3).args[1];
            }

            function getSecondGBufferFsSource(gl) {
                return gl.shaderSource.getCall(5).args[1];
            }

            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;


            var mat = lightMaterialTool.create();

            var texture = textureTool.create();
            textureTool.setSource(texture, {});

            lightMaterialTool.setDiffuseMap(mat, texture);


            var data = sceneTool.createGameObject(null, mat);


            sceneTool.addGameObject(data.gameObject);



            directorTool.init(state);
            directorTool.loopBody(state);


            expect(glslTool.contain(getFirstGBufferFsSource(gl), "vec3 getMaterialDiffuse() {\n        return u_diffuse;\n    }\n")).toBeTruthy();
            expect(glslTool.contain(getSecondGBufferFsSource(gl), "uniform sampler2D u_diffuseMapSampler;\n")).toBeTruthy();
        });
    });
});

