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
        target =  wd.GameObject.create();
        manager = wd.EventManager;
        Listener = wd.EventListener;
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

                manager.on(wd.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(wd.KeyboardEvent);
                expect(eventTarget.name).toEqual(wd.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);

                expect(sum).toEqual(1);

                manager.off(wd.EventName.KEYDOWN);
                manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

                expect(sum).toEqual(1);
            });
            it("fromEvent", function(){
                var eventTarget = null,
                    sum = 0;

                var subscription = manager.fromEvent(wd.EventName.KEYDOWN)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

                expect(eventTarget).toBeInstanceOf(wd.KeyboardEvent);
                expect(eventTarget.name).toEqual(wd.EventName.KEYDOWN);
                expect(eventTarget.keyCode).toEqual(fakeEvent.keyCode);
                expect(eventTarget.key).toEqual("a");
                expect(eventTarget.ctrlKey).toEqual(fakeEvent.ctrlKey);
                expect(eventTarget.shiftKey).toEqual(fakeEvent.shiftKey);
                expect(eventTarget.altKey).toEqual(fakeEvent.altKey);
                expect(eventTarget.metaKey).toEqual(fakeEvent.metaKey);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

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
                    eventType: wd.EventType.KEYBOARD,

                    onKeyPress: function (e) {
                        eventTarget = e;
                        sum++;
                    },
                    onKeyUp: function(e){
                        eventTarget2 = e;
                        sum2++;
                    }
                });
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYPRESS));
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYUP));

            expect(eventTarget).toBeInstanceOf(wd.KeyboardEvent);
            expect(eventTarget.name).toEqual(wd.EventName.KEYPRESS);
            expect(eventTarget2).toBeInstanceOf(wd.KeyboardEvent);
            expect(eventTarget2.name).toEqual(wd.EventName.KEYUP);

            manager.off(wd.EventName.KEYPRESS);
            manager.off(wd.EventName.KEYUP);
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYPRESS));
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYUP));

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

            var subscription1 = manager.fromEvent(wd.EventName.KEYDOWN, 1)
                .subscribe(function (e) {
                    eventTarget = e;
                    fakeObj.a();
                });
            var subscription2 = manager.fromEvent(wd.EventName.KEYDOWN, 2)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

            expect(eventTarget).toBeInstanceOf(wd.KeyboardEvent);
            expect(eventTarget.name).toEqual(wd.EventName.KEYDOWN);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);

            subscription2.dispose();
            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

            expect(fakeObj.a).toCalledTwice();
            expect(fakeObj.b).toCalledOnce();
        });
    });

    describe("key event object", function(){
        describe("key", function(){
            function judge(event, key){
                var eventTarget = null;

                manager.on(wd.EventName.KEYDOWN, function (e) {
                    eventTarget = e;
                });
                manager.trigger(wd.KeyboardEvent.create(event, wd.EventName.KEYDOWN));

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
            sandbox.spy(wd.KeyboardEventHandler.getInstance(), "triggerDomEvent");
            subscription = manager.fromEvent(wd.EventName.KEYUP).subscribe(function(e){
                sum++;
            })
        });

        it("use subscription.dispose to off event binded by fromEvent", function(){
            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();



            subscription.dispose();


            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
        it("use EventManager.off", function(){
            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            manager.off();


            manager.trigger(wd.KeyboardEvent.create(fakeEvent, wd.EventName.KEYDOWN));

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();


            YYC.Tool.event.triggerEvent(document, "keyup");

            expect(sum).toEqual(1);
            expect(wd.KeyboardEventHandler.getInstance().triggerDomEvent).toCalledOnce();
        });
    });
});
