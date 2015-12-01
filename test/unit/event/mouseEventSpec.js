describe("mouse event", function () {
    var manager = null;
    var Listener = null;
    var sandbox = null;
    var target = null;
    var fakeEvent = null;

    function insertDom() {
        $("html").append($("<canvas id='event-test'></canvas>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        wd.DeviceManager.getInstance().createGL("#event-test");
        fakeEvent = {
            pageX:10,
            pageY:10
        };
        target =  wd.GameObject.create();
        manager = wd.EventManager;
        Listener = wd.EventListener;
    });
    afterEach(function () {
        removeDom();
        manager.off();
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("bind/unbind mouse event", function(){
        beforeEach(function(){

        });

        describe("eventName", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(target, wd.EventName.CLICK, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                expect(eventTarget.name).toEqual(wd.EventName.CLICK);
                expect(sum).toEqual(1);

                manager.off(target, wd.EventName.CLICK);
                manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(target, wd.EventName.CLICK)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
                expect(eventTarget.name).toEqual(wd.EventName.CLICK);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

                expect(sum).toEqual(1);
            });
        });
        it("listener", function(){
            var eventTarget = null,
                sum = 0;

            manager.on(target,
                {
                    eventType: wd.EventType.MOUSE,

                    onClick: function (e) {
                        eventTarget = e;
                        sum++;
                    }
                });
            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            expect(eventTarget.name).toEqual(wd.EventName.CLICK);

            manager.off(target, wd.EventName.CLICK);
            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.CLICK));

            expect(sum).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(target, wd.EventName.MOUSEDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(target, wd.EventName.MOUSEDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            expect(eventTarget.name).toEqual(wd.EventName.MOUSEDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("transfer event", function(){
        var mesh1,mesh2,mesh3,mesh4;
        var eventTarget1 = null,
            eventTarget2 = null,
            eventTarget3 = null,
            eventTarget4 = null;
        var fakeObj;

        beforeEach(function(){
            mesh1 = wd.GameObject.create();
            mesh2 = wd.GameObject.create();
            mesh3 = wd.GameObject.create();
            mesh4 = wd.GameObject.create();
            mesh2.addChild(mesh1);
            mesh4.addChild(mesh2);
            mesh4.addChild(mesh3);
            fakeObj = {
                a:sandbox.stub(),
                b:sandbox.stub(),
                c:sandbox.stub(),
                d:sandbox.stub()
            }

            manager.fromEvent(mesh1, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget1 = e;
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, wd.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget4 = e;
                    fakeObj.d();
                });
        });

        it("emit custom event", function(){
            manager.emit(mesh1, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEDOWN));

            expect(eventTarget1.phase).toEqual(wd.EventPhase.EMIT);
            expect(eventTarget1.target.uid).toEqual(mesh1.uid);
            expect(eventTarget2.phase).toEqual(wd.EventPhase.EMIT);
            expect(eventTarget2.target.uid).toEqual(mesh1.uid);
            expect(eventTarget3).toBeNull();
            expect(eventTarget4.phase).toEqual(wd.EventPhase.EMIT);
            expect(eventTarget4.target.uid).toEqual(mesh1.uid);
            expect(fakeObj.a).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.d);
        });
        it("broadcast custom event", function(){
            manager.broadcast(mesh4, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEDOWN));

            expect(eventTarget4.phase).toEqual(wd.EventPhase.BROADCAST);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(wd.EventPhase.BROADCAST);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(wd.EventPhase.BROADCAST);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(wd.EventPhase.BROADCAST);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });

    describe("handle mousemove event", function(){
        it("save location after emit event", function(){
            var eventTarget = null;

            manager.on(target, wd.EventName.MOUSEMOVE,function (e) {
                    eventTarget = e;
                });

            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEMOVE));

            expect(eventTarget).toBeInstanceOf(wd.MouseEvent);
            var handler = wd.MouseEventHandler.getInstance();
            expect(handler.lastX).toEqual(fakeEvent.pageX);
            expect(handler.lastY).toEqual(fakeEvent.pageY);
        });
    });

    it("use drag example to test", function(){
        var sum1 = 0;
        var stub = sandbox.stub();
        target = wd.Director.getInstance().scene;

        sandbox.stub(wd.MouseEventHandler.getInstance(), "_saveLocation");


        manager.fromEvent(target, wd.EventName.MOUSEDOWN).flatMap(function(e){
                return manager.fromEvent(target, wd.EventName.MOUSEMOVE).takeUntil(manager.fromEvent(target, wd.EventName.MOUSEUP));
            })
            .subscribe(function(e){
                sum1++;
                stub();
            })


        var _saveLocation = wd.MouseEventHandler.getInstance()._saveLocation;

        eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);
        eventTool.triggerDomEvent(wd.EventName.MOUSEMOVE);
        eventTool.triggerDomEvent(wd.EventName.MOUSEUP);

        expect(_saveLocation).toCalledOnce();
        expect(_saveLocation).toCalledAfter(stub);


        eventTool.triggerDomEvent(wd.EventName.MOUSEMOVE);

        expect(_saveLocation).toCalledOnce();


        eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);
        eventTool.triggerDomEvent(wd.EventName.MOUSEMOVE);
        eventTool.triggerDomEvent(wd.EventName.MOUSEUP);


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
            subscription = manager.fromEvent(target, wd.EventName.MOUSEDOWN).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            subscription.dispose();


            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
        it("use EventManager.off", function(){
            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            manager.off();


            manager.trigger(target, wd.MouseEvent.create(fakeEvent, wd.EventName.MOUSEMOVE));

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            eventTool.triggerDomEvent(wd.EventName.MOUSEDOWN);

            expect(sum).toEqual(1);
            expect(wd.MouseEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
    });
});




