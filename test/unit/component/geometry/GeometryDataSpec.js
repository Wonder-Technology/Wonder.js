describe("GeometryData", function() {
    var sandbox = null;
    var geometryData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geometryData = new wd.GeometryData();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });
});
