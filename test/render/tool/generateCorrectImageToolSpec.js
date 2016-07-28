describe("generate correct image lightTool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/model/gltf/boxAnimated/glTF-MaterialsCommon/glTF-MaterialsCommon.gltf", id: "model"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChildren(setModelAndReturn());
            director.scene.addChild(createCamera());

            director.start();
        }

        function setModelAndReturn() {
            var models = wd.LoaderManager.getInstance().get("model").getChild("models");

            var box1 = models.getChild(1);
            var box2 = models.getChild(2);

            box1.transform.scale = wd.Vector3.create(5,5,5);
            box2.transform.scale = wd.Vector3.create(5,5,5);

            var anim = box2.getComponent(wd.ArticulatedAnimation);

//            anim.play("animation_0");
            anim.play("animation_1");





            wd.Director.getInstance().scheduler.scheduleTime(function(){
                anim.pause();
//                anim.stop();
            }, 1000);

            wd.Director.getInstance().scheduler.scheduleTime(function(){
                anim.resume();
//                anim.play("animation_1");
            }, 2000);

            return models;
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
            controller.distance = 10;
            controller.theta = Math.PI / 4;

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
                    imageName:"loader_gltf_light_articulated_frame1.png"
                },
                {
                    frameIndex:3000,
                    step:1000,
                    imageName:"loader_gltf_light_articulated_frame3000.png"
                },
            ]
        );
    });
});

