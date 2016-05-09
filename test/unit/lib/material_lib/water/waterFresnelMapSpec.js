describe("water fresnel", function () {
    var sandbox = null;
    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.WaterMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("integration test1", function () {
        var quadCmd;

        beforeEach(function () {
            wd.Director.getInstance().scene.currentCamera = wd.GameObject.create();


            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;
        });

        describe("send glsl data", function () {
            var reflectionMap, refractionMap;

            beforeEach(function () {
                reflectionMap = wd.MirrorTexture.create();
                refractionMap = wd.RefractionTexture.create();

                material.reflectionMap = reflectionMap;
                material.refractionMap = refractionMap;
            });

            it("send u_levelData", function () {
                material.fresnelLevel = 0.1;
                material.reflectionLevel = 0.2;
                material.refractionLevel = 0.3;
                material.init();
                sandbox.spy(material.program, "sendStructureData");



                material.updateShader(quadCmd);

                expect(material.program.sendStructureData).toCalledWith("u_levelData.fresnelLevel", wd.EVariableType.FLOAT_1, 0.1);
                expect(material.program.sendStructureData).toCalledWith("u_levelData.reflectionLevel", wd.EVariableType.FLOAT_1, 0.2);
                expect(material.program.sendStructureData).toCalledWith("u_levelData.refractionLevel", wd.EVariableType.FLOAT_1, 0.3);
            });

            describe("test glsl source", function () {
                beforeEach(function () {
                });

                it("test uniform data", function () {
                    material.init();

                    material.updateShader(quadCmd);

                    shaderTool.judgeGLSLUniformData(material.shader.fsSource, "u_levelData");
                });
            });
        });
    });

    describe("integration test2", function () {
        var director;

        beforeEach(function(){
            director = wd.Director.getInstance();
        });

        describe("test draw map", function () {
            var sphere;
            var water;
            var light;

            var renderer;


            function createSphere() {
                return prepareTool.createSphere();
            }

            function createWater(renderList) {
                var material = wd.WaterMaterial.create();

                var reflectionTexture = wd.MirrorTexture.create();
                reflectionTexture.renderList = renderList;

                var refractionTexture = wd.RefractionTexture.create();
                refractionTexture.renderList = renderList;

                material.reflectionMap = reflectionTexture;
                material.refractionMap = refractionTexture;


                var geometry = wd.PlaneGeometry.create();
                geometry.material = material;
                geometry.width = 50;
                geometry.height = 50;

                var gameObject = wd.GameObject.create();
                gameObject.addComponent(geometry);

                gameObject.addComponent(wd.MeshRenderer.create());


                return gameObject;
            }

            beforeEach(function () {
                renderer = wd.WebGLRenderer.create();

                sphere = createSphere();
                sphere.name = "sphere";

                water = createWater([sphere]);
                water.name = "water";

                light = shadowTool.createDirectionLight();

                director.scene.addChild(sphere);
                director.scene.addChild(water);
                director.scene.addChild(light);


                director.scene.addChild(testTool.createCamera());

                prepareTool.prepareForMap(sandbox);
            });

            it("if renderList is empty, send u_isReflectionRenderListEmpty:1,u_isRefractionRenderListEmpty:1", function () {
                director._init();

                water.getComponent(wd.Geometry).material.reflectionMap.renderList = [];
                water.getComponent(wd.Geometry).material.refractionMap.renderList = [];

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, water);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isReflectionRenderListEmpty", sinon.match.any, 1)).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_isRefractionRenderListEmpty", sinon.match.any, 1)).toCalledOnce();
            });
            it("else, send u_isReflectionRenderListEmpty:0,u_isRefractionRenderListEmpty:0", function () {
                water.getComponent(wd.Geometry).material.reflectionMap.renderList = [sphere];
                water.getComponent(wd.Geometry).material.refractionMap.renderList = [sphere];

                director._init();

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, water);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isReflectionRenderListEmpty", sinon.match.any, 0)).toCalledOnce();
                expect(program.sendUniformData.withArgs("u_isRefractionRenderListEmpty", sinon.match.any, 0)).toCalledOnce();
            });
        });
    });
});

