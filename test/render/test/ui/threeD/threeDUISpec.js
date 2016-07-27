describe("threeD ui", function () {
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
        describe("test arrow", function () {
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
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "ui/threeD/ui_arrow.png", done);
            });
        });

        describe("test bitmap", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../../asset/font/bitmap/Lato-Regular-64.fnt", id: "bitmap_fnt"},
                        {url: "../../../asset/font/bitmap/lato.png", id: "bitmap_image"}
                    ])
                    .do(function(){
                        initSample();
                    });

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createFont());

                    director.scene.addChild(sceneTool.createAmbientLight());
                    director.scene.addChild(sceneTool.createDirectionLight(wd.Vector3.create(0, 0, 100)));
                    director.scene.addChild(sceneTool.createCamera(300));

                    director.start();
                }

                function createFont() {
                    var font = wd.ThreeDBitmapFont.create();

                    font.text = "This is a BitmapFont example!";
                    font.fntId = "bitmap_fnt";
                    font.xAlignment = wd.EFontXAlignment.CENTER;
                    font.width = 500;
                    font.height = 200;







                    var texture = wd.LoaderManager.getInstance().get("bitmap_image").toTexture();
//            texture.flipY = false;

                    var material = wd.BitmapFontMaterial.create();
                    material.color = wd.Color.create("rgb(255,0,255)");
                    material.bitmap = texture;
                    material.blendType = wd.EBlendType.NORMAL;



                    var geometry = wd.BitmapFontGeometry.create();

                    geometry.material = material;



                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(font);

                    gameObject.addComponent(geometry);



                    var renderer = wd.MeshRenderer.create();


                    gameObject.addComponent(renderer);

                    return gameObject;
                }
            }

            beforeEach(function (done) {
                tester = SceneTester.create(sandbox);

                renderTestTool.prepareContext();

                tester.execBody(body, done);
            });

            it("test", function (done) {
                tester.compareAt(1, "ui/threeD/ui_font_threeD_bitmap.png", done);
            });
        });
    });
});

