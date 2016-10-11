describe("grass instance", function () {
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

    describe("test render", function () {
        function body(wrapper){
            wrapper.load([
                {url: "../../../asset/texture/terrain/heightMap.png", id: "heightMap"},
                {url: "../../../asset/texture/terrain/ground.jpg", id: "ground"},
                {url: "../../../asset/texture/grass/grass.jpg", id: "grass"}
            ])
                .do(initSample);

            function initSample() {
                var director = wd.Director.getInstance();


                var terrain = createTerrain();

                director.scene.addChild(terrain);

                director.scene.addChildren(createGrasses(terrain));


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
                geometry.rangeWidth = 100;
                geometry.rangeHeight = 100;
                geometry.minHeight = 0;
                geometry.maxHeight = 20;
                geometry.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");


                var gameObject = wd.GameObject.create();
                gameObject.addComponent(geometry);

                gameObject.addComponent(wd.MeshRenderer.create());


                return gameObject;
            }

            function createGrasses(terrain){
                var arr = [],
                    grass = createGrass(terrain);

                arr.push(grass);




                var count = 10,
                    range = 50;

                for (var index = 0; index < count; index++){
                    var item = grass.clone({
                        cloneChildren:false,
                        shareGeometry:false,
                        cloneGeometry:true
                    });


                    var pos = instanceTool.getInstancePosition(index, range, count)


                    item.transform.position = wd.Vector3.create(pos.x, item.transform.position.y, pos.z);

                    arr.push(item);
                }

                return arr;
            }


            function createGrass(terrain){
                var material = wd.GrassInstanceMaterial.create();

                material.map = wd.LoaderManager.getInstance().get("grass").toTexture();
                material.terrainGeometry = terrain.getComponent(wd.TerrainGeometry);



                var geometry = wd.GrassInstanceGeometry.create();
                geometry.material = material;
                geometry.bladeCount = 100;
                geometry.bladeWidth = 1;
                geometry.rangeWidth = 10;
                geometry.rangeHeight = 10;



                var gameObject = wd.GameObject.create();
                gameObject.addComponent(geometry);

                gameObject.addComponent(wd.MeshRenderer.create());


                var sourceInstanceComponent = wd.OneToManySourceInstance.create();
                gameObject.addComponent(sourceInstanceComponent);

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
                controller.distance = 50;

                camera.addComponent(controller);

                return camera;
            }
        }

        beforeEach(function (done) {
            tester = SceneTester.create(sandbox);

            renderTestTool.prepareContext();

            randomTool.stubMathRandom(sandbox, 10000);

            tester.execBody(body, done);
        });

        it("test", function (done) {
            tester.compareAt({
                frameIndex:1,
                partialCorrectImagePath:"grass/grass_instance_render.png",
                done:done
            });
        });
    });
});

