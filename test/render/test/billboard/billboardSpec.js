describe("billboard", function () {
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
        describe("test Y mode and ALL mode billboard", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createNoBillboardPlane());
                    director.scene.addChild(createBillboardAllPlane());
                    director.scene.addChild(createBillboardYPlane());
                    director.scene.addChild(sceneTool.createCamera(30));

                    director.start();
                }

                function createNoBillboardPlane() {
                    var material = wd.BasicMaterial.create();
                    material.map = wd.LoaderManager.getInstance().get("texture").toTexture();
                    material.side = wd.ESide.BOTH;


                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;



                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(0, 10, 0);

                    return gameObject;
                }

                function createBillboardYPlane() {
                    return createBillboardPlane(wd.EBillboardMode.Y);
                }

                function createBillboardAllPlane() {
                    return createBillboardPlane(wd.EBillboardMode.ALL, wd.Vector3.create(0, -10, 0));
                }

                function createBillboardPlane(mode, pos) {
                    var material = wd.BasicMaterial.create();
                    material.map = wd.LoaderManager.getInstance().get("texture").toTexture();


                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;


                    var billboard = wd.Billboard.create();
                    billboard.mode = mode;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);
                    gameObject.addComponent(billboard);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    if(pos){
                        gameObject.transform.position = pos;
                    }

                    return gameObject;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test view from front", function (done) {
                tester.compareAt(1, "billboard/billboard_viewFromFront.png", done);
            });
            it("test view from top", function (done) {
                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "billboard/billboard_viewFromTop.png",
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
