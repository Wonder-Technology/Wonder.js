describe("detect gpu", function () {
    var sandbox = null;
    var Main = wd.Main,
        GPUDetectData = wd.GPUDetectData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("detect extension", function () {
        it("detect EXT_color_buffer_float", function () {
            if (!gpuDetectUtils.getExtension("EXT_color_buffer_float")) {
                return;
            }

            Main.setConfig({}).init();

            expect(GPUDetectData.extensionColorBufferFloat).not.toBeNull();
        });
    });
});
