describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
            {url: "../../asset/texture/1.jpg", id: "texture"}
        ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createNoBillboardPlane());
            director.scene.addChild(createBillboardAllPlane());
            director.scene.addChild(createBillboardYPlane());
            director.scene.addChild(sceneTool.createCamera(30));

            director.start();
        }

        function createNoBillboardPlane() {
            var material = wd.BasicMaterial.create();
            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();
            material.side = wd.ESide.BOTH;


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;



            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());

            gameObject.transform.translate(0, 10, 0);

            return gameObject;
        }

        function createBillboardYPlane() {
            return createBillboardPlane(wd.EBillboardMode.Y);
        }

        function createBillboardAllPlane() {
            return createBillboardPlane(wd.EBillboardMode.ALL, wd.Vector3.create(0, -10, 0));
        }

        function createBillboardPlane(mode, pos) {
            var material = wd.BasicMaterial.create();
            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();


            var geometry = wd.RectGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;


            var billboard = wd.Billboard.create();
            billboard.mode = mode;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);
            gameObject.addComponent(billboard);

            gameObject.addComponent(wd.MeshRenderer.create());

            if(pos){
                gameObject.transform.position = pos;
            }

            return gameObject;
        }


    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();


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
                    imageName:"billboard_viewFromFront.png"
                },
                {
                    frameIndex:1,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        var controller = camera.getComponent(wd.CameraController);

                        controller.phi = Math.PI / 8
                        controller.theta = 0
                    },
                    imageName:"billboard_viewFromTop.png"
                }
            ]
        );
    });
});

