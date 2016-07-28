describe("light", function () {
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

        describe("test diffuse map", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/light/soil_diffuse.jpg", id: "diffuseMap"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSphere());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createPointLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.diffuseMap = wd.LoaderManager.getInstance().get("diffuseMap").toTexture();
                    material.shading = wd.EShading.SMOOTH;
                    material.lightModel = wd.ELightModel.PHONG;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());


                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createPointLight() {
                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#222222");
                    pointLightComponent.intensity = 0.5;
                    pointLightComponent.rangeLevel = 10;

                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#222222");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;

                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());

                    var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                        pointLight.transform.rotateAround(0.5, wd.Vector3.create(0, 0, 0), wd.Vector3.up);
                    }));

                    pointLight.addComponent(action);

                    pointLight.transform.translate(wd.Vector3.create(0, 0, 10));

                    return pointLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#1f8888");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(10, 0, 0));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 80;

                    var controller = wd.ArcballCameraController.create(cameraComponent);
                    controller.distance = 20;

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
                tester.compareAt(1, "light/light_diffuseMap.png", done);
            });
        });

        describe("test emission map", function () {
            function body(wrapper){
                wrapper.load([
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSphere());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createPointLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.emissionMap = wd.FireProceduralTexture.create();
                    material.shading = wd.EShading.SMOOTH;
                    material.lightModel = wd.ELightModel.PHONG;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());


                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createPointLight() {
                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#222222");
                    pointLightComponent.intensity = 0.5;
                    pointLightComponent.rangeLevel = 10;

                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#222222");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;

                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());

                    var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                        pointLight.transform.rotateAround(0.5, wd.Vector3.create(0, 0, 0), wd.Vector3.up);
                    }));

                    pointLight.addComponent(action);

                    pointLight.transform.translate(wd.Vector3.create(0, 0, 10));

                    return pointLight;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#1f8888");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(10, 0, 0));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 80;

                    var controller = wd.ArcballCameraController.create(cameraComponent);
                    controller.distance = 20;

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
                tester.compareAt(1, "light/light_emissionMap.png", done);
            });
        });

        describe("test emission", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/light/soil_specular.jpg", id: "specularMap"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createSphere());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("#ffffff");
                    material.shininess = 32;
                    material.emissionColor = wd.Color.create("rgb(0, 100, 0)");
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());


                    return gameObject;
                }

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(10, 0, 0));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 80;

                    var controller = wd.ArcballCameraController.create(cameraComponent);
                    controller.distance = 20;

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
                tester.compareAt(1, "light/light_emission.png", done);
            });
        });
    });
});
