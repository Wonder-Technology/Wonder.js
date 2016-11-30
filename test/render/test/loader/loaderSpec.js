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

    describe("test load .wd file", function() {
        var tester;

        describe("test load file converted from obj", function () {
            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/model/wd/male02/male02.wd", id: "model"}
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

                    // var model = models.getChild(0);
                    //
                    // model.transform.position = wd.Vector3.create(5, 0, 0);
                    // model.transform.scale = wd.Vector3.create(10,10,10);

                    return models;
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
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);


                    directionLight.transform.position = wd.Vector3.create(1,2,3)

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
                    controller.distance = 500;

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
                tester.compareAt(1, "loader/loader_convertedFromOBJ.png", done);
            });
        });

        describe("test load file from md2", function () {
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

                    //
                    // var anim = model.getComponent(wd.Animation);
                    // anim.play("stand", 10);


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

            it("test", function (done) {
                tester.compareAt(2, "loader/loader_convertedFromMD2.png", done);
            });
        });

        describe("test load file from gltf", function () {
            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/model/wd/duck/duck.wd", id: "model"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(setModel());

                    director.start();
                }

                function setModel() {
                    var models = wd.LoaderManager.getInstance().get("model").getChild("models");


                    return models;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "loader/loader_convertedFromGLTF.png", done);
            });
        });

        describe("test load file from fbx", function () {
            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/model/wd/fromFBX/test.wd", id: "model"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();



                    director.scene.addChildren(setModel());

                    director.start();
                }

                function setModel() {
                    var models = wd.LoaderManager.getInstance().get("model").getChild("models");

                    models.forEach(function(model){
                        if(model.hasComponent(wd.Animation)){
                            model.getComponent(wd.Animation).play(0);
                        }
                    });


                    return models;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "loader/loader_convertedFromFBX_frame1.png", done);
            });
            it("test frame3000", function (done) {
                tester.compareAt({
                    frameIndex: 3000,
                    step: 1000,
                    partialCorrectImagePath: "loader/loader_convertedFromFBX_frame3000.png",
                    done: done
                });
            });
        });
    });
});
