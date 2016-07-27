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

        describe("test morph animation", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.wd", id: "model"},
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.png", id: "skin"}
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


                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("skin").toTexture();
                    material.specularColor = wd.Color.create("rgb(0, 0, 0)");
                    material.shininess = 32;


                    var geo = model.getComponent(wd.Geometry);
                    geo.material = material;


                    var anim = model.getComponent(wd.Animation);
                    anim.play("stand", 10);


//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.pause();
////                anim.stop();
//                    }, 1000);
//
//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.resume();
////                anim.play("stand", 10);
//                    }, 2000);



                    model.transform.rotate(0, -90, 0);

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
                    controller.distance = 70;

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
                tester.compareAt(1, "animation/animation_morph_frame1.png", done);
            });
            it("test frame1000", function (done) {
                tester.compareAt(
                    {
                        frameIndex:1000,
                        step:200,
                        partialCorrectImagePath:"animation/animation_morph_frame1000.png",
                        done:done
                    }
                );
            });
        });

        describe("test translate,rotate,scale animation", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createTriangle());
                    director.scene.addChild(createRect());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createTriangle() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("#888888");
                    material.side = wd.ESide.BOTH;

                    var geometry = wd.TriangleGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                        gameObject.transform.rotate(0, 1, 0);
                    }));

                    gameObject.addComponent(action);

                    gameObject.transform.translate(0, 5, 0);

                    return gameObject;
                }

                function createRect() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("#aaa123");

                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    var tween1 = wd.Tween.create();
                    var tween2 = wd.Tween.create();

                    tween1.from({x: -10, y: 1})
                        .to({x: 10, y: 2}, 3000)
                        .easing(wd.Tween.Easing.Cubic.InOut)
                        .onUpdate(function () {
                            gameObject.transform.position = wd.Vector3.create(this.x, -5, 0);
                            gameObject.transform.scale = wd.Vector3.create(1, this.y, 1);
                        });

                    tween2.from({x: 10, y: 2})
                        .to({x: -10, y: 1}, 3000)
                        .easing(wd.Tween.Easing.Cubic.InOut)
                        .onUpdate(function () {
                            gameObject.transform.position = wd.Vector3.create(this.x, -5, 0);
                            gameObject.transform.scale = wd.Vector3.create(1, this.y, 1);
                        });

                    var action = wd.RepeatForever.create(wd.Sequence.create(tween1, tween2));

                    gameObject.addComponent(action);

                    gameObject.transform.translate(-10, -5, 0);

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

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "animation/animation_translate_rotate_scale_frame1.png", done);
            });
            it("test frame1000", function (done) {
                tester.compareAt(
                    {
                        frameIndex:30,
                        partialCorrectImagePath:"animation/animation_translate_rotate_scale_frame30.png",
                        done:done
                    }
                );
            });
        });
    });
});
