describe("keyboard event", function () {
    var manager = null;
    var Listener = null;
    var sandbox = null;
    var target = null;
    var fakeEvent = null;

    function insertDom() {
        $("html").append($("<input id='event-test'></input>"));
    }

    function removeDom() {
        $("#event-test").remove();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        insertDom();
        fakeEvent = {
            keyCode: 65,
            ctrlKey: true,
            altKey: false,
            shiftKey: true,
            metaKey: false
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

    it("run test to test event object's member when triggered", function(){
        //run test
    });

    describe("bind/unbind keyboard event", function(){
        describe("bind on document", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(Engine3D.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(Engine3D.KeyboardEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);

                expect(sum).toEqual(1);

                manager.off(Engine3D.EventName.KEYDOWN);
                manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(Engine3D.EventName.KEYDOWN)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(Engine3D.KeyboardEvent);
                expect(eventTarget.name).toEqual(Engine3D.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

                expect(sum).toEqual(1);
            });
        });

        //todo finish it
        describe("bind on GameObject which has the focus", function(){
        });

        it("listener", function(){
            var eventTarget = null,
                eventTarget2 = null,
                sum = 0,
                sum2 = 0;

            manager.on({
                    eventType: Engine3D.EventType.KEYBOARD,

                    onKeyPress: function (e) {
                        eventTarget = e;
                        sum++;
                    },
                    onKeyUp: function(e){
                        eventTarget2 = e;
                        sum2++;
                    }
                });
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYPRESS));
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYUP));

            expect(eventTarget).toBeInstanceOf(Engine3D.KeyboardEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventName.KEYPRESS);
            expect(eventTarget2).toBeInstanceOf(Engine3D.KeyboardEvent);
            expect(eventTarget2.name).toEqual(Engine3D.EventName.KEYUP);

            manager.off(Engine3D.EventName.KEYPRESS);
            manager.off(Engine3D.EventName.KEYUP);
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYPRESS));
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYUP));

            expect(sum).toEqual(1);
            expect(sum2).toEqual(1);
        });
        it("priority", function(){
            var eventTarget = null,
                eventTarget2 = null,
                fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

            var subscription1 = manager.fromEvent(Engine3D.EventName.KEYDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(Engine3D.EventName.KEYDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

            expect(eventTarget).toBeInstanceOf(Engine3D.KeyboardEvent);
            expect(eventTarget.name).toEqual(Engine3D.EventName.KEYDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(Engine3D.KeyboardEvent.create(fakeEvent, Engine3D.EventName.KEYDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("key event object", function(){
        describe("key", function(){
            function judge(event, key){
                var eventTarget = null;

                manager.on(Engine3D.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                });
                manager.trigger(Engine3D.KeyboardEvent.create(event, Engine3D.EventName.KEYDOWN));

                expect(eventTarget.key).toEqual(key);
            }

            it("shift key", function() {
                judge({
                    keyCode: 51,
                    shiftKey: true
                }, "#");
                judge({
                    keyCode: 52,
                    shiftKey: true
                }, "$");
            });
            it("special key", function(){
                judge({
                    keyCode: 8,
                    shiftKey: true
                }, "backspace");
                judge({
                    keyCode: 68,
                    shiftKey: true
                }, "d");
                judge({
                    keyCode: 99,
                    shiftKey: true
                }, "3");
            });
        });
    });
});
