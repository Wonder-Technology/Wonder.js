describe("Light", function() {
    var sandbox = null;
    var light = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        light = new wd.Light();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("get shadowMapWidth", function(){
        beforeEach(function(){
            sandbox.stub(wd.GPUDetector.getInstance(), "maxCubemapTextureSize", 512);
        });

        it("default is maxCubemapTextureSize", function(){
            expect(light.shadowMapWidth).toEqual(512);
        });
        it("if its value is over maxCubemapTextureSize, return maxCubemapTextureSize", function(){
            light.shadowMapWidth = 1024;

            expect(light.shadowMapWidth).toEqual(512);
        });
        it("else, return the its value", function(){
            light.shadowMapWidth = 256;

            expect(light.shadowMapWidth).toEqual(256);
        });
    });

    describe("get shadowMapHeight", function(){
        beforeEach(function(){
            sandbox.stub(wd.GPUDetector.getInstance(), "maxCubemapTextureSize", 512);
        });

        it("default is maxCubemapTextureSize", function(){
            expect(light.shadowMapHeight).toEqual(512);
        });
        it("if its value is over maxCubemapTextureSize, return maxCubemapTextureSize", function(){
            light.shadowMapHeight = 1024;

            expect(light.shadowMapHeight).toEqual(512);
        });
        it("else, return the its value", function(){
            light.shadowMapHeight = 256;

            expect(light.shadowMapHeight).toEqual(256);
        });
    });
});

