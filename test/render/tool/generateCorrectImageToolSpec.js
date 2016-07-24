describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){
        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"},
            {url: assetParentDirPath + "asset/texture/skybox/px.jpg", id: "px"},
            {url: assetParentDirPath + "asset/texture/skybox/nx.jpg", id: "nx"},
            {url: assetParentDirPath + "asset/texture/skybox/py.jpg", id: "py"},
            {url: assetParentDirPath + "asset/texture/skybox/ny.jpg", id: "ny"},
            {url: assetParentDirPath + "asset/texture/skybox/pz.jpg", id: "pz"},
            {url: assetParentDirPath + "asset/texture/skybox/nz.jpg", id: "nz"}
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
            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            //director.start();
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

        function createSphere() {
            var material = wd.BasicMaterial.create();
            material.map = wd.LoaderManager.getInstance().get("texture");

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

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
            camera.transform.lookAt(10,-5,0);

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
                    imageName:"skybox.png"
                }
            ]
        );
    });
});

