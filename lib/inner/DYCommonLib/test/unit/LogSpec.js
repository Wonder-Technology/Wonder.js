describe("Log", function () {
    var Log = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Log = dyCb.Log;
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("info", function(){
        it("FUNC_MUST_NOT_BE", function(){
            expect(Log.info.FUNC_MUST_NOT_BE("a", "b")).toEqual("a must not be b");
        });
    });
});

