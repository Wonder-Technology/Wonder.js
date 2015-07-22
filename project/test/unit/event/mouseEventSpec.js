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
});
