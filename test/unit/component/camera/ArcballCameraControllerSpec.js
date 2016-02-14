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

    function triggerDomEvent(eventName, dom){
        eventTool.triggerDomEvent(eventName, dom || document);
    }

    function triggerKeyboardDomEvent(eventName){
        eventTool.triggerDomEvent(eventName, document.body);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

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
        if(bowser.firefox){
            expect().toPass();
            return;
        }

        var director = wd.Director.getInstance();
        prepare(sandbox);
        director.scene.addChild(camera);

        //camera.init();
        director._init();

        expect(component).toEqual(cameraComponent);
        expect(component.entityObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );

        sandbox.spy(component.entityObject.transform, "lookAt");

        director._loopBody(1);


        expect(testTool.getValues(component.entityObject.transform.position)).toEqual([0, 0, 10]);
        expect(component.entityObject.transform.lookAt).toCalledWith(controller.target);
    });

    describe("dispose", function(){
        beforeEach(function(){
            sandbox.stub(wd.EventTriggerDetectorUtils, "isInRect").returns(true);
        });

        it("remove events", function(){
            if(bowser.firefox){
                expect().toPass();
                return;
            }

            prepare(sandbox);
            sandbox.stub(controller, "_changeOrbit");
            sandbox.stub(controller, "_changeDistance");
            sandbox.stub(controller, "_changeTarget");

            var director = wd.Director.getInstance();
            director.scene.addChild(camera);

            director._init();

            triggerDomEvent(wd.EEventName.MOUSEDOWN);
            triggerDomEvent(wd.EEventName.MOUSEMOVE);
            triggerDomEvent(wd.EEventName.MOUSEUP);

            expect(controller._changeOrbit).toCalledOnce();


            triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body);

            expect(controller._changeDistance).toCalledOnce();

            triggerKeyboardDomEvent(wd.EEventName.KEYDOWN);

            expect(controller._changeTarget).toCalledOnce();



            controller.dispose();

            triggerDomEvent(wd.EEventName.MOUSEDOWN);
            triggerDomEvent(wd.EEventName.MOUSEMOVE);
            triggerDomEvent(wd.EEventName.MOUSEUP);
            triggerDomEvent(wd.EEventName.MOUSEWHEEL, document.body);
            triggerKeyboardDomEvent(wd.EEventName.KEYDOWN);


            expect(controller._changeOrbit).toCalledOnce();
            expect(controller._changeDistance).toCalledOnce();
            expect(controller._changeTarget).toCalledOnce();
        });
    });

    testTool.shouldExecRunTest("test more");

    describe("fix bug", function(){
        beforeEach(function(){
            sandbox.stub(wd.EventTriggerDetectorUtils, "isInRect").returns(true);
        });

        it("the event handler binded should not affected by other event handler binded on the same event", function(){
            if(bowser.firefox){
                expect().toPass();
                return;
            }

            prepare(sandbox);

            manager.on(wd.EEventName.MOUSEDOWN, function(e){
            });
            manager.on(wd.EEventName.MOUSEMOVE, function(e){
            });
            manager.on(wd.EEventName.MOUSEUP, function(e){
            });


            sandbox.stub(controller, "_changeOrbit");

            var director = wd.Director.getInstance();
            director.scene.addChild(camera);

            director._init();

            triggerDomEvent(wd.EEventName.MOUSEDOWN);
            triggerDomEvent(wd.EEventName.MOUSEMOVE);
            triggerDomEvent(wd.EEventName.MOUSEUP);


            triggerDomEvent(wd.EEventName.MOUSEDOWN);
            triggerDomEvent(wd.EEventName.MOUSEMOVE);
            triggerDomEvent(wd.EEventName.MOUSEUP);

            expect(controller._changeOrbit).toCalledTwice();
        });
    });
});

