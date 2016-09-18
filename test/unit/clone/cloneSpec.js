describe("clone", function(){
    var sandbox;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("optimize", function(){
        beforeEach(function(){
        });

        it("cloneAttributeAsCloneable should only create the attribute once", function(){
            var material = wd.TerrainMaterial.create();

            sandbox.spy(wd.TerrainMix, "create");

            var result = material.clone();

            expect(wd.TerrainMix.create).toCalledOnce();
        });
    });
});
