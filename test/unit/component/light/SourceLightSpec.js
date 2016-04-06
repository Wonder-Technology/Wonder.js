describe("SourceLight", function() {
    var sandbox = null;
    var light = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        light = new wd.SourceLight();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("test default value", function(){
        expect(light.intensity).toEqual(1);
    });
});

