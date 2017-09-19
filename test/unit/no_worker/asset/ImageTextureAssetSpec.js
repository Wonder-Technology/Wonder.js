describe("ImageTextureAsset", function () {
    var sandbox = null;
    var asset;

    var Texture = wd.Texture;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        asset = new wd.ImageTextureAsset();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("toTexture", function () {
        beforeEach(function () {
        });

        it("create texture and return", function () {
            var texture = asset.toTexture();

            expect(texture).toBeInstanceOf(Texture);
            expect(texture.index).toEqual(0);
        });
        it("copy attributes to texture", function () {
            sandbox.stub(asset, "cloneTo");

            var texture = asset.toTexture();

            expect(asset.cloneTo).toCalledWith(texture.index);
        });
    });
});
