describe("camera", function () {
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
        describe("test orthographic camera", function () {
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
                        cameraComponent = wd.OrthographicCamera.create();

                    cameraComponent.left = -100;
                    cameraComponent.right = 100;
                    cameraComponent.top = 100;
                    cameraComponent.bottom = -100;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 1000;

                    var controller = wd.ArcballCameraController.create(cameraComponent);
                    controller.distance = 50;
                    controller.phi = Math.PI / 2.5;

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
                tester.compareAt(1, "camera/camera_orthographic.png", done);
            });
        });
    });
});

