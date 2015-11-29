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
        var director;

        function createSphere() {
            var material = dy.LightMaterial.create();
            material.specular = dy.Color.create("#ffdd99");
            material.shininess = 16;
            material.diffuseMap = dy.ImageTexture.create(dy.TextureLoader.getInstance().get("texture"));
            material.shading = dy.Shading.SMOOTH;


            var geometry = dy.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 20;
            geometry.segment = 20;


            var gameObject = dy.GameObject.create();

            gameObject.addComponent(dy.MeshRenderer.create());
            gameObject.addComponent(geometry);


            gameObject.transform.translate(dy.Vector3.create(-30, 20, 0));

            return gameObject;
        }

        function createBox(){
            var material = dy.LightMaterial.create();
            material.specular = dy.Color.create("#ffdd99");
            material.color = dy.Color.create("#666666");
            material.shininess = 16;


            var geometry = dy.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 10;
            geometry.depth = 10;


            var gameObject = dy.GameObject.create();
            gameObject.addComponent(dy.MeshRenderer.create());
            gameObject.addComponent(geometry);


            gameObject.transform.translate(dy.Vector3.create(20, 10, 30));
            gameObject.transform.eulerAngles = dy.Vector3.create(0, 45, 0);


            var action = dy.RepeatForever.create(dy.CallFunc.create(function(){
                gameObject.transform.rotate(0, 1, 0);
            }));

            gameObject.addComponent(action);

            return gameObject;
        }

        function createGround(){
            //var map = dy.LoaderManager.getInstance().get("ground").toTexture();
            var map = dy.ImageTexture.create();
            map.wrapS = dy.TextureWrapMode.REPEAT;
            map.wrapT = dy.TextureWrapMode.REPEAT;
            map.repeatRegion = dy.RectRegion.create(0.5, 0, 5, 5);


            var material = dy.LightMaterial.create();
            material.specular = dy.Color.create("#ffdd99");
            material.shininess = 32;
            material.diffuseMap = map;


            var plane = dy.PlaneGeometry.create();
            plane.width = 200;
            plane.height = 200;
            plane.material = material;


            var gameObject = dy.GameObject.create();
            gameObject.addComponent(dy.MeshRenderer.create());
            gameObject.addComponent(plane);

            return gameObject;
        }

        //function createAmbientLight() {
        //    var ambientLightComponent = dy.AmbientLight.create();
        //    ambientLightComponent.color = dy.Color.create("rgb(30, 30, 30)");
        //
        //    var ambientLight = dy.GameObject.create();
        //    ambientLight.addComponent(ambientLightComponent);
        //
        //    return ambientLight;
        //}

        function createDirectionLight(shadowList) {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

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

            directionLightComponent.shadowRenderList = shadowList;

            var directionLight = dy.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.translate(dy.Vector3.create(0, 50, 50));

            return directionLight;
        }

        beforeEach(function(){
            director = dy.Director.getInstance();

            var sphere = createSphere();
            var box = createBox();
            var ground = createGround();

            director.scene.addChild(sphere);
            //director.scene.addChild(box);
            //director.scene.addChild(ground);
            //director.scene.addChild(createAmbientLight());
            //director.scene.addChild(createDirectionLight([sphere, box, ground]));
            director.scene.addChild(createDirectionLight([sphere]));


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        describe("build twoD shadow map", function(){
            it("send u_mMatrix,u_vMatrix,u_pMatrix,a_position when build", function(){
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

        it("add shadowMapRenderer to scene before init", function(){



            //var sphereProgram = sphereMaterial.shader.program;
            //sandbox.stub(sphereProgram, "sendAttributeData");
            //sandbox.stub(sphereProgram, "sendUniformData");
            //
            //
            //var groundProgram = groundMaterial.shader.program;
            //sandbox.stub(groundProgram, "sendAttributeData");
            //sandbox.stub(groundProgram, "sendUniformData");

            sandbox.stub(director.scene, "addRenderTargetRenderer");
            sandbox.stub(director.scene, "init");

            director._init();

            expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.init);
        });
    });

    describe("point shadow map", function(){
        var director;

        function createBoxes() {
            return [
                createBox(dy.Vector3.create(20, 0, 0)),
                createBox(dy.Vector3.create(-20, 0, 0)),
                createBox(dy.Vector3.create(0, 20, 0)),
                createBox(dy.Vector3.create(0, -20, 0)),
                createBox(dy.Vector3.create(10, 0, 25)),
                createBox(dy.Vector3.create(0, 0, -20))
            ];
        }

        function createBox(position) {
            var material = dy.LightMaterial.create();
            material.specular = dy.Color.create("#ffdd99");
            material.color = dy.Color.create("#666666");
            material.shininess = 16;


            var geometry = dy.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = dy.GameObject.create();
            gameObject.addComponent(dy.MeshRenderer.create());
            gameObject.addComponent(geometry);

            gameObject.transform.translate(position);

            return gameObject;
        }

        function createGrounds() {
            var xzEu = dy.Vector3.create(0, 0, 0);
            var xzNeEu = dy.Vector3.create(0, 0, 180);
            var xyEu = dy.Vector3.create(90, 0, 0);
            var xyNeEu = dy.Vector3.create(-90, 0, 0);
            var yzEu = dy.Vector3.create(0, 0, 90);
            var yzNeEu = dy.Vector3.create(0, 0, -90);

            return [
                createGround(dy.Vector3.create(30, 0, 0), yzEu),
                createGround(dy.Vector3.create(-30, 0, 0), yzNeEu),
                createGround(dy.Vector3.create(0, 30, 0), xzNeEu),
                createGround(dy.Vector3.create(0, -30, 0), xzEu),
                createGround(dy.Vector3.create(0, 0, 30), xyNeEu),
                createGround(dy.Vector3.create(0, 0, -30), xyEu)
            ];
        }

        function createGround(position, eulerAngles) {
            var map = dy.ImageTexture.create();
            map.wrapS = dy.TextureWrapMode.REPEAT;
            map.wrapT = dy.TextureWrapMode.REPEAT;
            map.repeatRegion = dy.RectRegion.create(0.5, 0, 5, 5);


            var material = dy.LightMaterial.create();
            material.specular = dy.Color.create("#ffdd99");
            material.shininess = 32;
            material.side = dy.Side.BOTH;
            material.diffuseMap = map;


            var plane = dy.PlaneGeometry.create();
            plane.width = 100;
            plane.height = 100;
            plane.material = material;


            var ground = dy.GameObject.create();
            ground.addComponent(dy.MeshRenderer.create());
            ground.addComponent(plane);

            ground.transform.eulerAngles = eulerAngles;
            ground.transform.translate(position);

            return ground;
        }

        function createPointLight(boxArr, groundArr) {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;
            var listArr = boxArr.concat(groundArr);

            var pointLightComponent = dy.PointLight.create();
            pointLightComponent.color = dy.Color.create("#ffffff");
            pointLightComponent.intensity = 1;
            pointLightComponent.rangeLevel = 10;
            pointLightComponent.castShadow = true;
            pointLightComponent.shadowCameraNear = 0.1;
            pointLightComponent.shadowCameraFar = 1000;
            pointLightComponent.shadowBias = 0.01;
            pointLightComponent.shadowDarkness = 0.2;
            pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

            pointLightComponent.shadowRenderList = {
                px:listArr,
                nx:listArr,
                py:listArr,
                ny:listArr,
                pz:listArr,
                nz:listArr
            };

            var pointMaterial = dy.BasicMaterial.create();
            pointMaterial.color = dy.Color.create("#ffffff");

            var geometry = dy.SphereGeometry.create();
            geometry.material = pointMaterial;
            geometry.radius = 1;
            geometry.segment = 20;


            var pointLight = dy.GameObject.create();
            pointLight.addComponent(pointLightComponent);
            pointLight.addComponent(geometry);
            pointLight.addComponent(dy.MeshRenderer.create());

            return pointLight;
        }

        beforeEach(function(){
            director = dy.Director.getInstance();

            var boxArr = createBoxes();
            var groundArr = createGrounds();

            director.scene.addChildren(boxArr);
            director.scene.addChildren(groundArr);
            director.scene.addChild(createPointLight(boxArr, groundArr));
            //director.scene.addChild(createCamera());


            director.scene.addChild(testTool.createCamera());

            prepareTool.prepareForMap(sandbox);
        });

        it("add shadowMapRenderer to scene before init", function(){
            sandbox.stub(director.scene, "addRenderTargetRenderer");
            sandbox.stub(director.scene, "init");

            director._init();

            expect(director.scene.addRenderTargetRenderer).toCalledBefore(director.scene.init);
        });
    });
});

