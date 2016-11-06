describe("grass map", function () {
    var sandbox = null;
    var tester;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("test animation", function () {
        function body(wrapper){
            wrapper.load([
                {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
                {url: "../../asset/texture/grass/grassPack.png", id: "grassPack"}
            ])
                .do(initSample);

            function initSample() {
                var director = wd.Director.getInstance();

                director.scene.addChild(createGrass());
                director.scene.addChild(createAmbientLight());
                director.scene.addChild(createDirectionLight());
                director.scene.addChild(createCamera());

                director.start();
            }

            function createTerrain() {
                var groundMap = wd.LoaderManager.getInstance().get("ground").toTexture();
                var material = wd.LightMaterial.create();
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
                geometry.isHeightMapStoreHeightInEachPixel = false;


                var gameObject = wd.GameObject.create();
                gameObject.addComponent(geometry);

                gameObject.addComponent(wd.MeshRenderer.create());

                gameObject.transform.position = wd.Vector3.create(0, 10, 0);
                gameObject.transform.scale = wd.Vector3.create(1,2,1);


                return gameObject;
            }

            function createGrass() {
                var grassMap = wd.LoaderManager.getInstance().get("grassPack").toTexture();
                var width = grassMap.width / 4,
                    height = grassMap.height;
                var mapData = [
                    {
                        sourceRegion:wd.RectRegion.create(0, 0, width, height)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(width, 0, width, height)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(width * 2, 0, width, height)
                    }
                ];




                var material = wd.GrassMapMaterial.create();

                material.grassMap = grassMap;
                material.alphaTest = 0.1;
                material.mapData = mapData;
                material.wind.strength = 10;







                var geometry = wd.GrassMapGeometry.create();
                geometry.material = material;
                geometry.width = 10;
                geometry.height = 20;



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

        it("test frame1", function (done) {
            tester.compareAt({
                frameIndex:1,
                correctRate:0.95,
                partialCorrectImagePath:"grass/grass_map_frame1.png",
                done:done
            });
        });
        it("test frame5", function (done) {
            tester.compareAt({
                frameIndex:5,
                correctRate:0.95,
                partialCorrectImagePath:"grass/grass_map_frame5.png",
                done:done
            });
        });
    });
});

