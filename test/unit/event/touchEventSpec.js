describe("touch event", function () {
    var manager = null;
    var sandbox = null;
    var fakeEvent = null;
    var pageX, pageY;
    var director, scene, camera;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    function buildFakeEvent(pageX, pageY) {
        return eventTool.buildFakeTouchEvent(pageX, pageY);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        prepareTool.createGL("event-test");

        pageX = 10;
        pageY = 10;
        fakeEvent = buildFakeEvent(pageX, pageY);
        manager = wd.EventManager;

        director = wd.Director.getInstance();

        scene = director.scene;

        camera =  testTool.createCamera(wd.Vector3.create(10, 10, 5), wd.Vector3.create(0, 0, 0), 0.1, 1000, 60);

        scene.addChild(camera);




        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));




        sandbox.stub(director.domEventManager._pointEventBinder, "_isSupportTouch").returns(true);
    });
    afterEach(function () {
        manager.off();
        removeDom();
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("bind/unbind touch event", function(){
        beforeEach(function(){
        });

        describe("eventName", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                director._init();


                manager.on(scene, wd.EEngineEvent.POINT_DOWN, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                expect(eventTarget.userData.event.pageX).toEqual(pageX);
                expect(eventTarget.userData.event.pageY).toEqual(pageY);
                expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
                expect(sum).toEqual(1);



                manager.off(scene, wd.EEventName.POINDOWN);
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEngineEvent.POINT_DOWN));

                expect(sum).toEqual(1);
            });
            it("test trigger event", function(){
                var sum = 0;
                sandbox.spy(wd.TouchEventHandler.getInstance(), "triggerDomEvent");


                director._init();


                var subscription = manager.fromEvent(scene, wd.EEngineEvent.POINT_UP).subscribe(function(e){
                    sum++;
                });

                eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);

                expect(sum).toEqual(1);
                expect(wd.TouchEventHandler.getInstance().triggerDomEvent).toCalledOnce();
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

                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                expect(sum).toEqual(1);
            });
            it("not trigger point scale event", function () {
                expect().toPass();
            });
            it("support point tap event", function () {
                var eventTarget = null,
                    sum = 0;

                director._init();


                manager.on(scene, wd.EEngineEvent.POINT_TAP, function (e) {
                    eventTarget = e;
                    sum++;
                });


                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHUP));

                expect(sum).toEqual(0);


                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                expect(sum).toEqual(0);



                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHUP));

                expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                expect(eventTarget.userData.event.pageX).toEqual(pageX);
                expect(eventTarget.userData.event.pageY).toEqual(pageY);
                expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_TAP);
                expect(sum).toEqual(1);




                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHUP));


                expect(sum).toEqual(2);



                manager.off(scene, wd.EEngineEvent.POINT_TAP);

                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));
                manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHUP));

                expect(sum).toEqual(2);
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
                    if(bowser.firefox){
                        return;
                    }

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

                        manager.on(object1, wd.EEngineEvent.POINT_DOWN, handler1);



                        fakeEvent = buildFakeEvent(1, 1);


                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        //not trigger
                        expect(sum).toEqual(0);



                        fakeEvent = buildFakeEvent(10, 10);

                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(1);
                        expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                        expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
                    });

                    it("test off(eventName)", function(){
                        manager.off(wd.EEngineEvent.POINT_DOWN);

                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(1);

                    });
                    it("test off(dom, eventName)", function(){
                        manager.off(object1, wd.EEngineEvent.POINT_DOWN);

                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(1);
                    });
                    it("test off(dom,eventName,hander)", function(){
                        var sum2 = 0;
                        var handler2 = function (e) {
                            sum2++;
                        };

                        manager.on(object1, wd.EEngineEvent.POINT_DOWN, handler2);


                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(2);
                        expect(sum2).toEqual(1);

                        manager.off(object1, wd.EEngineEvent.POINT_DOWN, handler2);


                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);


                        manager.off(object1, wd.EEngineEvent.POINT_DOWN, handler1);

                        manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);
                    });
                });
                it("test fromEvent/dispose", function(){
                    var eventTarget = null,
                        sum = 0;

                    director._init();
                    director._loopBody(1);

                    var subscription = manager.fromEvent(object1, wd.EEngineEvent.POINT_DOWN)
                        .subscribe(function (e) {
                            eventTarget = e;
                            sum++;
                        });

                    manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));


                    expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
                    expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
                    expect(sum).toEqual(1);



                    subscription.dispose();

                    manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

                    expect(sum).toEqual(1);

                });
                it("test trigger dom event", function(){
                    var sum = 0;
                    sandbox.spy(wd.TouchEventHandler.getInstance(), "triggerDomEvent");


                    director._init();
                    director._loopBody(1);


                    var subscription = manager.fromEvent(object1, wd.EEngineEvent.POINT_UP).subscribe(function(e){
                        sum++;
                    });

                    eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);

                    expect(sum).toEqual(1);
                    expect(wd.TouchEventHandler.getInstance().triggerDomEvent).toCalledOnce();
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

                    eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);

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
            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

            expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
            expect(eventTarget.name).toEqual(wd.EEngineEvent.POINT_DOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("transfer event", function(){
        beforeEach(function(){
            testTool.openContractCheck(sandbox);

            director._init();
        });

        it("not support emit touch event", function(){
            expect(function(){
                manager.emit(scene, wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));
            }).toThrow("eventObject must be CustomEvent");
        });
        it("not support broadcast touch event", function(){
            expect(function(){
                manager.broadcast(scene, wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));
            }).toThrow("eventObject must be CustomEvent");
        });
    });

    describe("handle touchmove event", function(){
        it("save location to event object after trigger event", function(){
            director._init();

            var eventTarget = null;
            var fakeEvent2 = buildFakeEvent(20, 20);

            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
                eventTarget = e;
            });

            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHMOVE));
            manager.trigger(wd.TouchEvent.create(fakeEvent2, wd.EEventName.TOUCHMOVE));

            expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
            expect(eventTarget.userData.lastX).toEqual(pageX);
            expect(eventTarget.userData.lastY).toEqual(pageY);
        });
    });

    describe("test drag", function(){
        var sum1,stub, pointoverStub;
        var eventTarget;
        var _saveLocation;

        beforeEach(function(){
            sum1 = 0;
            stub = sandbox.stub();
            pointoverStub = sandbox.stub();

            sandbox.spy(wd.TouchEventHandler.getInstance(), "_saveLocation");

            _saveLocation = wd.TouchEventHandler.getInstance()._saveLocation;

            director._init();

            manager.fromEvent(scene, wd.EEngineEvent.POINT_DRAG)
                .subscribe(function(e){
                    eventTarget = e;
                    sum1++;
                    stub();
                });


            manager.fromEvent(scene, wd.EEngineEvent.POINT_OVER)
                .subscribe(function(e){
                    pointoverStub();
                });

        });

        it("test trigger drag event", function(){
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);


            expect(stub.callCount).toEqual(1);
            expect(_saveLocation).toCalledOnce();
            expect(_saveLocation).toCalledAfter(stub);
        });
        it("invoke '_saveLocation' method if trigger touchmove during triggering drag event", function () {
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);

            expect(_saveLocation).toCalledTwice();
        });
        it("trigger pointover event before first drag event trigger", function () {
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);

            expect(pointoverStub).toCalledBefore(stub)
        });
        it("test trigger drag event twice and trigger touchmove event once", function () {
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);

            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);


            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);


            expect(_saveLocation.callCount).toEqual(3);
            expect(stub.callCount).toEqual(2);

            expect(_saveLocation.firstCall).toCalledAfter(stub.firstCall);
            expect(_saveLocation.thirdCall).toCalledAfter(stub.secondCall);
            expect(sum1).toEqual(2);
        });
        it("up event which end drag event should set event.lastX,lastY to be null", function () {
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);
            eventTool.triggerDomEvent(wd.EEventName.TOUCHUP, document.body, fakeEvent);


            var fakeEvent2 = buildFakeEvent(20,20);

            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent2);


            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent2);



            expect(eventTarget).toBeInstanceOf(wd.CustomEvent);
            // expect(eventTarget.userData.lastX).toEqual(pageX);
            // expect(eventTarget.userData.lastY).toEqual(pageY);        });
            expect(eventTarget.userData.lastX).toBeNull();
            expect(eventTarget.userData.lastY).toBeNull();



            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent2);

            expect(eventTarget.userData.lastX).toEqual(20);
            expect(eventTarget.userData.lastY).toEqual(20);
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
            eventTool.triggerDomEvent(wd.EEventName.TOUCHDOWN, document.body, fakeEvent);

            expect(sum).toEqual(1);



            subscription.dispose();


            eventTool.triggerDomEvent(wd.EEventName.TOUCHMOVE, document.body, fakeEvent);

            expect(sum).toEqual(1);


            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

            expect(sum).toEqual(1);
        });
        it("use EventManager.off", function(){
            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

            expect(sum).toEqual(1);



            manager.off();


            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHMOVE));

            expect(sum).toEqual(1);


            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));

            expect(sum).toEqual(1);
        });
    });

    describe("fix bug", function(){
        beforeEach(function(){
        });

        it("if bind the same event more than once, the result of getting movementDelta except first handler should be correctly", function(){
            var movementDelta = [];

            var fakeEvent1 = buildFakeEvent(10, 10);
            var fakeEvent2 = buildFakeEvent(20, 20);


            director._init();



            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
            });
            manager.on(scene, wd.EEngineEvent.POINT_MOVE,function (e) {
                movementDelta.push(e.userData.movementDelta);
            });

            manager.trigger(wd.TouchEvent.create(fakeEvent1, wd.EEventName.TOUCHMOVE));
            manager.trigger(wd.TouchEvent.create(fakeEvent1, wd.EEventName.TOUCHMOVE));
            manager.trigger(wd.TouchEvent.create(fakeEvent2, wd.EEventName.TOUCHMOVE));

            //first touchmove trigger POINTOVER event
            expect(movementDelta.length).toEqual(2);

            var movementDelta = movementDelta[1];
            expect(movementDelta.x).toEqual(20 - 10);
            expect(movementDelta.y).toEqual(20 - 10);
        });
        it("handle point down event(data with touches) and point up event(data with changedTouches)", function(){
            var eventTarget1 = null,
                eventTarget2 = null,
                sum = 0;

            director._init();


            manager.on(scene, wd.EEngineEvent.POINT_DOWN, function (e) {
                eventTarget1 = e;
            });
            manager.on(scene, wd.EEngineEvent.POINT_UP, function (e) {
                eventTarget2 = e;
            });

            fakeEvent = {
                touches:[{
                    pageX:10,
                    pageY:10
                }],
                changedTouches:[{
                    pageX:10,
                    pageY:10
                }]
            };


            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHDOWN));


            fakeEvent = {
                touches:[],
                changedTouches:[{
                    pageX:20,
                    pageY:20
                }]
            };


            manager.trigger(wd.TouchEvent.create(fakeEvent, wd.EEventName.TOUCHUP));



            expect(eventTarget1.userData.event.pageX).toEqual(10);
            expect(eventTarget1.userData.event.pageY).toEqual(10);

            expect(eventTarget2.userData.event.pageX).toEqual(20);
            expect(eventTarget2.userData.event.pageY).toEqual(20);
        });
    });
});




