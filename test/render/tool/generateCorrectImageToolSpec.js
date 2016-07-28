var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
        },
        getSpecificInstancePosition:function(index, range, count, x,y,z){
            var x = x !== null ? x : (range / 2 - this._getVal(index, count) * range);
            var y = y !== null ? y : (range / 2 - this._getVal(index + 1, count) * range);
            var z = z !== null ? z :(range / 2 - this._getVal(index + 2, count) * range);

            return wd.Vector3.create(x, y, z);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            return randomTool.getFixedRandomNum(index);
        }
    }
})();




describe("generate correct image tool", function () {
    var sandbox;
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
                    imageName:"ui_font_threeD_multiPage_bitmap.png"
                },
            ]
        );
    });
});

