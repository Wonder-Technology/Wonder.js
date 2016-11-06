describe("procedural texture", function () {
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

        describe("test marble procedural texture", function () {
            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/1.jpg", id: "texture1"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren([createPlane1(), createPlane2(), createPlane3()]);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createPlane1() {
                    var marbleTexture = wd.MarbleProceduralTexture.create();
                    marbleTexture.tilesHeightNumber = 3;
                    marbleTexture.tilesWidthNumber = 4;
                    marbleTexture.amplitude = 10;
                    marbleTexture.jointColor = wd.Color.create("rgb(0.9, 0.1, 0.1)");


                    var material = wd.LightMaterial.create();
                    material.specularMap = wd.LoaderManager.getInstance().get("texture1").toTexture();
                    material.diffuseMap = marbleTexture;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));

                    gameObject.transform.translate(50,0,0);

                    return gameObject;
                }

                function createPlane2() {
                    var marbleTexture = wd.MarbleProceduralTexture.create();
                    marbleTexture.tilesHeightNumber = 2;
                    marbleTexture.tilesWidthNumber = 2;
                    marbleTexture.amplitude = 10;


                    var material = wd.BasicMaterial.create();
                    material.map = marbleTexture;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));

                    gameObject.transform.translate(-50,0,0);

                    return gameObject;
                }

                function createPlane3() {
                    var marbleTexture = wd.MarbleProceduralTexture.create();
                    marbleTexture.tilesHeightNumber = 5;
                    marbleTexture.tilesWidthNumber = 5;
                    marbleTexture.amplitude = 5;


                    var material = wd.BasicMaterial.create();
                    material.map = [wd.LoaderManager.getInstance().get("texture1").toTexture(), marbleTexture];


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));

                    gameObject.transform.translate(0,0,0);

                    return gameObject;
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

                    directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
                    controller.distance = 100;

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
                tester.compareAt(1, "procedural/procedural_texture_marble.png", done);
            });
        });

        describe("test more procedural texture", function () {
            function body(wrapper){
                wrapper.load([])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren([createPlane1(), createPlane2(), createPlane3(), createPlane4(), createPlane5()]);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createPlane1() {
                    return createPlane(wd.GrassProceduralTexture.create(), wd.Vector3.create(-100, 0, 0))
                }

                function createPlane2() {
                    return createPlane(wd.WoodProceduralTexture.create(), wd.Vector3.create(-50, 0, 0))
                }

                function createPlane3() {
                    return createPlane(wd.RoadProceduralTexture.create(), wd.Vector3.create(0, 0, 0))
                }

                function createPlane4() {
                    return createPlane(wd.CloudProceduralTexture.create(), wd.Vector3.create(50, 0, 0))
                }

                function createPlane5() {
                    return createPlane(wd.BrickProceduralTexture.create(), wd.Vector3.create(100, 0, 0))
                }

                function createPlane(proceduralTexture, position) {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = proceduralTexture;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));

                    gameObject.transform.position = position;

                    return gameObject;
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

                    directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
                    controller.distance = 150;

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
                tester.compareAt(1, "procedural/procedural_texture_more.png", done);
            });
        });

        describe("test animate procedural texture", function () {
            function body(wrapper){
                wrapper.load([])
                    .do(initSample);


                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(createPlane());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createPlane() {
                    var fireTexture = wd.FireProceduralTexture.create();


                    var material = wd.LightMaterial.create();
                    material.diffuseMap = fireTexture;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));


                    return gameObject;
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

                    directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
                    controller.distance = 100;

                    camera.addComponent(controller);

                    return camera;
                }

            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test at frame 1", function (done) {
                tester.compareAt(
                    {
                        frameIndex: 1,
                        correctRate: 0.95,
                        partialCorrectImagePath: "procedural/procedural_texture_animate_frame1.png",
                        done: done
                    }
                );
            });
            it("test at frame 10", function (done) {
                tester.compareAt(
                    {
                        frameIndex: 10,
                        correctRate: 0.95,
                        partialCorrectImagePath: "procedural/procedural_texture_animate_frame10.png",
                        done: done
                    }
                );
            });
        });

        describe("test custom procedural texture", function () {
            function body(wrapper){
                wrapper.load([
                    {url: "./base/test/render/res/procedural/texture/dirt.jpg", id: "dirt"},
                    {url: "./base/test/render/res/procedural/texture/grass.png", id: "grass"},
                    {url: "./base/test/render/res/procedural/glsl/shaderConfig.json", id: "shaderConfig"},
                    {url: "./base/test/render/res/procedural/glsl/custom_fragment.glsl", id: "fs"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createPlane());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createPlane() {
                    var customTexture = wd.CustomProceduralTexture.create();

                    customTexture.read("shaderConfig");


                    var material = wd.LightMaterial.create();
                    material.diffuseMap = customTexture;


                    var geometry = wd.PlaneGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;

                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.rotate(wd.Vector3.create(90,0,0));

                    return gameObject;
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

                    directionLight.transform.translate(wd.Vector3.create(10, 10, 10));

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
                    controller.distance = 50;

                    controller.theta = Math.PI /1.5;
                    controller.phi = Math.PI /1.5;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("support custom glsl and texture", function (done) {
                tester.compareAt(1, "procedural/procedural_texture_custom.png", done);
            });
        });
    });
});
