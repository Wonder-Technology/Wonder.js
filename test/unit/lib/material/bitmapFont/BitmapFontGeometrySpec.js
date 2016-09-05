describe("BitmapFontGeometry", function () {
    var sandbox = null;
    var geometry;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        geometry = wd.BitmapFontGeometry.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
    });
});

