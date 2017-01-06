describe("GPUDetector", function() {
    var sandbox = null;
    var detector = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        detector = wd.GPUDetector.getInstance();

        // gl = testTool.buildFakeGl(sandbox);

        // gl.getExtension = sandbox.stub();

        var device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));


        gl = device.gl;

        // detector.gl = gl;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("detect", function(){
        beforeEach(function(){

        });

        describe("detect precision", function(){
            beforeEach(function(){
                sandbox.stub(detector, "_detectExtension");
            });

            it("if gl.getShaderPrecisionFormat not exist, set precision to be highp", function () {
                gl.getShaderPrecisionFormat = undefined;

                detector.detect();

                expect(detector.precision).toEqual(wd.EGPUPrecision.HIGHP);
            });
        });
    });
});

