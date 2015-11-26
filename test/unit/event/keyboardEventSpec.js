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
        target =  dy.GameObject.create();
        manager = dy.EventManager;
        Listener = dy.EventListener;
    });
    afterEach(function () {
        removeDom();
        manager.off();
        sandbox.restore();
    });

    testTool.shouldExecRunTest("test event object's member when triggered");

    describe("bind/unbind keyboard event", function(){
        describe("bind on document", function(){
            it("on/off", function(){
                var eventTarget = null,
                    sum = 0;

                manager.on(dy.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(dy.KeyboardEvent);
                expect(eventTarget.name).toEqual(dy.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);

                expect(sum).toEqual(1);

                manager.off(dy.EventName.KEYDOWN);
                manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(dy.EventName.KEYDOWN)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(dy.KeyboardEvent);
                expect(eventTarget.name).toEqual(dy.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

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
                    eventType: dy.EventType.KEYBOARD,

                    onKeyPress: function (e) {
                        eventTarget = e;
                        sum++;
                    },
                    onKeyUp: function(e){
                        eventTarget2 = e;
                        sum2++;
                    }
                });
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYPRESS));
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYUP));

            expect(eventTarget).toBeInstanceOf(dy.KeyboardEvent);
            expect(eventTarget.name).toEqual(dy.EventName.KEYPRESS);
            expect(eventTarget2).toBeInstanceOf(dy.KeyboardEvent);
            expect(eventTarget2.name).toEqual(dy.EventName.KEYUP);

            manager.off(dy.EventName.KEYPRESS);
            manager.off(dy.EventName.KEYUP);
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYPRESS));
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYUP));

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

            var subscription1 = manager.fromEvent(dy.EventName.KEYDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(dy.EventName.KEYDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

            expect(eventTarget).toBeInstanceOf(dy.KeyboardEvent);
            expect(eventTarget.name).toEqual(dy.EventName.KEYDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("key event object", function(){
        describe("key", function(){
            function judge(event, key){
                var eventTarget = null;

                manager.on(dy.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                });
                manager.trigger(dy.KeyboardEvent.create(event, dy.EventName.KEYDOWN));

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

    describe("off event", function(){
        var sum;
        var subscription;

        beforeEach(function(){
            sum = 0;
            sandbox.spy(dy.KeyboardEventHandler.getInstance(), "triggerDomEvent");
            subscription = manager.fromEvent(dy.EventName.KEYUP).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            subscription.dispose();


            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
        it("use EventManager.off", function(){
            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            manager.off();


            manager.trigger(dy.KeyboardEvent.create(fakeEvent, dy.EventName.KEYDOWN));

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(dy.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
    });
});
