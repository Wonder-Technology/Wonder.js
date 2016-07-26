describe("shadowMap", function () {
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
        var tester;

        describe("test change shadow->receive and receive", function(){
            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/1.jpg", id: "texture"},
                    {url: "../../asset/texture/crate.gif", id: "ground"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere = createSphere();
                    sphere.name = "sphere";

                    sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

                    var layer1 = "layer1";

                    sphere.getComponent(wd.Shadow).layer = layer1;

//            director.scene.shadowLayerList.addChildren([layer1, wd.EShadowLayer.DEFAULT]);


                    var sphere2 = createSphere();
                    sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));



                    var ground = createGround();
                    ground.name = "ground";

                    director.scene.addChild(sphere);
                    director.scene.addChild(sphere2);
                    director.scene.addChild(ground);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        ground.getComponent(wd.Shadow).receive = false;
                    }, 1);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        sphere.getComponent(wd.Shadow).cast = false;


                        ground.getComponent(wd.Shadow).receive = true;
                    }, 2);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        sphere.getComponent(wd.Shadow).cast = true;
//                director.scene.shadowLayerList.addChild(layer1);


                        ground.getComponent(wd.Shadow).receive = true;
                    }, 3);


                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 100, 100)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(100, 100, 0)));
//            director.scene.addChild(createPointLight(wd.Vector3.create(50, 50, -50)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
                    material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);



                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);





                    var boxChild1 = createBox();
                    //var boxChild2 = createBox();
                    //var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
//            gameObject.addChild(boxChild2);
//
//            boxChild2.addChild(boxChild21);


                    boxChild1.transform.translateLocal(50, 0, 0);
                    //boxChild2.transform.translateLocal(-50, 0, 0);

                    //boxChild21.transform.translateLocal(-60, 0, 0);







                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.color = wd.Color.create("#666666");
                    material.shininess = 16;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;
                    geometry.depth = 10;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
                    gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


                    //var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
                    //    gameObject.transform.rotate(0, 1, 0);
                    //}));
                    //
                    //gameObject.addComponent(action);


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);

                    return gameObject;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);


                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);


                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;
                    directionLightComponent.castShadow = true;
                    directionLightComponent.shadowCameraLeft = -200;
                    directionLightComponent.shadowCameraRight = 200;
                    directionLightComponent.shadowCameraTop = 200;
                    directionLightComponent.shadowCameraBottom = -200;
                    directionLightComponent.shadowCameraNear = 0.1;
                    directionLightComponent.shadowCameraFar = 1000;
                    directionLightComponent.shadowBias = 0.002;
                    directionLightComponent.shadowDarkness = 0.2;
                    directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.position = pos;

                    return directionLight;
                }

                function createPointLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#ffffff");
                    pointLightComponent.intensity = 2;
                    pointLightComponent.rangeLevel = 11;
                    pointLightComponent.castShadow = true;
                    pointLightComponent.shadowCameraNear = 0.1;
                    pointLightComponent.shadowCameraFar = 1000;
                    pointLightComponent.shadowBias = 0.01;
                    pointLightComponent.shadowDarkness = 0.2;
                    pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

//            pointLightComponent.shadowRenderList = {
//                px:listArr,
//                nx:listArr,
//                py:listArr,
//                ny:listArr,
//                pz:listArr,
//                nz:listArr
//            };

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#ffffff");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;


                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);
                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());



                    pointLight.transform.position = pos;

                    return pointLight;
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
                    controller.theta = Math.PI / 4;
                    controller.distance = 200;

                    camera.addComponent(controller);

                    return camera;
                }

            }

            beforeEach(function(done){
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test1", function(done){
                tester.compareAt(1, "shadow/shadowMap_changReceiveAndCast_1.png", done);
            });
            it("test2", function(done){
                tester.compareAt(2, "shadow/shadowMap_changReceiveAndCast_2.png", done);
            });
            it("test3", function(done){
                tester.compareAt(3, "shadow/shadowMap_changReceiveAndCast_3.png", done);
            });
        });

        describe("test add shadow gameObject", function(){
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/crate.gif", id: "ground"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere = createSphere();
                    sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

                    var sphere2 = createSphere();
                    sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));

