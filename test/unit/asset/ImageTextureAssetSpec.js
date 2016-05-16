describe("ImageTextureAsset", function() {
    var sandbox = null;
    var asset;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        asset = new wd.ImageTextureAsset();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        describe("clone TextureAsset data", function(){
            it("share source", function () {
                var source = {};
                asset.source = source;

                var result = asset.clone();

                expect(result.source === source).toBeTruthy();
            });
        });

        describe("clone ImageTextureAsset data", function(){
        });
    });
});

