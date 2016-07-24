describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/crate.gif", id: "texture"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createPlane());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createPlane() {
            var map = wd.LoaderManager.getInstance().get("texture").toTexture();
            map.wrapS = map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0, 0, 512, 512);
            /*!annotate this line to see the difference*/
            map.anisotropy = wd.GPUDetector.getInstance().maxAnisotropy;

            var material = wd.BasicMaterial.create();
            material.map = map;


            var geometry = wd.PlaneGeometry.create();
            geometry.material = material;
            geometry.width = 100;
            geometry.height = 100;

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.rotate(wd.Vector3.create(30, 0, 0));
            gameObject.transform.scale = wd.Vector3.create(100, 100, 100);

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

            camera.transform.translate(wd.Vector3.create(0, 0, 100));

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
                    imageName:"texture_anisotropic.png"
                }
            ]
        );
    });
});

