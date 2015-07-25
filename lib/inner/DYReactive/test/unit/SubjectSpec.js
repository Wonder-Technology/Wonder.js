describe("Subject", function(){
    var rt = dyRt,
        TestScheduler = rt.TestScheduler,
        next = TestScheduler.next,
        error = TestScheduler.error,
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

    describe("can have multi observer", function(){
        it("test created stream", function(){
            var a = 0,
                b = 0;
            var stream = rt.createStream(function (observer) {
                observer.next(1);
                observer.completed();
            });
            var subject = rt.Subject.create();

            stream.subscribe(subject);
            subject.subscribe(function(x){
                a += x;
            }, function(e){
            }, function(){
                expect(a).toEqual(1);
            });
            subject.subscribe(function(x){
                b += x;
            }, function(e){
            }, function(){
                expect(b).toEqual(1);
            });
            subject.start();

            expect(a).toEqual(1);
            expect(b).toEqual(1);
        });
        it("test finite stream", function () {
            var stream = scheduler.createStream(
                next(100, 1),
                next(152, 2),
                next(200, 3),
                next(201, 4),
                next(205, 5),
                next(206, 6),
                next(250, 6),
                next(300, 6),
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
            scheduler.publicAbsolute(205, function () {
                subscription1.dispose();
            });
            scheduler.publicAbsolute(302, function () {
                subscription2.dispose();
            });
            scheduler.start();

            expect(result1.messages).toStreamEqual(
                next(200, 3),
                next(201, 4)
            );
            expect(result2.messages).toStreamEqual(
                next(205, 5),
                next(206, 6),
                next(250, 6),
                next(300, 6),
                completed(301)
            );
        });
        it("test infinite stream", function(){
            var stream = null;
            var subject = null;
            var result1 = scheduler.createObserver();
            var result2 = scheduler.createObserver();
            var subscription1 = null,
                subscription2 = null;

            scheduler.publicAbsolute(50, function () {
                stream = rt.interval(100, scheduler);
                subject = rt.Subject.create();
            });
            scheduler.publicAbsolute(60, function () {
                stream.subscribe(subject);
            });
            scheduler.publicAbsolute(200, function () {
                subscription1 = subject.subscribe(result1);
            });
            scheduler.publicAbsolute(300, function () {
                subscription2 = subject.subscribe(result2);
            });
            scheduler.publicAbsolute(150, function () {
                subject.start();
            });
            scheduler.start();

            expect(result1.messages).toStreamContain(
                next(250, 0),
                next(350, 1),
                next(450, 2)
            );
            expect(result2.messages).toStreamContain(
                next(350, 1),
                next(450, 2)
            );
        });

        it("test error stream", function(){
            var errorMsg = "error msg";
            var stream = scheduler.createStream(
                next(100, 1),
                next(152, 2),
                error(200, errorMsg),
                completed(210)
            );
            var subject = null;
            var result1 = scheduler.createObserver();
            var result2 = scheduler.createObserver();

            scheduler.publicAbsolute(1, function () {
                subject = rt.Subject.create();
            });
            scheduler.publicAbsolute(90, function () {
                stream.subscribe(subject);
            });
            scheduler.publicAbsolute(95, function () {
                subject.subscribe(result1);
            });
            scheduler.publicAbsolute(101, function () {
                subject.subscribe(result2);
            });
            scheduler.publicAbsolute(91, function () {
                subject.start();
            });
            scheduler.start();

            expect(result1.messages).toStreamEqual(
                next(100, 1),
                next(152, 2),
                error(200, errorMsg)
            );
            expect(result2.messages).toStreamEqual(
                next(152, 2),
                error(200, errorMsg)
            );
        });
    });
});

