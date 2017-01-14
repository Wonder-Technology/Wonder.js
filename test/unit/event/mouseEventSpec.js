describe("mouse event", function () {
    var manager = null;
    var sandbox = null;
    var fakeEvent = null;
    var canvas;
    var director, scene, camera;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        prepareTool.createGL("event-test");
        fakeEvent = {
            pageX:10,
            pageY:10
        };
        manager = wd.EventManager;

        canvas = document.getElementById("event-test");

        director = wd.Director.getInstance();

        scene = director.scene;

        camera =  testTool.createCamera(wd.Vector3.create(10, 10, 5), wd.Vector3.create(0, 0, 0), 0.1, 1000, 60);

        scene.addChild(camera);




        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        removeDom();
        manager.off();
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("bind/unbind mouse event", function(){
        beforeEach(function(){
        });

        describe("eventName", function(){
            if(bowser.firefox){
                return;
            }

            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                director._init();


                manager.on(scene, wd.EEngineEvent.POINT_TAP, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                expect(eventTarget.userData.event.pageX).toEqual(fakeEvent.pageX);
                expect(eventTarget.userData.event.pageY).toEqual(fakeEvent.pageY);
                expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_TAP);
                expect(sum).toEqual(1);



                manager.off(scene, wd.EEngineEvent.POINT_TAP);
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                director._init();

                var subscription = manager.fromEvent(scene, wd.EEngineEvent.POINT_DOWN)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });

                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

                expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEngineEvent.POINT_DOWN));

                expect(sum).toEqual(1);
            });

            describe("can specify entityObject which is added to scene", function(){
                var object1;

                function createObject(name, pos) {
                    var object = colliderTool.createBox(wd.BoxCollider, 5);
                    object.name = name;

                    var eventTriggerDetector = wd.RayCasterEventTriggerDetector.create();

                    object.addComponent(eventTriggerDetector);


                    pos = pos || wd.Vector3.create(10, 10, 0);

                    object.transform.position = pos;

                    return object;
                }

                beforeEach(function() {
                    object1 = createObject("object1");

                    scene.addChild(object1);
                });


                describe("test on/off", function(){
                    var eventTarget = null,
                        sum = null;
                    var handler1;

                    beforeEach(function(){
                        director._init();
                        director._loopBody(1);



                        sum = 0;





                        handler1 = function (e) {
                            eventTarget = e;
                            sum++;
                        };

                        manager.on(object1, wd.EEngineEvent.POINT_TAP, handler1);



                        fakeEvent = {
                            pageX:1,
                            pageY:1
                        };


                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        //not trigger
                        expect(sum).toEqual(0);



                        fakeEvent = {
                            pageX:10,
                            pageY:10
                        };


                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);
                        expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                        expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_TAP);
                    });

                    it("test off(eventName)", function(){
                        manager.off(wd.EEngineEvent.POINT_TAP);

                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);

                    });
                    it("test off(dom, eventName)", function(){
                        manager.off(object1, wd.EEngineEvent.POINT_TAP);

                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);
                    });
                    it("test off(dom,eventName,hander)", function(){
                        var sum2 = 0;
                        var handler2 = function (e) {
                            sum2++;
                        };

                        manager.on(object1, wd.EEngineEvent.POINT_TAP, handler2);


                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(2);
                        expect(sum2).toEqual(1);

                        manager.off(object1, wd.EEngineEvent.POINT_TAP, handler2);


                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);


                        manager.off(object1, wd.EEngineEvent.POINT_TAP, handler1);

                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);
                    });
                });
                it("test fromEvent/dispose", function(){
                    var eventTarget = null,
                        sum = 0;

                    director._init();
                    director._loopBody(1);

                    var subscription = manager.fromEvent(object1, wd.EEngineEvent.POINT_TAP)
                        .subscribe(function (e) {
                            eventTarget = e;
                            sum++;
                        });

                    manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));


                    expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                    expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_TAP);
                    expect(sum).toEqual(1);



                    subscription.dispose();

                    manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                    expect(sum).toEqual(1);

                });
                it("test trigger dom event", function(){
                    var sum = 0;
                    sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");


                    director._init();
                    director._loopBody(1);


                    var subscription = manager.fromEvent(object1, wd.EEngineEvent.POINT_UP).subscribe(function(e){
                        sum++;
                    });

                    eventTool.triggerDomEvent(wd.EEventName.MOUSEUP, document.body, fakeEvent);

                    expect(sum).toEqual(1);
                    expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
                });
                it("event->target should be the target where the event is triggered, currentTarget should be the binded target", function(){
                    var eventTarget1 = null;
                    var eventTarget2 = null;




                    director._init();
                    director._loopBody(1);


                    manager.fromEvent(object1, wd.EEngineEvent.POINT_UP).subscribe(function(e){
                        eventTarget1 = e;
                    });

                    manager.fromEvent(scene, wd.EEngineEvent.POINT_UP).subscribe(function(e){
                        eventTarget2 = e;
                    });

                    eventTool.triggerDomEvent(wd.EEventName.MOUSEUP, document.body, fakeEvent);

                    expect(eventTarget1.target).toEqual(object1);
                    expect(eventTarget1.currentTarget).toEqual(object1);

                    expect(eventTarget2.target).toEqual(object1);
                    expect(eventTarget2.currentTarget).toEqual(scene);
                });
            });
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            director._init();

            var subscription1 = manager.fromEvent(scene, wd.EEngineEvent.POINT_DOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(scene, wd.EEngineEvent.POINT_DOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
            expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("transfer event", function(){
        //    var mesh1,mesh2,mesh3,mesh4;
        //    var eventTarget1 = null,
        //        eventTarget2 = null,
        //        eventTarget3 = null,
        //        eventTarget4 = null;
        //    var fakeObj;
        //
        //    beforeEach(function(){
        //        mesh1 = wd.GameObject.create();
        //        mesh2 = wd.GameObject.create();
        //        mesh3 = wd.GameObject.create();
        //        mesh4 = wd.GameObject.create();
        //        mesh2.addChild(mesh1);
        //        mesh4.addChild(mesh2);
        //        mesh4.addChild(mesh3);
        //        fakeObj = {
        //            a:sandbox.stub(),
        //            b:sandbox.stub(),
        //            c:sandbox.stub(),
        //            d:sandbox.stub()
        //        }
        //
        //        manager.fromEvent(mesh1, wd.EEngineEvent.POINT_DOWN)
        //            .subscribe(function (e) {
        //                eventTarget1 = e;
        //                fakeObj.a();
        //            });
        //        manager.fromEvent(mesh2, wd.EEngineEvent.POINT_DOWN)
        //            .subscribe(function (e) {
        //                eventTarget2 = e;
        //                fakeObj.b();
        //            });
        //        manager.fromEvent(mesh3, wd.EEngineEvent.POINT_DOWN)
        //            .subscribe(function (e) {
        //                eventTarget3 = e;
        //                fakeObj.c();
        //            });
        //        manager.fromEvent(mesh4, wd.EEngineEvent.POINT_DOWN)
        //            .subscribe(function (e) {
        //                eventTarget4 = e;
        //                fakeObj.d();
        //            });
        //    });
        //
        //    it("emit mouse event", function(){
        //        manager.emit(mesh1, wd.PointEvent.create(fakeEvent, wd.EEngineEvent.POINT_DOWN));
        //
        //        expect(eventTarget1.phase).toEqual(wd.EEventPhase.EMIT);
        //        expect(eventTarget1.target.uid).toEqual(mesh1.uid);
        //        expect(eventTarget2.phase).toEqual(wd.EEventPhase.EMIT);
        //        expect(eventTarget2.target.uid).toEqual(mesh1.uid);
        //        expect(eventTarget3).toBeNull();
        //        expect(eventTarget4.phase).toEqual(wd.EEventPhase.EMIT);
        //        expect(eventTarget4.target.uid).toEqual(mesh1.uid);
        //        expect(fakeObj.a).toCalledBefore(fakeObj.b);
        //        expect(fakeObj.b).toCalledBefore(fakeObj.d);
        //    });
        //    it("broadcast mouse event", function(){
        //        manager.broadcast(mesh4, wd.PointEvent.create(fakeEvent, wd.EEngineEvent.POINT_DOWN));
        //
        //        expect(eventTarget4.phase).toEqual(wd.EEventPhase.BROADCAST);
        //        expect(eventTarget4.target.uid).toEqual(mesh4.uid);
        //        expect(eventTarget2.phase).toEqual(wd.EEventPhase.BROADCAST);
        //        expect(eventTarget2.target.uid).toEqual(mesh4.uid);
        //        expect(eventTarget1.phase).toEqual(wd.EEventPhase.BROADCAST);
        //        expect(eventTarget1.target.uid).toEqual(mesh4.uid);
        //        expect(eventTarget3.phase).toEqual(wd.EEventPhase.BROADCAST);
        //        expect(eventTarget3.target.uid).toEqual(mesh4.uid);
        //        expect(fakeObj.d).toCalledBefore(fakeObj.b);
        //        expect(fakeObj.b).toCalledBefore(fakeObj.a);
        //        expect(fakeObj.a).toCalledBefore(fakeObj.c);
        //    });

        beforeEach(function(){
            testTool.openContractCheck(sandbox);

            director._init();
        });

        it("not support emit mouse event", function(){
            expect(function(){
                manager.emit(scene, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
            }).toThrow("eventObject must be CustomEvent");
        });
        it("not support broadcast mouse event", function(){
            expect(function(){
                manager.broadcast(scene, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
            }).toThrow("eventObject must be CustomEvent");
        });
    });

    describe("handle mousemove event", function(){
        it("save location to event object after trigger event", function(){
            director._init();

            var eventTarget = null;
            var fakeEvent2 = {
                pageX: 20,
                pageY:20
            };

            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
                    eventTarget = e;
                });

            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));
            manager.trigger(wd.MouseEvent.create(fakeEvent2, wd.EEventName.MOUSEMOVE));

            expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
            expect(eventTarget.userData.lastX).toEqual(fakeEvent.pageX);
            expect(eventTarget.userData.lastY).toEqual(fakeEvent.pageY);
        });
    });

    describe("test drag", function(){
        var sum1,stub, pointoverStub;
        var _saveLocation;

        beforeEach(function(){
            sum1 = 0;
            stub = sandbox.stub();
            pointoverStub = sandbox.stub();

            sandbox.stub(wd.MouseEventHandler.getInstance(), "_saveLocation");

            _saveLocation = wd.MouseEventHandler.getInstance()._saveLocation;

            director._init();

            manager.fromEvent(scene, wd.EEngineEvent.POINT_DRAG)
                .subscribe(function(e){
                    sum1++;
                    stub();
                });


            manager.fromEvent(scene, wd.EEngineEvent.POINT_OVER)
                .subscribe(function(e){
                    pointoverStub();
                });

            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEUP, document.body, fakeEvent);
        });

        it("test trigger drag event", function(){
            expect(_saveLocation).toCalledOnce();
            expect(_saveLocation).toCalledAfter(stub);
        });
        it("invoke '_saveLocation' method if trigger mousemove during triggering drag event", function () {
            eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE, document.body, fakeEvent);

            expect(_saveLocation).toCalledTwice();
        });
        it("test trigger drag event twice and trigger mousemove event once", function () {
            eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE, document.body, fakeEvent);


            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.MOUSEUP, document.body, fakeEvent);


            expect(_saveLocation.callCount).toEqual(3);
            expect(stub.callCount).toEqual(2);

            expect(_saveLocation.firstCall).toCalledAfter(stub.firstCall);
            expect(_saveLocation.thirdCall).toCalledAfter(stub.secondCall);
            expect(sum1).toEqual(2);
        });
        it("trigger pointover event before first drag event trigger", function () {
            expect(pointoverStub).toCalledBefore(stub)
        });
    });

    describe("off event", function(){
        var sum;
        var subscription;

        beforeEach(function(){
            sum = 0;


            director._init();

            subscription = manager.fromEvent(scene, wd.EEngineEvent.POINT_DOWN).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN, document.body, fakeEvent);

            expect(sum).toEqual(1);



            subscription.dispose();


            eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE, document.body, fakeEvent);

            expect(sum).toEqual(1);


            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(sum).toEqual(1);
        });
        it("use EventManager.off", function(){
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(sum).toEqual(1);



            manager.off();


            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

            expect(sum).toEqual(1);


            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(sum).toEqual(1);
        });
    });

    describe("fix bug", function(){
        beforeEach(function(){
        });

        it("if bind the same event more than once, the result of getting movementDelta except first handler should be correctly", function(){
            var movementDelta = [];

            var fakeEvent1 = {
                pageX: 10,
                pageY:10
            }
            var fakeEvent2 = {
                pageX: 20,
                pageY:20
            }


            director._init();



            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
            });
            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
                movementDelta.push(e.userData.movementDelta);
            });

            manager.trigger(wd.MouseEvent.create(fakeEvent1, wd.EEventName.MOUSEMOVE));
            manager.trigger(wd.MouseEvent.create(fakeEvent1, wd.EEventName.MOUSEMOVE));
            manager.trigger(wd.MouseEvent.create(fakeEvent2, wd.EEventName.MOUSEMOVE));

            //first mousemove trigger POINTOVER event
            expect(movementDelta.length).toEqual(2);

            var movementDelta = movementDelta[1];
            expect(movementDelta.x).toEqual(20 - 10);
            expect(movementDelta.y).toEqual(20 - 10);
        });
    });
});




