describe("TextureAsset", function() {
    var sandbox = null;
    var asset;

    var ETextureFormat = wd.ETextureFormat;
    var ETextureType = wd.ETextureType;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        asset = new wd.TextureAsset();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("test default value", function(){
        expect(asset.source).toBeNull();
        expect(asset.format).toEqual(ETextureFormat.RGBA);
        expect(asset.type).toEqual(ETextureType.UNSIGNED_BYTE);
        expect(asset.needUpdate).toBeTruthy();
    });
    it("test width", function () {
        expect(asset.width).toBeNull();

        asset.source = {
            width:100
        }

        expect(asset.width).toEqual(100);
    });
    it("test height", function () {
        expect(asset.height).toBeNull();

        asset.source = {
            height:100
        }

        expect(asset.height).toEqual(100);
    });

    describe("cloneTo", function(){
        var textureIndex;
        var texture;

        beforeEach(function(){
            textureIndex = 1;

            texture = componentTool.createComponent(textureIndex);
        });

        it("set source", function(){
            asset.source = {};

            asset.cloneTo(textureIndex);

            expect(textureSystemTool.getSource(texture)).toEqual(asset.source);
        });
        it("set width", function(){
            asset.width = 50;

            asset.cloneTo(textureIndex);

            expect(textureSystemTool.getWidth(texture)).toEqual(asset.width);
        });
        it("set height", function(){
            asset.height = 50;

            asset.cloneTo(textureIndex);

            expect(textureSystemTool.getHeight(texture)).toEqual(asset.height);
        });
        it("set isNeedUpdate", function(){
            asset.needUpdate = false;

            asset.cloneTo(textureIndex);

            expect(textureSystemTool.isNeedUpdate(texture)).toEqual(asset.needUpdate);
        });
    });
});

