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

            describe("if has morph data", function(){
                beforeEach(function(){
                    var geo = wd.ModelGeometry.create();
                    sandbox.stub(geo, "hasMorphData").returns(true);
                    material.geometry = geo;
                });

                // it("if CommonMorphShaderLib class not exist, not add CommonMorphShaderLib", function () {
                //     var CommonMorphShaderLib = wd.CommonMorphShaderLib;
                //     delete wd.CommonMorphShaderLib;
                //
                //     material.init();
                //
                //     expect(material.shader.hasLib(CommonMorphShaderLib)).toBeFalsy();
                //
                //     wd.CommonMorphShaderLib = CommonMorphShaderLib;
                // });
                // it("if VerticeMorphShaderLib class not exist, not add VerticeMorphShaderLib", function () {
                //     var VerticeMorphShaderLib = wd.VerticeMorphShaderLib;
                //     delete wd.VerticeMorphShaderLib;
                //
                //     material.init();
                //
                //     expect(material.shader.hasLib(VerticeMorphShaderLib)).toBeFalsy();
                //
                //     wd.VerticeMorphShaderLib = VerticeMorphShaderLib;
                // });
                it("add CommonMorphShaderLib and VerticeMorphShaderLib", function () {
                    material.init();

                    expect(material.shader.hasLib(wd.CommonMorphShaderLib)).toBeTruthy();
                    expect(material.shader.hasLib(wd.VerticeMorphShaderLib)).toBeTruthy();
                });
            });

            it("else, add VerticeCommonShaderLib", function () {
                material.init();

                expect(material.shader.hasLib(wd.VerticeCommonShaderLib)).toBeTruthy();
            });
        });
    });
});
