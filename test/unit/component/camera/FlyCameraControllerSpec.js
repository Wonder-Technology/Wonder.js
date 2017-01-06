describe("FlyCameraController", function () {
    var sandbox = null;
    var controller = null;
    var camera,cameraComponent,component;

    var director;

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

    // it("control Camera", function () {
    //     sandbox.stub(wd.DeviceManager.getInstance(), "view", {
    //         height:100,
    //         dom:{}
    //     })
    //
    //     prepareOrthoCamera(sandbox);
    //
    //
    //
    //     expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
    //         [
    //             1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
    //         ]
    //     );
    // });

    describe("init", function() {
        var component = null;

        beforeEach(function () {
            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                height:100,
                dom:{}
            })

            prepareOrthoCamera(sandbox);
        });

        it("set camera component's entityObject", function () {
            camera.init();

            component = camera.getComponent(wd.CameraController).camera;


            expect(component).toEqual(cameraComponent);
            expect(component.entityObject).toEqual(camera);
        });

        describe("update entityObject's transform", function () {
            it("update eulerAngles based on entityObject's eulerAngles", function () {
                controller.entityObject.transform.eulerAngles = wd.Vector3.create(10, 20, 30);

                camera.init();

                component = camera.getComponent(wd.CameraController).camera;

                expect(testTool.getValues(component.entityObject.transform.eulerAngles, 1)).toEqual([10, 20, 0]);
            });
        });
    });

    describe("update", function(){
        var director;

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                height:100,
                dom:{}
            })
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            prepareOrthoCamera(sandbox);

            director = wd.Director.getInstance();
            director.scene.addChild(camera);
        });

        it("if not change after init, not  update transform", function () {
            sandbox.spy(controller._control, "_updateTransform");

            director._init();
            director._loopBody(1);

            expect(controller._control._updateTransform).toCalledOnce();
        });
        it("else, update transform", function(){
            sandbox.spy(controller._control, "_updateTransform");

            director._init();

            controller._control._isRotate = true;

            director._loopBody(1);

            expect(controller._control._updateTransform).toCalledTwice();
        });
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

    describe("test event", function(){
        var fakeEvent;

        function insertDom() {
            $("body").append($("<canvas id='event-test'></canvas>"));
        }

        function removeDom() {
            $("#event-test").remove();
        }

        function triggerDomEvent(eventName, dom, event){
            eventTool.triggerDomEvent(eventName, dom || document.body, event || fakeEvent);
        }

        beforeEach(function(){
            sandbox.stub(wd.EventTriggerDetectorUtils, "isInRect").returns(true);


            insertDom();
            prepareTool.createGL("event-test");



            if(bowser.firefox){
                expect().toPass();
                return;
            }

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            prepareOrthoCamera(sandbox);

            director = wd.Director.getInstance();
            director.scene.addChild(camera);
        });
        afterEach(function () {
            wd.EventManager.off();

            removeDom();
        });

        describe("dispose", function(){
            describe("remove events", function(){
                function judgePointEvent(eventType) {
                    sandbox.stub(controller._control, "_changeRotation");



                    fakeEvent = eventTool["buildFake" + eventType + "Event"](10, 10);





                    director._init();

                    var eventPrefix = eventType.toUpperCase();

                    triggerDomEvent(wd.EEventName[eventPrefix + "DOWN"]);
                    triggerDomEvent(wd.EEventName[eventPrefix + "MOVE"]);

                    expect(controller._control._changeRotation).toCalledOnce();

                    triggerDomEvent(wd.EEventName[eventPrefix + "UP"]);




                    controller.dispose();


                    triggerDomEvent(wd.EEventName[eventPrefix + "DOWN"]);
                    triggerDomEvent(wd.EEventName[eventPrefix + "MOVE"]);
                    triggerDomEvent(wd.EEventName[eventPrefix + "UP"]);


                    expect(controller._control._changeRotation).toCalledOnce();
                }

                beforeEach(function(){
                });

                it("test keyboard event", function () {
                    sandbox.stub(controller._control, "_move");
                    sandbox.stub(controller._control, "zoom");



                    fakeEvent = eventTool.buildFakeMouseEvent(10, 10);





                    director._init();



                    triggerDomEvent(wd.EEventName.KEYDOWN);


                    expect(controller._control._move).toCalledOnce();
                    expect(controller._control.zoom).toCalledOnce();
                    expect(controller._control.zoom).toCalledAfter(controller._control._move);


                    controller.dispose();



                    triggerDomEvent(wd.EEventName.KEYDOWN);

                    expect(controller._control._move).toCalledOnce();
                    expect(controller._control.zoom).toCalledOnce();
                });
                it("test mouse event", function () {
                    judgePointEvent("Mouse");
                });
                it("test touch event", function () {
                    sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);

                    judgePointEvent("Touch");
                });
            });
        });
    });
});

