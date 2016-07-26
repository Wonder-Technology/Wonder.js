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

        function initSample(){
            wd.DebugConfig.showDebugPanel = true;


            var director = wd.Director.getInstance();



            director.scene.addChildren(createModels());

            director.scene.addChild(createCamera());


            director.start();
        }


        function createModels(){
            var arr = [],
                model = createSphere(),
//                    range = 10000,
//                    count = 1000;
                range = 1000,
                count = 20;


            var sourceInstanceComponent = wd.SourceInstance.create();
            model.addComponent(sourceInstanceComponent);

            arr.push(model);

            for(var i = 0; i < count; i++){
                var instance = sourceInstanceComponent.cloneInstance("index" + String(i));

                instance.transform.position = instanceTool.getInstancePosition(i, range, count);
                instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
                instance.transform.scale = instanceTool.getInstanceScale(i, count);

                arr.push(instance);
            }

//            return model;
            return arr;
        }


        function createSphere(){
            var geometry = createSphereGeometry(wd.Color.create("rgb(1.0, 0.0, 0.0)"), 20);

            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());




            var geometryLevel1 = createSphereGeometry(wd.Color.create("rgb(0.0, 1.0, 0.0)"), 5);
            var geometryLevel2 = createSphereGeometry(wd.Color.create("#ffffff"), 2);

            var lod = wd.LOD.create();

            lod.addGeometryLevel(100, geometryLevel1);
            lod.addGeometryLevel(300, geometryLevel2);
            lod.addGeometryLevel(500, wd.ELODGeometryState.INVISIBLE);


            gameObject.addComponent(lod);

            return gameObject;
        }

        function createSphereGeometry(color, segments){
            var material = wd.BasicMaterial.create();
            material.color = color;

            var geometry = wd.SphereGeometry.create();
            geometry.material = material;
            geometry.radius = 1;
            geometry.segments = segments;


            return geometry;
        }

//        function createBox(){
//            var material = wd.BasicMaterial.create();
//            material.color = wd.Color.create("rgb(255, 0, 255)");
//
//
//            var geometry = wd.BoxGeometry.create();
//            geometry.material = material;
//            geometry.width = 5;
//            geometry.height = 5;
//            geometry.depth = 5;
//
//
//            var gameObject = wd.GameObject.create();
//
//            gameObject.addComponent(wd.MeshRenderer.create());
//            gameObject.addComponent(geometry);
//
//
//            return gameObject;
//        }

        function createCamera() {
            var camera = wd.GameObject.create(),
                view = wd.Director.getInstance().view,
                cameraComponent = wd.PerspectiveCamera.create();

            cameraComponent.fovy = 60;
            cameraComponent.aspect = view.width / view.height;
            cameraComponent.near = 0.1;
            cameraComponent.far = 100000;

            var controller = wd.ArcballCameraController.create(cameraComponent);

            controller.distance = 800;
            controller.wheelSpeed = 10;


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
                    imageName:"instance_lod_invisible.png"
                },
                {
                    frameIndex:2,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        camera.getComponent(wd.CameraController).distance = 400;
                    },
                    imageName:"instance_lod_level2.png"
                },
                {
                    frameIndex:3,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        camera.getComponent(wd.CameraController).distance = 100;
                    },
                    imageName:"instance_lod_level1.png"
                },
                {
                    frameIndex:4,
                    handle:function(){
                        var camera = wd.Director.getInstance().scene.currentCamera;

                        camera.getComponent(wd.CameraController).distance = 99;
                    },
                    imageName:"instance_lod_level0.png"
                }
            ]
        );
    });
});

