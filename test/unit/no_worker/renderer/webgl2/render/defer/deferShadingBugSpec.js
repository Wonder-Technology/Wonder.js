describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var GBufferData = wd.GBufferData;
    var ShaderData = wd.WebGL2ShaderData;
    var ProgramData = wd.ProgramData;
    var DeferLightPassData = wd.DeferLightPassData;
    var Log = wd.Log;

    function buildGLSL(sandbox, state) {
        return glslTool.buildGLSL(sandbox, state);
    }

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
    }

    function getDeferLightPassProgram() {
        var shaderIndex = ShaderData.shaderIndexByShaderNameMap["DeferLightPass"];

        return ProgramData.programMap[shaderIndex];
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);

        enableDeferShading(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("fix bug", function() {
        beforeEach(function(){
        });

        //todo test direction, ambient
        describe("support DataBufferConfig.pointLightCount point lights", function () {
            beforeEach(function () {
                testTool.clearAndOpenContractCheck(sandbox, {
                    pointLightCount:10,
                    transformDataBufferCount:100
                });

                state = stateTool.createAndSetFakeGLState(sandbox);
            });

            it("test not exceed", function () {
                for(var i = 0; i < 10; i++){
                    sceneTool.addPointLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).not.toThrow();
            });
            it("if exceed, error", function () {
                for(var i = 0; i < 11; i++){
                    sceneTool.addPointLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).toThrow("count should <= max count");
            });
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

