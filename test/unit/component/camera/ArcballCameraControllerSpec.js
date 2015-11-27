describe("ArcballCameraController", function () {
    var sandbox = null;
    var controller = null;


    var camera,cameraComponent,component;

    function prepare(sandbox){
        camera = dy.GameObject.create();

        cameraComponent = dy.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = dy.ArcballCameraController.create(cameraComponent);
        controller.distance = 10;

        camera.addComponent(controller);

        component = camera.getComponent(dy.CameraController).camera;
    }

    function insertDom() {
        $("body").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        dy.DeviceManager.getInstance().createGL("#event-test");
    });
    afterEach(function () {
        removeDom();
        dy.EventManager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    it("control Camera", function () {
        prepare(sandbox);

        camera.init();

        expect(component).toEqual(cameraComponent);
        expect(component.gameObject).toEqual(camera);
        expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
            [
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
            ]
        );

        sandbox.spy(component.gameObject.transform, "lookAt");

        camera.update(1);


        expect(testTool.getValues(component.gameObject.transform.position)).toEqual([0, 0, 10]);
        expect(component.gameObject.transform.lookAt).toCalledWith(controller.target);
    });

    describe("dispose", function(){
        it("remove events", function(){
            prepare(sandbox);
            sandbox.stub(controller, "_changeOrbit");
            sandbox.stub(controller, "_changeDistance");
            sandbox.stub(controller, "_changeTarget");

            camera.init();

            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mouseup");

            expect(controller._changeOrbit).toCalledOnce();


            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousewheel");

            expect(controller._changeDistance).toCalledOnce();

            YYC.Tool.event.triggerEvent(document, "keydown");

            expect(controller._changeTarget).toCalledOnce();



            controller.dispose();

            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousedown");
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousemove");
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mouseup");
            YYC.Tool.event.triggerEvent(document.getElementById("event-test"), "mousewheel");
            YYC.Tool.event.triggerEvent(document, "keydown");


            expect(controller._changeOrbit).toCalledOnce();
            expect(controller._changeDistance).toCalledOnce();
            expect(controller._changeTarget).toCalledOnce();
        });
    });

    testTool.shouldExecRunTest("test more");
});

