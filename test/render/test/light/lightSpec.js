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

        describe("test light map", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/lightMap/ground.png", id: "ground"},
                        {url: "../../asset/texture/lightMap/lightMap.gif", id: "lightMap"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createPlane());
//            director.scene.addChild(createAmbientLight());
//            director.scene.addChild(createPointLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createPlane() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;


                    material.diffuseMap = wd.LoaderManager.getInstance().get("ground").toTexture();

                    material.diffuseMap.repeatRegion = wd.RectRegion.create(0, 0, 5, 5);
                    material.diffuseMap.wrapS = wd.ETextureWrapMode.REPEAT;
                    material.diffuseMap.wrapT = wd.ETextureWrapMode.REPEAT;


                    material.lightMap = wd.LoaderManager.getInstance().get("lightMap").toTexture();

                    material.lightMapIntensity = 1;


                    var plane = wd.PlaneGeometry.create();

                    plane.width = 10;
                    plane.height = 10;
                    plane.material = material;





                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(plane);

                    gameObject.addComponent(wd.MeshRenderer.create());


                    gameObject.transform.rotate(90, 0, 0)


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
                tester.compareAt(1, "light/light_lightMap.png", done);
            });
        });

        describe("test mirror", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere1 = createSphere1();
                    var sphere2 = createSphere2();
                    var box = createBox();

                    var pointLight = createPointLight();

                    director.scene.addChildren([sphere1, sphere2]);
                    director.scene.addChild(box);
                    director.scene.addChild(createMirror1(sphere1, sphere2, box));
                    director.scene.addChild(createAmbientLight());

                    director.scene.addChild(pointLight);
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere1() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(100, 255, 100)");
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createSphere2() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(100, 255, 100)");
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 3;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(25, 10, 0));

                    return gameObject;
                }

                function createBox() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(100, 0, 255)");

                    var boxGeometry = wd.BoxGeometry.create();
                    boxGeometry.material = material;
                    boxGeometry.width = 2;
                    boxGeometry.height = 2;
                    boxGeometry.depth = 2;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(boxGeometry);

                    gameObject.transform.translate(wd.Vector3.create(0, -13, 0));

                    return gameObject;
                }

                function createMirror1(sphere1, sphere2, box){
                    var texture = wd.MirrorTexture.create();
                    texture.width = 1024;
                    texture.height = 1024;
                    texture.renderList = [sphere1, sphere2, box];

//            var material = wd.BasicMaterial.create();
                    var material = wd.MirrorMaterial.create();
                    material.color = wd.Color.create("#aaaaaa");
                    material.side = wd.ESide.BOTH;
                    material.reflectionMap = texture;

                    var plane = wd.PlaneGeometry.create();
                    plane.width = 20;
                    plane.height = 20;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.transform.translate(wd.Vector3.create(0, -10, 0));

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
                    pointLightComponent.color = wd.Color.create("#1f89ca");
                    pointLightComponent.intensity = 1;
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

                    directionLight.transform.translate(wd.Vector3.create(0, 10, 0));
//            directionLight.transform.rotateLocal(wd.Vector3.create(0, 90, 0));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 200;

                    var controller = wd.FlyCameraController.create(cameraComponent);
                    camera.addComponent(controller);

                    camera.transform.translate(wd.Vector3.create(-20, 10, 30));
                    camera.transform.lookAt(wd.Vector3.create(0, 0, 0));

                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "light/light_mirror.png", done);
            });
        });

        describe("test change mirror", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere1 = createSphere1();
                    var sphere2 = createSphere2();
                    var box = createBox();

                    var pointLight = createPointLight();

                    var mirror = createMirror1(sphere1, sphere2, box);

                    director.scene.addChildren([sphere1, sphere2]);
                    director.scene.addChild(box);
                    director.scene.addChild(mirror);
                    director.scene.addChild(createAmbientLight());

                    director.scene.addChild(pointLight);
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();



                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        mirror.getComponent(wd.Geometry).material.reflectionMap.renderList = [];
                    }, 1);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        mirror.getComponent(wd.Geometry).material.reflectionMap.renderList = [sphere1, sphere2];
                    }, 2);
                }

                function createSphere1() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(100, 255, 100)");
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createSphere2() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(100, 255, 100)");
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.diffuseMap = wd.LoaderManager.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 3;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(25, 10, 0));

                    return gameObject;
                }

                function createBox() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(100, 0, 255)");

                    var boxGeometry = wd.BoxGeometry.create();
                    boxGeometry.material = material;
                    boxGeometry.width = 2;
                    boxGeometry.height = 2;
                    boxGeometry.depth = 2;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(boxGeometry);

                    gameObject.transform.translate(wd.Vector3.create(0, -13, 0));

                    return gameObject;
                }

                function createMirror1(sphere1, sphere2, box){
                    var texture = wd.MirrorTexture.create();
                    texture.width = 1024;
                    texture.height = 1024;
                    texture.renderList = [sphere1, sphere2, box];

//            var material = wd.BasicMaterial.create();
                    var material = wd.MirrorMaterial.create();
                    material.color = wd.Color.create("#aaaaaa");
                    material.side = wd.ESide.BOTH;
                    material.reflectionMap = texture;

                    var plane = wd.PlaneGeometry.create();
                    plane.width = 20;
                    plane.height = 20;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.transform.translate(wd.Vector3.create(0, -10, 0));

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
                    pointLightComponent.color = wd.Color.create("#1f89ca");
                    pointLightComponent.intensity = 1;
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

                    directionLight.transform.translate(wd.Vector3.create(0, 10, 0));
//            directionLight.transform.rotateLocal(wd.Vector3.create(0, 90, 0));

                    return directionLight;
                }

                function createCamera() {
                    var camera = wd.GameObject.create(),
                        view = wd.Director.getInstance().view,
                        cameraComponent = wd.PerspectiveCamera.create();

                    cameraComponent.fovy = 60;
                    cameraComponent.aspect = view.width / view.height;
                    cameraComponent.near = 0.1;
                    cameraComponent.far = 200;

                    var controller = wd.FlyCameraController.create(cameraComponent);
                    camera.addComponent(controller);

                    camera.transform.translate(wd.Vector3.create(10, 10, 30));
                    camera.transform.lookAt(wd.Vector3.create(0, 0, 0));

                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test no mirror", function (done) {
                tester.compareAt(1, "light/light_mirror_change_noMirror.png", done);
            });
            it("test has mirror", function (done) {
                tester.compareAt(2, "light/light_mirror_change_hasMirror.png", done);
            });
        });

        describe("test normal map", function () {
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/light/soil_normal.jpg", id: "normalMap"}
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
                    material.color = wd.Color.create("rgb(100, 255, 100)");
                    material.specularColor = wd.Color.create("rgb(0, 255, 0)");
                    material.shininess = 32;
                    material.normalMap = wd.LoaderManager.getInstance().get("normalMap").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.name = "sphere";


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
                tester.compareAt(1, "light/light_normapMap.png", done);
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
