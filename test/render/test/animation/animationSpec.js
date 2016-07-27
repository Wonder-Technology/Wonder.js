describe("animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function(){
        describe("test articulated animation", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/model/gltf/CesiumMilkTruck/glTF-MaterialsCommon/CesiumMilkTruck.gltf", id: "model"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(setModelAndReturn());
                    director.scene.addChild(createCamera());
                    director.scene.addChild(createDirectionLight());

                    director.start();
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 100, 100));

                    return directionLight;
                }

                function setModelAndReturn() {
                    var models = wd.LoaderManager.getInstance().get("model").getChild("models");

                    var frontWheels = models.getChild(1).getChild(3);
                    var backWheels = models.getChild(1).getChild(4);

                    var frontWheelsAnim = frontWheels.getComponent(wd.ArticulatedAnimation);
                    var backWheelsAnim = backWheels.getComponent(wd.ArticulatedAnimation);

                    frontWheelsAnim.play("animation_0");
                    backWheelsAnim.play("animation_1");

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
                    controller.distance = 5;
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

            it("test", function (done) {
                tester.compareAt(1, "animation/animation_articulated.png", done);
            });
        });
    });
});
