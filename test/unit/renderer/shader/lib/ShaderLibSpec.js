describe("ShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.ShaderLib;
        lib = new Lib();
    });
    afterEach(function () {
        sandbox.restore();
    });
});
