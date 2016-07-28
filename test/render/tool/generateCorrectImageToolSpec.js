describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/lightMap/ground.png", id: "ground"},
                {url: "../../asset/texture/lightMap/lightMap.gif", id: "lightMap"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createPlane());
//            director.scene.addChild(createAmbientLight());
//            director.scene.addChild(createPointLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createPlane() {
            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("rgb(0, 255, 0)");
            material.shininess = 32;


            material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

            material.diffuseMap.repeatRegion = wd.RectRegion.create(0, 0, 5, 5);
            material.diffuseMap.wrapS = wd.ETextureWrapMode.REPEAT;
            material.diffuseMap.wrapT = wd.ETextureWrapMode.REPEAT;


            material.lightMap = wd.LoaderManager.getInstance().get("lightMap").toTexture();

            material.lightMapIntensity = 1;


            var plane = wd.PlaneGeometry.create();

            plane.width = 10;
            plane.height = 10;
            plane.material = material;





            var gameObject = wd.GameObject.create();
            gameObject.addComponent(plane);

            gameObject.addComponent(wd.MeshRenderer.create());


            gameObject.transform.rotate(90, 0, 0)


            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createDirectionLight() {
            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;


            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
            controller.distance = 20;

            camera.addComponent(controller);

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
                    imageName:"light_lightMap.png"
                },
            ]
        );
    });
});

