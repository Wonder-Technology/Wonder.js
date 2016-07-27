describe("generate correct image tool", function () {
    var sandbox;
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
                    imageName:"ui_font_threeD_bitmap.png"
                }
            ]
        );
    });
});

