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
        wd.EventManager.off();

        testTool.clearInstance(sandbox);

        removeDom();

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

    //describe("optimize", function() {
    //    var director;
    //
    //    beforeEach(function(){
    //        director = wd.Director.getInstance();
    //
    //        prepare(sandbox);
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

    describe("clone", function(){
        beforeEach(function(){
            prepare();
        });

        it("clone camera", function(){
            var cloneCamera = {};
            sandbox.stub(controller.camera, "clone").returns(cloneCamera);

            var result = controller.clone();

            expect(result === controller).toBeFalsy();
            expect(result.camera).toEqual(cloneCamera);
        });
        it("shallow clone config data", function () {
            var moveSpeedX= 2;
            var moveSpeedY= 3;
            var rotateSpeed= 4;
            var wheelSpeed= 5;
            var distance= 11;
            var phi= Math.PI / 3;
            var theta= Math.PI / 3;
            var target= wd.Vector3.create(2, 0, 0);
            var thetaMargin = 0.06;
            var minDistance= 0.06;

            cloneTool.extend(controller, {
                moveSpeedX: moveSpeedX,
                moveSpeedY: moveSpeedY,
                rotateSpeed: rotateSpeed,
                wheelSpeed: wheelSpeed,
                distance: distance,
                phi: phi,
                theta: theta,
                target: target,
                thetaMargin: thetaMargin,
                minDistance: minDistance
            });

            var result = controller.clone();

            expect(result.moveSpeedX).toEqual(controller.moveSpeedX);
            expect(result.moveSpeedY).toEqual(controller.moveSpeedY);
            expect(result.rotateSpeed).toEqual(controller.rotateSpeed);
            expect(result.wheelSpeed).toEqual(controller.wheelSpeed);
            expect(result.distance).toEqual(controller.distance);
            expect(result.phi).toEqual(controller.phi);
            expect(result.theta).toEqual(controller.theta);
            expect(result.target).toEqual(controller.target);
            expect(result.thetaMargin).toEqual(controller.thetaMargin);
            expect(result.minDistance).toEqual(controller.minDistance);
        });
    });
});

