var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
        },
        getSpecificInstancePosition:function(index, range, count, x,y,z){
            var x = x !== null ? x : (range / 2 - this._getVal(index, count) * range);
            var y = y !== null ? y : (range / 2 - this._getVal(index + 1, count) * range);
            var z = z !== null ? z :(range / 2 - this._getVal(index + 2, count) * range);

            return wd.Vector3.create(x, y, z);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            return randomTool.getFixedRandomNum(index);
        }
    }
})();
describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            {url: "../../asset/texture/terrain/heightMap.png", id: "heightMap"},
            {url: "../../asset/texture/grass/grassPack.png", id: "grassPack"},
            {url: "../../asset/texture/terrain/ground.jpg", id: "ground"},
            {url: "../../asset/texture/grass/grass.jpg", id: "grass"}
        ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();


            var terrain = createTerrain();




            director.scene.addChildren(createGrasses(terrain));

            director.scene.addChild(terrain);



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
            geometry.maxHeight = 10;
            geometry.heightMapAsset = wd.LoaderManager.getInstance().get("heightMap");


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
        }

        function createGrasses(terrain){
            var arr = [],
                grass = createGrass(terrain);

            function getVal(){
                return Math.random();
            }

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
            geometry.rangeWidth = 1;
            geometry.rangeHeight = 1;



            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            var sourceInstanceComponent = wd.OneToManySourceInstance.create();
            gameObject.addComponent(sourceInstanceComponent);



            var gameObjectLevel1 = createGrassMap(terrain);
            var gameObjectLevel2 = createBillboard(terrain);

            var lod = wd.GameObjectLOD.create();


            function switchHandler(gameObject){
                var pos = gameObject.transform.position;

                gameObject.transform.position = wd.Vector3.create(pos.x, getHeight(gameObject, terrain, pos.x, pos.z), pos.z);
            }


            lod.addLevel(30, gameObjectLevel1, switchHandler);
            lod.addLevel(60, gameObjectLevel2, switchHandler);

            lod.addLevel(80, wd.ELODState.INVISIBLE);



            gameObject.addComponent(lod);




            return gameObject;
        }

        function createGrassMap(terrain) {
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







            var geometry = wd.GrassMapGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 20;



            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());



            return gameObject;
        }

        function createBillboard(terrain) {
            var material = wd.LightMaterial.create();
            material.diffuseMap = wd.GrassProceduralTexture.create();


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var billboard = wd.Billboard.create();
            billboard.mode = wd.EBillboardMode.Y;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(billboard);

            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
        }

        function getHeight(gameObject, terrain, x, z) {
            var height = 0,
                geometry = gameObject.getComponent(wd.Geometry);

            if(geometry.height){
                height = geometry.height / 2;
            }

            return terrain.getComponent(wd.TerrainGeometry).getHeightAtCoordinates(x, z) + height;
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
            controller.distance = 80;

            camera.addComponent(controller);

            return camera;
        }
    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();

        randomTool.stubMathRandom(sandbox, 10000);


        tester.execBody(body, done);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        var controller = camera.getComponent(wd.CameraController);

                        controller.distance = 30;
                    },
                    imageName:"gameObjectLOD_switch(discrete)_selection(range-base)_distance30"
                }
            ]
        );
    });
});

