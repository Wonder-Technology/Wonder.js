describe("RectGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.RectGeometry();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var width = 10,
                height = 11;

            cloneTool.extend(geo, {
                width: width,
                height: height
            })

            var result = geo.clone();

            expect(result.width).toEqual(width);
            expect(result.height).toEqual(height);
        });
    });
});

