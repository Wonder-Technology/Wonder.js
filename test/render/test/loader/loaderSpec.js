describe("loader", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function() {
        var tester;

        describe("test load basic gltf", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/model/gltf/box/glTF-MaterialsCommon/box.gltf", id: "model"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(setModelAndReturn());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function setModelAndReturn() {
                    var models = wd.LoaderManager.getInstance().get("model").getChild("models");

                    var model = models.getChild(0);

                    model.transform.position = wd.Vector3.create(5, 0, 0);
                    model.transform.scale = wd.Vector3.create(10,10,10);

                    return models;
                }

                function createAmbientLight () {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(100, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#1f8888");
                    directionLightComponent.intensity = 5;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 0, 1000));

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
                    controller.distance = 15;

                    camera.addComponent(controller);

                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "loader/loader_gltf_basic.png", done);
            });
        });

        describe("test load gltf camera", function () {
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
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test default camera", function (done) {
                tester.compareAt(1, "loader/loader_gltf_camera_defaultCamera.png", done);
            });
            it("test gltf camera", function (done) {
                tester.compareAt(2, "loader/loader_gltf_camera_gltfCamera.png", done);
            });
        });

        describe("test load gltf light and articulated animation", function () {
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
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "loader/loader_gltf_light_articulated_frame1.png", done);
            });
            it("test frame3000", function (done) {
                tester.compareAt(3000, "loader/loader_gltf_light_articulated_frame3000.png", done);
            });
        });
    });
});
