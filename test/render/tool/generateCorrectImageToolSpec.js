describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/compressed/disturb_dxt1_mip.dds", id: "texture"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createTriangle());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createTriangle() {
            var material = wd.BasicMaterial.create();

            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


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
            cameraComponent.far = 80;

            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(0, 0, 5);

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
                    imageName:"texture_compressed.png"
                }
            ]
        );
    });
});

