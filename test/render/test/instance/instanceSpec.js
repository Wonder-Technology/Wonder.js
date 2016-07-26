describe("instance", function () {
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
        describe("test basic render instance gameObjects", function () {
            var tester;

            function body(wrapper){
                wrapper.load([])
                    .do(initSample);


                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(createModels());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 300,
                        count = 2;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                        instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                        instance.transform.scale = instanceTool.getInstanceScale(i, count);

                        arr.push(instance);
                    }

//            return model;
                    return arr;
                }


                function createSphere(){
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translate(20, 0, 0);
                    boxChild2.transform.translate(-20, 0, 0);

                    boxChild21.transform.translate(-25, 0, 0);


                    gameObject.transform.scale = wd.Vector3.create(8,8,8);


                    return gameObject;
                }

                function createBox(){
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(255, 0, 255)");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    return gameObject;
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

            beforeEach(function () {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();
            });

            it("test", function (done) {
                tester.execBody(body);

                tester.compareAt(1, "instance/instance_render.png", done);
            });
            it("if hardware not support instance, the render result should be the same", function (done) {
                tester.execBody({
                    body:body,
                    init:function () {
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;
                }
                });

                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "instance/instance_render.png",
                    description: "if hardware not support instance, the render result should be the same",
                    done: done
                });
            });
        });

        describe("test render point light shadow instance gameObjects", function () {
            var tester;

            function body(wrapper){
                wrapper.load([])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var models = createModels();
                    var ground = createGround();

                    director.scene.addChild(ground);
                    director.scene.addChildren(models);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createPointLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 300,
                        count = 2;

                    model.transform.position = wd.Vector3.create(60, 20, 0);

                    arr.push(model);

                    var sourceInstanceComponent = model.getComponent(wd.SourceInstance);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, range / 2 - Math.random() * range, range / 2 - Math.random() * range);
//                instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, 60, 0);
//                instance.transform.rotate(90 * Math.random(), 90 * Math.random(),0);
//                instance.transform.scale = wd.Vector3.create(3,3,3);


                        instance.transform.position = instanceTool.getShadowInstancePosition(i, range, count);


//
//                var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
//                    this.transform.rotate(0, 0, Math.random() * 10);
//                }, instance));
//
//                instance.addComponent(action);
//
//
                        arr.push(instance);
                    }

                    return arr;
                }


                function createSphere(){
                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 16;
//            material.diffuseMap = wd.TextureLoader.getInstance().get("texture").toTexture();
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);

                    gameObject.name = "sphere";


                    var sourceInstanceComponent = wd.SourceInstance.create();

                    gameObject.addComponent(sourceInstanceComponent);


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


                    boxChild1.transform.translate(50, 0, 0);
                    boxChild2.transform.translate(-50, 0, 0);

                    boxChild21.transform.translate(-60, 0, 0);






                    gameObject.transform.translate(wd.Vector3.create(-30, 20, 0));


