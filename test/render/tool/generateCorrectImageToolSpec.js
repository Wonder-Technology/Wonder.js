describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "./base/test/render/res/geometry/glsl/shaderConfig.json", id: "shaderConfig"},
                {url: "../../asset/texture/1.jpg", id: "texture"},
                {url: "./base/test/render/res/geometry/glsl/vertex.glsl", id: "vs"},
                {url: "./base/test/render/res/geometry/glsl/fragment.glsl", id: "fs"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();


            var rect = createRect();

            changeColor(rect);
            changeTexCoord(rect);


            director.scene.addChild(rect);
            director.scene.addChild(createCamera());

            director.start();
        }

        function changeColor(gameObject) {
            wd.Director.getInstance().scheduler.scheduleFrame(function () {
                var data = [
                    0, 0, 1,
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ];

                gameObject.getComponent(wd.Geometry).material.shader.attributes.getChild("a_color").value.resetData(data);
            }, 1);


            wd.Director.getInstance().scheduler.scheduleFrame(function () {
                var data = [
                    1, 0, 0,
                    0, 0, 0,
                    0, 0, 0,
                    1, 0, 0
                ];

                gameObject.getComponent(wd.Geometry).material.shader.attributes.getChild("a_color").value.resetData(data);
            }, 2);
        }

        function changeTexCoord(gameObject) {
            var a = 0;

            wd.Director.getInstance().scheduler.scheduleLoop(function () {
                var data = a % 2 === 1 ? [
                    1, 1,
                    0, 1,
                    0, 0,
                    1, 0
                ] : [
                    0, 0,
                    1, 1,
                    0, 1,
                    1, 0
                ];

                ++a;

                gameObject.getComponent(wd.Geometry).geometryData.texCoords = data;
            });
        }

        function createRect() {
            var material = wd.ShaderMaterial.create();
            material.read("shaderConfig");


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

            camera.transform.translate(wd.Vector3.create(0, 0, 5));

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
                    imageName:"geometry_data_change_data1.png"
                },
                {
                    frameIndex:2,
                    imageName:"geometry_data_change_data2.png"
                },
            ]
        );
    });
});

