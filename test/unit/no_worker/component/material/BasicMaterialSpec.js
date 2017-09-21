describe("BasicMaterial", function () {
    var sandbox = null;

    var BasicMaterialData = wd.BasicMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("initData", function() {
        beforeEach(function(){
        });

        describe("separate buffer index into segements of corresponding material type", function() {
            beforeEach(function(){

            });

            it("make BasicMaterialData.index be 0", function(){
                sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 20);
                sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 100);

                materialTool.resetData();

                expect(BasicMaterialData.index).toEqual(0);
            });
        });
    });

    describe("setMap", function() {
        var mat;
        var texture;

        beforeEach(function(){
            mat = basicMaterialTool.create();
            texture = textureSystemTool.createTexture();
        });

        describe("if not set before", function(){
            it("texture count + 1", function () {
                expect(MapManagerData.textureCounts[mat.index]).toEqual(0);

                basicMaterialTool.setMap(mat, texture);

                expect(MapManagerData.textureCounts[mat.index]).toEqual(1);
            });
            it("add texture to matTextureList", function () {
                basicMaterialTool.setMap(mat, texture);

                expect(MapManagerData.materialTextureList[mat.index]).toEqual([texture.index]);
            });
            it("uniform sampler name is u_sampler2D", function () {
                basicMaterialTool.setMap(mat, texture);

                expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_sampler2D");
            });
            it("set texture offset to be 0", function () {
                basicMaterialTool.setMap(mat, texture);

                expect(MapManagerData.textureOffsetMap[mat.index]["u_sampler2D"]).toEqual(0);
            });
        });

        describe("else", function() {
            var texture2;


            beforeEach(function(){
                basicMaterialTool.setMap(mat, texture);

                texture2 = textureSystemTool.createTexture();
            });

            it("replace old texture in matTextureList with new texture", function () {
                basicMaterialTool.setMap(mat, texture2);

                expect(MapManagerData.materialTextureList[mat.index]).toEqual([texture2.index]);
            });
            it("uniform sampler name not change", function () {
                basicMaterialTool.setMap(mat, texture2);

                expect(TextureData.uniformSamplerNameMap[texture.index]).toEqual("u_sampler2D");
            });
            it("texture offset not change", function () {
                basicMaterialTool.setMap(mat, texture2);

                expect(MapManagerData.textureOffsetMap[mat.index]["u_sampler2D"]).toEqual(0);
            });
        });
    });
});
