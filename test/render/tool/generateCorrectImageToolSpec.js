describe("generate correct image tool", function () {
    var sandbox;
    var tester;

    function body(wrapper){
        wrapper.load([
                {url: "../../asset/model/wd/ratamahatta/ratamahatta.wd", id: "model"},
                {url: "../../asset/model/wd/ratamahatta/ratamahatta.png", id: "skin"}
            ])
            .do(initSample);

        function initSample() {
            var director = wd.Director.getInstance();

            director.renderer.setClearColor(wd.Color.create("#aaaaff"));

            director.scene.addChild(setModel());
            director.scene.addChild(createAmbientLight());
            director.scene.addChild(createDirectionLight());
            director.scene.addChild(createCamera());

            director.start();
        }

        function setModel() {
            var model = wd.LoaderManager.getInstance().get("model").getChild("models").getChild(0);


            var material = wd.LightMaterial.create();
            material.diffuseMap = wd.LoaderManager.getInstance().get("skin").toTexture();
            material.specularColor = wd.Color.create("rgb(0, 0, 0)");
            material.shininess = 32;


            var geo = model.getComponent(wd.Geometry);
            geo.material = material;


            var anim = model.getComponent(wd.Animation);
            anim.play("stand", 10);


//            wd.Director.getInstance().scheduler.scheduleTime(function(){
//                anim.pause();
////                anim.stop();
//            }, 1000);
//
//            wd.Director.getInstance().scheduler.scheduleTime(function(){
//                anim.resume();
////                anim.play("stand", 10);
//            }, 2000);



            model.transform.rotate(0, -90, 0);

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
            controller.distance = 70;

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
                    imageName:"animation_morph_frame1.png"
                },
                {
                    frameIndex:1000,
                    step:200,
                    imageName:"animation_morph_frame1000.png"
                }
            ]
        );
    });
});

