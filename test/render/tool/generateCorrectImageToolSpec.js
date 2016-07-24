describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/multi.png", id: "multiTexture"},
            {url: assetParentDirPath + "asset/texture/compressed/disturb_dxt1_nomip.dds", id:"compressedTexture"},
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture1"},
            {url: assetParentDirPath + "asset/texture/2.jpg", id: "texture2"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createRect1());
            director.scene.addChild(createRect2());
            director.scene.addChild(createRect3());
            director.scene.addChild(createMultiTexturesTriangle());

            director.scene.addChild(createCamera());

            //director.start();
        }

        function createRect1() {
            var map = wd.LoaderManager.getInstance().get("multiTexture").toTexture();
            /*!
             the default sourceRegionMethod is CHANGE_TEXCOORDS_IN_GLSL.
             in this case, it can't repeat
             */
            map.sourceRegion = wd.RectRegion.create(0, 0, 64, 64);


            var material = wd.BasicMaterial.create();
            material.map = map;


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.translate(-8, 0, 0);

            return gameObject;
        }

        function createRect2() {
            var map = wd.LoaderManager.getInstance().get("multiTexture").toTexture();
            /*!
             when sourceRegionMethod is DRAW_IN_CANVAS, it can repeat
             */
            map.sourceRegion = wd.RectRegion.create(0, 0, 64, 64);
            map.sourceRegionMethod = wd.ETextureSourceRegionMethod.DRAW_IN_CANVAS;
//            map.sourceRegionMethod = wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;
            map.repeatRegion = wd.RectRegion.create(0, 0, 2, 2);
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;


            var material = wd.BasicMaterial.create();
            material.map = map;


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.translate(0, 2, 0);

            return gameObject;
        }

        function createRect3() {
            var map = wd.LoaderManager.getInstance().get("compressedTexture").toTexture();
            /*!
             compressed texture not support DRAW_IN_CANVAS
             */
            map.sourceRegion = wd.RectRegion.create(0, 0, 256, 256);


            var material = wd.BasicMaterial.create();
            material.map = map;


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.translate(8, 0, 0);

            return gameObject;
        }

        function createMultiTexturesTriangle() {
            var material = wd.BasicMaterial.create();
            material.map = [wd.LoaderManager.getInstance().get("texture1").toTexture(), wd.LoaderManager.getInstance().get("texture2").toTexture()];

            var map0 = material.mapList.getChild(0);
            map0.sourceRegion = wd.RectRegion.create(0, 64, 128,128);
//            map0.repeatRegion = wd.RectRegion.create(0, 0, 2, 2);
//            map0.wrapS = wd.ETextureWrapMode.REPEAT;
//            map0.wrapT = wd.ETextureWrapMode.REPEAT;


            material.side = wd.ESide.BOTH;


            var geometry = wd.TriangleGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(wd.MeshRenderer.create());


            gameObject.transform.translate(0, -3, 0);


            return gameObject;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 80;

            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(wd.Vector3.create(0, 0, 10));

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
                    imageName:"texture_part.png"
                }
            ]
        );
    });
});

