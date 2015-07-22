describe("custom event", function () {
    var manager = null;
    var sandbox = null;
    var eventType = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = Engine3D.EventManager;
        eventType = "custom1";

    });
    afterEach(function () {
        manager.off(eventType);
        sandbox.restore();
    });

    describe("bind/unbind custom event", function () {
        describe("on/off", function () {
            it("eventType", function () {
                var eventTarget = null;
                var sum = 0;

                manager.on(eventType, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(sum).toEqual(1);

                manager.off(eventType);
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(sum).toEqual(1);
            });
            it("priority", function () {
                var eventTarget = null;
                var eventTarget2 = null;
                var fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

                manager.on(eventType, function (e) {
                    eventTarget = e;
                    fakeObj.a();
                }, 1);
                manager.on(eventType, function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                }, 2);
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(eventTarget2).toBeInstanceOf(Engine3D.CustomEvent);
                expect(fakeObj.b).toCalledBefore(fakeObj.a);

            });
            it("target eventType", function () {
                //todo assertion currentTarget, target
            });
        });
        describe("fromEvent", function () {
            it("eventType", function () {
                var eventTarget = null;
                var sum = 0;

                var subscription = manager.fromEvent(eventType)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(sum).toEqual(1);
            });
            it("priority", function () {
                var eventTarget = null;
                var eventTarget2 = null;
                var eventTarget3 = null;
                var fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub(),
                    c:sandbox.stub()
                };
                var subject = dyRt.Subject.create();

                var subscription1 = manager.fromEvent(eventType, 1)
                    .subscribe(function (e) {
                        eventTarget = e;
                        fakeObj.a();
                    });
                manager.fromEvent(eventType, 2).subscribe(subject);
                var subscription2 = subject.subscribe(function (e) {
                        eventTarget2 = e;
                        fakeObj.b();
                    });
                var subscription3 = subject.subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
                subject.start();
                manager.trigger(Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(eventTarget2).toBeInstanceOf(Engine3D.CustomEvent);
                expect(eventTarget3).toBeInstanceOf(Engine3D.CustomEvent);
                expect(fakeObj.b).toCalledBefore(fakeObj.a);
                expect(fakeObj.b).toCalledBefore(fakeObj.c);
            });

            describe("dispose", function () {
                var eventTarget = null;
                var eventTarget2 = null;
                var eventTarget3 = null;
                var fakeObj = null;
                var subject = null,
                    subscription1 = null,
                    subscription2 = null,
                    subscription3 = null;


                beforeEach(function () {
                    eventTarget = null;
                    eventTarget2 = null;
                    eventTarget3 = null;
                    fakeObj = {
                        a: sandbox.stub(),
                        b: sandbox.stub(),
                        c: sandbox.stub()
                    };
                    subject = dyRt.Subject.create();

                    subscription1 = manager.fromEvent(eventType, 1)
                        .subscribe(function (e) {
                            eventTarget = e;
                            fakeObj.a();
                        });

                    manager.fromEvent(eventType, 2).subscribe(subject);
                    subscription2 = subject.subscribe(function (e) {
                        eventTarget2 = e;
                        fakeObj.b();
                    });
                    subscription3 = subject.subscribe(function (e) {
                        eventTarget3 = e;
                        fakeObj.c();
                    });
                    subject.start();

                    manager.trigger(Engine3D.CustomEvent.create(eventType));
                });

                it("subject dispose", function () {
                    subject.dispose();
                    manager.trigger(Engine3D.CustomEvent.create(eventType));

                    expect(fakeObj.a).toCalledTwice();
                    expect(fakeObj.b).toCalledOnce();
                    expect(fakeObj.c).toCalledOnce();
                });
                it("subscription dispose", function () {
                    subscription1.dispose();
                    subscription2.dispose();
                    manager.trigger(Engine3D.CustomEvent.create(eventType));

                    expect(fakeObj.a).toCalledOnce();
                    expect(fakeObj.b).toCalledOnce();
                    expect(fakeObj.c).toCalledOnce();
                });
            });
            it("target eventType", function () {

            });
        });
    });

    describe("emit custom event", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    describe("broadcast custom event", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    it("pass user data", function () {

    });
});
