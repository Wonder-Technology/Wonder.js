describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/crate.gif", id: "ground"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            var sphere = createSphere();
            sphere.name = "sphere";

            sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

            var layer1 = "layer1";

//            sphere.getComponent(wd.Shadow).layer = layer1;

//            director.scene.shadowLayerList.addChildren([layer1, wd.EShadowLayer.DEFAULT]);
//            director.scene.shadowLayerList.addChildren([layer1, wd.EShadowLayer.DEFAULT]);


            var sphere2 = createSphere();
            sphere2.name = "sphere2";
//
            sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));

//            var sphere3 = createSphere();
//            sphere3.transform.translate(wd.Vector3.create(-100, 20, 0));


            var ground = createGround();
            ground.name = "ground";

            director.scene.addChild(sphere);
//            director.scene.addChild(sphere2);
            director.scene.addChild(ground);


//            sphere.getComponent(wd.Shadow).layer = layer1;

//            director.scene.shadowLayerList.addChild(layer1);





            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                sphere.getComponent(wd.Shadow).layer = layer1;

                director.scene.shadowMap.shadowLayerList.addChild(layer1);
            }, 1);


            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                director.scene.shadowMap.shadowLayerList.removeChild(layer1);
                director.scene.removeChild(sphere);
            }, 2);




            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                director.scene.shadowMap.shadowLayerList.addChild(layer1);

                director.scene.addChild(sphere);
            }, 3);


            director.scene.addChild(createAmbientLight());
//            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 100, 100)));
            director.scene.addChild(createDirectionLight(wd.Vector3.create(100, 100, 0)));
//            director.scene.addChild(createPointLight(wd.Vector3.create(50, 50, -50)));
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createSphere() {
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 16;
            material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
            material.shading = wd.EShading.SMOOTH;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 20;
            geometry.segment = 20;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);



            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            gameObject.addComponent(shadow);

            return gameObject;
        }

        function createGround(){
            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 200;
            plane.height = 200;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);


            var shadow = wd.Shadow.create();
            shadow.cast = false;
            shadow.receive = true;

            gameObject.addComponent(shadow);


            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createDirectionLight(pos) {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
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

            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.position = pos;

            return directionLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.theta = Math.PI / 4;
            controller.distance = 200;

            camera.addComponent(controller);

            return camera;
        }
    }

    beforeEach(function (done) {
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        tester.execBody(body, done);
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"shadowMap_layer_change.png"
                },
{
                    frameIndex:2,
                    imageName:"shadowMap_layer_remove.png"
                },
                {
                    frameIndex:3,
                    imageName:"shadowMap_layer_add.png"
                }
            ]
        );
    });
});

