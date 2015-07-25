describe("fromPromise", function () {
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

    it("success", function (done) {
        var a = 0,
            b = 0;
        var promise = new RSVP.Promise(function (resolve, reject) {
            resolve(42);
        });

        var source = rt.fromPromise(promise);

        var subscription = source.subscribe(
            function (x) {
                a = x;
            },
            function (err) {
            },
            function () {
                expect(a).toEqual(42);
                done();
            });
    });
    it("fail", function (done) {
        var a = 0,
            b = 0;
        var error = new Error("woops");
        var promise = new RSVP.Promise(function (resolve, reject) {
            reject(error);
        });

        var source = rt.fromPromise(promise);

        var subscription = source.subscribe(
            function (x) {
            },
            function (err) {
                done();
                expect(error).toEqual(err);
            },
            function () {
            });
    });
    it("success mock", function () {
        var promise = scheduler.createResolvedPromise(201, 1);

        var results = scheduler.startWithSubscribe(function () {
            return rt.fromPromise(promise, scheduler);
        });

        expect(results.messages).toStreamEqual(
            next(201, 1),
            completed(202)
        );
    });
    it("fail mock", function () {
        var err = new Error("err");
        var promise = scheduler.createRejectPromise(201, err);

        var results = scheduler.startWithSubscribe(function () {
            return rt.fromPromise(promise, scheduler);
        });

        expect(results.messages).toStreamEqual(
            error(201, err)
        );
    });
});