//            var sphere3 = createSphere();
//            sphere3.transform.translate(wd.Vector3.create(-100, 20, 0));


                    var ground = createGround();

                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.addChild(sphere2);

                        sphere2.init();



//                director.scene.addChild(sphere3);

//                sphere3.getComponent(wd.Shadow).cast = false;


//                sphere3.init();
                    }, 1);



                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
                    material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);



                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);





                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translateLocal(50, 0, 0);
                    boxChild2.transform.translateLocal(-50, 0, 0);

                    boxChild21.transform.translateLocal(-60, 0, 0);







                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.color = wd.Color.create("#666666");
                    material.shininess = 16;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;
                    geometry.depth = 10;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
                    gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


//            var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
//                gameObject.transform.rotate(0, 1, 0);
//            }));
//
//            gameObject.addComponent(action);


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);

                    return gameObject;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);


                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);


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
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;
                    directionLightComponent.castShadow = true;
                    directionLightComponent.shadowCameraLeft = -500;
                    directionLightComponent.shadowCameraRight = 500;
                    directionLightComponent.shadowCameraTop = 500;
                    directionLightComponent.shadowCameraBottom = -500;
                    directionLightComponent.shadowCameraNear = 0.1;
                    directionLightComponent.shadowCameraFar = 1000;
                    directionLightComponent.shadowBias = 0.002;
                    directionLightComponent.shadowDarkness = 0.2;
                    directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 200, 200));

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
                    controller.theta = Math.PI / 8;
                    controller.distance = 350;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function(done){
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("should show the added gameObject's and its children's shadow", function(done){
                tester.compareAt(1, "shadow/shadowMap_add.png", done);
            });
        });


        describe("test remove shadow gameObject", function(){
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/crate.gif", id: "ground"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere = createSphere();
                    sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

                    var sphere2 = createSphere();
                    sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));
                    var ground = createGround();

                    director.scene.addChild(sphere);
