describe("LightMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = wd.LightMaterial.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("opacity attri", function(){
        it("set opacity", function(){
            materialTool.testOpacity(material);
        });
    });

    describe("test default value", function () {
        it("test specularColor,emissionColor", function () {
            expect(material.specularColor).toEqual(wd.Color.create("#ffffff"));
            expect(material.emissionColor).toEqual(wd.Color.create("rgba(0,0,0,0)"));
        });
    });


    describe("add shader lib", function(){
        var map,
            scene;

        function judgeHasLib(libClass){
            expect(material.shader.hasLib(libClass)).toBeTruthy();
        }

        beforeEach(function(){
            sandbox.stub(material.mapManager, "init");
            sandbox.stub(material.shader, "init");
            map = wd.ImageTexture.create();

            scene = wd.Director.getInstance().scene;
        });

        it("add LightCommonShaderLib", function(){
            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.LightCommonShaderLib);
        });
        it("if lightMap exist, add its shader lib", function(){
            material.lightMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.LightMapShaderLib);
        });
        it("else, add NoLightMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.NoLightMapShaderLib);
        });

        describe("judge diffuseMap", function(){
            beforeEach(function(){

            });

            describe("if diffuseMap exist", function(){
                it("add its shader lib", function () {
                    material.diffuseMap = map;

                    rendererTool.triggerMaterialAddShaderLib(material);

                    judgeHasLib(wd.DiffuseMapShaderLib);
                });
            });
            it("else, add NoDiffuseMapShaderLib", function () {
                rendererTool.triggerMaterialAddShaderLib(material);

                judgeHasLib(wd.NoDiffuseMapShaderLib);

            });
        });

        it("if specularMap exist, add its shader lib", function(){
            material.specularMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.SpecularMapShaderLib);
        });
        it("else, add NoSpecularMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.NoSpecularMapShaderLib);
        });
        it("if emissionMap exist, add its shader lib", function(){
            material.emissionMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.EmissionMapShaderLib);
        });
        it("else, add NoEmissionMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.NoEmissionMapShaderLib);
        });
        it("if normalMap exist, add its shader lib", function(){
            material.normalMap = map;

            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.NormalMapShaderLib);
        });
        it("else, add NoNormalMapShaderLib", function () {
            rendererTool.triggerMaterialAddShaderLib(material);

            judgeHasLib(wd.NoNormalMapShaderLib);
        });

        //describe("if SceneDispatcher enable shadowMap && (has twoD shadowMap || has cubemap shadowMap)", function () {
        //    it("if SceneDispatcher not enable shadowMap, add NoShadowMapShaderLib", function () {
        //        sandbox.stub(scene.shadowMap, "enable", false);
        //
        //        rendererTool.triggerMaterialAddShaderLib(material);
        //
        //        judgeHasLib(wd.NoShadowMapShaderLib);
        //    });
        //
        //    describe("else", function(){
        //        beforeEach(function(){
        //            sandbox.stub(scene.shadowMap, "enable", true);
        //        });
        //
        //        it("else, if not has twoD shadowMap && not has cubemap shadowMap, add NoShadowMapShaderLib", function () {
        //            rendererTool.triggerMaterialAddShaderLib(material);
        //
        //            judgeHasLib(wd.NoShadowMapShaderLib);
        //        });
        //
        //        it("else if has twoD shadowMap, add TwoDShadowMapShaderLib", function(){
        //            material.mapManager.addTwoDShadowMap(new wd.TwoDShadowMapTexture());
        //
        //            rendererTool.triggerMaterialAddShaderLib(material);
        //
        //            judgeHasLib(wd.TwoDShadowMapShaderLib);
        //        });
        //        it("else if has cubemap shadowMap, add CubemapShadowMapShaderLib", function(){
        //            material.addCubemapShadowMap(new wd.CubemapShadowMapTexture());
        //
        //            rendererTool.triggerMaterialAddShaderLib(material);
        //
        //            judgeHasLib(wd.CubemapShadowMapShaderLib);
        //        });
        //    });
        //});
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
        });

        it("if no envMap, return", function(){
            material.envMap = null;
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();

            expect(material.shader.hasLib(wd.ReflectionForLightEnvMapShaderLib)).toBeFalsy();
        });
        it("if mode is BASIC, add BasicForLightEnvMapShaderLib", function(){
            envMap.mode = wd.EEnvMapMode.BASIC;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.BasicForLightEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFLECTION, add ReflectionShaderLib", function(){
            envMap.mode = wd.EEnvMapMode.REFLECTION;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.ReflectionForLightEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });
        it("if mode is REFRACTION, add ReflectionShaderLib", function(){
            material.refractionRatio = 0.5;
            envMap.mode = wd.EEnvMapMode.REFRACTION;

            director._init();
            program = shaderTool.getAndStubProgram(sandbox, material);

            expect(material.shader.hasLib(wd.RefractionForLightEnvMapShaderLib)).toBeTruthy();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
            expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
        });

        describe("if mode is FRESNEL, add FresnelForLightShaderLib", function(){
            it("if set reflectivity, send it", function(){
                material.reflectivity = 0.5;
                envMap.mode = wd.EEnvMapMode.FRESNEL;

                director._init();
                program = shaderTool.getAndStubProgram(sandbox, material);

                expect(material.shader.hasLib(wd.FresnelForLightEnvMapShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
            it("else, send u_reflectivity = NULL and send u_refractionRatio", function(){
                material.refractionRatio = 0.5;
                envMap.mode = wd.EEnvMapMode.FRESNEL;

                director._init();
                program = shaderTool.getAndStubProgram(sandbox, material);

                expect(material.shader.hasLib(wd.FresnelForLightEnvMapShaderLib)).toBeTruthy();

                director._loopBody(1);

                expect(program.sendUniformData.withArgs("u_reflectivity").firstCall.args[2]).toEqual(wd.ShaderChunk.NULL);
                expect(program.sendUniformData.withArgs("u_refractionRatio").firstCall.args[2]).toEqual(0.5);
                expect(program.sendUniformData.withArgs("u_normalMatrix")).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_cameraPos")).toCalledOnce();
            });
        })
    });

    describe("getTextureForRenderSort", function(){
        it("return diffuseMap", function () {
            var texture1 = wd.ImageTexture.create({});
            material.diffuseMap = texture1;

            expect(material.getTextureForRenderSort()).toEqual(texture1);
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        describe("clone StandardLightMaterial data", function(){
            beforeEach(function(){
            });

            it("clone map", function(){
                var lightMap = wd.ImageTexture.create({});
                var resultLightMap = wd.ImageTexture.create({a:1});
                sandbox.stub(lightMap, "clone").returns(resultLightMap);

                var diffuseMap = wd.MarbleProceduralTexture.create();
                var resultDiffuseMap = wd.MarbleProceduralTexture.create();
                sandbox.stub(diffuseMap, "clone").returns(resultDiffuseMap);


                var specularMap = wd.MarbleProceduralTexture.create();
                var resultSpecularMap = wd.MarbleProceduralTexture.create();
                sandbox.stub(specularMap, "clone").returns(resultSpecularMap);


                var emissionMap = wd.ImageTexture.create({});
                var resultEmissionMap = wd.ImageTexture.create({a:1});
                sandbox.stub(emissionMap, "clone").returns(resultEmissionMap);


                var normalMap = wd.ImageTexture.create({});
                var resultNormalMap = wd.ImageTexture.create({a:1});
                sandbox.stub(normalMap, "clone").returns(resultNormalMap);


                cloneTool.extend(material, {
                    lightMap:lightMap,
                    diffuseMap:diffuseMap,
                    specularMap:specularMap,
                    emissionMap:emissionMap,
                    normalMap:normalMap
                });


                var result = material.clone();

                expect(result.mapManager === material.mapManager).toBeFalsy();
                expect(result.lightMap).toEqual(resultLightMap);
                expect(result.diffuseMap).toEqual(resultDiffuseMap);
                expect(result.specularMap).toEqual(resultSpecularMap);
                expect(result.emissionMap).toEqual(resultEmissionMap);
                expect(result.normalMap).toEqual(resultNormalMap);
            });
            it("clone opacity after blend", function () {
                var opacity = 0.5,
                    blend = false;

                material.opacity = opacity;
                material.blend = blend;


                var result = material.clone();

                expect(result.opacity).toEqual(opacity);
                expect(result.blend).toBeTruthy();
            });
            it("clone data", function () {
                var shininess = 10,
                    lightModel = wd.ELightModel.LAMBERT,
                    specularColor = wd.Color.create("#111111"),
                    emissionColor = wd.Color.create("#222222"),
                    lightMapIntensity = 0.1;


                cloneTool.extend(material, {

                    shininess: shininess,
                    lightModel: lightModel,
                    specularColor: specularColor,
                    emissionColor: emissionColor,
                    lightMapIntensity: lightMapIntensity
                });


                var result = material.clone();


                expect(result.shininess).toEqual(shininess);
                expect(result.lightModel).toEqual(lightModel);
                expect(result.specularColor).toEqual(specularColor);
                expect(result.specularColor === material.specularColor).toBeFalsy();
                expect(result.emissionColor).toEqual(emissionColor);
                expect(result.emissionColor === material.emissionColor).toBeFalsy();
                expect(result.lightMapIntensity).toEqual(lightMapIntensity);
            });
        });
    });
});
