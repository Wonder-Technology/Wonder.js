describe("clone", function () {
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
        describe("test clone morph animation gameObject", function () {
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
                        count = 1;
                    var animLisit = [
                        ["run", 10],
                        ["attack", 10],
                        ["death", 5],
                        ["wave", 10],
                        ["jump", 10]
                    ];

                    model.transform.position = wd.Vector3.create(60, 24, -40);

                    arr.push(model);


                    for(var i = 0; i < count; i++){
                        var cloneObject = model.clone();

                        cloneObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 24, null);





                        var animData = animLisit[wd.MathUtils.generateInteger(0, 4)];

                        var anim = cloneObject.getComponent(wd.Animation);
                        anim.play(animData[0], animData[1]);




                        arr.push(cloneObject);
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


                    model.addComponent(wd.OneToOneSourceInstance.create());



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

            it("test", function (done) {
                tester.compareAt({
                                        frameIndex:1000,
                    step:200,
                    partialCorrectImagePath:"clone/clone_animation_morph_frame1000.png",
                    correctRate:0.95,
                    done:done
                });
            });
        });

        describe("test clone gameObject", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/1.jpg", id: "texture"},
                        {url: "../../asset/texture/crate.gif", id: "ground"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var sphere = createSphere();
                    sphere.transform.translate(wd.Vector3.create(0, 100, 0));

                    var sphere2 = sphere.clone();
                    sphere2.transform.translate(wd.Vector3.create(100, 0, 0));



                    var box = createBox();
                    box.transform.translate(wd.Vector3.create(0, 0, 0));

                    var box2 = box.clone();
                    box2.transform.translate(wd.Vector3.create(100, 0, 0));



                    var custom = createCustomGeometry();
                    custom.transform.translate(wd.Vector3.create(0, -30, 50));

                    var custom2 = custom.clone();
                    custom2.transform.translate(wd.Vector3.create(100, 0, 0));

                    var ground = createGround();
                    ground.transform.translate(wd.Vector3.create(0, -50, 0));






                    director.scene.addChildren([sphere, sphere2]);
//
                    director.scene.addChildren([box, box2]);

                    director.scene.addChildren([custom, custom2]);

                    director.scene.addChild(ground);

                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createSphere() {
                    var material = wd.BasicMaterial.create();
                    material.map = wd.TextureLoader.getInstance().get("texture").toTexture();


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 20;
                    geometry.segment = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);




                    var child = wd.GameObject.create();

                    child.addComponent(wd.MeshRenderer.create());





                    var material = wd.BasicMaterial.create();
                    material.map = wd.MarbleProceduralTexture.create();


                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 10;
                    geometry.segment = 20;





                    child.addComponent(geometry);





                    child.transform.translate(wd.Vector3.create(-30, 0, 0));


                    gameObject.addChild(child);



                    return gameObject;
                }

                function createBox() {
                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(1.0,0.0,1.0)");
                    material.specularColor = wd.Color.create("#ffffff");


                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 20;
                    geometry.height = 20;
                    geometry.depth = 20;


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var shadow = wd.Shadow.create();

                    gameObject.addComponent(shadow);



                    var child = wd.GameObject.create();

                    child.addComponent(wd.MeshRenderer.create());





                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.FireProceduralTexture.create();


                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;





                    child.addComponent(geometry);


                    var shadow = wd.Shadow.create();

                    child.addComponent(shadow);



                    child.transform.translate(wd.Vector3.create(-30, 0, 0));


                    gameObject.addChild(child);



                    return gameObject;
                }

                function createCustomGeometry() {
                    var material = wd.LightMaterial.create();
                    material.diffuseMap = wd.BrickProceduralTexture.create();
//            material.color = wd.Color.create("rgb(1.0,0.0,1.0)");
//            material.specularColor = wd.Color.create("#ffffff");


                    var geometry = wd.CustomGeometry.create();
                    geometry.material = material;

                    geometry.vertices = [
                        0.0, 10, -10,
                        -10, -10, -10,
                        10, -10, -10
                    ];
                    geometry.indices = [
                        0, 1, 2
                    ];
                    geometry.texCoords = [
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 0.0
                    ];
                    geometry.normals = [
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0
                    ];


                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(wd.MeshRenderer.create());
                    gameObject.addComponent(geometry);


                    var shadow = wd.Shadow.create();

                    gameObject.addComponent(shadow);



                    var child = wd.GameObject.create();

                    child.addComponent(wd.MeshRenderer.create());





                    var material = wd.LightMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 0)");


                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 10;
                    geometry.height = 10;





                    child.addComponent(geometry);


                    var shadow = wd.Shadow.create();

                    child.addComponent(shadow);



                    child.transform.translate(wd.Vector3.create(-30, 0, 0));


                    gameObject.addChild(child);



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
                    plane.width = 500;
                    plane.height = 500;
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

                    directionLight.transform.translate(wd.Vector3.create(0, 500, 500));

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
                    controller.distance = 300;

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
                tester.compareAt({
                    frameIndex:1,
                    partialCorrectImagePath:"clone/clone_gameObject.png",
                    done:done
                });
            });
        });

        describe("test clone model", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/crate.gif", id: "ground"},
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.wd", id: "md2"},
                        {url: "../../asset/model/wd/ratamahatta/ratamahatta.png", id: "skin"},
                        {url: "../../asset/model/gltf/monster/glTF-MaterialsCommon/monster.gltf", id: "gltf"},
                        {url: "../../asset/model/wd/butterfly/butterfly.wd", id: "obj"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.renderer.setClearColor(wd.Color.create("#aaaaff"));

                    var ground = createGround();

                    director.scene.addChild(ground);
                    director.scene.addChildren(createObjs());
                    director.scene.addChildren(createMd2s());
                    director.scene.addChildren(createGLTFs());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
                    director.scene.addChild(createDirectionLight(wd.Vector3.create(500, 500, 0)));
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createObjs(){
                    var arr = [],
                        model = setObj(),
                        range = 300,
                        count = 1;

                    model.transform.position = wd.Vector3.create(60, 20, 0);

                    arr.push(model);

                    for(var i = 0; i < count; i++){
                        var clonedGameObject = model.clone();

                        clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 20, 0);

                        arr.push(clonedGameObject);
                    }

                    return arr;
                }

                function createMd2s(){
                    var arr = [],
                        model = setMd2(),
                        range = 300,
                        count = 2;

                    model.transform.position = wd.Vector3.create(60, 40, -40);

                    arr.push(model);

                    for(var i = 0; i < count; i++){
                        var clonedGameObject = model.clone();

                        clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 40, -40);

                        arr.push(clonedGameObject);
                    }

                    return arr;
                }

                function createGLTFs(){
                    var arr = [],
                        model = setGLTF(),
                        range = 300,
                        count = 2;

                    model.transform.position = wd.Vector3.create(60, 60, 40);

                    arr.push(model);

                    for(var i = 0; i < count; i++){
                        var clonedGameObject = model.clone();

                        clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 60, 40);

                        arr.push(clonedGameObject);
                    }

                    return arr;
                }

                function setObj() {
                    var model = wd.LoaderManager.getInstance().get("obj").getChild("models").getChild(0);

                    model.transform.scale = wd.Vector3.create(400, 400, 400);

                    model.findChildrenByName("wing")
                        .forEach(function (wing) {
                            var wingMaterial = wing.getComponent(wd.Geometry).material;
                            wingMaterial.side = wd.ESide.BOTH;
                            wingMaterial.blend = true;
                            wingMaterial.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                        });

                    model.getChildren()
                        .forEach(function (child) {
                            var material = child.getComponent(wd.Geometry).material;
                            material.shading = wd.EShading.SMOOTH;
                        });




                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    model.addComponent(shadow);


                    model.addComponent(wd.OneToOneSourceInstance.create());


                    return model;
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


                    model.addComponent(wd.OneToOneSourceInstance.create());



                    return model;
                }

                function setGLTF() {
                    var model = wd.LoaderManager.getInstance().get("gltf").getChild("models").getChild(0);


                    var shadow = wd.Shadow.create();
                    shadow.cast = true;
                    shadow.receive = true;

                    model.addComponent(shadow);


                    model.addComponent(wd.OneToOneSourceInstance.create());

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

                function createDirectionLight(pos) {
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
                    controller.distance = 300;

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
                tester.compareAt({
                    frameIndex:1,
                    partialCorrectImagePath:"clone/clone_model.png",
                    done:done
                });
            });
        });

        describe("test clone terrain", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../asset/texture/terrain/heightMap.png", id: "heightMap"},
                        {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                        {url: "../../asset/texture/1.jpg", id: "texture1"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    var terrain = createTerrain();
                    terrain.transform.translate(wd.Vector3.create(-100, 0, 0));


                    var terrain2 = terrain.clone();
                    terrain2.transform.translate(wd.Vector3.create(200, 0, 0));

                    director.scene.addChildren([terrain, terrain2]);
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createTerrain() {
                    var groundMap = wd.LoaderManager.getInstance().get("ground").toTexture();


                    var material = wd.TerrainMaterial.create();

                    material.layer.mapData = [
                        {
                            minHeight:10,
                            maxHeight:20,
                            diffuseMap:wd.LoaderManager.getInstance().get("texture1").toTexture()
                        },
                        {
                            minHeight:20,
                            maxHeight:50,
                            diffuseMap:wd.FireProceduralTexture.create()
                        }
                    ];



//            material.layer.blendMethod = wd.ETerrainLayerBlendMethod.CUT;

                    material.diffuseMap = groundMap;

                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.TerrainGeometry.create();
                    geometry.material = material;
                    geometry.subdivisions = 100;
                    geometry.rangeWidth = 100;
                    geometry.rangeHeight = 100;
                    geometry.minHeight = 0;
                    geometry.maxHeight = 50;
                    geometry.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");
//            geometry.drawMode = wd.EDrawMode.LINE_STRIP;


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

                function createDirectionLight() {
                    var directionLightComponent = wd.DirectionLight.create();
                    directionLightComponent.color = wd.Color.create("#ffffff");
                    directionLightComponent.intensity = 1;


                    var directionLight = wd.GameObject.create();
                    directionLight.addComponent(directionLightComponent);

                    directionLight.transform.translate(wd.Vector3.create(10, 20, 30));

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
                    controller.theta = Math.PI / 2.2;
                    controller.distance = 300;

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
                tester.compareAt({
                    frameIndex:1,
                    partialCorrectImagePath:"clone/clone_terrain.png",
                    done:done
                });
            });
        });
    });
});

