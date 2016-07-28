describe("geometry", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("scene test", function() {
        var tester;

        describe("test change geometry data", function () {
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
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test data1", function (done) {
                tester.compareAt(1, "geometry/geometry_data_change_data1.png", done);
            });
            it("test data2", function (done) {
                tester.compareAt(2, "geometry/geometry_data_change_data2.png", done);
            });
        });

        describe("test basic geometry", function () {
            function body(wrapper){
                wrapper.load([
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createTriangle());
                    director.scene.addChild(createRect());
                    director.scene.addChild(createBox());
                    director.scene.addChild(createSphere());
                    director.scene.addChild(createConvexPolygon());

                    director.scene.addChild(createCamera());

                    director.start();
                }

                function createTriangle() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("#888888");

                    var geometry = wd.TriangleGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(-8, 8, 0);

                    return gameObject;
                }

                function createRect() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("#aaa123");

                    var geometry = wd.RectGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(8, 8, 0);

                    return gameObject;

                }

                function createBox() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(1.0,0.0,1.0)");

                    var geometry = wd.BoxGeometry.create();
                    geometry.material = material;
                    geometry.width = 5;
                    geometry.height = 5;
                    geometry.depth = 5;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(-8, -8, 0);

                    return gameObject;

                }

                function createSphere() {
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");

                    var geometry = wd.SphereGeometry.create();
                    geometry.material = material;
                    geometry.radius = 5;
                    geometry.segments = 20;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(8, -8, 0);

                    return gameObject;
                }

                function createConvexPolygon(){
                    var material = wd.BasicMaterial.create();
                    material.color = wd.Color.create("rgb(0, 255, 255)");

                    var geometry = wd.ConvexPolygonGeometry.create();
                    geometry.vertices.push(-5, 0, 0);
                    geometry.vertices.push(0, 5, 0);
                    geometry.vertices.push(5, 0, 0);
                    geometry.vertices.push(0, -5, 0);
                    geometry.material = material;


                    var gameObject = wd.GameObject.create();
                    gameObject.addComponent(geometry);

                    gameObject.addComponent(wd.MeshRenderer.create());

                    gameObject.transform.translate(18, 0, 0);

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

                    var controller = wd.ArcballCameraController.create(cameraComponent);
                    controller.distance = 20;

                    camera.addComponent(controller);

                    return camera;
                }


            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "geometry/geometry_basic.png", done);
            });
        });
    });
});