//            director.scene.addChild(sphere2);
                    director.scene.addChild(ground);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.removeChild(sphere);
                    }, 1);



                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createPointLight(wd.Vector3.create(100, 100, 100)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
                    material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);



                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);





                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translateLocal(50, 0, 0);
                    boxChild2.transform.translateLocal(-50, 0, 0);

                    boxChild21.transform.translateLocal(-60, 0, 0);







                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.color = wd.Color.create("#666666");
                    material.shininess = 16;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;
                    geometry.depth = 10;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
                    gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


                    var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
                        gameObject.transform.rotate(0, 1, 0);
                    }));

                    gameObject.addComponent(action);


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);

                    return gameObject;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);


                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);


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
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;
                    directionLightComponent.castShadow = true;
                    directionLightComponent.shadowCameraLeft = -500;
                    directionLightComponent.shadowCameraRight = 500;
                    directionLightComponent.shadowCameraTop = 500;
                    directionLightComponent.shadowCameraBottom = -500;
                    directionLightComponent.shadowCameraNear = 0.1;
                    directionLightComponent.shadowCameraFar = 1000;
                    directionLightComponent.shadowBias = 0.002;
                    directionLightComponent.shadowDarkness = 0.2;
                    directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 200, 200));

                    return directionLight;
                }

                function createPointLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#ffffff");
                    pointLightComponent.intensity = 2;
                    pointLightComponent.rangeLevel = 11;
                    pointLightComponent.castShadow = true;
                    pointLightComponent.shadowCameraNear = 0.1;
                    pointLightComponent.shadowCameraFar = 1000;
                    pointLightComponent.shadowBias = 0.01;
                    pointLightComponent.shadowDarkness = 0.2;
                    pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#ffffff");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;


                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);
                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());

                    pointLight.transform.position = pos;

                    return pointLight;
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
                    controller.theta = Math.PI / 4;
                    controller.distance = 200;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function(done){
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function(done){
                tester.compareAt(1, "shadow/shadowMap_remove.png", done);
            });
        });

        describe("test change shadow layer", function(){
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/crate.gif", id: "ground"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere = createSphere();
                    sphere.name = "sphere";

                    sphere.transform.translate(wd.Vector3.create(-30, 20, 0));

                    var layer1 = "layer1";

//            sphere.getComponent(wd.Shadow).layer = layer1;

//            director.scene.shadowLayerList.addChildren([layer1, wd.EShadowLayer.DEFAULT]);
//            director.scene.shadowLayerList.addChildren([layer1, wd.EShadowLayer.DEFAULT]);


                    var sphere2 = createSphere();
                    sphere2.name = "sphere2";
//
                    sphere2.transform.translate(wd.Vector3.create(-70, 20, 0));

//            var sphere3 = createSphere();
//            sphere3.transform.translate(wd.Vector3.create(-100, 20, 0));


                    var ground = createGround();
                    ground.name = "ground";

                    director.scene.addChild(sphere);
//            director.scene.addChild(sphere2);
                    director.scene.addChild(ground);


//            sphere.getComponent(wd.Shadow).layer = layer1;

//            director.scene.shadowLayerList.addChild(layer1);





                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        sphere.getComponent(wd.Shadow).layer = layer1;

                        director.scene.shadowMap.shadowLayerList.addChild(layer1);
                    }, 1);


                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.shadowMap.shadowLayerList.removeChild(layer1);
                        director.scene.removeChild(sphere);
                    }, 2);




                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.shadowMap.shadowLayerList.addChild(layer1);

                        director.scene.addChild(sphere);
                    }, 3);


                    director.scene.addChild(createAmbientLight());
//            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 100, 100)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(100, 100, 0)));
//            director.scene.addChild(createPointLight(wd.Vector3.create(50, 50, -50)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
                    material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);



                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);

                    return gameObject;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);


                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);


                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;
                    directionLightComponent.castShadow = true;
                    directionLightComponent.shadowCameraLeft = -100;
                    directionLightComponent.shadowCameraRight = 100;
                    directionLightComponent.shadowCameraTop = 100;
                    directionLightComponent.shadowCameraBottom = -100;
                    directionLightComponent.shadowCameraNear = 0.1;
                    directionLightComponent.shadowCameraFar = 1000;
                    directionLightComponent.shadowBias = 0.002;
                    directionLightComponent.shadowDarkness = 0.2;
                    directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.position = pos;

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
                    controller.theta = Math.PI / 4;
                    controller.distance = 200;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function(done){
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test change layer", function(done){
                tester.compareAt(1, "shadow/shadowMap_layer_change.png", done);
            });
            it("test remove layer", function(done){
                tester.compareAt(2, "shadow/shadowMap_layer_remove.png", done);
            });
            it("test add layer", function(done){
                tester.compareAt(3, "shadow/shadowMap_layer_add.png", done);
            });
        });

        describe("test disable shadow", function(){
            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/crate.gif", id: "ground"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.shadowMap.enable = false;

                    var sphere = createSphere();
                    sphere.transform.translate(wd.Vector3.create(-30, 20, 0));


                    var ground = createGround();

                    director.scene.addChild(sphere);
                    director.scene.addChild(ground);


                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 100, 100)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(100, 100, 0)));
                    director.scene.addChild(createPointLight(wd.Vector3.create(50, 50, -50)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
                    material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);



                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);





                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
