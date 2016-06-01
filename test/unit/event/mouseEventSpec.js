describe("mouse event", function () {
    var manager = null;
    var Listener = null;
    var sandbox = null;
    var fakeEvent = null;
    var canvas;

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
        Listener = wd.EventListener;

        canvas = document.getElementById("event-test");
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
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(wd.EEventName.CLICK, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                expect(eventTarget.name).toEqual(wd.EEventName.CLICK);
                expect(sum).toEqual(1);

                manager.off(wd.EEventName.CLICK);
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(wd.EEventName.CLICK)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                expect(eventTarget.name).toEqual(wd.EEventName.CLICK);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                expect(sum).toEqual(1);
            });

            describe("can specify the binded dom", function(){
                describe("test on/off", function(){
                    var dom;
                    var eventTarget = null,
                        sum = null;
                    var handler1;

                    beforeEach(function(){
                        sum = 0;
                        dom = canvas;

                        handler1 = function (e) {
                            eventTarget = e;
                            sum++;
                        };

                        manager.on(dom, wd.EEventName.CLICK, handler1);



                        manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        //not trigger
                        expect(sum).toEqual(0);


                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);
                        expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                        expect(eventTarget.name).toEqual(wd.EEventName.CLICK);
                    });

                    it("test off(eventName)", function(){
                        manager.off(wd.EEventName.CLICK);

                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);

                    });
                    it("test off(dom, eventName)", function(){
                        manager.off(dom, wd.EEventName.CLICK);

                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(1);
                    });
                    it("test off(dom,eventName,hander)", function(){
                        var sum2 = 0;
                        var handler2 = function (e) {
                            sum2++;
                        };

                        manager.on(dom, wd.EEventName.CLICK, handler2);


                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(2);
                        expect(sum2).toEqual(1);

                        manager.off(dom, wd.EEventName.CLICK, handler2);


                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);


                        manager.off(dom, wd.EEventName.CLICK, handler1);

                        manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                        expect(sum).toEqual(3);
                        expect(sum2).toEqual(1);
                    });
                });
                it("test fromEvent/dispose", function(){
                    var eventTarget = null,
                        sum = 0;
                    var dom = canvas;

                    var subscription = manager.fromEvent(dom, wd.EEventName.CLICK)
                        .subscribe(function (e) {
                            eventTarget = e;
                            sum++;
                        });

                    manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                    //not trigger
                    expect(sum).toEqual(0);


                    manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                    expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                    expect(eventTarget.name).toEqual(wd.EEventName.CLICK);
                    expect(sum).toEqual(1);



                    subscription.dispose();
                    manager.trigger(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

                    expect(sum).toEqual(1);

                });
                it("test trigger dom event", function(){
                    sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
                    var eventTarget = null,
                        sum = 0;
                    var dom = document.body;

                    var subscription = manager.fromEvent(dom, wd.EEventName.CLICK)
                        .subscribe(function (e) {
                            eventTarget = e;
                            sum++;
                        });

                    eventTool.triggerDomEvent(wd.EEventName.CLICK, dom);

                    expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                    expect(eventTarget.name).toEqual(wd.EEventName.CLICK);
                    expect(sum).toEqual(1);
                    expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
                });
            });
        });
        it("listener", function(){
            var eventTarget = null,
                sum = 0;

            manager.on(
                {
                    eventType: wd.EEventType.MOUSE,

                    onClick: function (e) {
                        eventTarget = e;
                        sum++;
                    }
                }
            );
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            expect(eventTarget.name).toEqual(wd.EEventName.CLICK);

            manager.off(wd.EEventName.CLICK);
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.CLICK));

            expect(sum).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(wd.EEventName.MOUSEDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(wd.EEventName.MOUSEDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            expect(eventTarget.name).toEqual(wd.EEventName.MOUSEDOWN);
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
        //        manager.fromEvent(mesh1, wd.EEventName.MOUSEDOWN)
        //            .subscribe(function (e) {
        //                eventTarget1 = e;
        //                fakeObj.a();
        //            });
        //        manager.fromEvent(mesh2, wd.EEventName.MOUSEDOWN)
        //            .subscribe(function (e) {
        //                eventTarget2 = e;
        //                fakeObj.b();
        //            });
        //        manager.fromEvent(mesh3, wd.EEventName.MOUSEDOWN)
        //            .subscribe(function (e) {
        //                eventTarget3 = e;
        //                fakeObj.c();
        //            });
        //        manager.fromEvent(mesh4, wd.EEventName.MOUSEDOWN)
        //            .subscribe(function (e) {
        //                eventTarget4 = e;
        //                fakeObj.d();
        //            });
        //    });
        //
        //    it("emit mouse event", function(){
        //        manager.emit(mesh1, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
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
        //        manager.broadcast(mesh4, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
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
        });

        it("not support emit mouse event", function(){
            var dom = document.body;

            expect(function(){
                manager.emit(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
            }).toThrow();
        });
        it("not support broadcast mouse event", function(){
            var dom = document.body;

            expect(function(){
                manager.broadcast(dom, wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEDOWN));
            }).toThrow();
        });
    });

    describe("handle mousemove event", function(){
        it("save location to event object after emit event", function(){
            var eventTarget = null;
            var fakeEvent2 = {
                pageX: 20,
                pageY:20
            }

            manager.on(wd.EEventName.MOUSEMOVE,function (e) {
                    eventTarget = e;
                });

            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));
            manager.trigger(wd.MouseEvent.create(fakeEvent2, wd.EEventName.MOUSEMOVE));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            expect(eventTarget.lastX).toEqual(fakeEvent.pageX);
            expect(eventTarget.lastY).toEqual(fakeEvent.pageY);
        });
    });

    it("use drag example to test", function(){
        var sum1 = 0;
        var stub = sandbox.stub();
        target = wd.Director.getInstance().scene;

        sandbox.stub(wd.MouseEventHandler.getInstance(), "_saveLocation");


        manager.fromEvent(wd.EEventName.MOUSEDOWN).flatMap(function(e){
                return manager.fromEvent(wd.EEventName.MOUSEMOVE).takeUntil(manager.fromEvent(wd.EEventName.MOUSEUP));
            })
            .subscribe(function(e){
                sum1++;
                stub();
            })


        var _saveLocation = wd.MouseEventHandler.getInstance()._saveLocation;

        eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);
        eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE);
        eventTool.triggerDomEvent(wd.EEventName.MOUSEUP);

        expect(_saveLocation).toCalledOnce();
        expect(_saveLocation).toCalledAfter(stub);


        eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE);

        expect(_saveLocation).toCalledOnce();


        eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);
        eventTool.triggerDomEvent(wd.EEventName.MOUSEMOVE);
        eventTool.triggerDomEvent(wd.EEventName.MOUSEUP);


        expect(_saveLocation).toCalledTwice();
        expect(stub).toCalledTwice();
        expect(_saveLocation.firstCall).toCalledAfter(stub.firstCall);
        expect(_saveLocation.secondCall).toCalledAfter(stub.secondCall);
        expect(sum1).toEqual(2);
    });

    describe("off event", function(){
        var sum;
        var subscription;

        beforeEach(function(){
            sum = 0;
            sandbox.spy(wd.MouseEventHandler.getInstance(), "triggerDomEvent");
            target = wd.Director.getInstance().scene;
            subscription = manager.fromEvent(wd.EEventName.MOUSEDOWN).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            subscription.dispose();


            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
        it("use EventManager.off", function(){
            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            manager.off();


            manager.trigger(wd.MouseEvent.create(fakeEvent, wd.EEventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            eventTool.triggerDomEvent(wd.EEventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
    });
    
    it("test event obj->target", function(){
        //todo finish
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

            manager.on(wd.EEventName.MOUSEMOVE,function (e) {
            });
            manager.on(wd.EEventName.MOUSEMOVE,function (e) {
                movementDelta.push(e.movementDelta);
            });

            manager.trigger(wd.MouseEvent.create(fakeEvent1, wd.EEventName.MOUSEMOVE));
            manager.trigger(wd.MouseEvent.create(fakeEvent2, wd.EEventName.MOUSEMOVE));


            var movementDelta = movementDelta[1];
            expect(movementDelta.x).toEqual(20 - 10);
            expect(movementDelta.y).toEqual(20 - 10);
        });
    });
});




