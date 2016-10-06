describe("GrassInstanceGeometry", function() {
    var sandbox = null;
    var geo = null;
    var entityObject = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        geo = wd.GrassInstanceGeometry.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var bladeCount = 2,
                bladeSegments = 10,
                bladeWidth = 1,
                bladeMinHeight = 3,
                bladeMaxHeight = 5,
                rangeWidth = 2,
                rangeHeight = 10;

            cloneTool.extend(geo, {
                bladeCount:bladeCount,
                bladeSegments:bladeSegments,
                bladeWidth:bladeWidth,
                bladeMinHeight:bladeMinHeight,
                bladeMaxHeight:bladeMaxHeight,
                rangeWidth:rangeWidth,
                rangeHeight:rangeHeight
            })

            var result = geo.clone();

            expect(result.bladeCount).toEqual(bladeCount);
            expect(result.bladeSegments).toEqual(bladeSegments);
            expect(result.bladeWidth).toEqual(bladeWidth);
            expect(result.bladeMinHeight).toEqual(bladeMinHeight);
            expect(result.bladeMaxHeight).toEqual(bladeMaxHeight);
            expect(result.rangeWidth).toEqual(rangeWidth);
            expect(result.rangeHeight).toEqual(rangeHeight);
        });
    });
});
