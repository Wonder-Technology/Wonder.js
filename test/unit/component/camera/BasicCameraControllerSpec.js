describe("BasicCameraController", function () {
    var sandbox = null;
    var controller = null;

    function create(){
        var camera = wd.GameObject.create();

        var cameraComponent = wd.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.BasicCameraController.create(cameraComponent);

        return controller;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("control Camera", function () {
        var camera = wd.GameObject.create();

        var cameraComponent = wd.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.BasicCameraController.create(cameraComponent);
        camera.addComponent(controller);




        camera.init();



        var component = camera.getComponent(wd.CameraController).camera;
        expect(component).toEqual(cameraComponent);
        expect(component.entityObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone camera", function(){
            create();
            var cloneCamera = {};
            sandbox.stub(controller.camera, "clone").returns(cloneCamera);

            var result = controller.clone();

            expect(result === controller).toBeFalsy();
            expect(result.camera).toEqual(cloneCamera);
        });
    });
});

