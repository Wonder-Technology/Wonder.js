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
        Engine3D.WebGLContext.createGL("#event-test");
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
        sandbox.restore();
    });

    describe("bind/unbind mouse event", function(){
        beforeEach(function(){

        });

        describe("eventType", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(target, Engine3D.EventType.CLICK, function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

                expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventType.CLICK);
                expect(sum).toEqual(1);

                manager.off(target, Engine3D.EventType.CLICK);
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(target, Engine3D.EventType.CLICK)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

                expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventType.CLICK);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

                expect(sum).toEqual(1);
            });
        });
        it("listener", function(){
            var eventTarget = null,
                sum = 0;

            manager.on(target,
                {
                    eventCategory: Engine3D.EventCategory.MOUSE,

                    onClick: function (e) {
                        eventTarget = e;
                        sum++;
                    }
                });
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

            expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventType.CLICK);

            manager.off(target, Engine3D.EventType.CLICK);
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.CLICK));

            expect(sum).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(target, Engine3D.EventType.MOUSEDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(target, Engine3D.EventType.MOUSEDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

            expect(eventTarget).toBeInstanceOf(Engine3D.MouseEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventType.MOUSEDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(target, Engine3D.MouseEvent.create(fakeEvent, Engine3D.EventType.MOUSEDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    it("emit mouse event", function(){
        var mesh1 = Engine3D.Mesh.create();
        var mesh2 = Engine3D.Mesh.create();
        var mesh3 = Engine3D.Mesh.create();
        var mesh4 = Engine3D.Mesh.create();
        mesh2.addChild(mesh1);
        mesh4.addChild(mesh2);
        mesh4.addChild(mesh3);
        var eventTarget1 = null,
            eventTarget2 = null,
            eventTarget3 = null,
            eventTarget4 = null;
        var fakeObj = {
            a:sandbox.stub(),
            b:sandbox.stub(),
            c:sandbox.stub(),
            d:sandbox.stub()
        }

        manager.fromEvent(mesh1, Engine3D.EventType.MOUSEMOVE)
            .subscribe(function (e) {
                eventTarget1 = e;
                fakeObj.a();
            });
        manager.fromEvent(mesh2, Engine3D.EventType.MOUSEMOVE)
            .subscribe(function (e) {
                eventTarget2 = e;
                fakeObj.b();
            });
        manager.fromEvent(mesh3, Engine3D.EventType.MOUSEMOVE)
            .subscribe(function (e) {
                eventTarget3 = e;
                fakeObj.c();
            });
        manager.fromEvent(mesh4, Engine3D.EventType.MOUSEMOVE)
            .subscribe(function (e) {
                eventTarget4 = e;
                fakeObj.d();
            });
        manager.emit(mesh1, Engine3D.CustomEvent.create(Engine3D.EventType.MOUSEMOVE));

        expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
        expect(eventTarget1.target.uid).toEqual(mesh1.uid);
        expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
        expect(eventTarget2.target.uid).toEqual(mesh1.uid);
        expect(eventTarget3).toBeNull();
        expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
        expect(eventTarget4.target.uid).toEqual(mesh1.uid);
        expect(fakeObj.a).toCalledBefore(fakeObj.b);
        expect(fakeObj.b).toCalledBefore(fakeObj.d);
    });
});
