describe("LineMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new wd.LineMaterial();
    });
    afterEach(function () {
        sandbox.restore();
    });


    it("lineWidth should <= 1", function(){
        testTool.openContractCheck(sandbox);

        expect(function(){
            material.lineWidth = 1.1;
        }).toThrow("lineWidth should <= 1");

        expect(material.lineWidth).not.toBeGreaterThan(1);
    });
});

