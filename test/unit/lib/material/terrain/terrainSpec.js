describe("terrain", function() {
    var sandbox = null;

    var material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        material = wd.TerrainMaterial.create();
        material.geometry = {
            entityObject:wd.GameObject.create()
        }
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });


    describe("getTextureForRenderSort", function(){
        it("if layer has data, return layer mapArray[0]", function () {
            var diffuseMap1 = wd.FireProceduralTexture.create();
            var diffuseMap2 = wd.FireProceduralTexture.create();

            material.layer.mapData = [
                {
                    minHeight:20,
                    maxHeight:50,
                    diffuseMap:diffuseMap1
                },
                {
                    minHeight:50,
                    maxHeight:60,
                    diffuseMap:diffuseMap2
                }
            ];

            expect(material.getTextureForRenderSort()).toEqual(diffuseMap1);
        });
        it("else if mix has data, return mix map", function () {
            var mixMap = wd.ImageTexture.create({});
            var diffuseMap1 = wd.ImageTexture.create({});
            var diffuseMap2 = wd.ImageTexture.create({});
            var diffuseMap3 = wd.ImageTexture.create({});

            material.mix.mapData = {
                mixMap: mixMap,
                diffuseMap1: diffuseMap1,
                diffuseMap2: diffuseMap2,
                diffuseMap3: diffuseMap3
            };

            expect(material.getTextureForRenderSort()).toEqual(mixMap);
        });
    });
});
