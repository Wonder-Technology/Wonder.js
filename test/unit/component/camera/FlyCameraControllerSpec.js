describe("FlyCameraController", function () {
    var sandbox = null;
    var controller = null;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("control Camera", function () {
        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            height:100,
            dom:{}
        })

        var camera = wd.GameObject.create();

        var cameraComponent = wd.OrthographicCamera.create();
        cameraComponent.left = -10;
        cameraComponent.right = 10;
        cameraComponent.top = 10;
        cameraComponent.bottom = -10;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.FlyCameraController.create(cameraComponent);
        camera.addComponent(controller);



        camera.init();



        var component = camera.getComponent(wd.CameraController).camera;
        expect(component).toEqual(cameraComponent);
        expect(component.gameObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );
    });

    testTool.shouldExecRunTest("test more");
});

