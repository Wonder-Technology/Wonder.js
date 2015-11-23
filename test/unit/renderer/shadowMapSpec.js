describe("shadow map", function() {
    var sandbox = null;
    var shadow = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("direction shadow map", function(){
        describe("build twoD shadow map", function(){
            it("send u_mMatrix,u_vMatrix,u_pMatrix,a_position when build", function(){
                var sphereMaterial = dy.LightMaterial.create();
                sphereMaterial.specular = dy.Color.create("#ffdd99");
                sphereMaterial.color = dy.Color.create("#666666");
                sphereMaterial.shininess = 16;

                //sphereMaterial.diffuseMap = dy.ImageTexture.create(dy.TextureLoader.getInstance().get("texture"));

                var geometry = dy.SphereGeometry.create();
                geometry.material = sphereMaterial;
                geometry.radius = 20;
                geometry.segment = 20;



                var sphere = dy.GameObject.create();

                sphere.addComponent(dy.MeshRenderer.create());
                sphere.addComponent(geometry);



                sphere.transform.translate(dy.Vector3.create(-30, 20, 0));











                //var groundMaterial = dy.LightMaterial.create();
                //groundMaterial.specular = dy.Color.create("#ffdd99");
                //groundMaterial.shininess = 32;
                //
                ////var map1 = dy.ImageTexture.create(dy.TextureLoader.getInstance().get("ground"));
                ////map1.wrapS = dy.TextureWrapMode.REPEAT;
                ////map1.wrapT = dy.TextureWrapMode.REPEAT;
                ////map1.repeatRegion = dy.RectRegion.create(0.5, 0, 5, 5);
                ////map1.needUpdate = true;
                ////
                ////groundMaterial.diffuseMap = map1;
                //
                //var plane = dy.PlaneGeometry.create();
                //plane.width = 100;
                //plane.height = 100;
                //
                //
                //plane.material = groundMaterial;
                //
                //
                //
                //var ground = dy.GameObject.create();
                //
                //ground.addComponent(dy.MeshRenderer.create());
                //ground.addComponent(plane);











                var SHADOW_MAP_WIDTH = 1024,
                    SHADOW_MAP_HEIGHT = 1024;


                //var ambientLightComponent = dy.AmbientLight.create();
                //ambientLightComponent.color = dy.Color.create("#444444");
                //
                //var ambientLight = dy.GameObject.create();
                //ambientLight.addComponent(ambientLightComponent);




                var directionLightComponent = dy.DirectionLight.create();
                directionLightComponent.color = dy.Color.create("#ffffff");
                directionLightComponent.intensity = 1;

                directionLightComponent.castShadow = true;


                directionLightComponent.shadowCameraLeft = -100;
                directionLightComponent.shadowCameraRight = 100;
                directionLightComponent.shadowCameraTop = 100;
                directionLightComponent.shadowCameraBottom = -100;
                directionLightComponent.shadowCameraNear = 0.1;
                directionLightComponent.shadowCameraFar = 1000;

                directionLightComponent.shadowBias = 0.002;
                directionLightComponent.shadowDarkness = 0.2;

                directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

                //directionLightComponent.shadowRenderList = [sphere, ground];
                directionLightComponent.shadowRenderList = [sphere];




                var directionLight = dy.GameObject.create();
                directionLight.addComponent(directionLightComponent);


                var director = dy.Director.getInstance();



                director.scene.addChild(sphere);
                //director.scene.addChild(ground);
                director.scene.addChild(directionLight);


                director.scene.addChild(testTool.createCamera());


                testTool.prepareForMap(sandbox);



                //var sphereProgram = sphereMaterial.shader.program;
                //sandbox.stub(sphereProgram, "sendAttributeData");
                //sandbox.stub(sphereProgram, "sendUniformData");
                //
                //
                //var groundProgram = groundMaterial.shader.program;
                //sandbox.stub(groundProgram, "sendAttributeData");
                //sandbox.stub(groundProgram, "sendUniformData");


                var sceneShader = null;

                var useProgram = director.scene.useProgram
                sandbox.stub(director.scene, "useProgram", function(shader){
                    useProgram.call(director.scene, shader);
                    sceneShader = shader;
                    sandbox.stub(sceneShader.program, "sendAttributeData");
                    sandbox.stub(sceneShader.program, "sendUniformData");
                });



                director._init();

                director._run(1);



                expect(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight")).toCalledOnce();
                expect(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight").firstCall.args[2]).toEqual(jasmine.any(dy.Matrix4))
                expect(sceneShader.program.sendUniformData.withArgs("u_mMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendUniformData.withArgs("u_vMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendUniformData.withArgs("u_pMatrix")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
                expect(sceneShader.program.sendAttributeData.withArgs("a_position")).toCalledBefore(sceneShader.program.sendUniformData.withArgs("u_vpMatrixFromLight"));
            });
        });
    });
});

