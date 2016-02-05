describe("LightMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new wd.LightMaterial();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("opacity attri", function(){
        it("set opacity", function(){
            materialTool.testOpacity(material);
        });
    });

    describe("add shader lib", function(){
        var map,
            scene;

        beforeEach(function(){
            sandbox.stub(material.mapManager, "init");
            sandbox.stub(material.shader, "init");
            map = wd.ImageTexture.create();

            scene = wd.Director.getInstance().scene;
        });

        it("add LightCommonShaderLib", function(){
            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.LightCommonShaderLib)).toBeTruthy();
        });
        it("if diffuseMap exist, add its shader lib", function(){
            material.diffuseMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.DiffuseMapShaderLib)).toBeTruthy();
        });
        it("else, add NoDiffuseMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.NoDiffuseMapShaderLib)).toBeTruthy();

        });
        it("if specularMap exist, add its shader lib", function(){
            material.specularMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.SpecularMapShaderLib)).toBeTruthy();
        });
        it("else, add NoSpecularMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.NoSpecularMapShaderLib)).toBeTruthy();
        });
        it("if emissionMap exist, add its shader lib", function(){
            material.emissionMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.EmissionMapShaderLib)).toBeTruthy();
        });
        it("else, add NoEmissionMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.NoEmissionMapShaderLib)).toBeTruthy();
        });
        it("if normalMap exist, add its shader lib", function(){
            material.normalMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.NormalMapShaderLib)).toBeTruthy();
        });
        it("else, add NoNormalMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            expect(material.shader.getLib(wd.NoNormalMapShaderLib)).toBeTruthy();
        });

        describe("if SceneDispatcher enable shadowMap && (has twoD shadowMap || has cubemap shadowMap)", function () {
            it("if SceneDispatcher not enable shadowMap, add NoShadowMapShaderLib", function () {
                sandbox.stub(scene.shadowMap, "enable", false);

                rendererTool.triggerMaterialAddShaderLib(material);

                expect(material.shader.getLib(wd.NoShadowMapShaderLib)).toBeTruthy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(scene.shadowMap, "enable", true);
                });

                it("else, if not has twoD shadowMap && not has cubemap shadowMap, add NoShadowMapShaderLib", function () {
                    rendererTool.triggerMaterialAddShaderLib(material);

                    expect(material.shader.getLib(wd.NoShadowMapShaderLib)).toBeTruthy();
                });

                it("else if has twoD shadowMap, add TwoDShadowMapShaderLib", function(){
                    material.addTwoDShadowMap(new wd.TwoDShadowMapTexture());

                    rendererTool.triggerMaterialAddShaderLib(material);

                    expect(material.shader.getLib(wd.TwoDShadowMapShaderLib)).toBeTruthy();
                });
                it("else if has cubemap shadowMap, add CubemapShadowMapShaderLib", function(){
                    material.addCubemapShadowMap(new wd.CubemapShadowMapTexture());

                    rendererTool.triggerMaterialAddShaderLib(material);

                    expect(material.shader.getLib(wd.CubemapShadowMapShaderLib)).toBeTruthy();
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

            model = wd.GameObject.create();
            geo = wd.ModelGeometry.create();
            geo.vertices = vertice;
            geo.faces = testTool.createFaces([0,1,2]);

            material = wd.LightMaterial.create();
            envMap = wd.DynamicCubemapTexture.create();

            materialTool.prepareEnvMap(sandbox, model, geo, material, envMap);


            director = wd.Director.getInstance();


            program = material.shader.program;
        });

        it("if no envMap, return", function(){
            material.envMap = null;
            envMap.mode = wd.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForLightShaderLib)).toBeFalsy();
        });
        it("if mode is BASIC, add BasicEnvMapForLightShaderLib", function(){
            envMap.mode = wd.EnvMapMode.BASIC;

            director._init();

            expect(material.shader.hasLib(wd.BasicEnvMapForLightShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function(){
            envMap.mode = wd.EnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForLightShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function(){
            material.refractionRatio = 0.5;
            envMap.mode = wd.EnvMapMode.REFRACTION;

            director._init();

            expect(material.shader.hasLib(wd.RefractionForLightShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });

        describe("if mode is FRESNEL, add FresnelForLightShaderLib", function(){
            it("if set reflectivity, send it", function(){
                material.reflectivity = 0.5;
                envMap.mode = wd.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(wd.FresnelForLightShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function(){
                material.refractionRatio = 0.5;
                envMap.mode = wd.EnvMapMode.FRESNEL;

                director._init();

                expect(material.shader.hasLib(wd.FresnelForLightShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(wd.ShaderChunk.NULL);
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });
});

