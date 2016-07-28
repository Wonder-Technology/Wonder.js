describe("generate correct image lightTool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/model/wd/butterfly/butterfly.wd", id: "model"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            wd.DebugConfig.debugCollision = true;

            director.renderer.setClearColor(wd.Color.create("#aaaaff"));

            director.scene.addChild(setModel());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function setModel() {
            var model = wd.LoaderManager.getInstance().get("model").getChild("models").getChild(0);

            model.transform.scale = wd.Vector3.create(140, 140, 140);

            model.findChildrenByName("wing")
                .forEach(function (wing) {
                    var wingMaterial = wing.getComponent(wd.Geometry).material;
                    wingMaterial.side = wd.ESide.BOTH;
                    wingMaterial.blendFuncSeparate = [wd.EBlendFunc.SRC_ALPHA, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA, wd.EBlendFunc.ONE, wd.EBlendFunc.ONE_MINUS_SRC_ALPHA];
                });

            model.getChildren()
                .forEach(function (child) {
                    var material = child.getComponent(wd.Geometry).material;
                    material.shading = wd.EShading.SMOOTH;
                });

            //model.addComponent(wd.BoxCollider.create());

            return model;
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
            controller.distance = 60;

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
                    imageName:"model_converter_obj"
                },
            ]
        );
    });
});

