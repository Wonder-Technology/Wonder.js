describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createTriangle1());
            director.scene.addChild(createTriangle2());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createTriangle1() {
            var material = wd.BasicMaterial.create();
            material.color= wd.Color.create("rgb(255, 0, 0)");
            material.side = wd.ESide.BOTH;


            var geometry = wd.TriangleGeometry.create();
            geometry.material = material;
            geometry.width = 20;
            geometry.height = 20;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            return gameObject;
        }


        function createTriangle2() {
            var material = wd.BasicMaterial.create();
            material.color= wd.Color.create("rgb(255, 255, 0)");
            material.side = wd.ESide.BOTH;


            var geometry = wd.TriangleGeometry.create();
            geometry.material = material;
            geometry.width = 20;
            geometry.height = 20;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.translate(0, 0, 30);

            return gameObject;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 100;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.distance = 50;
            controller.phi = Math.PI / 2.5;

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
                    imageName:"camera_perspective.png"
                }
            ]
        );
    });
});

