var randomTool = (function(){
    return {
        getFixedRandomNum: function(index){
            var seedArr = [
                0.1, 0.8, 0.7, 0.3, 0.2,
                0.9, 0.95, 0.4, 0.6,0.35,
                0.23, 0.55, 0.12, 0.88, 0.72,

                0.13, 0.05, 0.08, 0.33, 0.35,
                0.54, 0.71, 0.69, 0.36, 0.98
            ];

            var max = seedArr.length;

            // if(index > max)

            // expect(index).not.toBeGreaterThan(seedArr.length);

            return seedArr[index % max];
        },
        stubMathRandom: function(sandbox, count){
            sandbox.stub(Math, "random");

            for(var i = 0; i < count; i++){
                Math.random.onCall(i).returns(this.getFixedRandomNum(i));
            }
        }
    }
})();
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
            {url: "../../asset/model/wd/cesiumMan/Cesium_Man.wd", id: "model"}
        ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.renderer.setClearColor(wd.Color.create("#aaaaff"));

            director.scene.addChildren(setModel());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
            director.scene.addChild(createCamera());

            director.start();
        }

        function setModel() {
            var models = wd.LoaderManager.getInstance().get("model").getChild("models");


            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                models.forEach(function(model){


                    if(model.hasComponent(wd.Animation)){
                        model.getComponent(wd.Animation).play(0);
                    }
                    else {
                        model.forEach(function (m) {
                            if (m.hasComponent(wd.SkinSkeletonAnimation)) {
                                m.getComponent(wd.SkinSkeletonAnimation).play(0);
                            }
                        });
                    }
                });
            }, 1);

            return models;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createDirectionLight(pos) {
            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;

            var directionLight = wd.GameObject.create();
            directionLight.addComponent(directionLightComponent);

            directionLight.transform.position = pos;

            return directionLight;
        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.001;
            cameraComponent.far = 10000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.distance = 5;

            camera.addComponent(controller);

            return camera;
        }
    }


    beforeEach(function (done) {
        sandbox = sinon.sandbox.create();

        tester = SceneTester.create(sandbox);

        renderTestTool.prepareContext();

        randomTool.stubMathRandom(sandbox, 10000);


        tester.execBody(body, done);
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:100,
                    imageName:"animation_skinSkeleton_frame100"
                }
            ]
        );
    });
});

