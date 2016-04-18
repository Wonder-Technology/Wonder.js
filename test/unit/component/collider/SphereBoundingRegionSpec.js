describe("SphereBoundingRegion", function () {
    var sandbox = null;
    var region = null;

    var Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        region = wd.SphereBoundingRegion.create();

        Vector3 = wd.Vector3;

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone shape", function(){
            region.init();
            var resultShape = {};
            sandbox.stub(region.shape, "clone").returns(resultShape);

            var result = region.clone();


            expect(result === region).toBeFalsy();
            expect(result.shape).toEqual(resultShape);
        });
    });
});

