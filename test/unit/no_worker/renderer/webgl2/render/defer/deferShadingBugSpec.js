describe("defer shading", function () {
    var sandbox = null;
    var gl;
    var state;

    var VaoData = wd.VaoData;
    var DeferDirectionLightPassData = wd.DeferDirectionLightPassData;

    function enableDeferShading(sandbox) {
        deferShadingTool.enableDeferShading(sandbox);
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

        describe("point lights' max count should be DataBufferConfig.deferPointLightCount", function () {
            beforeEach(function () {
                testTool.clearAndOpenContractCheck(sandbox, {
                    deferPointLightCount:5,
                    transformDataBufferCount:100
                });

                state = stateTool.createAndSetFakeGLState(sandbox);
            });

            it("test not exceed", function () {
                for(var i = 0; i < 5; i++){
                    sceneTool.addPointLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).not.toThrow();
            });
            it("if exceed, error", function () {
                for(var i = 0; i < 6; i++){
                    sceneTool.addPointLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).toThrow("count should <= max count");
            });
        });

        describe("direction lights' max count should be DataBufferConfig.deferDirectionLightCount", function () {
            beforeEach(function () {
                testTool.clearAndOpenContractCheck(sandbox, {
                    deferDirectionLightCount:5,
                    transformDataBufferCount:100
                });

                state = stateTool.createAndSetFakeGLState(sandbox);
            });

            it("test not exceed", function () {
                for(var i = 0; i < 5; i++){
                    sceneTool.addDirectionLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).not.toThrow();
            });
            it("if exceed, error", function () {
                for(var i = 0; i < 6; i++){
                    sceneTool.addDirectionLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).toThrow("count should <= max count");
            });
        });

        describe("ambient lights' max count should be DataBufferConfig.deferAmbientLightCount", function () {
            beforeEach(function () {
                testTool.clearAndOpenContractCheck(sandbox, {
                    deferAmbientLightCount:5,
                    transformDataBufferCount:100
                });

                state = stateTool.createAndSetFakeGLState(sandbox);
            });

            it("test not exceed", function () {
                for(var i = 0; i < 5; i++){
                    sceneTool.addAmbientLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).not.toThrow();
            });
            it("if exceed, error", function () {
                for(var i = 0; i < 6; i++){
                    sceneTool.addAmbientLight();
                }

                expect(function () {
                    directorTool.init(state);
                }).toThrow("count should <= max count");
            });
        });

        it("if one material set diffuse map, one not, then the two should has different shaders", function(){
            function getFirstGBufferFsSource(gl) {
                return gl.shaderSource.getCall(7).args[1];
            }

            function getSecondGBufferFsSource(gl) {
                return gl.shaderSource.getCall(9).args[1];
            }

            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            var obj = data.gameObject;
            var geo = data.geometry;
            var material = data.material;


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

        describe("gbuffer pass and light pass should use different vao", function () {
            function setGBufferGameObjectVao(index, vao) {
                VaoData.vaoMap[index] = vao;
            }

            function setDeferDirectionLightVao(vao) {
                DeferDirectionLightPassData.fullScreenQuadVertexArray = vao;
            }

            it("test one gameObject + one direcction light", function () {
                var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
                var geo = data.geometry;

                sceneTool.addDirectionLight();

                var vao1 = {a:1};
                var vao2 = {a:2};


                directorTool.init(state);

                var callCount = gl.bindVertexArray.callCount;

                setGBufferGameObjectVao(geo.index, vao1);
                setDeferDirectionLightVao(vao2);


                directorTool.loopBody(state);

                expect(gl.bindVertexArray.getCall(callCount)).toCalledWith(vao1);
                expect(gl.bindVertexArray.getCall(callCount + 1)).toCalledWith(vao2);
            });
        });
    });
});

