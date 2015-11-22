describe("BasicCameraController", function () {
    var sandbox = null;
    var controller = null;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("control Camera", function () {
        var camera = dy.GameObject.create();

        var cameraComponent = dy.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = dy.BasicCameraController.create(cameraComponent);
        camera.addComponent(controller);




        camera.init();



        var component = camera.getComponent(dy.CameraController).camera;
        expect(component).toEqual(cameraComponent);
        expect(component.gameObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );
    });
});

