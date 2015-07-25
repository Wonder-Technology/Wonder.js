describe("mergeAll", function () {
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

    describe("merge all promise", function () {
        it("all success", function(done){
            var res = [];
            var sources = rt.fromArray([1, 2])
                .map(function (value) {
                    return new RSVP.Promise(function (res, rej) {
                        res(value);
                    });
                });

            sources.mergeAll().subscribe(
                function (x) {
                    res.push(x);
                },
                function (err) {
                },
                function () {
                    expect(res).toEqual([1, 2]);
                    done();
                });
        });
        it("error", function(done){
            var res = [];
            var sources = rt.fromArray([1, 2])
                .map(function (value) {
                    return new RSVP.Promise(function (res, rej) {
                        if(value === 2){
                            rej(value);
                        }
                        else{
                            res(value);
                        }
                    });
                });

            sources.mergeAll().subscribe(
                function (x) {
                    res.push(x);
                },
                function (err) {
                    expect(res).toEqual([1]);
                    expect(err).toEqual(2);
                    done();
                },
                function () {
                });
        });
    });

    describe("merge stream", function(){
        it("merge fromPromise and do stream", function(){
            var res = [];
            var result = 0;
            var sources = rt.fromArray([1, 2])
                .map(function (value) {
                    return rt.fromPromise(new RSVP.Promise(function (res, rej) {
                        res(value);
                    })).do(function(x){
                        result += x;
                    }, function(err){

                    }, function(){

                    });
                });

            sources.mergeAll().subscribe(
                function (x) {
                    res.push(x);
                },
                function (err) {
                },
                function () {
                    expect(res).toEqual([1, 2]);
                    expect(result).toEqual(1 + 2);
                    done();
                });
        });
        it("merge array stream", function(){
            var res = [];
            var result = null;
            var sources = rt.fromArray([1, 2, 3])
                .map(function(value){
                    return rt.fromArray([value, value + 1]);
                });

            sources.mergeAll().subscribe(
                function (x) {
                    res.push(x);
                },
                function (err) {
                },
                function () {
                    result = res;
                });

            expect(result).toEqual([1, 2, 2, 3, 3, 4]);
        });
        it("merge interval stream", function(){
            var sources = rt.fromArray([1, 2])
                .map(function(value){
                    if(value === 2){
                        return rt.interval(100, scheduler);
                    }
                    else{
                        return rt.interval(60, scheduler);
                    }
                });
            results = scheduler.startWithSubscribe(function () {
                return sources.mergeAll();
            });

            expect(results.messages).toStreamContain(
                next(260, 0), next(300, 0), next(320, 1), next(380, 2), next(400, 1)
            );
        });
    });

    it("do after mergeAll", function(){
        var res = [];
        var result = null;
        var sum = 0;
        var sources = rt.fromArray([1, 2, 3])
            .map(function(value){
                return rt.fromArray([value, value + 1]);
            });

        sources.mergeAll()
            .do(function(x){
                sum += x;
            })
            .subscribe(
            function (x) {
                res.push(x);
            },
            function (err) {
            },
            function () {
                result = res;
            });

        expect(sum).toEqual(1 + 2 + 2 + 3 + 3 + 4);
        expect(result).toEqual([1, 2, 2, 3, 3, 4]);
    });
});
