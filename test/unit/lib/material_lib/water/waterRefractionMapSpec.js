describe("water refractionMap", function () {
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

        describe("send glsl data", function(){
            var refractionMap;

            beforeEach(function(){
                refractionMap = wd.MirrorTexture.create();

                material.refractionMap = refractionMap;
            });

            it("send u_levelData.refractionLevel", function () {
                material.refractionLevel = 0.1;
                material.init();
                sandbox.spy(material.program, "sendStructureData");



                material.updateShader(quadCmd);

                expect(material.program.sendStructureData).toCalledWith("u_levelData.refractionLevel", wd.EVariableType.FLOAT_1,
                    0.1
                );
            });

            describe("test glsl source", function(){
                beforeEach(function(){
                });

                it("test uniform data", function(){
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
                //material.color = wd.Color.create("rgb(0.1, 0.2, 0.1)");
                //material.fresnelLevel = 0.5;
                //material.refractionLevel = 0.8;
                //material.reflectionLevel = 0.8;

                //material.bumpMap = wd.LoaderManager.getInstance().get("bump").toTexture();

                //var reflectionTexture = wd.MirrorTexture.create();
                ////reflectionTexture.width = 512;
                ////reflectionTexture.height = 512;
                //reflectionTexture.renderList = renderList;

                var refractionTexture = wd.RefractionTexture.create();
                //refractionTexture.width = 512;
                //refractionTexture.height = 512;
                refractionTexture.renderList = renderList;

                //material.reflectionMap = reflectionTexture;
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

            it("if renderList is empty, send u_isRefractionRenderListEmpty:1", function () {
                director._init();

                water.getComponent(wd.Geometry).material.refractionMap.renderList = [];

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, water);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isRefractionRenderListEmpty", sinon.match.any, 1)).toCalledOnce();
            });
            it("else, send u_isRefractionRenderListEmpty:0", function () {
                water.getComponent(wd.Geometry).material.refractionMap.renderList = [sphere];

                director._init();

                var data = renderTargetRendererTool.getDrawShadowMapShaderAndProgramHelper(sandbox, water);
                var program = data.program;


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(program.sendUniformData.withArgs("u_isRefractionRenderListEmpty", sinon.match.any, 0)).toCalledOnce();
            });
        });
    });
});

