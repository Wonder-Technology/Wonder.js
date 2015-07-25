describe("do", function () {
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

    describe("hanle each value", function () {
        it("test create stream by subscribeFunc", function () {
            var sum = 10 + 20;
            var stream = rt.createStream(function (observer) {
                observer.next(10);
                observer.next(20);
                observer.completed();
            });

            stream.do(function (x) {
                sum -= x;
            })
                .subscribe(function () {
                });

            expect(sum).toEqual(0);
        });
        it("test create stream by fromArray", function () {
            var sum = 10 + 20;
            var stream = rt.fromArray([10, 20]);

            stream.do(function (x) {
                sum -= x;
            })
                .subscribe(function () {
                });

            expect(sum).toEqual(0);
        });
        it("test create stream by TestScheduler.createStream", function () {
            var stream = scheduler.createStream(
                next(150, 1),
                next(210, 2),
                next(220, 3),
                next(230, 4),
                next(240, 5),
                completed(250)
            );
            var i = 0;
            var sum = 2 + 3 + 4 + 5;

            scheduler.startWithSubscribe(function () {
                return stream.do(function (x) {
                    i++;
                    return sum -= x;
                });
            });

            expect(i).toEqual(4);
            expect(sum).toEqual(0);
        });
        it("test multi observer", function () {
            var a = 0,
                b = 0;
            var stream = scheduler.createStream(
                next(150, 1),
                next(210, 2),
                next(220, 3),
                next(230, 4),
                next(240, 5),
                completed(250)
            );
            var subject = null;
            var result1 = scheduler.createObserver();
            var result2 = scheduler.createObserver();
            var i = 0;
            var sum = 2 + 3 + 4 + 5;

            scheduler.publicAbsolute(100, function () {
                subject = rt.Subject.create();
            });
            scheduler.publicAbsolute(150, function () {
                stream.do(function (x) {
                    i++;
                    return sum -= x;
                })
                    .subscribe(subject);
            });
            scheduler.publicAbsolute(215, function () {
                subject.subscribe(result1);
            });
            scheduler.publicAbsolute(235, function () {
                subject.subscribe(result2);
            });
            scheduler.publicAbsolute(151, function () {
                subject.start();
            });
            scheduler.start();

            //exec "do" 4 times from 151 to 250(not contain 250)
            expect(i).toEqual(4);
            expect(sum).toEqual(0);
        });
    });

    it("test multi do", function () {
        var sum = 10 + 20 + 10 + 20;
        var stream = rt.fromArray([10, 20]);

        stream.do(function (x) {
            sum -= x;
        })
            .do(function (x) {
                sum -= x;
            })
            .subscribe(function () {
            });

        expect(sum).toEqual(0);
    });

    it("test completed", function () {
        var stream = rt.fromArray([10, 20]);
        var sum = 10 + 20;
        var result1 = null,
            result2 = null;

        stream.do(function (x) {
                sum -= x;
            },
            function (error) {
            }, function () {
                result1 = sum;
            })
            .subscribe(function (x) {
            },
            function (error) {
            }, function () {
                result2 = result1 + 100;
            });

        expect(result1).toEqual(0);
        expect(result2).toEqual(100);
    });
});
