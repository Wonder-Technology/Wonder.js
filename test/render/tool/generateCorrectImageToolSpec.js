describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/1.jpg", id: "texture"},
                {url: "../../asset/texture/crate.gif", id: "ground"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            var boxArr = createBoxes();
            var groundArr = createGrounds();

            director.scene.addChildren(boxArr);
            director.scene.addChildren(groundArr);
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createPointLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createBoxes() {
            return [
                createBox(wd.Vector3.create(20, 0, 0)),
                createBox(wd.Vector3.create(-20, 0, 0)),
                createBox(wd.Vector3.create(0, 20, 0)),
                createBox(wd.Vector3.create(0, -20, 0)),
                createBox(wd.Vector3.create(10, 0, 25)),
                createBox(wd.Vector3.create(0, 0, -20))
            ];
        }

        function createBox(position) {
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.color = wd.Color.create("#666666");
            material.shininess = 16;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            gameObject.addComponent(shadow);



            gameObject.transform.translate(position);




            return gameObject;
        }

        function createGrounds() {
            var xzEu = wd.Vector3.create(0, 0, 0);
            var xzNeEu = wd.Vector3.create(0, 0, 180);
            var xyEu = wd.Vector3.create(90, 0, 0);
            var xyNeEu = wd.Vector3.create(-90, 0, 0);
            var yzEu = wd.Vector3.create(0, 0, 90);
            var yzNeEu = wd.Vector3.create(0, 0, -90);

            return [
                createGround(wd.Vector3.create(30, 0, 0), yzEu),
                createGround(wd.Vector3.create(-30, 0, 0), yzNeEu),
                createGround(wd.Vector3.create(0, 30, 0), xzNeEu),
                createGround(wd.Vector3.create(0, -30, 0), xzEu),
                createGround(wd.Vector3.create(0, 0, 30), xyNeEu),
                createGround(wd.Vector3.create(0, 0, -30), xyEu)
            ];
        }

        function createGround(position, eulerAngles) {
            var map = wd.TextureLoader.getInstance().get("ground").toTexture();
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.side = wd.ESide.BOTH;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 100;
            plane.height = 100;
            plane.material = material;


            var ground = wd.GameObject.create();
            ground.addComponent(wd.MeshRenderer.create());
            ground.addComponent(plane);




            var shadow = wd.Shadow.create();
            shadow.cast = false;
            shadow.receive = true;

            ground.addComponent(shadow);





            ground.transform.eulerAngles = eulerAngles;
            ground.transform.translate(position);

            return ground;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createPointLight() {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

            var pointLightComponent = wd.PointLight.create();
            pointLightComponent.color = wd.Color.create("#ffffff");
            pointLightComponent.intensity = 1;
            pointLightComponent.rangeLevel = 10;
            pointLightComponent.castShadow = true;
            pointLightComponent.shadowCameraNear = 0.1;
            pointLightComponent.shadowCameraFar = 1000;
            pointLightComponent.shadowBias = 0.01;
            pointLightComponent.shadowDarkness = 0.2;
            pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

            var pointSphereMaterial = wd.BasicMaterial.create();
            pointSphereMaterial.color = wd.Color.create("#ffffff");

            var geometry = wd.SphereGeometry.create();
            geometry.material = pointSphereMaterial;
            geometry.radius = 1;
            geometry.segment = 20;


            var pointLight = wd.GameObject.create();
            pointLight.addComponent(pointLightComponent);
            pointLight.addComponent(geometry);
            pointLight.addComponent(wd.MeshRenderer.create());

            return pointLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.FlyCameraController.create(cameraComponent);

            camera.addComponent(controller);

            camera.transform.translate(10, 0, 19);
            camera.transform.lookAt(0, 0, 0);

            return camera;
        }


    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();


        tester.execBody(body, done);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"shadow_point_shadowMap.png"
                }
            ]
        );
    });
});

