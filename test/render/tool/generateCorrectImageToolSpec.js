describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/compressed/disturb_dxt1_nomip.dds", id: "texture1"},
            {url: assetParentDirPath + "asset/texture/compressed/disturb_dxt1_mip.dds", id: "texture2"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSkybox());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createSkybox() {
            var cubemap = wd.CubemapTexture.create(
                [
                    {
                        asset: wd.LoaderManager.getInstance().get("texture1")
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("texture1")
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("texture2")
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("texture1")
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("texture1")
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("texture1")
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


            camera.transform.translate(0, 0, 20);
            camera.transform.lookAt(-10,20,0);

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
                    imageName:"skybox_texture_compressed.png"
                }
            ]
        );
    });
});