//            gameObject.addChild(boxChild2);
//
//            boxChild2.addChild(boxChild21);


                    boxChild1.transform.translateLocal(50, 0, 0);
                    boxChild2.transform.translateLocal(-50, 0, 0);

                    boxChild21.transform.translateLocal(-60, 0, 0);







                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.color = wd.Color.create("#666666");
                    material.shininess = 16;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;
                    geometry.depth = 10;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
                    gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


                    var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
                        gameObject.transform.rotate(0, 1, 0);
                    }));

                    gameObject.addComponent(action);


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);

                    return gameObject;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);


                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);


                    return gameObject;
                }

                function createAmbientLight() {
                    var ambientLightComponent = wd.AmbientLight.create();
                    ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                    var ambientLight = wd.GameObject.create();
                    ambientLight.addComponent(ambientLightComponent);

                    return ambientLight;
                }

                function createDirectionLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;
                    directionLightComponent.castShadow = true;
                    directionLightComponent.shadowCameraLeft = -200;
                    directionLightComponent.shadowCameraRight = 200;
                    directionLightComponent.shadowCameraTop = 200;
                    directionLightComponent.shadowCameraBottom = -200;
                    directionLightComponent.shadowCameraNear = 0.1;
                    directionLightComponent.shadowCameraFar = 1000;
                    directionLightComponent.shadowBias = 0.002;
                    directionLightComponent.shadowDarkness = 0.2;
                    directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.position = pos;

                    return directionLight;
                }

                function createPointLight(pos) {
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;

                    var pointLightComponent = wd.PointLight.create();
                    pointLightComponent.color = wd.Color.create("#ffffff");
                    pointLightComponent.intensity = 2;
                    pointLightComponent.rangeLevel = 11;
                    pointLightComponent.castShadow = true;
                    pointLightComponent.shadowCameraNear = 0.1;
                    pointLightComponent.shadowCameraFar = 1000;
                    pointLightComponent.shadowBias = 0.01;
                    pointLightComponent.shadowDarkness = 0.2;
                    pointLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                    pointLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

//            pointLightComponent.shadowRenderList = {
//                px:listArr,
//                nx:listArr,
//                py:listArr,
//                ny:listArr,
//                pz:listArr,
//                nz:listArr
//            };

                    var pointSphereMaterial = wd.BasicMaterial.create();
                    pointSphereMaterial.color = wd.Color.create("#ffffff");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = pointSphereMaterial;
                    geometry.radius = 1;
                    geometry.segment = 20;


                    var pointLight = wd.GameObject.create();
                    pointLight.addComponent(pointLightComponent);
                    pointLight.addComponent(geometry);
                    pointLight.addComponent(wd.MeshRenderer.create());



                    pointLight.transform.position = pos;

                    return pointLight;
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
                    controller.theta = Math.PI / 4;
                    controller.distance = 200;

                    camera.addComponent(controller);

                    return camera;
                }
            }

            beforeEach(function(done){
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function(done){
                tester.compareAt(1, "shadow/shadowMap_disable.png", done);
            });
        });

        describe("test soft shadow", function(){
            describe("test pcf shadow", function(){
                function body(wrapper){
                    wrapper.load([
                            {url: "../../asset/texture/1.jpg", id: "texture"},
                            {url: "../../asset/texture/crate.gif", id: "ground"}
                        ])
                        .do(initSample);

                    function initSample() {
                        var director = wd.Director.getInstance();

                        var sphere = createSphere();
                        var box = createBox();
                        var ground = createGround();

                        director.scene.addChild(sphere);
                        director.scene.addChild(box);
                        director.scene.addChild(ground);
                        director.scene.addChild(createAmbientLight());
                        director.scene.addChild(createDirectionLight());
                        director.scene.addChild(createCamera());

                        director.scene.shadowMap.softType = wd.EShadowMapSoftType.PCF;

                        director.start();
                    }

                    function createSphere() {
                        var material = wd.LightMaterial.create();
                        material.specularColor = wd.Color.create("#ffdd99");
                        material.shininess = 16;
                        material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                        material.shading = wd.EShading.SMOOTH;


                        var geometry = wd.SphereGeometry.create();
                        geometry.material = material;
                        geometry.radius = 20;
                        geometry.segment = 20;


                        var gameObject = wd.GameObject.create();

                        gameObject.addComponent(wd.MeshRenderer.create());
                        gameObject.addComponent(geometry);

                        var shadow = wd.Shadow.create();
                        shadow.cast = true;
                        shadow.receive = true;

                        gameObject.addComponent(shadow);

                        gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));

                        return gameObject;
                    }

                    function createBox(){
                        var material = wd.LightMaterial.create();
                        material.specularColor = wd.Color.create("#ffdd99");
                        material.color = wd.Color.create("#666666");
                        material.shininess = 16;


                        var geometry = wd.BoxGeometry.create();
                        geometry.material = material;
                        geometry.width = 10;
                        geometry.height = 10;
                        geometry.depth = 10;


                        var gameObject = wd.GameObject.create();
                        gameObject.addComponent(wd.MeshRenderer.create());
                        gameObject.addComponent(geometry);

                        var shadow = wd.Shadow.create();
                        shadow.cast = true;
                        shadow.receive = true;

                        gameObject.addComponent(shadow);




                        gameObject.transform.translate(wd.Vector3.create(20, 10, 30));
                        gameObject.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


                        //var action = wd.RepeatForever.create(wd.CallFunc.create(function(){
                        //    gameObject.transform.rotate(0, 1, 0);
                        //}));
                        //
                        //gameObject.addComponent(action);

                        return gameObject;
                    }

                    function createGround(){
                        var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                        map.wrapS = wd.ETextureWrapMode.REPEAT;
                        map.wrapT = wd.ETextureWrapMode.REPEAT;
                        map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                        var material = wd.LightMaterial.create();
                        material.specularColor = wd.Color.create("#ffdd99");
                        material.shininess = 32;
                        material.diffuseMap = map;


                        var plane = wd.PlaneGeometry.create();
                        plane.width = 200;
                        plane.height = 200;
                        plane.material = material;


                        var gameObject = wd.GameObject.create();
                        gameObject.addComponent(wd.MeshRenderer.create());
                        gameObject.addComponent(plane);



                        var shadow = wd.Shadow.create();
                        shadow.cast = true;
                        shadow.receive = true;

                        gameObject.addComponent(shadow);

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
                        var SHADOW_MAP_WIDTH = 1024,
                            SHADOW_MAP_HEIGHT = 1024;

                        var directionLightComponent = wd.DirectionLight.create();
                        directionLightComponent.color = wd.Color.create("#ffffff");
                        directionLightComponent.intensity = 1;
                        directionLightComponent.castShadow = true;
                        directionLightComponent.shadowCameraLeft = -100;
                        directionLightComponent.shadowCameraRight = 100;
                        directionLightComponent.shadowCameraTop = 100;
                        directionLightComponent.shadowCameraBottom = -100;
                        directionLightComponent.shadowCameraNear = 0.1;
                        directionLightComponent.shadowCameraFar = 1000;
                        directionLightComponent.shadowBias = 0.002;
                        directionLightComponent.shadowDarkness = 0.2;
                        directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
                        directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;


                        var directionLight = wd.GameObject.create();
                        directionLight.addComponent(directionLightComponent);

                        directionLight.transform.translate(wd.Vector3.create(0, 50, 50));

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

                        var controller = wd.FlyCameraController.create(cameraComponent);

                        camera.addComponent(controller);

                        camera.transform.translate(0, 10, 10);
                        camera.transform.lookAt(10, 0, 0);

                        return camera;
                    }
                }

                beforeEach(function(done){
                    tester = SceneTester.create(sandbox);

                    renderTestTool.prepareContext();

                    tester.execBody(body, done);
                });

                it("test", function(done){
                    tester.compareAt(1, "shadow/shadowMap_pcf.png", done);
                });
            });
        });
    });
});
