describe("TextureAsset", function() {
    var sandbox = null;
    var asset;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        gl = wd.DeviceManager.getInstance().gl;

        asset = new wd.TextureAsset();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("test default value", function(){
        expect(asset.packAlignment).toEqual(4);
        expect(asset.unpackAlignment).toEqual(4);
        expect(asset.flipY).toBeTruthy();
        expect(asset.premultiplyAlpha).toBeFalsy();
        expect(asset.isPremultipliedAlpha).toBeNull();
        expect(asset.colorspaceConversion).toEqual(gl.BROWSER_DEFAULT_WEBGL);

        //todo test more
    });

    describe("cloneToCubemapTexture", function(){
        beforeEach(function(){

        });

        it("cubemap texture's flipY should be false", function(){
            asset.flipY = true;

            var cubemapTexture = {};

            asset.cloneToCubemapTexture(cubemapTexture);

            expect(cubemapTexture.flipY).toBeFalsy();
        });
        it("set packAlignment,colorspaceConversion", function () {
            asset.packAlignment = 1;

            var cubemapTexture = {};

            asset.cloneToCubemapTexture(cubemapTexture);

            expect(cubemapTexture.packAlignment).toEqual(1);
            expect(cubemapTexture.colorspaceConversion).toEqual(gl.BROWSER_DEFAULT_WEBGL);
        });
    });

    describe("cloneTo", function(){
        beforeEach(function(){

        });

        it("set texture's flipY", function(){
            asset.flipY = true;

            var texture = {};

            asset.cloneTo(texture);

            expect(texture.flipY).toBeTruthy();
        });
        it("set packAlignment,colorspaceConversion", function () {
            asset.packAlignment = 1;
            asset.colorspaceConversion = gl.NONE;

            var texture = {};

            asset.cloneTo(texture);

            expect(texture.packAlignment).toEqual(1);
            expect(texture.colorspaceConversion).toEqual(gl.NONE);
        });
    });
});

