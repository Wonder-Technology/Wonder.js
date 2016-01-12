describe("ArcballCameraController", function () {
    var sandbox = null;
    var controller = null;
    var manager = null;

    var camera,cameraComponent,component;

    function prepare(sandbox){
        camera = wd.GameObject.create();

        cameraComponent = wd.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.ArcballCameraController.create(cameraComponent);
        controller.distance = 10;

        camera.addComponent(controller);

        component = camera.getComponent(wd.CameraController).camera;
    }

    function insertDom() {
        $("body").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    function triggerDomEvent(eventName){
        eventTool.triggerDomEvent(eventName, document);
    }

    function triggerKeyboardDomEvent(eventName){
        eventTool.triggerDomEvent(eventName, document.body);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.EventManager;

        insertDom();
        wd.DeviceManager.getInstance().createGL("#event-test");
    });
    afterEach(function () {
        removeDom();
        wd.EventManager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    it("control Camera", function () {
        prepare(sandbox);

        camera.init();

        expect(component).toEqual(cameraComponent);
        expect(component.entityObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );

        sandbox.spy(component.entityObject.transform, "lookAt");

        camera.update(1);


        expect(testTool.getValues(component.entityObject.transform.position)).toEqual([0, 0, 10]);
        expect(component.entityObject.transform.lookAt).toCalledWith(controller.target);
    });

    describe("dispose", function(){
        it("remove events", function(){
            prepare(sandbox);
            sandbox.stub(controller, "_changeOrbit");
            sandbox.stub(controller, "_changeDistance");
            sandbox.stub(controller, "_changeTarget");

            camera.init();

            triggerDomEvent(wd.EventName.MOUSEDOWN);
            triggerDomEvent(wd.EventName.MOUSEMOVE);
            triggerDomEvent(wd.EventName.MOUSEUP);

            expect(controller._changeOrbit).toCalledOnce();


            triggerDomEvent(wd.EventName.MOUSEWHEEL);

            expect(controller._changeDistance).toCalledOnce();

            triggerKeyboardDomEvent(wd.EventName.KEYDOWN);

            expect(controller._changeTarget).toCalledOnce();



            controller.dispose();

            triggerDomEvent(wd.EventName.MOUSEDOWN);
            triggerDomEvent(wd.EventName.MOUSEMOVE);
            triggerDomEvent(wd.EventName.MOUSEUP);
            triggerDomEvent(wd.EventName.MOUSEWHEEL);
            triggerKeyboardDomEvent(wd.EventName.KEYDOWN);


            expect(controller._changeOrbit).toCalledOnce();
            expect(controller._changeDistance).toCalledOnce();
            expect(controller._changeTarget).toCalledOnce();
        });
    });

    testTool.shouldExecRunTest("test more");

    describe("fix bug", function(){
        it("the event handler binded should not affected by other event handler binded on the same event", function(){
            prepare(sandbox);

            manager.on(wd.EventName.MOUSEDOWN, function(e){
            });
            manager.on(wd.EventName.MOUSEMOVE, function(e){
            });
            manager.on(wd.EventName.MOUSEUP, function(e){
            });


            sandbox.stub(controller, "_changeOrbit");

            camera.init();

            triggerDomEvent(wd.EventName.MOUSEDOWN);
            triggerDomEvent(wd.EventName.MOUSEMOVE);
            triggerDomEvent(wd.EventName.MOUSEUP);


            triggerDomEvent(wd.EventName.MOUSEDOWN);
            triggerDomEvent(wd.EventName.MOUSEMOVE);
            triggerDomEvent(wd.EventName.MOUSEUP);

            expect(controller._changeOrbit).toCalledTwice();

        });
    });
});

