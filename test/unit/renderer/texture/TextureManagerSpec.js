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

    describe("addMap", function(){
        it("test add common texture asset", function(){
            var asset = dy.TwoDTextureAsset.create({});
            asset.format = dy.TextureFormat.RGBA;

            manager.addMap(asset);

            expect(manager.getMap(0)).toBeInstanceOf(dy.TwoDTexture);
            expect(manager.getMap(0).format).toEqual(asset.format);
        });
        it("test add compressed texture asset", function(){
            var asset = dy.CompressedTextureAsset.create({});
            asset.format = dy.TextureFormat.RGBA;

            manager.addMap(asset);

            expect(manager.getMap(0)).toBeInstanceOf(dy.CompressedTexture);
            expect(manager.getMap(0).format).toEqual(asset.format);
        });
        it("test add common texture and compressed texture", function(){
            var asset1 = dy.TwoDTextureAsset.create({});
            var asset2 = dy.CompressedTextureAsset.create({});
            var twoTexture = dy.TwoDTexture.create(asset1);
            var compressedTexture = dy.CompressedTexture.create(asset2);

            manager.addMap(twoTexture);
            manager.addMap(compressedTexture);

            expect(manager.getMap(0)).toBeInstanceOf(dy.TwoDTexture);
            expect(manager.getMap(1)).toBeInstanceOf(dy.CompressedTexture);
        });
    });

    describe("setEnvMap", function(){
        it("set env map", function(){
            var asset = {
                asset: dy.CompressedTextureAsset.create({})
            };
            var texture1 = dy.CubemapTexture.create(
                [asset,asset, asset, asset, asset, asset ]
            );
            var texture2 = dy.CubemapTexture.create(
                [asset,asset, asset, asset, asset, asset ]
            );

            manager.setEnvMap(texture1);
            manager.setEnvMap(texture2);

            expect(manager.getEnvMap()).toEqual(texture2);
        });
    });

    describe("dispose", function(){
        it("dispose all textures, clear container", function(){
            var asset = {
                asset: dy.CompressedTextureAsset.create({})
            };
            var texture1 = dy.CubemapTexture.create(
                [asset,asset, asset, asset, asset, asset ]
            );
            manager.setEnvMap(texture1);

            var asset1 = dy.TwoDTextureAsset.create({});
            var asset2 = dy.CompressedTextureAsset.create({});
            var twoTexture = dy.TwoDTexture.create(asset1);
            var compressedTexture = dy.CompressedTexture.create(asset2);

            manager.addMap(twoTexture);
            manager.addMap(compressedTexture);

            sandbox.stub(texture1, "dispose");
            sandbox.stub(twoTexture, "dispose");
            sandbox.stub(compressedTexture, "dispose");

            manager.dispose();

            expect(texture1.dispose).toCalledOnce();
            expect(twoTexture.dispose).toCalledOnce();
            expect(compressedTexture.dispose).toCalledOnce();
            expect(manager._textures.getCount()).toEqual(0);
        });
    });
});
