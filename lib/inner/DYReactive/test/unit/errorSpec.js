describe("error", function () {
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

    it("completed error", function () {
        var stream = rt.fromArray([10, 20]);
        var err = new Error("20");
        var result1 = null;

        expect(function(){
            stream.subscribe(function (x) {
                },
                function (error) {
                    result1 = error;
                },
                function () {
                    throw err;
                });
        }).toThrow();

        expect(result1).toBeNull();
    });
    it("stream error", function () {
        var err = new Error("20");
        var stream = scheduler.createStream(
            next(150, 1),
            next(210, 2),
            error(220, err),
            completed(250)
        );
        var result1 = null;
        var result2 = null;

        scheduler.publicAbsolute(149, function () {
            stream.do(function (x) {
            }, function (error) {
                result1 = error;
            })
                .subscribe(function (x) {
                },
                function (error) {
                    result2 = error;
                },
                function () {
                });
        });
        scheduler.start();

        expect(result1).toEqual(err);
        expect(result2).toEqual(err);
    });
    it("do next error", function () {
        var stream = rt.fromArray([10, 20]);
        var err = new Error("20");
        var result1 = null,
            result2 = null;

        stream.do(function (x) {
            if (x === 20) {
                throw err;
            }
        }, function (error) {
            result1 = error;
        })
            .subscribe(function (x) {
            },
            function (error) {
                result2 = error;
            },
            function () {
            });

        expect(result1).toEqual(err);
        expect(result2).toEqual(err);
    });
    it("do completed error", function () {
        var stream = rt.fromArray([10, 20]);
        var err = new Error("20");
        var result1 = null,
            result2 = null;

        stream.do(function (x) {
        }, function (error) {
            result1 = error;
        }, function () {
            throw err;
        })
            .subscribe(function (x) {
            },
            function (error) {
                result2 = error;
            },
            function () {
            });

        expect(result1).toBeNull();
        expect(result2).toEqual(err);
    });
    it("subscribe next error", function () {
        var stream = rt.fromArray([10, 20]);
        var err = new Error("20");
        var result1 = null,
            result2 = null;

        stream.do(function (x) {
        }, function (error) {
            result1 = error;
        })
            .subscribe(function (x) {
                if (x === 20) {
                    throw err;
                }
            },
            function (error) {
                result2 = error;
            },
            function () {
            });

        expect(result1).toBeNull();
        expect(result2).toEqual(err);
    });
    it("subscribe completed error", function () {
        var stream = rt.fromArray([10, 20]);
        var err = new Error("20");
        var result1 = null,
            result2 = null;

        expect(function(){
            stream.do(function (x) {
            }, function (error) {
                result1 = error;
            })
                .subscribe(function (x) {
                },
                function (error) {
                    result2 = error;
                },
                function () {
                    throw err;
                });
        }).toThrow();
        expect(result1).toBeNull();
        expect(result2).toBeNull();
    });

    describe("the Error event does not terminate a stream. So, a stream may contain multiple errors.", function () {
        it("error shouldn't terminate a stream", function () {
            //todo need more think

            //var errorMsg = "error occur";
            //var a = 0;
            //var stream = rt.createStream(function (observer) {
            //    observer.next(1);
            //    observer.error(errorMsg);
            //    observer.next(2);
            //    observer.completed();
            //});
            //
            //var subscription = stream.subscribe(
            //    function (x) {
            //        a += x;
            //    },
            //    function (e) {
            //        expect(e).toEqual(errorMsg);
            //    },
            //    //not invoke
            //    function () {
            //    }
            //);
            //
            //expect(a).toEqual(3);
        });
        it("stream.endOnError can terminate the stream", function () {
            //todo
        });
    });
});
