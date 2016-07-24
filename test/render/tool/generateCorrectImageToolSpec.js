describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/terrain/heightMap.png", id: "heightMap"},
            {url: assetParentDirPath + "asset/texture/terrain/ground.jpg", id: "ground"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createTerrain());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            //director.start();
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
            material.lightMap = marbleTexture;


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
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        tester.execBody(body, done);
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"terrain_heightMap.png"
                }
            ]
        );
    });
});

