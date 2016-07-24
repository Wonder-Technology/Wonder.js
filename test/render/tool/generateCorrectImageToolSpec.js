var instanceTool = (function(){
    return {
        getInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, range / 2 - this._getVal(index + 1, count) * range, range / 2 - this._getVal(index+ 2, count) * range);
        },
        getShadowInstancePosition:function(index, range, count){
            return wd.Vector3.create(range / 2 - this._getVal(index, count) * range, 60, 0);
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


            var models = createModels();
            var source = models[0];
            var instance = models[1];

            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                director.scene.removeChild(instance);
            }, 1);

            wd.Director.getInstance().scheduler.scheduleFrame(function(){
                director.scene.addChild(instance);

                instance.init();


                var instance2 = source.getComponent(wd.SourceInstance).cloneInstance("instance2");

                instance2.transform.position = wd.Vector3.create(30,30,30);

                director.scene.addChild(instance2);

                instance2.init();

            }, 2);




            director.scene.addChildren(models);
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            //director.start();
        }

        function createModels(){
            var arr = [],
                model = createSphere(),
                range = 100,
                count = 1;

            var sourceInstanceComponent = wd.SourceInstance.create();
            model.addComponent(sourceInstanceComponent);

            arr.push(model);
            model.transform.position = wd.Vector3.create(0, -10, 0);


            var i = 0;

            var instance = sourceInstanceComponent.cloneInstance("instance1");

            instance.transform.position = instanceTool.getInstancePosition(i, range, count);
            instance.transform.rotate(instanceTool.getInstanceRotation(i, count));
            instance.transform.scale = instanceTool.getInstanceScale(i, count);

            arr.push(instance);

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
            controller.distance = 100;

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
                    imageName:"instance_remove.png"
                },
                {
                    frameIndex:2,
                    imageName:"instance_add.png"
                }
            ]
        );
    });
});

