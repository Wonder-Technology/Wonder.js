describe("Geometry", function () {
    var sandbox = null;
    var gameObject;
    var geo;

    var DataBufferConfig = wd.DataBufferConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox, {
            geometryDataBufferCount:200
        });
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });
});
