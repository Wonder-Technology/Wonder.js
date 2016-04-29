describe("EngineMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = new wd.EngineMaterial();
        material.initWhenCreate();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("test default value", function(){
        expect(material.refractionRatio).toEqual(0);
        expect(material.reflectivity).toBeNull();
        expect(material.mapCombineMode).toEqual(wd.ETextureCombineMode.MIX);
        expect(material.mapMixRatio).toEqual(0.5);
    });

    describe("init", function(){
        beforeEach(function(){

        });

        describe("add top shader libs", function(){
            beforeEach(function(){
                material.geometry = {};
            });

            it("add CommonShaderLib", function () {
                material.init();

                expect(material.shader.libs.getChild(0)).toEqual(jasmine.any(wd.CommonShaderLib));
            });

            it("if has animation component, add CommonMorphShaderLib and VerticeMorphShaderLib", function () {
                var geo = wd.ModelGeometry.create();
                sandbox.stub(geo, "hasAnimation").returns(true);
                material.geometry = geo;

                material.init();

                expect(material.shader.hasLib(wd.CommonMorphShaderLib)).toBeTruthy();
                expect(material.shader.hasLib(wd.VerticeMorphShaderLib)).toBeTruthy();
            });
            it("else, add VerticeCommonShaderLib", function () {
                material.init();

                expect(material.shader.hasLib(wd.VerticeCommonShaderLib)).toBeTruthy();
            });

        });
    });
});
