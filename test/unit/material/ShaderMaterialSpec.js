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
        it("read definitionData to shader", function(){
            material.definitionData = {};
            sandbox.stub(material.shader, "read");

            material.init();

            expect(material.shader.read).toCalledWith(material.definitionData);
        });
        it("if definitionData has sampler2D data, add the correspond maps", function () {
            var definitionData = {
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
            material.init();




            expect(material.mapManager.addMap).toCalledWith(map, {
                samplerVariableName:"u_sampler2D"
            });
        });
        it("add CustomShaderLib", function () {
            sandbox.stub(material.shader, "read");

            material.init();

            expect(material.shader.hasLib(wd.CustomShaderLib)).toBeTruthy();
        });
        it("add EndShaderLib", function () {
            sandbox.stub(material.shader, "read");

            material.init();

            expect(material.shader.hasLib(wd.EndShaderLib)).toBeTruthy();
        });
    });

    describe("read", function(){
        var definitionData;

        beforeEach(function(){
        });

        it("read definitionData file", function () {
            definitionData = {};
            var definitionDataId = "id";

            sandbox.stub(wd.LoaderManager.getInstance(), "get").withArgs(definitionDataId).returns(definitionData);


            material.read(definitionDataId);

            expect(material.definitionData).toEqual(definitionData);
        });
    });

    describe("getTextureForRenderSort", function(){
        it("return null", function () {
            expect(material.getTextureForRenderSort()).toBeNull();
        });
    });
});
