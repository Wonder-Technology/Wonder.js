describe("FlyCameraController", function () {
    var sandbox = null;
    var controller = null;
    var camera,cameraComponent,component;

    function prepareOrthoCamera(sandbox){
        camera = wd.GameObject.create();

        cameraComponent = wd.OrthographicCamera.create();
        cameraComponent.left = -10;
        cameraComponent.right = 10;
        cameraComponent.top = 10;
        cameraComponent.bottom = -10;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.FlyCameraController.create(cameraComponent);
        camera.addComponent(controller);
    }

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

        prepareOrthoCamera(sandbox);



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

    testTool.shouldExecRunTest("test more");

    //describe("optimize", function() {
    //    var director;
    //
    //    beforeEach(function(){
    //        director = wd.Director.getInstance();
    //
    //
    //        prepareOrthoCamera(sandbox);
    //    });
    //
    //    describe("not to find triggerList when event trigger, directly use scene as the triggerList", function () {
    //        it("when init, set Director.domEventManager.designatedTriggerList = scene", function () {
    //            controller.init();
    //
    //            expect(director.domEventManager.designatedTriggerList.getChildren()).toEqual([director.scene]);
    //        });
    //        it("when dispose, restore", function () {
    //            controller.init();
    //
    //            controller.dispose();
    //
    //            expect(director.domEventManager.designatedTriggerList).toBeNull();
    //        });
    //    });
    //});
});

