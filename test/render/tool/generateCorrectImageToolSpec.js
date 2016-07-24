var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getInstanceRotation:function(index, count){
            var val = this._getVal(index, count);

            return wd.Vector3.create(90 * val, 90 * val,0);
        },
        getInstanceScale:function(index, count){
            return wd.Vector3.create(3,3,3);
        },
        _getVal:function(index, count){
            //if(index % 2 === 0){
            //    if(isRevert){
            //        return mathTestUtils.toFixed(1 - (index) / count, 3);
            //    }
            //
            //    return mathTestUtils.toFixed((index) / count, 3);
            //}
            //else{
            //    if(isRevert){
            //        return mathTestUtils.toFixed((index) / count, 3);
            //    }
            //
            //    return mathTestUtils.toFixed(1 - (index) / count, 3);
            //}
            return randomTool.getFixedRandomNum(index);
        }
    }
})();

describe("generate correct image tool", function () {
    var tester;

    //function body(assetParentDirPath, done){
    //}

    function body(initFunc){
        if(initFunc){
            initFunc();
        }

        initSample();


        tester.init();

        function initSample() {
            var director = wd.Director.getInstance();

            director.scene.addChildren(createModels());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createModels(){
            var arr = [],
                model = createSphere(),
                range = 300,
                count = 2;

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
            var material = wd.BasicMaterial.create();
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


            gameObject.transform.scale = wd.Vector3.create(8,8,8);


            return gameObject;
        }

        function createBox(){
            var material = wd.BasicMaterial.create();
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


    //beforeEach(function (done) {
    beforeEach(function () {
        tester = SceneTester.create();

        renderTestTool.prepareContext();

        //tester.execBody(body, done);
        body();
    });
    afterEach(function () {
    });

    it("generate correct image", function () {
        tester.generateBatchAt(
            [
                {
                    frameIndex:1,
                    imageName:"instance_render.png"
                }
            ]
        );
    });
});

