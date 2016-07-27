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
                {url: "../../asset/texture/crate.gif", id: "ground"},
                {url: "../../asset/model/wd/ratamahatta/ratamahatta.wd", id: "md2"},
                {url: "../../asset/model/wd/ratamahatta/ratamahatta.png", id: "skin"},
                {url: "../../asset/model/gltf/monster/glTF-MaterialsCommon/monster.gltf", id: "gltf"},
                {url: "../../asset/model/wd/butterfly/butterfly.wd", id: "obj"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.renderer.setClearColor(wd.Color.create("#aaaaff"));

            var ground = createGround();

            director.scene.addChild(ground);
            director.scene.addChildren(createObjs());
            director.scene.addChildren(createMd2s());
            director.scene.addChildren(createGLTFs());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight(wd.Vector3.create(0, 500, 500)));
            director.scene.addChild(createDirectionLight(wd.Vector3.create(500, 500, 0)));
            director.scene.addChild(createCamera());

            director.start();
        }

        function createObjs(){
            var arr = [],
                model = setObj(),
                range = 300,
                count = 1;

            model.transform.position = wd.Vector3.create(60, 20, 0);

            arr.push(model);

            for(var i = 0; i < count; i++){
                var clonedGameObject = model.clone();

                clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 20, 0);

                arr.push(clonedGameObject);
            }

            return arr;
        }

        function createMd2s(){
            var arr = [],
                model = setMd2(),
                range = 300,
                count = 2;

            model.transform.position = wd.Vector3.create(60, 40, -40);

            arr.push(model);

            for(var i = 0; i < count; i++){
                var clonedGameObject = model.clone();

                clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 40, -40);

                arr.push(clonedGameObject);
            }

            return arr;
        }

        function createGLTFs(){
            var arr = [],
                model = setGLTF(),
                range = 300,
                count = 2;

            model.transform.position = wd.Vector3.create(60, 60, 40);

            arr.push(model);

            for(var i = 0; i < count; i++){
                var clonedGameObject = model.clone();

                clonedGameObject.transform.position = instanceTool.getSpecificInstancePosition(i, range, count, null, 60, 40);

                arr.push(clonedGameObject);
            }

            return arr;
        }

        function setObj() {
            var model = wd.LoaderManager.getInstance().get("obj").getChild("models").getChild(0);

            model.transform.scale = wd.Vector3.create(400, 400, 400);

            model.findChildrenByName("wing")
                .forEach(function (wing) {
                    var wingMaterial = wing.getComponent(wd.Geometry).material;
                    wingMaterial.side = wd.ESide.BOTH;
                    wingMaterial.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                    wingMaterial.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                });

            model.getChildren()
                .forEach(function (child) {
                    var material = child.getComponent(wd.Geometry).material;
                    material.shading = wd.EShading.SMOOTH;
                });




            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            model.addComponent(shadow);


            model.addComponent(wd.SourceInstance.create());


            return model;
        }

        function setMd2() {
            var model = wd.LoaderManager.getInstance().get("md2").getChild("models").getChild(0);


            var material = wd.LightMaterial.create();
            material.diffuseMap = wd.LoaderManager.getInstance().get("skin").toTexture();
            material.specularColor = wd.Color.create("rgb(0, 0, 0)");
            material.shininess = 32;


            var geo = model.getComponent(wd.Geometry);
            geo.material = material;


            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            model.addComponent(shadow);


            model.addComponent(wd.SourceInstance.create());



            return model;
        }

        function setGLTF() {
            var model = wd.LoaderManager.getInstance().get("gltf").getChild("models").getChild(0);


            var shadow = wd.Shadow.create();
            shadow.cast = true;
            shadow.receive = true;

            model.addComponent(shadow);


            model.addComponent(wd.SourceInstance.create());

            return model;
        }

        function createGround(){
            var map = wd.LoaderManager.getInstance().get("ground").toTexture();
            map.name = "groundMap";
            map.wrapS = wd.ETextureWrapMode.REPEAT;
            map.wrapT = wd.ETextureWrapMode.REPEAT;
            map.repeatRegion = wd.RectRegion.create(0.5, 0, 5, 5);


            var material = wd.LightMaterial.create();
            material.specularColor = wd.Color.create("#ffdd99");
            material.shininess = 32;
            material.diffuseMap = map;


            var plane = wd.PlaneGeometry.create();
            plane.width = 200;
            plane.height = 200;
            plane.material = material;


            var gameObject = wd.GameObject.create();
            gameObject.addComponent(wd.MeshRenderer.create());
            gameObject.addComponent(plane);

            gameObject.name = "ground";

            var shadow = wd.Shadow.create();
            shadow.cast = false;
            shadow.receive = true;

            gameObject.addComponent(shadow);


            gameObject.transform.translate(wd.Vector3.create(1,1,1));


            return gameObject;
        }

        function createAmbientLight() {
            var ambientLightComponent = wd.AmbientLight.create();
            ambientLightComponent.color = wd.Color.create("rgb(30, 30, 30)");

            var ambientLight = wd.GameObject.create();
            ambientLight.addComponent(ambientLightComponent);

            return ambientLight;
        }

        function createDirectionLight(pos) {
            var SHADOW_MAP_WIDTH = 1024,
                SHADOW_MAP_HEIGHT = 1024;

            var directionLightComponent = wd.DirectionLight.create();
            directionLightComponent.color = wd.Color.create("#ffffff");
            directionLightComponent.intensity = 1;
            directionLightComponent.castShadow = true;
            directionLightComponent.shadowCameraLeft = -500;
            directionLightComponent.shadowCameraRight = 500;
            directionLightComponent.shadowCameraTop = 500;
            directionLightComponent.shadowCameraBottom = -500;
            directionLightComponent.shadowCameraNear = 0.1;
            directionLightComponent.shadowCameraFar = 1000;
            directionLightComponent.shadowBias = 0.002;
            directionLightComponent.shadowDarkness = 0.2;
            directionLightComponent.shadowMapWidth = SHADOW_MAP_WIDTH;
            directionLightComponent.shadowMapHeight = SHADOW_MAP_HEIGHT;

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
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            var controller = wd.ArcballCameraController.create(cameraComponent);
            controller.theta = Math.PI / 4;
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
                    imageName:"clone_model.png"
                }
            ]
        );
    });
});

