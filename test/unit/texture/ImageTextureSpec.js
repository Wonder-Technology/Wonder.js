describe("ImageTexture", function() {
    var sandbox = null;
    var texture = null;
    var director = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.ImageTexture();
        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        var asset;

        beforeEach(function(){
            asset = wd.ImageTextureAsset.create({});
            texture = wd.ImageTexture.create(asset);
        });

        it("share asset", function(){
            var result = texture.clone();

            expect(result.asset).toEqual(texture.asset);
        });
    });
});

