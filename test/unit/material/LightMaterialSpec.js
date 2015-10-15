describe("LightMaterial", function() {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = new dy.LightMaterial();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("init", function(){
        var map,
            stage;

        beforeEach(function(){
            sandbox.stub(material.textureManager, "init");
            sandbox.stub(material.shader, "init");
            map = dy.TwoDTexture.create();

            stage = dy.Director.getInstance().stage;
        });

        it("add LightCommonShaderLib", function(){
            material.init();

            expect(material.shader.hasLib(dy.LightCommonShaderLib.getInstance())).toBeTruthy();
        });
        it("if diffuseMap exist, add its shader lib", function(){
            material.diffuseMap = map;

            material.init();

            expect(material.shader.hasLib(dy.DiffuseMapShaderLib.getInstance())).toBeTruthy();
        });
        it("else, add NoDiffuseMapShaderLib", function () {
            material.init();

            expect(material.shader.hasLib(dy.NoDiffuseMapShaderLib.getInstance())).toBeTruthy();

        });
        it("if specularMap exist, add its shader lib", function(){
            material.specularMap = map;

            material.init();

            expect(material.shader.hasLib(dy.SpecularMapShaderLib.getInstance())).toBeTruthy();
        });
        it("else, add NoSpecularMapShaderLib", function () {
            material.init();

            expect(material.shader.hasLib(dy.NoSpecularMapShaderLib.getInstance())).toBeTruthy();
        });
        it("if normalMap exist, add its shader lib", function(){
            material.normalMap = map;

            material.init();

            expect(material.shader.hasLib(dy.NormalMapShaderLib.getInstance())).toBeTruthy();
        });
        it("else, add NoNormalMapShaderLib", function () {
            material.init();

            expect(material.shader.hasLib(dy.NoNormalMapShaderLib.getInstance())).toBeTruthy();
        });

        describe("if Stage enable shadowMap && (has twoD shadowMap || has cubemap shadowMap)", function () {
            it("if Stage not enable shadowMap, add NoShadowMapShaderLib", function () {
                sandbox.stub(stage.shadowMap, "enable", false);

                material.init();

                expect(material.shader.hasLib(dy.NoShadowMapShaderLib.getInstance())).toBeTruthy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(stage.shadowMap, "enable", true);
                });

                it("else, if not has twoD shadowMap && not has cubemap shadowMap, add NoShadowMapShaderLib", function () {
                    material.init();

                    expect(material.shader.hasLib(dy.NoShadowMapShaderLib.getInstance())).toBeTruthy();
                });

                it("else if has twoD shadowMap, add TwoDShadowMapShaderLib", function(){
                    material.addTwoDShadowMap(new dy.TwoDShadowMapTexture());

                    material.init();

                    expect(material.shader.hasLib(dy.TwoDShadowMapShaderLib.getInstance())).toBeTruthy();
                });
                it("else if has cubemap shadowMap, add CubemapShadowMapShaderLib", function(){
                    material.addCubemapShadowMap(new dy.CubemapShadowMapTexture());

                    material.init();

                    expect(material.shader.hasLib(dy.CubemapShadowMapShaderLib.getInstance())).toBeTruthy();
                });
            });
        });
    });
});

