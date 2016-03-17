describe("InstanceBuffer", function () {
    var sandbox = null;
    var buffer = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;

        buffer = wd.InstanceBuffer.create();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("setSize", function () {
        beforeEach(function () {
            buffer.size = 3 * 16 * 4;
        });

        it("if instance matrixs size not exceed buffer size, not recreate buffer and not update size", function () {
            buffer.setSize(2);

            expect(gl.createBuffer).not.toCalledTwice();
            expect(buffer.size).toEqual(3 * 16 * 4);
        });
        it("else, increate size by 2 times and recreate buffer", function () {
            buffer.setSize(4);

            expect(gl.createBuffer).toCalledTwice();
            expect(gl.deleteBuffer).toCalledOnce();

            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, 6 * 16 * 4, gl.DYNAMIC_DRAW)).toCalledOnce();

            expect(buffer.size).toEqual(6 * 16 * 4);
        });
    });
});
