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
        manager.off();
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
                var target = Engine3D.Mesh.create();
                var eventTarget = null;
                var sum = 0;

                manager.on(target, eventType, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(target, Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(eventTarget.currentTarget).toEqual(target);
                expect(eventTarget.target).toEqual(target);
                expect(sum).toEqual(1);

                manager.off(target, eventType);
                manager.trigger(target, Engine3D.CustomEvent.create(eventType));

                expect(sum).toEqual(1);
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
                var target = Engine3D.Mesh.create();
                var eventTarget = null;
                var sum = 0;

                var subscription = manager.fromEvent(target, eventType)
                    .subscribe(function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(target, Engine3D.CustomEvent.create(eventType));

                expect(eventTarget).toBeInstanceOf(Engine3D.CustomEvent);
                expect(eventTarget.currentTarget).toEqual(target);
                expect(eventTarget.target).toEqual(target);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, Engine3D.CustomEvent.create(eventType));

                expect(sum).toEqual(1);
            });
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

            manager.fromEvent(mesh1, eventType)
                .subscribe(function (e) {
                    eventTarget1 = e;
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, eventType)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, eventType)
                .subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, eventType)
                .subscribe(function (e) {
                    eventTarget4 = e;
                    fakeObj.d();
                });
        });

        it("emit custom event", function(){
            manager.emit(mesh1, Engine3D.CustomEvent.create(eventType));

            expect(eventTarget1.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
            expect(eventTarget1.target.uid).toEqual(mesh1.uid);
            expect(eventTarget2.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
            expect(eventTarget2.target.uid).toEqual(mesh1.uid);
            expect(eventTarget3).toBeNull();
            expect(eventTarget4.phase).toEqual(Engine3D.EventPhase.EMIT);
            expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
            expect(eventTarget4.target.uid).toEqual(mesh1.uid);
            expect(fakeObj.a).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.d);
        });
        it("broadcast custom event", function(){
            manager.broadcast(mesh4, Engine3D.CustomEvent.create(eventType));

            expect(eventTarget4.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(Engine3D.EventPhase.BROADCAST);
            expect(eventTarget3.currentTarget.uid).toEqual(mesh3.uid);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });

    it("pass user data", function () {

    });
});
