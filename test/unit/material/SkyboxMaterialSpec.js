describe("renderWebGL", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new dy.SkyboxMaterial();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("set cullMode to be FRONT", function(){
        material = dy.SkyboxMaterial.create();

        expect(material.cullMode).toEqual(dy.CullMode.FRONT);
    });
});

