describe("generate correct image tool", function () {
    var tester;

    function body(assetParentDirPath, done){

        wd.LoaderManager.getInstance().load([
            {url: assetParentDirPath + "asset/texture/1.jpg", id: "texture"}
        ]).subscribe(null, null, function () {
            initSample();


            tester.init();

            if(done){
                done();
            }
        });

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createSphere() {
            var canvas = mipmap(128, '#f00');
            var textureCanvas = wd.ImageTexture.create(canvas);
            textureCanvas.wrapS = wd.ETextureWrapMode.REPEAT;
            textureCanvas.wrapT = wd.ETextureWrapMode.REPEAT;
            textureCanvas.repeatRegion = wd.Vector4.create(0, 0, 10, 10);
            textureCanvas.mipmaps.addChild(canvas);
            textureCanvas.mipmaps.addChild(mipmap(64, '#0f0'));
            textureCanvas.mipmaps.addChild(mipmap(32, '#00f'));
            textureCanvas.mipmaps.addChild(mipmap(16, '#400'));
            textureCanvas.mipmaps.addChild(mipmap(8, '#040'));
            textureCanvas.mipmaps.addChild(mipmap(4, '#004'));
            textureCanvas.mipmaps.addChild(mipmap(2, '#044'));
            textureCanvas.mipmaps.addChild(mipmap(1, '#404'));
            textureCanvas.needsUpdate = true;


            var material = wd.BasicMaterial.create();
            material.map = textureCanvas;


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 2;
            geometry.segments = 30;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            return gameObject;
        }

        function mipmap(size, color) {
            var imageCanvas = document.createElement("canvas"),
                context = imageCanvas.getContext("2d");

            imageCanvas.width = imageCanvas.height = size;

            context.fillStyle = "#444";
            context.fillRect(0, 0, size, size);

            context.fillStyle = color;
            context.fillRect(0, 0, size / 2, size / 2);
            context.fillRect(size / 2, size / 2, size / 2, size / 2);

            return imageCanvas;
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

            controller.distance = 10;

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
                    imageName:"texture_mipmap_manual_distance10.png"
                },
                {
                    frameIndex:2,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        camera.getComponent(wd.CameraController).distance = 30;
                    },
                    imageName:"texture_mipmap_manual_distance30.png"
                }
            ]
        );
    });
});

