describe("LightMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new dy.LightMaterial();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        var map,
            scene;

        beforeEach(function(){
            sandbox.stub(material.mapManager, "init");
            sandbox.stub(material.shader, "init");
            map = dy.ImageTexture.create();

            scene = dy.Director.getInstance().scene;
        });

        it("add LightCommonShaderLib", function(){
            material.init();

            expect(material.shader.getLib(dy.LightCommonShaderLib)).toBeTruthy();
        });
        it("if diffuseMap exist, add its shader lib", function(){
            material.diffuseMap = map;

            material.init();

            expect(material.shader.getLib(dy.DiffuseMapShaderLib)).toBeTruthy();
        });
        it("else, add NoDiffuseMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoDiffuseMapShaderLib)).toBeTruthy();

        });
        it("if specularMap exist, add its shader lib", function(){
            material.specularMap = map;

            material.init();

            expect(material.shader.getLib(dy.SpecularMapShaderLib)).toBeTruthy();
        });
        it("else, add NoSpecularMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoSpecularMapShaderLib)).toBeTruthy();
        });
        it("if normalMap exist, add its shader lib", function(){
            material.normalMap = map;

            material.init();

            expect(material.shader.getLib(dy.NormalMapShaderLib)).toBeTruthy();
        });
        it("else, add NoNormalMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoNormalMapShaderLib)).toBeTruthy();
        });

        describe("if Scene enable shadowMap && (has twoD shadowMap || has cubemap shadowMap)", function () {
            it("if Scene not enable shadowMap, add NoShadowMapShaderLib", function () {
                sandbox.stub(scene.shadowMap, "enable", false);

                material.init();

                expect(material.shader.getLib(dy.NoShadowMapShaderLib)).toBeTruthy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(scene.shadowMap, "enable", true);
                });

                it("else, if not has twoD shadowMap && not has cubemap shadowMap, add NoShadowMapShaderLib", function () {
                    material.init();

                    expect(material.shader.getLib(dy.NoShadowMapShaderLib)).toBeTruthy();
                });

                it("else if has twoD shadowMap, add TwoDShadowMapShaderLib", function(){
                    material.addTwoDShadowMap(new dy.TwoDShadowMapTexture());

                    material.init();

                    expect(material.shader.getLib(dy.TwoDShadowMapShaderLib)).toBeTruthy();
                });
                it("else if has cubemap shadowMap, add CubemapShadowMapShaderLib", function(){
                    material.addCubemapShadowMap(new dy.CubemapShadowMapTexture());

                    material.init();

                    expect(material.shader.getLib(dy.CubemapShadowMapShaderLib)).toBeTruthy();
                });
            });
        });
    });

    describe("set envMap shader lib", function(){
        var model,geo,material,director,program;
        var envMap;
        var vertice,normals;

        beforeEach(function(){
            vertice = [1,-1,0, 0,1,0,0,0,1];
            normals = [];

            model = dy.GameObject.create();
            geo = dy.ModelGeometry.create();
            material = dy.LightMaterial.create();
            envMap = dy.DynamicCubemapTexture.create();

            materialTool.prepareEnvMap(sandbox, vertice, normals, model, geo, material, envMap);


            director = dy.Director.getInstance();


            program = material.shader.program;
            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        });

        it("if no envMap, return", function(){
            material.envMap = null;
            envMap.mode = dy.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(dy.ReflectionForLightShaderLib)).toBeFalsy();
        });
        it("if mode is BASIC, add BasicEnvMapForLightShaderLib", function(){
            envMap.mode = dy.EnvMapMode.BASIC;

            director._init();

            expect(material.shader.hasLib(dy.BasicEnvMapForLightShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function(){
            envMap.mode = dy.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(dy.ReflectionForLightShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function(){
            material.refractionRatio = 0.5;
            envMap.mode = dy.EnvMapMode.REFRACTION;

            director._init();

            expect(material.shader.hasLib(dy.RefractionForLightShaderLib)).toBeTruthy();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });

        describe("if mode is FRESNEL, add FresnelForLightShaderLib", function(){
            it("if set reflectivity, send it", function(){
                material.reflectivity = 0.5;
                envMap.mode = dy.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(dy.FresnelForLightShaderLib)).toBeTruthy();

                director._run(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function(){
                material.refractionRatio = 0.5;
                envMap.mode = dy.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(dy.FresnelForLightShaderLib)).toBeTruthy();

                director._run(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(dy.ShaderChunk.NULL);
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });
});

