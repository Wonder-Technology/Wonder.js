describe("dispose", function () {
    var rt = dyRt,
        TestScheduler = rt.TestScheduler,
        next = TestScheduler.next,
        error = TestScheduler.error,
        completed = TestScheduler.completed;
    var scheduler = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        scheduler = TestScheduler.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("test dispose when using subject", function () {
        describe("test TestScheduler->createStream", function () {
            it("test subject.dispose", function () {
                var stream = scheduler.createStream(
                    next(100, 1),
                    next(152, 2),
                    next(200, 3),
                    next(201, 4),
                    next(205, 5),
                    next(206, 6),
                    next(250, 7),
                    next(300, 8),
                    completed(301)
                );
                var subject = null;
                var result1 = scheduler.createObserver();
                var result2 = scheduler.createObserver();
                var subscription1 = null,
                    subscription2 = null;

                scheduler.publicAbsolute(100, function () {
                    subject = rt.Subject.create();
                });
                scheduler.publicAbsolute(150, function () {
                    stream.subscribe(subject);
                });
                scheduler.publicAbsolute(200, function () {
                    subscription1 = subject.subscribe(result1);
                });
                scheduler.publicAbsolute(202, function () {
                    subscription2 = subject.subscribe(result2);
                });
                scheduler.publicAbsolute(151, function () {
                    subject.start();
                });
                scheduler.publicAbsolute(206, function () {
                    subject.dispose();
                });
                scheduler.start();

                expect(result1.messages).toStreamEqual(
                    next(200, 3),
                    next(201, 4),
                    next(205, 5)
                );
                expect(result2.messages).toStreamEqual(
                    next(205, 5)
                );
            });
        });

        describe("test dyRt->createStream", function () {
            it("when error", function () {
                var a = 0,
                    b = 0,
                    c = 0;
                var errorMsg = "err";
                var stream = rt.createStream(function (observer) {
                    observer.next(1);
                    observer.error(errorMsg);
                    observer.completed();
                });
                stream.addDisposeHandler(function () {
                    c = 100;
                });
                var subject = rt.Subject.create();

                stream.subscribe(subject);
                subject.subscribe(function (x) {
                }, function (e) {
                    b = e;
                }, function () {
                    a = 10;
                });
                subject.start();

                expect(a).toEqual(0);
                expect(b).toEqual(errorMsg);
                expect(c).toEqual(100);
            });
            it("when completed", function () {
                var a = 0,
                    c = 0;
                var stream = rt.createStream(function (observer) {
                    observer.next(1);
                    observer.completed();
                });
                stream.addDisposeHandler(function () {
                    c = 100;
                });
                var subject = rt.Subject.create();

                stream.subscribe(subject);
                subject.subscribe(function (x) {
                }, function (e) {
                }, function () {
                    a = 10;
                });
                subject.start();

                expect(a).toEqual(10);
                expect(c).toEqual(100);
            });
            it("test subject dispose", function () {
                var a = 0,
                    b = 0,
                    c = 0;
                var stream = rt.createStream(function (observer) {
                    observer.next(1);
                    observer.completed();
                });
                stream.addDisposeHandler(function () {
                    c = 100;
                });
                var subject = rt.Subject.create();

                stream.subscribe(subject);
                subject.subscribe(function (x) {
                    a += x;
                }, function (e) {
                }, function () {
                });
                subject.subscribe(function (x) {
                    b += x;
                }, function (e) {
                }, function () {
                });
                subject.start();
                subject.dispose();

                expect(a).toEqual(1);
                expect(b).toEqual(1);

            });
            it("test subscription dispose", function () {
                var stream = scheduler.createStream(
                    next(100, 1),
                    next(152, 2),
                    next(200, 3),
                    next(201, 4),
                    next(205, 5),
                    next(206, 6),
                    next(250, 7),
                    next(300, 8),
                    completed(301)
                );
                var subject = null;
                var result1 = scheduler.createObserver();
                var result2 = scheduler.createObserver();
                var subscription1 = null,
                    subscription2 = null;

                scheduler.publicAbsolute(100, function () {
                    subject = rt.Subject.create();
                });
                scheduler.publicAbsolute(150, function () {
                    stream.subscribe(subject);
                });
                scheduler.publicAbsolute(200, function () {
                    subscription1 = subject.subscribe(result1);
                });
                scheduler.publicAbsolute(202, function () {
                    subscription2 = subject.subscribe(result2);
                });
                scheduler.publicAbsolute(205, function () {
                    subscription1.dispose();
                });
                scheduler.publicAbsolute(251, function () {
                    subscription2.dispose();
                });
                scheduler.publicAbsolute(201, function () {
                    subject.start();
                });
                scheduler.start();

                expect(result1.messages).toStreamEqual(
                    //next(200, 3),
                    next(201, 4)
                );
                expect(result2.messages).toStreamEqual(
                    next(205, 5),
                    next(206, 6),
                    next(250, 7)
                );
            });
        });
    });

    describe("test dispose when not using subject", function () {
        describe("the default behavior of the stream operators is to dispose of the subscription as soon as possible " +
            "(i.e, when an completed or error messages is published)", function () {
            it("when publish error", function () {
                var a = 0;
                var b = 0;
                var stream = rt.createStream(function (observer) {
                    observer.error();
                });
                stream.addDisposeHandler(function () {
                    b = 1;
                });

                var subscription = stream.subscribe(
                    function (x) {
                    },
                    function (e) {
                        a = 10;
                    },
                    function () {
                    }
                );

                expect(a).toEqual(10);
                expect(b).toEqual(1);
                expect(subscription.isDisposed).toBeTruthy();
            });
            it("when publish completed", function () {
                var b = 0;
                var stream = rt.createStream(function (observer) {
                    observer.completed();
                });
                stream.addDisposeHandler(function () {
                    b = 1;
                });

                var subscription = stream.subscribe(
                    function (x) {
                    },
                    function (e) {
                    },
                    function () {
                        expect(b).toEqual(0);
                    }
                );

                expect(b).toEqual(1);
                expect(subscription.isDisposed).toBeTruthy();
            });
        });
    });
});
