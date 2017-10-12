describe("AssetDatabase", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });
    
    describe("load", function() {
        beforeEach(function(){
        });

        it("test load single asset", function (done) {
            var current = [],
                total = [];

            assetSystemTool.load([
                { url: resUtils.getRes("1.jpg"), id: "jpg" }
            ]).subscribe(function (data) {
                current.push(data.currentLoadedCount);
                total.push(data.totalAssetCount);
            }, function (err) {
                expect().toFail(err);
                done();
            }, function () {
                expect(current).toEqual([1]);
                expect(total).toEqual([1]);

                done();
            });
        });

        describe("load texture", function(){
            it("test load common texture", function (done) {
                var current = [],
                    total = [];

                assetSystemTool.load([
                    { url: resUtils.getRes("1.jpg"), id: "jpg" },
                    { url: resUtils.getRes("2.png"), id: "png" }
                ]).subscribe(function (data) {
                    current.push(data.currentLoadedCount);
                    total.push(data.totalAssetCount);
                }, function (err) {
                    expect().toFail(err);
                    done();
                }, function () {
                    expect(current).toEqual([1, 2]);
                    expect(total).toEqual([2, 2]);

                    var jpg = assetSystemTool.get("jpg"),
                        png = assetSystemTool.get("png");

                    expect(jpg).toBeInstanceOf(wd.ImageTextureAsset);
                    expect(jpg.format).toEqual(wd.ETextureFormat.RGB);
                    expect(jpg.source).toBeInstanceOf(window.Image);

                    expect(png).toBeInstanceOf(wd.ImageTextureAsset);
                    expect(png.format).toEqual(wd.ETextureFormat.RGBA);
                    expect(png.source).toBeInstanceOf(window.Image);

                    done();
                });
            });
        });
    });

    describe("setTextureAsset", function() {
        beforeEach(function(){
        });

        it("set asset to container", function(){
            var source1 = {a:1};
            assetSystemTool.setTextureAsset("jpg", source1, ".jpg");


            var source2 = {a:2};
            assetSystemTool.setTextureAsset("png", source2, ".png");



            var jpg = assetSystemTool.get("jpg"),
                png = assetSystemTool.get("png");

            expect(jpg).toBeInstanceOf(wd.ImageTextureAsset);
            expect(jpg.format).toEqual(wd.ETextureFormat.RGB);
            expect(jpg.source).toEqual(source1);

            expect(png).toBeInstanceOf(wd.ImageTextureAsset);
            expect(png.format).toEqual(wd.ETextureFormat.RGBA);
            expect(png.source).toEqual(source2);
        });
    });
});
