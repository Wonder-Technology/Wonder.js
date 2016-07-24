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

        describe("test procedural texture marble", function () {
            function body(assetParentDirPath, done){
                wd.LoaderManager.getInstance().load([
                    {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture1"}
                ]).subscribe(null, null, function () {
                    initSample();


                    tester.init();

                    if(done){
                        done();
                    }
                });

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren([createPlane1(), createPlane2(), createPlane3()]);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    //director.start();
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
                tester = SceneTester.create();

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "procedural/procedural_texture_marble.png", done);
            });
        });
    });
});
