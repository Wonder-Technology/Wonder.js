describe("zFighting", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function(){
        var tester;

        function body(){
            initSample();

            function initSample() {
                var director = wd.Director.getInstance();

                director.scene.addChild(createTriangle1());
                director.scene.addChild(createTriangle2());
                director.scene.addChild(createCamera());

                //director.start();
            }

            function createTriangle1() {
                var material = wd.BasicMaterial.create();
                material.color = wd.Color.create("rgb(255, 0, 0)");
                /*!annotate this line to see z fighting*/
                material.polygonOffsetMode = wd.EPolygonOffsetMode.OUT;


                var geometry = wd.CustomGeometry.create();
                geometry.material = material;

                geometry.vertices = [
                    0.0, 2.5, -5.0,
                    -2.5, -2.5, -5.0,
                    2.5, -2.5, -5.0
                ];
                geometry.indices = [
                    0, 1, 2
                ];


                var gameObject = wd.GameObject.create();
                gameObject.addComponent(geometry);

                gameObject.addComponent(wd.MeshRenderer.create());


                return gameObject;
            }


            function createTriangle2() {
                var material = wd.BasicMaterial.create();
                material.color = wd.Color.create("#ffffff");


                var geometry = wd.CustomGeometry.create();
                geometry.material = material;
                geometry.vertices = [
                    0.0, 3.0, -5.0,
                    -3.0, -3.0, -5.0,
                    3.0, -3.0, -5.0
                ];
                geometry.indices = [
                    0, 1, 2
                ];


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

                var controller = wd.FlyCameraController.create(cameraComponent);
                camera.addComponent(controller);

                camera.transform.rotate(0, 20, 0);
                camera.transform.translate(wd.Vector3.create(0, 0, 5));

                return camera;
            }
        }

        beforeEach(function(){
            tester = SceneTester.create();

            renderTestTool.prepareContext();

            body();

            tester.init();
        });

        it("test z fighting", function(done){
            tester.compareAt(1, "zFighting/zFighting.png", done);
        });
    });
});
