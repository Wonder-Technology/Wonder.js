describe("core", function () {
    var rt = dyRt,
        TestScheduler = rt.TestScheduler,
        next = TestScheduler.next,
        completed = TestScheduler.completed;
    var scheduler = null;
    var sandbox = null;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        scheduler = TestScheduler.create();
    });
    afterEach(function(){
        sandbox.restore();
    });

    describe("create stream", function () {
        it("test next and completed", function () {
            var a = 0;
            var stream = rt.createStream(function (observer) {
                observer.next(10);
                observer.next(20);
                observer.completed();
            });

            var subscription = stream.subscribe(
                function (x) {
                    a += x;
                },
                function (e) {
                },
                function () {
                    expect(a).toEqual(30);
                });
        });
    });


    it("all is hot Observer", function(){
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
        scheduler.publicAbsolute(250, function () {
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
            next(250, 7),
            next(300, 8),
            completed(301)
        );
    });
});

