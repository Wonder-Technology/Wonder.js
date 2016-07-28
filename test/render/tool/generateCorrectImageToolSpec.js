describe("generate correct image lightTool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/model/gltf/duck/glTF-MaterialsCommon/duck.gltf", id: "model"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createDefaultCamera());
            director.scene.addChildren(setModelAndReturn());


            /*!
             can switch camera:
             0: default camera
             1: gltf camera
             */
            director.scene.currentCamera = 0;

            wd.Director.getInstance().scheduler.scheduleFrame(function () {
                director.scene.currentCamera = 0;
            }, 1);

            wd.Director.getInstance().scheduler.scheduleFrame(function () {
                director.scene.currentCamera = 1;
            }, 2);


            director.start();
        }

        function setModelAndReturn() {
            var models = wd.LoaderManager.getInstance().get("model").getChild("models");

            var model = models.getChild(0);

            model.transform.scale = wd.Vector3.create(0.015,0.015,0.015);

            return models;
        }

        function createDefaultCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.01;
            cameraComponent.far = 1000;

            var controller = wd.BasicCameraController.create(cameraComponent);

            camera.addComponent(controller);

            camera.transform.translate(0, 0.03, -0.05);
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
                    imageName:"loader_gltf_camera_defaultCamera.png"
                },
                {
                    frameIndex:2,
                    imageName:"loader_gltf_camera_gltfCamera.png"
                },
            ]
        );
    });
});

