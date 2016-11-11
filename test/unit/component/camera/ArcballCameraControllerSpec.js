describe("ArcballCameraController", function () {
    var sandbox = null;
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

        director = wd.Director.getInstance();

        manager = wd.EventManager;

        insertDom();
        prepareTool.createGL("event-test");
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
            if(bowser.firefox){
                expect().toPass();
                return;
            }

            director._init();

            expect(component).toEqual(cameraComponent);
            expect(component.entityObject).toEqual(camera);
        });

        describe("update entityObject's transform", function () {
            it("update position based on distance", function () {
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

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
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

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
            if(bowser.firefox){
                expect().toPass();
                return;
            }

            sandbox.spy(controller, "_updateTransform");
            controller.distance = 10;

            director._init();
            director._loopBody(1);

            expect(controller._updateTransform).toCalledOnce();
        });
        it("else, update transform", function(){
            if(bowser.firefox){
                expect().toPass();
                return;
            }

            sandbox.spy(controller, "_updateTransform");
            controller.distance = 10;

            director._init();

            controller.distance = 20;

            director._loopBody(1);

            expect(controller._updateTransform).toCalledTwice();
        });
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

        describe("test change attr directly", function(){
            var director;

            beforeEach(function(){
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                prepare(sandbox);

                director = wd.Director.getInstance();

                director.scene.addChild(camera);

                director._init();
            });

            describe("test change distance attr", function(){
                it("should update when change the distance attr", function(){
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    var distance = 110;

                    director._loopBody(1);

                    expect(controller.entityObject.transform.position.z).not.toEqual(distance);




                    controller.distance = distance;

                    director._loopBody(2);

                    expect(controller.entityObject.transform.position.z).toEqual(distance);
                });
                it("distance shouldn't < minDistance", function(){
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

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
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

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
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

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
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    controller.theta = Math.PI / 2;

                    director._loopBody(1);

                    var pos = controller.entityObject.transform.position;





                    controller.theta = Math.PI / 4;

                    director._loopBody(2);

                    expect(testTool.getValues(controller.entityObject.transform.position)).not.toEqual(testTool.getValues(pos));
                });
                it("should constrain theta", function(){
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    controller.theta = Math.PI / 2;



                    controller.thetaMargin = Math.PI / 3;

                    controller.theta = Math.PI / 4;

                    expect(controller.theta).toEqual(controller.thetaMargin);
                });
            });

            describe("test change thetaMargin attr", function(){
                it("should constrain theta", function(){
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    controller.theta = Math.PI / 2;

                    controller.thetaMargin = Math.PI;

                    expect(controller.theta).toEqual(controller.thetaMargin);
                });
            });

            describe("test change target attr", function(){
                it("should update when change the target attr", function(){
                    if(bowser.firefox){
                        expect().toPass();
                        return;
                    }

                    controller.target = wd.Vector3.create(0,0,1);

                    director._loopBody(1);

                    var pos = controller.entityObject.transform.position;





                    controller.target = wd.Vector3.create(1,0,1);

                    director._loopBody(2);

                    expect(testTool.getValues(controller.entityObject.transform.position)).not.toEqual(testTool.getValues(pos));
                });
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

