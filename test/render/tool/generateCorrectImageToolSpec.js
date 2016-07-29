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
describe("generate correct image lightTool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/texture/1.jpg", id: "texture"},
                {url: "../../asset/texture/skybox/px.jpg", id: "px"},
                {url: "../../asset/texture/skybox/nx.jpg", id: "nx"},
                {url: "../../asset/texture/skybox/py.jpg", id: "py"},
                {url: "../../asset/texture/skybox/ny.jpg", id: "ny"},
                {url: "../../asset/texture/skybox/pz.jpg", id: "pz"},
                {url: "../../asset/texture/skybox/nz.jpg", id: "nz"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChild(createSkybox());
            director.scene.addChild(createSphere());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createSkybox() {
            var cubemap = wd.CubemapTexture.create(
                [
                    {
                        asset: wd.LoaderManager.getInstance().get("px"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256),
                        type:wd.ETextureType.UNSIGNED_BYTE
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("nx"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("py"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("ny"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("pz"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                    },
                    {
                        asset: wd.LoaderManager.getInstance().get("nz"),
                        sourceRegion:wd.RectRegion.create(0, 0, 256, 256)
                    }
                ]
            );
            cubemap.textures.getChild(5).sourceRegion = wd.RectRegion.create(128, 128, 256, 256);

            var material = wd.SkyboxMaterial.create();
            material.envMap = cubemap;


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.SkyboxRenderer.create());
            gameObject.addComponent(geometry);

            return gameObject;
        }

        function createSphere() {
            var material = wd.BasicMaterial.create();
            material.map = wd.LoaderManager.getInstance().get("texture");

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;

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
            cameraComponent.far = 1000;

            var controller = wd.FlyCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(0, 0, 20);
            camera.transform.lookAt(5, 5, 0);

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
                    imageName:"skybox_texture_part"
                },
            ]
        );
    });
});

