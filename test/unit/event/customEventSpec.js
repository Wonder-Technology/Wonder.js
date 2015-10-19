describe("custom event", function () {
    var manager = null;
    var sandbox = null;
    var eventName = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.EventManager;
        eventName = "custom1";

    });
    afterEach(function () {
        manager.off();
        sandbox.restore();
    });

    describe("bind/unbind custom event", function () {
        describe("on/off", function () {
            it("if eventName contain EventListenerMap->eventSeparator, contract error", function(){
                sandbox.stub(dy.EventListenerMap, "eventSeparator", "%");

                expect(function(){
                    manager.on("dy%endLoop", function (e) {
                    });
                }).toThrow();
                expect(function(){
                    manager.on(new dy.GameObject(), "dy%endLoop", function (e) {
                    }, 10);
                }).toThrow();
            });
            it("eventName", function () {
                var eventTarget = null;
                var sum = 0;

                manager.on(eventName, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(sum).toEqual(1);

                manager.off(eventName);
                manager.trigger(dy.CustomEvent.create(eventName));

                expect(sum).toEqual(1);
            });
            it("priority", function () {
                var eventTarget = null;
                var eventTarget2 = null;
                var fakeObj = {
                    a:sandbox.stub(),
                    b:sandbox.stub()
                };

                manager.on(eventName, function (e) {
                    eventTarget = e;
                    fakeObj.a();
                }, 1);
                manager.on(eventName, function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                }, 2);
                manager.trigger(dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(eventTarget2).toBeInstanceOf(dy.CustomEvent);
                expect(fakeObj.b).toCalledBefore(fakeObj.a);

            });
            it("target eventName", function () {
                var target = dy.GameObject.create();
                var eventTarget = null;
                var sum = 0;

                manager.on(target, eventName, function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(target, dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(eventTarget.currentTarget).toEqual(target);
                expect(eventTarget.target).toEqual(target);
                expect(sum).toEqual(1);

                manager.off(target, eventName);
                manager.trigger(target, dy.CustomEvent.create(eventName));

                expect(sum).toEqual(1);
            });
        });
        describe("fromEvent", function () {
            it("eventName", function () {
                var eventTarget = null;
                var sum = 0;

                var subscription = manager.fromEvent(eventName)
                    .subscribe(function (e) {
                        eventTarget = e;
                        sum++;
                    });
                manager.trigger(dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(dy.CustomEvent.create(eventName));

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

                var subscription1 = manager.fromEvent(eventName, 1)
                    .subscribe(function (e) {
                        eventTarget = e;
                        fakeObj.a();
                    });
                manager.fromEvent(eventName, 2).subscribe(subject);
                var subscription2 = subject.subscribe(function (e) {
                        eventTarget2 = e;
                        fakeObj.b();
                    });
                var subscription3 = subject.subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
                subject.start();
                manager.trigger(dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(eventTarget2).toBeInstanceOf(dy.CustomEvent);
                expect(eventTarget3).toBeInstanceOf(dy.CustomEvent);
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

                    subscription1 = manager.fromEvent(eventName, 1)
                        .subscribe(function (e) {
                            eventTarget = e;
                            fakeObj.a();
                        });

                    manager.fromEvent(eventName, 2).subscribe(subject);
                    subscription2 = subject.subscribe(function (e) {
                        eventTarget2 = e;
                        fakeObj.b();
                    });
                    subscription3 = subject.subscribe(function (e) {
                        eventTarget3 = e;
                        fakeObj.c();
                    });
                    subject.start();

                    manager.trigger(dy.CustomEvent.create(eventName));
                });

                it("subject dispose", function () {
                    subject.dispose();
                    manager.trigger(dy.CustomEvent.create(eventName));

                    expect(fakeObj.a).toCalledTwice();
                    expect(fakeObj.b).toCalledOnce();
                    expect(fakeObj.c).toCalledOnce();
                });
                it("subscription dispose", function () {
                    subscription1.dispose();
                    subscription2.dispose();
                    manager.trigger(dy.CustomEvent.create(eventName));

                    expect(fakeObj.a).toCalledOnce();
                    expect(fakeObj.b).toCalledOnce();
                    expect(fakeObj.c).toCalledOnce();
                });
            });
            it("target eventName", function () {
                var target = dy.GameObject.create();
                var eventTarget = null;
                var sum = 0;

                var subscription = manager.fromEvent(target, eventName)
                    .subscribe(function (e) {
                    eventTarget = e;
                    sum++;
                });
                manager.trigger(target, dy.CustomEvent.create(eventName));

                expect(eventTarget).toBeInstanceOf(dy.CustomEvent);
                expect(eventTarget.currentTarget).toEqual(target);
                expect(eventTarget.target).toEqual(target);
                expect(sum).toEqual(1);

                subscription.dispose();
                manager.trigger(target, dy.CustomEvent.create(eventName));

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
             mesh1 = dy.GameObject.create();
             mesh2 = dy.GameObject.create();
             mesh3 = dy.GameObject.create();
             mesh4 = dy.GameObject.create();
            mesh2.addChild(mesh1);
            mesh4.addChild(mesh2);
            mesh4.addChild(mesh3);
            fakeObj = {
                a:sandbox.stub(),
                b:sandbox.stub(),
                c:sandbox.stub(),
                d:sandbox.stub()
            }

            manager.fromEvent(mesh1, eventName)
                .subscribe(function (e) {
                    eventTarget1 = e;
                    fakeObj.a();
                });
            manager.fromEvent(mesh2, eventName)
                .subscribe(function (e) {
                    eventTarget2 = e;
                    fakeObj.b();
                });
            manager.fromEvent(mesh3, eventName)
                .subscribe(function (e) {
                    eventTarget3 = e;
                    fakeObj.c();
                });
            manager.fromEvent(mesh4, eventName)
                .subscribe(function (e) {
                    eventTarget4 = e;
                    fakeObj.d();
                });
        });

        it("it's not transfer data between event binded by on(eventName) and event binded by on(target, eventName)", function(){
            var eventTarget5 = null;

            manager.fromEvent(eventName)
                .subscribe(function (e) {
                    eventTarget5 = e;
                });


            manager.emit(mesh1, dy.CustomEvent.create(eventName));

            expect(eventTarget5).toBeNull();
        });
        it("emit custom event", function(){
            manager.emit(mesh1, dy.CustomEvent.create(eventName));

            expect(eventTarget1.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
            expect(eventTarget1.target.uid).toEqual(mesh1.uid);
            expect(eventTarget2.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
            expect(eventTarget2.target.uid).toEqual(mesh1.uid);
            expect(eventTarget3).toBeNull();
            expect(eventTarget4.phase).toEqual(dy.EventPhase.EMIT);
            expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
            expect(eventTarget4.target.uid).toEqual(mesh1.uid);
            expect(fakeObj.a).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.d);
        });
        it("broadcast custom event", function(){
            manager.broadcast(mesh4, dy.CustomEvent.create(eventName));

            expect(eventTarget4.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget4.currentTarget.uid).toEqual(mesh4.uid);
            expect(eventTarget4.target.uid).toEqual(mesh4.uid);
            expect(eventTarget2.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget2.currentTarget.uid).toEqual(mesh2.uid);
            expect(eventTarget2.target.uid).toEqual(mesh4.uid);
            expect(eventTarget1.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget1.currentTarget.uid).toEqual(mesh1.uid);
            expect(eventTarget1.target.uid).toEqual(mesh4.uid);
            expect(eventTarget3.phase).toEqual(dy.EventPhase.BROADCAST);
            expect(eventTarget3.currentTarget.uid).toEqual(mesh3.uid);
            expect(eventTarget3.target.uid).toEqual(mesh4.uid);
            expect(fakeObj.d).toCalledBefore(fakeObj.b);
            expect(fakeObj.b).toCalledBefore(fakeObj.a);
            expect(fakeObj.a).toCalledBefore(fakeObj.c);
        });
    });

    describe("pass user data", function () {
        var mesh1,mesh2,mesh3,mesh4;
        var eventTarget1 = null,
            eventTarget2 = null,
            eventTarget3 = null,
            eventTarget4 = null;
        var userData = null;

        beforeEach(function(){
            userData = {
                a: 1,
                b: "b"
            };
            mesh1 = dy.GameObject.create();
            mesh2 = dy.GameObject.create();
            mesh2.addChild(mesh1);

            manager.fromEvent(mesh1, eventName)
                .subscribe(function (e) {
                    eventTarget1 = e;
                });
            manager.fromEvent(mesh2, eventName)
                .subscribe(function (e) {
                    eventTarget2 = e;
                });
        });

        it("trigger event", function(){
            manager.fromEvent(eventName)
                .subscribe(function (e) {
                    eventTarget1 = e;
                });

            manager.trigger(dy.CustomEvent.create(eventName), userData);

            expect(eventTarget1.userData).toEqual(userData);
        });
        it("trigger target and event", function(){
            manager.trigger(mesh1, dy.CustomEvent.create(eventName), userData);

            expect(eventTarget1.userData).toEqual(userData);
        });
        it("emit", function(){
            manager.emit(mesh1, dy.CustomEvent.create(eventName), userData);

            expect(eventTarget1.userData).toEqual(userData);
            expect(eventTarget2.userData).toEqual(userData);
        });
        it("broadcast", function(){
            manager.broadcast(mesh2, dy.CustomEvent.create(eventName), userData);

            expect(eventTarget2.userData).toEqual(userData);
            expect(eventTarget1.userData).toEqual(userData);
        });
    });
});
