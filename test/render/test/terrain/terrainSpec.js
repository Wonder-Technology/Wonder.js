describe("terrain", function () {
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
        describe("test height map", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    {url: "../../asset/texture/terrain/heightMap.png", id: "heightMap"},
                    {url: "../../asset/texture/terrain/ground.jpg", id: "ground"}
                ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createTerrain());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createTerrain() {
                    var groundMap = wd.LoaderManager.getInstance().get("ground").toTexture();
//            groundMap.repeatRegion = wd.RectRegion.create(0, 0, 2, 2);
//            groundMap.wrapS = wd.ETextureWrapMode.REPEAT;
//            groundMap.wrapT = wd.ETextureWrapMode.REPEAT;

                    var fireTexture = wd.FireProceduralTexture.create();
                    var marbleTexture = wd.MarbleProceduralTexture.create();

                    var material = wd.LightMaterial.create();
                    material.diffuseMap = groundMap;
                    material.shading = wd.EShading.SMOOTH;
                    material.specularMap = fireTexture;
//            material.lightMap = marbleTexture;


                    var geometry = wd.TerrainGeometry.create();
                    geometry.material = material;
                    geometry.subdivisions = 100;
                    geometry.range = {
                        width:100,
                        height:100
                    };
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
                    controller.theta = Math.PI / 4;
                    controller.phi = Math.PI;
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

            it("test height map with specular map, diffuse map", function (done) {
                tester.compareAt(1, "terrain/terrain_heightMap.png", done);
            });
        });

        describe("test layer texture", function () {
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

                    director.scene.addChild(createTerrain());
                    director.scene.addChild(createAmbientLight());
                    director.scene.addChild(createDirectionLight());
                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createTerrain() {
                    var groundMap = wd.LoaderManager.getInstance().get("ground").toTexture();


                    var material = wd.TerrainMaterial.create();

                    material.layer.mapDataList = wdCb.Collection.create([
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
                    ]);



//            material.layer.blendMethod = wd.ETerrainLayerBlendMethod.CUT;

                    material.diffuseMap = groundMap;

                    material.shading = wd.EShading.SMOOTH;


                    var geometry = wd.TerrainGeometry.create();
                    geometry.material = material;
                    geometry.subdivisions = 100;
                    geometry.range = {
                        width:100,
                        height:100
                    };
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
                    controller.theta = Math.PI / 5;
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

            it("test layer texture", function (done) {
                tester.compareAt(1, "terrain/terrain_layerTexture.png", done);
            });
        });
    });
});
