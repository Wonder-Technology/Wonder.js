describe("SkyboxMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new dy.SkyboxMaterial();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("set side to be BACK", function(){
        material = dy.SkyboxMaterial.create();

        expect(material.side).toEqual(dy.Side.BACK);
    });
});

