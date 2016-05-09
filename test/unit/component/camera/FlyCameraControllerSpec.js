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
        testTool.clearInstance(sandbox);
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

    it("if camera is ortho, get/set zoomSpeed attr should contract error", function () {
        testTool.openContractCheck(sandbox);

        prepareOrthoCamera(sandbox);

        expect(function(){
            var a = controller.zoomSpeed;
        }).toThrow();
        expect(function(){
            controller.zoomSpeed = 1;
        }).toThrow();
    });

    describe("clone", function(){
        function preparePerspectiveCamera(sandbox){
            camera = wd.GameObject.create();

            cameraComponent = wd.PerspectiveCamera.create();
            cameraComponent.fovy = 45;
            cameraComponent.aspect = 1;
            cameraComponent.near = 0.1;
            cameraComponent.far = 1000;

            controller = wd.FlyCameraController.create(cameraComponent);
            camera.addComponent(controller);
        }

        beforeEach(function(){
        });

        describe("test ortho camera", function(){
            beforeEach(function(){
                prepareOrthoCamera(sandbox);
            });


            it("clone camera", function(){
                var cloneCamera = {};
                sandbox.stub(controller.camera, "clone").returns(cloneCamera);

                var result = controller.clone();

                expect(result === controller).toBeFalsy();
                expect(result.camera).toEqual(cloneCamera);
            });
            it("shallow clone config data", function () {
                var moveSpeed= 2;
                var rotateSpeed= 4;

                cloneTool.extend(controller, {
                    moveSpeed: moveSpeed,
                    rotateSpeed: rotateSpeed
                });

                var result = controller.clone();

                expect(result.moveSpeed).toEqual(controller.moveSpeed);
                expect(result.rotateSpeed).toEqual(controller.rotateSpeed);
            });
        });

        describe("test perspective camera", function(){
            beforeEach(function(){
                preparePerspectiveCamera(sandbox);
            });

            it("clone camera", function(){
                var cloneCamera = {};
                sandbox.stub(controller.camera, "clone").returns(cloneCamera);

                var result = controller.clone();

                expect(result === controller).toBeFalsy();
                expect(result.camera).toEqual(cloneCamera);
            });
            it("shallow clone config data", function () {
                var moveSpeed= 2;
                var rotateSpeed= 4;
                var zoomSpeed = 5;

                cloneTool.extend(controller, {
                    moveSpeed: moveSpeed,
                    rotateSpeed: rotateSpeed,
                    zoomSpeed: zoomSpeed
                });

                var result = controller.clone();

                expect(result.moveSpeed).toEqual(controller.moveSpeed);
                expect(result.rotateSpeed).toEqual(controller.rotateSpeed);
                expect(result.zoomSpeed).toEqual(controller.zoomSpeed);
            });
        });
    });
});

