describe("takeUntil", function () {
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

    describe("Returns the values from the source stream until the other stream or Promise produces a value", function () {
        it("other stream", function () {
            var stream1 = scheduler.createStream(
                next(100, 1),
                next(200, 2),
                next(300, 3),
                completed(301)
            );

            var stream2 = scheduler.createStream(
                next(300, 1),
                next(400, 2),
                completed(500)
            );

            var results = scheduler.startWithSubscribe(function () {
                return stream1.takeUntil(stream2);
            }, 50);

            expect(results.messages).toStreamEqual(
                next(100, 1),
                next(200, 2),
                completed(300)
            );
        });
        it("other promise", function () {
            var stream1 = scheduler.createStream(
                next(100, 1),
                next(200, 2),
                next(300, 3),
                completed(301)
            );
            var promise = scheduler.createResolvedPromise(200, 1);

            var results = scheduler.startWithSubscribe(function () {
                return stream1.takeUntil(promise);
            }, 50);

            expect(results.messages).toStreamEqual(
                next(100, 1),
                completed(200)
            );
        });
        it("when other stream error", function () {
            var errorMsg = new Error("err");
            var stream1 = scheduler.createStream(
                next(100, 1),
                next(200, 2),
                next(300, 3),
                completed(301)
            );

            var stream2 = scheduler.createStream(
                error(200, errorMsg)
            );

            var results = scheduler.startWithSubscribe(function () {
                return stream1.takeUntil(stream2);
            }, 50);

            expect(results.messages).toStreamEqual(
                next(100, 1),
                error(200, errorMsg)
            );
        });
    });
});

