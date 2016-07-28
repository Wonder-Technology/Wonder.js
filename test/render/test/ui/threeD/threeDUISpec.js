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
                tester.compareAt(
                    {
                        frameIndex:1,
                        partialCorrectImagePath:"ui/threeD/ui_font_threeD_bitmap.png",
                        done:done,
                        correctRate:0.95
                    }
                );
            });
        });

        describe("test multi page bitmap", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../../asset/font/bitmap/multiPages/Norwester-Multi-64.fnt", id: "multiPages_fnt"},
                        {url: "../../../asset/font/bitmap/multiPages/Norwester-Multi_0.png", id: "0_image"},
                        {url: "../../../asset/font/bitmap/multiPages/Norwester-Multi_1.png", id: "1_image"},
                        {url: "../../../asset/font/bitmap/multiPages/Norwester-Multi_2.png", id: "2_image"},
                        {url: "../../../asset/font/bitmap/multiPages/Norwester-Multi_3.png", id: "3_image"}
                    ])
                    .do(initSample);

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
                    font.fntId = "multiPages_fnt";
                    font.xAlignment = wd.EFontXAlignment.CENTER;
                    font.width = 500;
                    font.height = 200;




                    var texture0 = wd.LoaderManager.getInstance().get("0_image").toTexture();
                    var texture1 = wd.LoaderManager.getInstance().get("1_image").toTexture();
                    var texture2 = wd.LoaderManager.getInstance().get("2_image").toTexture();
                    var texture3 = wd.LoaderManager.getInstance().get("3_image").toTexture();

                    var material = wd.BitmapFontMaterial.create();
                    material.color = wd.Color.create("rgb(255,0,255)");
                    material.pageMapList = wdCb.Collection.create([
                        texture0,
                        texture1,
                        texture2,
                        texture3
                    ]);
                    material.blendType = wd.EBlendType.NORMAL;



                    var geometry = wd.BitmapFontGeometry.create();

                    geometry.material = material;



                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(font);

                    gameObject.addComponent(geometry);



                    var renderer = wd.MeshRenderer.create();


                    gameObject.addComponent(renderer);


                    gameObject.transform.translate(00, 00, 0);

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
//            controller.distance = 20;
//            controller.target = wd.Vector3.create(0,50,0);
                    controller.distance = 300;

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
                tester.compareAt(
                    {
                        frameIndex:1,
                        partialCorrectImagePath:"ui/threeD/ui_font_threeD_multiPage_bitmap.png",
                        done:done,
                        correctRate:0.95
                    }
                );
            });
        });

        describe("test sdf bitmap", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                        {url: "../../../asset/font/bitmap/sdf/DejaVu-sdf.fnt", id: "bitmap_fnt"},
                        {url: "../../../asset/font/bitmap/sdf/DejaVu-sdf.png", id: "bitmap_image"}
                    ])
                    .do(initSample);

                function initSample() {
                    var director = wd.Director.getInstance();

                    director.scene.addChild(createFont());

                    director.scene.addChild(sceneTool.createAmbientLight());
                    director.scene.addChild(sceneTool.createDirectionLight(wd.Vector3.create(0, 0, 100)));
                    director.scene.addChild(sceneTool.createCamera(20, wd.Vector3.create(0,50,0)));

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
                    material.enableSdf = true;
                    material.sdfType = wd.SdfBitmapFontType.SMOOTH;
                    material.alphaTest = 0.0001;
                    material.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
//            material.blendFuncSeparate = [wd.EBlendFunc.ONE, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE, wd.EBlendFunc.ZERO];
//            material.blendType = wd.EBlendType.NORMAL;



                    var geometry = wd.BitmapFontGeometry.create();

                    geometry.material = material;



                    var gameObject = wd.GameObject.create();

                    gameObject.addComponent(font);

                    gameObject.addComponent(geometry);



                    var renderer = wd.MeshRenderer.create();


                    gameObject.addComponent(renderer);


                    gameObject.transform.translate(00, 00, 0);

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
                    controller.target = wd.Vector3.create(0,50,0);

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
                tester.compareAt(
                    {
                        frameIndex:1,
                        partialCorrectImagePath:"ui/threeD/ui_font_threeD_sdf_bitmap.png",
                        done:done,
                        correctRate:0.95
                    }
                );
            });
        });

        describe("test line", function () {
            var tester;

            function body(wrapper){
                wrapper.load([
                    ])
                    .do(function() {
                        var director = wd.Director.getInstance();

                        director.scene.addChild(createSolidLine());
                        director.scene.addChild(createCamera());

                        director.start();
                    });

                function createSolidLine() {
                    var line = wd.SolidLine.create();


                    var geometry = wd.SolidLineGeometry.create();
                    geometry.vertices.push(-10, -10, 0);
                    geometry.vertices.push(-10, 10, 0);
                    geometry.vertices.push(10, 10, 0);

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
                    cameraComponent.far = 80;

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
                tester.compareAt(
                    {
                        frameIndex:1,
                        partialCorrectImagePath:"ui/threeD/ui_line.png",
                        done:done,
                        correctRate:0.95
                    }
                );
            });
        });
    });
});

