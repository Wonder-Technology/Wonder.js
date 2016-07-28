describe("cameraController", function () {
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
        describe("test arcball camera controller", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/model/wd/male02/male02.wd", id: "model"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.renderer.setClearColor(wd.Color.create("#aaaaff"));

                    director.scene.addChild(setModel());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function setModel() {
                    var model = wd.LoaderManager.getInstance().get("model").getChild("models").getChild(0);

                    model.transform.translate(0, -80, 0);

                    model.getChildren()
                        .forEach(function (child) {
                            var material = child.getComponent(wd.Geometry).material;
                            material.shading = wd.EShading.SMOOTH;
                        });


                    return model;
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
                    directionLightComponent.intensity = 2;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);


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
                    controller.distance = 200;

                    camera.addComponent(controller);

                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test view from front", function (done) {
                tester.compareAt(1, "camera/camera_arcball_control_viewfromFront.png", done);
            });
            it("test view from top", function (done) {
                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "camera/camera_arcball_control_viewfromTop.png",
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        var controller = camera.getComponent(wd.CameraController);

                        controller.phi = Math.PI / 8
                        controller.theta = 0
                    },
                    done: done
                });
            });
        });
    });
});

