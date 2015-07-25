describe("map", function () {
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

    it("fromArray", function(){
        var result = 0,
            b = 0;

        rt.fromArray([1,2,3]).map(function(x){
            return x * 2;
        }).subscribe(function(x){
            b += x;
        },null, function(){
            result = b;
        });

        expect(b).toEqual(2+4+6);
        expect(result).toEqual(b);
    });
    it("fromPromise", function(){
        var promise = scheduler.createResolvedPromise(201, 1);

        var results = scheduler.startWithSubscribe(function () {
            return rt.fromPromise(promise, scheduler)
                .map(function(x){
                    return x * 2;
                })
        });

        expect(results.messages).toStreamEqual(
            next(201, 2),
            completed(202)
        );
    });
    it("mock stream", function(){
        var a = 0,
            b = 0;
        var stream = rt.createStream(function (observer) {
            observer.next(1);
            observer.next(2);
            observer.completed();
        });

        stream.map(function(x){
            return x * 2;
        }).subscribe(function(x){
            a += x;
        }, function(err){
        }, function(){
            b = a;
        });

        expect(a).toEqual(2 + 4);
        expect(b).toEqual(a);
    });

    describe("error", function(){
        it("test1", function(){
            var err = new Error("err");
            var result = null;
            var stream = rt.createStream(function (observer) {
                observer.next(1);
                observer.error(err);
                observer.completed();
            });

            stream.map(function(x){
                return x * 2;
            }).subscribe(function(x){
            }, function(err){
                result = err;
            }, function(){
            });

            expect(result).toEqual(err);
        });
        it("test2", function(){
            var err = new Error("err");
            var result = null,
                a = 0;
            var stream = rt.createStream(function (observer) {
                observer.next(1);
                observer.completed();
            });

            stream.map(function(x){
                return x * 2;
            }).map(function(x){
                throw err;
            }).subscribe(function(x){
                a = x;
            }, function(err){
                result = err;
            }, function(){
            });

            expect(result).toEqual(err);
            expect(a).toEqual(0);
        });
    });

    it("multi map", function(){
            var a = 0,
                b = 0;
        var stream = rt.createStream(function (observer) {
            observer.next(1);
            observer.next(2);
            observer.completed();
        });

        stream.map(function(x){
            return x * 2;
        }).map(function(x){
            return x + 1;
        }).subscribe(function(x){
            a += x;
        }, function(err){
        }, function(){
            b = a;
        });

        expect(a).toEqual(2 + 1 + 4 + 1);
        expect(b).toEqual(a);
    });
    it("do and map", function(){
        var a = 0,
            b = 0,
            c = 0;
        var stream = rt.createStream(function (observer) {
            observer.next(1);
            observer.next(2);
            observer.completed();
        });

        stream.do(function(x){
            a += x;
        }).map(function(x){
            return x + 1;
        }).subscribe(function(x){
            b += x;
        }, function(err){
        }, function(){
            c = b;
        });

        expect(a).toEqual(1 + 2);
        expect(b).toEqual(1 + 1 + 2 + 1);
        expect(c).toEqual(b);
    });
});