//            boxChild1.transform.translate(wd.Vector3.create(20, 10, 30));
//            boxChild1.transform.eulerAngles = wd.Vector3.create(0, 45, 0);


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



                    //var action = wd.RepeatForever.create(wd.CallFunc.create(function(gameObject){
                    //    gameObject.transform.rotate(0, 1, 0);
                    //}));
                    //
                    //gameObject.addComponent(action);

                    return gameObject;
                }

                function createGround(){
//            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
//            map.name = "groundMap";
//            map.wrapS = wd.ETextureWrapMode.REPEAT;
//            map.wrapT = wd.ETextureWrapMode.REPEAT;
//            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
//            material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 200;
                    plane.height = 200;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.name = "ground";




                    var shadow = wd.Shadow.create();
                    shadow.cast = false;
                    shadow.receive = true;

                    gameObject.addComponent(shadow);




                    gameObject.transform.translate(wd.Vector3.create(1,1,1));


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
                    var SHADOW_MAP_WIDTH = 1024,
                        SHADOW_MAP_HEIGHT = 1024;
//            var listArr = boxArr.concat(groundArr);

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



                    pointLight.transform.translate(wd.Vector3.create(0, 50, 50));

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

            beforeEach(function () {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();
            });

            it("test", function (done) {
                tester.execBody(body);

                tester.compareAt(1, "instance/instance_shadow_pointLight.png", done);
            });
            it("if hardware not support instance, the render result should be the same", function (done) {
                tester.execBody({
                    body:body,
                    inif:function(){
                    wd.GPUDetector.getInstance().extensionInstancedArrays = null;
                }
                });

                tester.compareAt({
                    frameIndex: 1,
                    partialCorrectImagePath: "instance/instance_shadow_pointLight.png",
                    description: "if hardware not support instance, the render result should be the same",
                    done: done
                });
            });
        });

        describe("test add and remove instance gameObjects", function () {
            var tester;

            function body(wrapper){
                wrapper.load([])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();


                    var models = createModels();
                    var source = models[0];
                    var instance = models[1];

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.removeChild(instance);
                    }, 1);

                    wd.Director.getInstance().scheduler.scheduleFrame(function(){
                        director.scene.addChild(instance);

                        instance.init();


                        var instance2 = source.getComponent(wd.SourceInstance).cloneInstance("instance2");

                        instance2.transform.position = wd.Vector3.create(30,30,30);

                        director.scene.addChild(instance2);

                        instance2.init();

                    }, 2);




                    director.scene.addChildren(models);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createModels(){
                    var arr = [],
                        model = createSphere(),
                        range = 100,
                        count = 1;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);
                    model.transform.position = wd.Vector3.create(0, -10, 0);


                    var i = 0;

                    var instance = sourceInstanceComponent.cloneInstance("instance1");

                    instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                    instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                    instance.transform.scale = instanceTool.getInstanceScale(i, count);

                    arr.push(instance);

                    return arr;
                }


                function createSphere(){
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var boxChild1 = createBox();
                    var boxChild2 = createBox();
                    var boxChild21 = createBox();

                    gameObject.addChild(boxChild1);
                    gameObject.addChild(boxChild2);

                    boxChild2.addChild(boxChild21);


                    boxChild1.transform.translate(20, 0, 0);
                    boxChild2.transform.translate(-20, 0, 0);

                    boxChild21.transform.translate(-25, 0, 0);


                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(255, 0, 255)");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


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
                    directionLightComponent.intensity = 2;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(0, 1000, 0));

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

            beforeEach(function () {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();
            });

            it("test remove", function (done) {
                tester.execBody(body);

                tester.compareAt(1, "instance/instance_remove.png", done);
            });
            it("test add", function (done) {
                tester.execBody(body);

                tester.compareAt(2, "instance/instance_add.png", done);
            });
        });

        describe("test instance articulated animation", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/crate.gif", id: "ground"},
                        {
                            url: "../../asset/model/gltf/boxAnimated/glTF-MaterialsCommon/glTF-MaterialsCommon.gltf",
                            id: "model"
                        }
                    ])
                    .do(initSample);


                function initSample() {
                    var director = wd.Director.getInstance();

                    director.renderer.setClearColor(wd.Color.create("#aaaaff"));

                    var ground = createGround();

                    director.scene.addChild(ground);
                    director.scene.addChildren(createGLTFs());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(500, 500, 0)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createGLTFs(){
                    var arr = [],
                        model = setGLTF(),
                        range = 300,
                        count = 10;

                    model.transform.position = wd.Vector3.create(60, 24, -40);

                    arr.push(model);

                    var sourceInstanceComponent = model.getComponent(wd.SourceInstance);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 24, null);




                        var anim = instance.getChild(1).getComponent(wd.ArticulatedAnimation);

                        anim.play("animation_0");



                        arr.push(instance);
                    }

                    return arr;
                }

                function setGLTF() {
                    var models = wd.LoaderManager.getInstance().get("model").getChild("models");

                    var box1 = models.getChild(1);
                    var box2 = models.getChild(2);

                    var boxContainer = wd.GameObject.create();
                    boxContainer.addChildren([box1, box2]);

                    boxContainer.addComponent(wd.SourceInstance.create());



                    box1.transform.scale = wd.Vector3.create(20,20,20);
                    box2.transform.scale = wd.Vector3.create(20,20,20);

                    var anim = box2.getComponent(wd.ArticulatedAnimation);

                    anim.play("animation_1");





//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.pause();
////                anim.stop();
//                    }, 1000);
//
//                    wd.Director.getInstance().scheduler.scheduleTime(function(){
//                        anim.resume();
////                anim.play("animation_1");
//                    }, 2000);

//            return models;
                    return boxContainer;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.name = "groundMap";
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 400;
                    plane.height = 400;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.name = "ground";

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
                    directionLightComponent.shadowBias = 0.005;
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

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();


                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "instance/instance_animation_articulated_frame1.png", done);
            });
            it("test frame3000", function (done) {
                tester.compareAt(
                    {
                        frameIndex:3000,
                        step:3000,
                        partialCorrectImagePath:"instance/instance_animation_articulated_frame3000.png",
                        done:done
                    }
                );
            });
        });

        describe("test instance morph animation", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/crate.gif", id: "ground"},
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.wd", id: "md2"},
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.png", id: "skin"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.renderer.setClearColor(wd.Color.create("#aaaaff"));

                    var ground = createGround();

                    director.scene.addChild(ground);
                    director.scene.addChildren(createMd2s());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(500, 500, 0)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createMd2s(){
                    var arr = [],
                        model = setMd2(),
                        range = 300,
                        count = 10;
//            var animLisit = [
//                ["run", 10],
//                ["attack", 10],
//                ["death", 5],
//                ["wave", 10],
//                ["jump", 10]
//            ];

                    model.transform.position = wd.Vector3.create(60, 24, -40);

                    arr.push(model);

                    var sourceInstanceComponent = model.getComponent(wd.SourceInstance);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 24, null);





//                var animData = animLisit[wd.MathUtils.generateInteger(0, 5)];
//
//                var anim = instance.getComponent(wd.Animation);
//                anim.play(animData[0], animData[1]);




                        arr.push(instance);
                    }

                    return arr;
                }

                function setMd2() {
                    var model = wd.LoaderManager.getInstance().get("md2").getChild("models").getChild(0);


                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.LoaderManager.getInstance().get("skin").toTexture();
                    material.specularColor = wd.Color.create("rgb(0, 0, 0)");
                    material.shininess = 32;


                    var geo = model.getComponent(wd.Geometry);
                    geo.material = material;


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    model.addComponent(shadow);


                    model.addComponent(wd.SourceInstance.create());



                    var anim = model.getComponent(wd.Animation);
                    anim.play("stand", 15);


//            wd.Director.getInstance().scheduler.scheduleTime(function(){
//                anim.pause();
////                anim.stop();
//            }, 1000);
//
//            wd.Director.getInstance().scheduler.scheduleTime(function(){
//                anim.resume();
////                anim.play("stand", 10);
//            }, 2000);



                    return model;
                }

                function createGround(){
                    var map = wd.LoaderManager.getInstance().get("ground").toTexture();
                    map.name = "groundMap";
                    map.wrapS = wd.ETextureWrapMode.REPEAT;
                    map.wrapT = wd.ETextureWrapMode.REPEAT;
                    map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


                    var material = wd.LightMaterial.create();
                    material.specularColor = wd.Color.create("#ffdd99");
                    material.shininess = 32;
                    material.diffuseMap = map;


                    var plane = wd.PlaneGeometry.create();
                    plane.width = 400;
                    plane.height = 400;
                    plane.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(plane);

                    gameObject.name = "ground";

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
                    directionLightComponent.shadowBias = 0.005;
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

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();


                tester.execBody(body, done);
            });

            it("test frame1", function (done) {
                tester.compareAt(1, "instance/instance_animation_morph_frame1.png", done);
            });
            it("test frame3000", function (done) {
                tester.compareAt(
                    {
                        frameIndex:3000,
                        step:200,
                        partialCorrectImagePath:"instance/instance_animation_morph_frame3000.png",
                        done:done
                    }
                );
            });
        });

        describe("test instance envMap for basic material", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                        {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                        {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                        {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                        {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                        {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChildren(createReflectionModels());
                    director.scene.addChildren(createRefractionModels());
                    director.scene.addChild(createSkybox());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSkybox() {
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("px")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nx")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("py")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("ny")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("pz")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nz")
                            }
                        ]
                    );

                    var material = wd.SkyboxMaterial.create();
                    material.envMap = cubemap;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.SkyboxRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createReflectionModels(){
                    var arr = [],
                        model = createSphere(wd.EEnvMapMode.REFLECTION),
                        range = 500,
                        count = 2;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);
                    model.transform.position = wd.Vector3.create(0, -10, 0);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, range / 2 - Math.random() * range, range / 2 - Math.random() * range);
                        instance.transform.rotate(90 * Math.random(), 90 * Math.random(),0);
                        instance.transform.scale = wd.Vector3.create(2,2,2);

                        arr.push(instance);
                    }

                    return arr;
                }

                function createRefractionModels(){
                    var arr = [],
                        model = createSphere(wd.EEnvMapMode.REFRACTION),
                        range = 500,
                        count = 2;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);
                    model.transform.position = wd.Vector3.create(0, 10, 0);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = wd.Vector3.create(range / 2 - Math.random() * range, range / 2 - Math.random() * range, range / 2 - Math.random() * range);
                        instance.transform.rotate(90 * Math.random(), 90 * Math.random(),0);
                        instance.transform.scale = wd.Vector3.create(2,2,2);

                        arr.push(instance);
                    }

                    return arr;
                }

                function createSphere(mode){
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("px")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nx")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("py")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("ny")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("pz")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nz")
                            }
                        ]
                    );
                    cubemap.mode = mode;


                    var material = wd.BasicMaterial.create();
                    material.envMap = cubemap;
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    return gameObject;
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
                tester.compareAt(1, "instance/instance_envMap_basic.png", done);
            });
        });

        describe("test instance envMap for light material", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                        {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                        {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                        {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                        {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                        {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var skybox = createSkybox();
                    var box = createBox();

                    box.transform.position = wd.Vector3.create(60, 0, 0);

                    director.scene.addChild(skybox);
                    director.scene.addChild(box);
                    director.scene.addChildren(createReflectionModels(skybox, box));
//            director.scene.addChildren(createRefractionModels());

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());

                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSkybox() {
                    var cubemap = wd.CubemapTexture.create(
                        [
                            {
                                asset: wd.LoaderManager.getInstance().get("px")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nx")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("py")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("ny")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("pz")
                            },
                            {
                                asset: wd.LoaderManager.getInstance().get("nz")
                            }
                        ]
                    );

                    var material = wd.SkyboxMaterial.create();
                    material.envMap = cubemap;


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.SkyboxRenderer.create());
                    gameObject.addComponent(geometry);

                    return gameObject;
                }

                function createReflectionModels(skybox, box){
                    var arr = [],
                        model = createSphere(skybox, box, wd.EEnvMapMode.REFLECTION),
                        range = 50,
                        count = 2;

                    var sourceInstanceComponent = wd.SourceInstance.create();
                    model.addComponent(sourceInstanceComponent);

                    arr.push(model);
//            model.transform.position = wd.Vector3.create(0, -10, 0);

                    for(var i = 0; i < count; i++){
                        var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                        instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                        instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                        instance.transform.scale = instanceTool.getInstanceScale(i, count);

                        arr.push(instance);
                    }

                    return arr;
                }

                function createSphere(skybox, box, mode){
                    var texture = wd.DynamicCubemapTexture.create();

                    var list = [skybox, box];

                    texture.renderList = {
                        px: list,
                        nx: list,
                        py: list,
                        ny: list,
                        pz: list,
                        nz: list
                    };

                    texture.near = 0.1;
                    texture.far = 1000;
                    texture.size = 256;
                    texture.mode = mode;

                    var material = wd.LightMaterial.create();
                    material.envMap = texture;
                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segment = 5;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    return gameObject;
                }

                function createBox(){
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(255, 0, 255)");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;
                    geometry.depth = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                        gameObject.transform.rotateLocal(0, 1,0);
                    }));

                    gameObject.addComponent(action);



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
                    directionLightComponent.intensity = 2;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(100, 1000, 1000));

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
                tester.compareAt(1, "instance/instance_envMap_light.png", done);
            });
        });
    });
});
