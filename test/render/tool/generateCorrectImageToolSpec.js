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
            wrapper.load([])
                .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChildren(createModels());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function createModels(){
            var arr = [],
                model = createSphere(),
                range = 500,
                count = 10;

            var sourceInstanceComponent = wd.SourceInstance.create();
            model.addComponent(sourceInstanceComponent);

            arr.push(model);
            model.transform.position = wd.Vector3.create(0, -10, 0);

            for(var i = 0; i < count; i++){
                var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                instance.transform.scale = instanceTool.getInstanceScale(i, count);

                arr.push(instance);
            }

            return arr;
        }


        function createSphere(){
            var material = wd.LightMaterial.create();
            material.color = wd.Color.create("rgb(0, 255, 255)");


            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 5;
            geometry.segment = 5;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


            var boxChild1 = createBox();
            var boxChild2 = createBox();
            var boxChild21 = createBox();

            gameObject.addChild(boxChild1);
            gameObject.addChild(boxChild2);

            boxChild2.addChild(boxChild21);


            boxChild1.transform.translate(20, 0, 0);
            boxChild2.transform.translate(-20, 0, 0);

            boxChild21.transform.translate(-25, 0, 0);


            return gameObject;
        }

        function createBox(){
            var material = wd.LightMaterial.create();
            material.color = wd.Color.create("rgb(255, 0, 255)");


            var geometry = wd.BoxGeometry.create();
            geometry.material = material;
            geometry.width = 5;
            geometry.height = 5;
            geometry.depth = 5;


            var gameObject = wd.GameObject.create();

            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(geometry);


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

            directionLight.transform.translate(wd.Vector3.create(0, 1000, 0));

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
            controller.distance = 500;

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
                    imageName:"instance_light.png"
                }
            ]
        );
    });
});

