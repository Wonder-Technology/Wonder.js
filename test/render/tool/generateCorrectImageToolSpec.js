describe("generate correct image tool", function () {
    var tester;

    function body(){
        initSample();

        function initSample() {
            wd.DeviceManager.getInstance().setViewport(0, 0, 300, 300);

            var director = wd.Director.getInstance();

            director.scene.addChild(createTriangle());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createTriangle() {
            var material = wd.BasicMaterial.create();
            material.color= wd.Color.create("rgb(255, 0, 0)");


            var geometry = wd.TriangleGeometry.create();
            geometry.material = material;
            geometry.width = 20;
            geometry.height = 20;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 80;

            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(wd.Vector3.create(0, 0, 30));


            return camera;
        }
    }

    beforeEach(function () {
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        body();
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.init();

        tester.generateAt(1, "viewport.png");
    });
});

