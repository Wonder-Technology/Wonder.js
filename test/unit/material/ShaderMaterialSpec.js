describe("ShaderMaterial", function () {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        
        material = wd.ShaderMaterial.create();
        
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("shader is CustomShader", function () {
        expect(material.shader).toEqual(jasmine.any(wd.CustomShader));
    });

    describe("init", function () {
        it("add CustomShaderLib", function () {
            material.init();

            expect(material.shader.hasLib(wd.CustomShaderLib)).toBeTruthy();
        });
    });

    describe("read", function(){
        var definitionData;

        beforeEach(function(){
        });
        
        it("read definitionData to shader", function(){
            definitionData = {};
            sandbox.stub(wd.LoaderManager.getInstance(), "get").returns(definitionData);
            sandbox.stub(material.shader, "read");

            material.read("definitionDataId");

            expect(material.shader.read).toCalledWith(definitionData);
            expect(wd.LoaderManager.getInstance().get).toCalledWith("definitionDataId");
        });
        it("if definitionData has sampler2D data, add the correspond maps", function () {
            definitionData = {
                "uniforms": {
                    "u_sampler2D": {
                        "type": "SAMPLER_2D",
                        "textureId": "texture"
                    }
                }
            };
            sandbox.stub(wd.LoaderManager.getInstance(), "get");
            wd.LoaderManager.getInstance().get.withArgs("definitionDataId").returns(definitionData);

            var map = wd.ImageTextureAsset.create({}).toTexture();
            wd.LoaderManager.getInstance().get.withArgs("texture").returns(map);
            sandbox.stub(material.mapManager, "addMap");



            material.read("definitionDataId");




            expect(material.mapManager.addMap).toCalledWith(map, {
                samplerVariableName:"u_sampler2D"
            });
        });
    });
});
