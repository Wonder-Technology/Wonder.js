describe("ArcballCameraController", function () {
    var sandbox = null;
    var fakeEvent = null;
    var controller = null;
    var manager = null;
    var director;

    var camera,cameraComponent,component;

    function prepare(sandbox){
        camera = wd.GameObject.create();

        cameraComponent = wd.PerspectiveCamera.create();
        cameraComponent.fovy = 45;
        cameraComponent.aspect = 1;
        cameraComponent.near = 0.1;
        cameraComponent.far = 1000;

        controller = wd.ArcballCameraController.create(cameraComponent);

        camera.addComponent(controller);

        component = camera.getComponent(wd.CameraController).camera;
    }

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    function triggerDomEvent(eventName, dom, event){
        eventTool.triggerDomEvent(eventName, dom || document.body, event || fakeEvent);
    }

    function triggerKeyboardDomEvent(eventName){
        eventTool.triggerDomEvent(eventName, document.body);
    }

    if(ciTool.isTestInCI()){
        return;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        prepareTool.createGL("event-test");

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        manager = wd.EventManager;
    });
    afterEach(function () {
        wd.EventManager.off();

        testTool.clearInstance(sandbox);

        removeDom();

        sandbox.restore();
    });

    describe("init", function() {
        beforeEach(function () {
            prepare(sandbox);

            director.scene.addChild(camera);
        });

        it("set camera component's entityObject", function () {
            director._init();

            expect(component).toEqual(cameraComponent);
            expect(component.entityObject).toEqual(camera);
        });

        describe("update entityObject's transform", function () {
            it("update position based on distance", function () {
                controller.distance = 10;

                director._init();

                expect(testTool.getValues(component.worldToCameraMatrix)).toEqual(
                    [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1
                    ]
                );
                expect(testTool.getValues(component.entityObject.transform.position)).toEqual([0, 0, 10]);
            });
            it("update lookAt based on target", function () {
                controller.target = wd.Vector3.create(10, 10, 10);

                director._init();

                expect(testTool.getValues(component.entityObject.transform.localToWorldMatrix.invert())).toEqual(
                    [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10, -10, -20, 1
                    ]
                );
            });
        });
    });

    describe("update", function(){
        beforeEach(function(){
            prepare(sandbox);

            director.scene.addChild(camera);
        });

        it("if not change after init, not  update transform", function () {
            sandbox.spy(controller, "_updateTransform");
            controller.distance = 10;

            director._init();
            director._loopBody(1);

            expect(controller._updateTransform).toCalledOnce();
        });
        it("else, update transform", function(){
            sandbox.spy(controller, "_updateTransform");
            controller.distance = 10;

            director._init();

            controller.distance = 20;

            director._loopBody(1);

            expect(controller._updateTransform).toCalledTwice();
        });
    });

    describe("test event", function(){
        beforeEach(function(){
            sandbox.stub(wd.EventTriggerDetectorUtils, "isInRect").returns(true);

            prepare(sandbox);

            director.scene.addChild(camera);
        });

        describe("dispose", function(){
            beforeEach(function(){
            });

            describe("remove events", function(){
                beforeEach(function(){
                });

                it("test keyboard event", function () {
                    sandbox.stub(controller, "_changeTarget");


                    fakeEvent = eventTool.buildFakeMouseEvent(10, 10);


                    director._init();


                    triggerKeyboardDomEvent(wd.EEventName.KEYDOWN);

                    expect(controller._changeTarget).toCalledOnce();


                    controller.dispose();

                    triggerKeyboardDomEvent(wd.EEventName.KEYDOWN);


                    expect(controller._changeTarget).toCalledOnce();
                });
                it("test mouse event and keyboard", function () {
                    sandbox.stub(controller, "_changeOrbit");
                    sandbox.stub(controller, "_changeDistance");
                    sandbox.stub(controller, "_changeTarget");



                    fakeEvent = eventTool.buildFakeMouseEvent(10, 10);





                    director._init();

                    triggerDomEvent(wd.EEventName.MOUSEDOWN);
                    triggerDomEvent(wd.EEventName.MOUSEMOVE);

                    expect(controller._changeOrbit).toCalledOnce();

                    triggerDomEvent(wd.EEventName.MOUSEUP);

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
                it("test touch event", function () {
                    sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);

                    sandbox.stub(controller, "_changeOrbit");


                    fakeEvent = eventTool.buildFakeTouchEvent(10, 10);





                    director._init();

                    triggerDomEvent(wd.EEventName.TOUCHDOWN);
                    triggerDomEvent(wd.EEventName.TOUCHMOVE);

                    expect(controller._changeOrbit).toCalledOnce();

                    triggerDomEvent(wd.EEventName.TOUCHUP);


                    controller.dispose();

                    triggerDomEvent(wd.EEventName.TOUCHDOWN);
                    triggerDomEvent(wd.EEventName.TOUCHMOVE);
                    triggerDomEvent(wd.EEventName.TOUCHUP);


                    expect(controller._changeOrbit).toCalledOnce();
                });
            });
        });
    });

    testTool.shouldExecRunTest("test more");

    describe("fix bug", function(){
        beforeEach(function(){
            sandbox.stub(wd.EventTriggerDetectorUtils, "isInRect").returns(true);
        });

        it("the event handler binded should not affected by other event handler binded on the same event", function(){
            prepare(sandbox);

            manager.on(director.scene, wd.EEngineEvent.POINT_DRAG, function(e){
            });


            sandbox.stub(controller, "_changeOrbit");

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

        describe("test change attr directly", function(){
            var director;

            beforeEach(function(){
                prepare(sandbox);

                director = wd.Director.getInstance();

                director.scene.addChild(camera);

                director._init();
            });

            describe("test change distance attr", function(){
                it("should update when change the distance attr", function(){
                    var distance = 110;

                    director._loopBody(1);

                    expect(controller.entityObject.transform.position.z).not.toEqual(distance);




                    controller.distance = distance;

                    director._loopBody(2);

                    expect(controller.entityObject.transform.position.z).toEqual(distance);
                });
                it("distance shouldn't < minDistance", function(){
                    controller.minDistance = 120;
                    var distance = 110;

                    director._loopBody(1);





                    controller.distance = distance;

                    director._loopBody(2);

                    expect(controller.entityObject.transform.position.z).toEqual(120);
                });
            });

            describe("test change minDistance attr", function(){
                it("if distance > minDistance, change distance", function(){
                    var distance = 110;

                    controller.distance = distance;

                    director._loopBody(1);




                    controller.minDistance = 120;

                    director._loopBody(2);

                    expect(controller.entityObject.transform.position.z).toEqual(120);
                });
            });

            describe("test change phi attr", function(){
                it("should update when change the phi attr", function(){
                    controller.phi = Math.PI / 2;

                    director._loopBody(1);

                    var pos = controller.entityObject.transform.position;





                    controller.phi = Math.PI / 4;

                    director._loopBody(2);

                    expect(testTool.getValues(controller.entityObject.transform.position)).not.toEqual(testTool.getValues(pos));
                });
            });

            describe("test change theta attr", function(){
                it("should update when change the theta attr", function(){
                    controller.theta = Math.PI / 2;

                    director._loopBody(1);

                    var pos = controller.entityObject.transform.position;





                    controller.theta = Math.PI / 4;

                    director._loopBody(2);

                    expect(testTool.getValues(controller.entityObject.transform.position)).not.toEqual(testTool.getValues(pos));
                });
                it("should constrain theta", function(){
                    controller.theta = Math.PI / 2;



                    controller.thetaMargin = Math.PI / 3;

                    controller.theta = Math.PI / 4;

                    expect(controller.theta).toEqual(controller.thetaMargin);
                });
            });

            describe("test change thetaMargin attr", function(){
                it("should constrain theta", function(){
                    controller.theta = Math.PI / 2;

                    controller.thetaMargin = Math.PI;

                    expect(controller.theta).toEqual(controller.thetaMargin);
                });
            });

            describe("test change target attr", function(){
                it("should update when change the target attr", function(){
                    controller.target = wd.Vector3.create(0,0,1);

                    director._loopBody(1);

                    var pos = controller.entityObject.transform.position;





                    controller.target = wd.Vector3.create(1,0,1);

                    director._loopBody(2);

                    expect(testTool.getValues(controller.entityObject.transform.position)).not.toEqual(testTool.getValues(pos));
                });
            });
        });


        describe("the first drag event's movementDelta should === {x:0,y:0} during the second drag event", function(){
            function judgePointEvent(pageX1, pageY1, pageX2, pageY2, eventType) {
                var fakeEvent2;

                if(eventType === "mouse"){
                    fakeEvent = eventTool.buildFakeMouseEvent(pageX1, pageY1);
                    fakeEvent2 = eventTool.buildFakeMouseEvent(pageX2, pageY2);
                }
                else{
                    fakeEvent = eventTool.buildFakeTouchEvent(pageX1, pageY1);
                    fakeEvent2 = eventTool.buildFakeTouchEvent(pageX2, pageY2);
                }


                director._init();


                var eventTarget = null;

                manager.on(director.scene, wd.EEngineEvent.POINT_DRAG,function (e) {
                    eventTarget = e;
                });



                manager.trigger(wd[eventType[0].toUpperCase() + eventType.slice(1) + "Event"].create(fakeEvent, wd.EEventName[eventType.toUpperCase() + "DOWN"]));
                manager.trigger(wd[eventType[0].toUpperCase() + eventType.slice(1) + "Event"].create(fakeEvent, wd.EEventName[eventType.toUpperCase() + "MOVE"]));

                manager.trigger(wd[eventType[0].toUpperCase() + eventType.slice(1) + "Event"].create(fakeEvent, wd.EEventName[eventType.toUpperCase() + "UP"]));






                manager.trigger(wd[eventType[0].toUpperCase() + eventType.slice(1) + "Event"].create(fakeEvent2, wd.EEventName[eventType.toUpperCase() + "DOWN"]));
                manager.trigger(wd[eventType[0].toUpperCase() + eventType.slice(1) + "Event"].create(fakeEvent2, wd.EEventName[eventType.toUpperCase() + "MOVE"]));

                expect(eventTarget.userData.movementDelta).toEqual({
                    x:0,
                    y:0
                });
            }

            beforeEach(function(){
            });

            it("test mouse event", function(){
                judgePointEvent(10, 10, 20,20, "mouse");
            });
            it("test touch event", function () {
                //todo refactor
                sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);

                judgePointEvent(10, 10, 20,20, "touch");
            });
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

