describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../../asset/texture/1.jpg", id: "texture"}
            ])
            .do(function(){
                var director = wd.Director.getInstance();


                var arrow = wd.GameObject.create();
                arrow.addChild(createArrow());
                arrow.addChild(createLine());


                director.scene.addChild(arrow);
                director.scene.addChild(createCamera());

                director.start();
            });

        function createArrow() {
            var arrow = wd.Arrow.create();


            var geometry = wd.ConvexPolygonGeometry.create();
            geometry.vertices.push(-10, 0, 0);
            geometry.vertices.push(0, 10, 0);
            geometry.vertices.push(10, 0, 0);
//            geometry.vertices.push(0, -10, 0);
//            geometry.vertices.push(0, -10, 10);

            geometry.texCoords.push(0, 0);
            geometry.texCoords.push(1, 0);
            geometry.texCoords.push(0, 1);

            var material = wd.BasicMaterial.create();
            material.color = wd.Color.create("rgb(1.0,0.0,1.0)");
            material.map = wd.LoaderManager.getInstance().get("texture").toTexture();
//            material.side = wd.ESide.BOTH;

            geometry.material = material;


            var arrowObject = wd.GameObject.create();

            arrowObject.addComponent(arrow);

            arrowObject.addComponent(geometry);

            arrowObject.addComponent(wd.MeshRenderer.create());

            return arrowObject;
        }

        function createLine() {
            var line = wd.SolidLine.create();

            var geometry = wd.SolidLineGeometry.create();
            geometry.vertices.push(0, -10, 0);
            geometry.vertices.push(0, 0, 0);

            var material = wd.LineMaterial.create();
            material.color = wd.Color.create("rgb(1.0,0.0,1.0)");

            geometry.material = material;


            var lineObject = wd.GameObject.create();

            lineObject.addComponent(line);

            lineObject.addComponent(geometry);

            lineObject.addComponent(wd.MeshRenderer.create());

            return lineObject;
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
            controller.distance = 20;

            camera.addComponent(controller);

            return camera;
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
                    imageName:"ui_arrow.png"
                }
            ]
        );
    });
});

