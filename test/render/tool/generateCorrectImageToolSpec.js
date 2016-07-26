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

                var skybox = createSkybox();
                var box = createBox();

                box.transform.position = wd.Vector3.create(60, 0, 0);

                director.scene.addChild(skybox);
                director.scene.addChild(box);
                director.scene.addChildren(createReflectionModels(skybox, box));
//            director.scene.addChildren(createRefractionModels());

                director.scene.addChild(createAmbientLight());
                director.scene.addChild(createDirectionLight());

                director.scene.addChild(createCamera());

                director.start();
            }

            function createSkybox() {
                var cubemap = wd.CubemapTexture.create(
                    [
                        {
                            asset: wd.LoaderManager.getInstance().get("px")
                        },
                        {
                            asset: wd.LoaderManager.getInstance().get("nx")
                        },
                        {
                            asset: wd.LoaderManager.getInstance().get("py")
                        },
                        {
                            asset: wd.LoaderManager.getInstance().get("ny")
                        },
                        {
                            asset: wd.LoaderManager.getInstance().get("pz")
                        },
                        {
                            asset: wd.LoaderManager.getInstance().get("nz")
                        }
                    ]
                );

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

            function createReflectionModels(skybox, box){
                var arr = [],
                    model = createSphere(skybox, box, wd.EEnvMapMode.REFLECTION),
                    range = 50,
                    count = 2;

                var sourceInstanceComponent = wd.SourceInstance.create();
                model.addComponent(sourceInstanceComponent);

                arr.push(model);
//            model.transform.position = wd.Vector3.create(0, -10, 0);

                for(var i = 0; i < count; i++){
                    var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                    instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                    instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                    instance.transform.scale = instanceTool.getInstanceScale(i, count);

                    arr.push(instance);
                }

                return arr;
            }

            function createSphere(skybox, box, mode){
                var texture = wd.DynamicCubemapTexture.create();

                var list = [skybox, box];

                texture.renderList = {
                    px: list,
                    nx: list,
                    py: list,
                    ny: list,
                    pz: list,
                    nz: list
                };

                texture.near = 0.1;
                texture.far = 1000;
                texture.size = 256;
                texture.mode = mode;

                var material = wd.LightMaterial.create();
                material.envMap = texture;
                material.shading = wd.EShading.SMOOTH;


                var geometry = wd.SphereGeometry.create();
                geometry.material = material;
                geometry.radius = 5;
                geometry.segment = 5;


                var gameObject = wd.GameObject.create();

                gameObject.addComponent(wd.MeshRenderer.create());
                gameObject.addComponent(geometry);


                return gameObject;
            }

            function createBox(){
                var material = wd.LightMaterial.create();
                material.color = wd.Color.create("rgb(255, 0, 255)");


                var geometry = wd.BoxGeometry.create();
                geometry.material = material;
                geometry.width = 20;
                geometry.height = 20;
                geometry.depth = 20;


                var gameObject = wd.GameObject.create();

                gameObject.addComponent(wd.MeshRenderer.create());
                gameObject.addComponent(geometry);


                var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                    gameObject.transform.rotateLocal(0, 1,0);
                }));

                gameObject.addComponent(action);



                return gameObject;
            }

            function createAmbientLight() {
                var ambientLightComponent = wd.AmbientLight.create();
                ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

                var ambientLight = wd.GameObject.create();
                ambientLight.addComponent(ambientLightComponent);

                return ambientLight;
            }

            function createDirectionLight() {
                var directionLightComponent = wd.DirectionLight.create();
                directionLightComponent.color = wd.Color.create("#ffffff");
                directionLightComponent.intensity = 2;


                var directionLight = wd.GameObject.create();
                directionLight.addComponent(directionLightComponent);

                directionLight.transform.translate(wd.Vector3.create(100, 1000, 1000));

                return directionLight;
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
                controller.distance = 50;

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
                    imageName:"instance_envMap_light.png"
                }
            ]
        );
    });
});

