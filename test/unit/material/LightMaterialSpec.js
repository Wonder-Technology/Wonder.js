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
            scene;

        beforeEach(function(){
            sandbox.stub(material.textureManager, "init");
            sandbox.stub(material.shader, "init");
            map = dy.TwoDTexture.create();

            scene = dy.Director.getInstance().scene;
        });

        it("add LightCommonShaderLib", function(){
            material.init();

            expect(material.shader.getLib(dy.LightCommonShaderLib)).toBeTruthy();
        });
        it("if diffuseMap exist, add its shader lib", function(){
            material.diffuseMap = map;

            material.init();

            expect(material.shader.getLib(dy.DiffuseMapShaderLib)).toBeTruthy();
        });
        it("else, add NoDiffuseMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoDiffuseMapShaderLib)).toBeTruthy();

        });
        it("if specularMap exist, add its shader lib", function(){
            material.specularMap = map;

            material.init();

            expect(material.shader.getLib(dy.SpecularMapShaderLib)).toBeTruthy();
        });
        it("else, add NoSpecularMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoSpecularMapShaderLib)).toBeTruthy();
        });
        it("if normalMap exist, add its shader lib", function(){
            material.normalMap = map;

            material.init();

            expect(material.shader.getLib(dy.NormalMapShaderLib)).toBeTruthy();
        });
        it("else, add NoNormalMapShaderLib", function () {
            material.init();

            expect(material.shader.getLib(dy.NoNormalMapShaderLib)).toBeTruthy();
        });

        describe("if Scene enable shadowMap && (has twoD shadowMap || has cubemap shadowMap)", function () {
            it("if Scene not enable shadowMap, add NoShadowMapShaderLib", function () {
                sandbox.stub(scene.shadowMap, "enable", false);

                material.init();

                expect(material.shader.getLib(dy.NoShadowMapShaderLib)).toBeTruthy();
            });

            describe("else", function(){
                beforeEach(function(){
                    sandbox.stub(scene.shadowMap, "enable", true);
                });

                it("else, if not has twoD shadowMap && not has cubemap shadowMap, add NoShadowMapShaderLib", function () {
                    material.init();

                    expect(material.shader.getLib(dy.NoShadowMapShaderLib)).toBeTruthy();
                });

                it("else if has twoD shadowMap, add TwoDShadowMapShaderLib", function(){
                    material.addTwoDShadowMap(new dy.TwoDShadowMapTexture());

                    material.init();

                    expect(material.shader.getLib(dy.TwoDShadowMapShaderLib)).toBeTruthy();
                });
                it("else if has cubemap shadowMap, add CubemapShadowMapShaderLib", function(){
                    material.addCubemapShadowMap(new dy.CubemapShadowMapTexture());

                    material.init();

                    expect(material.shader.getLib(dy.CubemapShadowMapShaderLib)).toBeTruthy();
                });
            });
        });
    });
});

