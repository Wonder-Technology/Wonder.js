describe("TextureManager", function() {
    var sandbox = null;
    var Manger = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Manager = dy.TextureManager;
        manager = new Manager();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("addChild", function(){
        it("test add common texture asset", function(){
            var asset = dy.CommonTextureAsset.create({});
            asset.format = dy.TextureFormat.RGBA;

            manager.addChild(asset);

            expect(manager.getChild(0)).toBeInstanceOf(dy.TwoDTexture);
            expect(manager.getChild(0).format).toEqual(asset.format);
        });
        it("test add compressed texture asset", function(){
            var asset = dy.CompressedTextureAsset.create({});
            asset.format = dy.TextureFormat.RGBA;

            manager.addChild(asset);

            expect(manager.getChild(0)).toBeInstanceOf(dy.CompressedTexture);
            expect(manager.getChild(0).format).toEqual(asset.format);
        });
        //it("test add texture", function(){
        //    var asset = dy.CompressedTextureAsset.create({});
        //    var texture = dy.CubeTexture.create([
        //        {asset:asset},
        //        {asset:asset},
        //        {asset:asset},
        //        {asset:asset},
        //        {asset:asset},
        //        {asset:asset}
        //    ]);
        //
        //    manager.addChild(texture);
        //
        //    expect(manager.getChild(0)).toBeInstanceOf(dy.CubeTexture);
        //});
    });
});
