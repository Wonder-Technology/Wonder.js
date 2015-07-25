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
        Engine3D.Director.getInstance().createGL("#event-test");
        fakeEvent = {
            pageX:10,
            pageY:10
        };
        target =  Engine3D.Mesh.create();
        manager = Engine3D.EventManager;
        Listener = Engine3D.EventListener;
    });
    afterEach(function () {
        removeDom();
        manager.off();
        sandbox.restore();
    });

    describe("bind/unbind mouse event", function(){
        beforeEach(function(){

        });

        describe("eventName", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(target, Engine3D.EventName.CLICK, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventName.CLICK);
                expect(sum).toEqual(1);

                manager.off(target, Engine3D.EventName.CLICK);
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(target, Engine3D.EventName.CLICK)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

                expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventName.CLICK);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

                expect(sum).toEqual(1);
            });
        });
        it("listener", function(){
            var eventTarget = null,
                sum = 0;

            manager.on(target,
                {
                    eventType: Engine3D.EventType.MOUSE,

                    onClick: function (e) {
                        eventTarget = e;
                        sum++;
                    }
                });
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

            expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventName.CLICK);

            manager.off(target, Engine3D.EventName.CLICK);
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.CLICK));

            expect(sum).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(target, Engine3D.EventName.MOUSEDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(target, Engine3D.EventName.MOUSEDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventName.MOUSEDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.MOUSEDOWN));

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
            mesh1 = Engine3D.Mesh.create();
            mesh2 = Engine3D.Mesh.create();
            mesh3 = Engine3D.Mesh.create();
            mesh4 = Engine3D.Mesh.create();
            mesh2.addChild(mesh1);
            mesh4.addChild(mesh2);
            mesh4.addChild(mesh3);
            fakeObj = {
                a:sandbox.stub(),
                b:sandbox.stub(),
                c:sandbox.stub(),
                d:sandbox.stub()
            }

            manager.fromEvent(mesh1, Engine3D.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget1 = e;
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, Engine3D.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, Engine3D.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, Engine3D.EventName.MOUSEDOWN)
                .subscribe(function (e) {
                    eventTarget4 = e;
                    fakeObj.d();
                });
        });

        it("emit custom event", function(){
            manager.emit(mesh1, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.MOUSEDOWN));

            expect(eventTarget1.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget1.target.uid).toEqual(mesh1.uid);
            expect(eventTarget2.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget2.target.uid).toEqual(mesh1.uid);
            expect(eventTarget3).toBeNull();
            expect(eventTarget4.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget4.target.uid).toEqual(mesh1.uid);
            expect(fakeObj.a).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.d);
        });
        it("broadcast custom event", function(){
            manager.broadcast(mesh4, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventName.MOUSEDOWN));

            expect(eventTarget4.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });
});
