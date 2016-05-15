describe("InstanceBuffer", function () {
    var sandbox = null;
    var buffer = null;
    var gl;

    function judgeResetBindedArrayBuffer(){
        it("release binded buffer", function(){
            expect(gl.bindBuffer.getCall(1).args[1]).toBeNull();
        });
        it("null BufferTable->lastBindedArrayBufferArr", function () {
            expect(wd.BufferTable.lastBindedArrayBufferArr).toBeNull();
        });
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;

        buffer = wd.InstanceBuffer.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test static method", function(){
        describe("create", function(){
            describe("reset binded array buffer", function(){
                beforeEach(function(){
                    buffer = wd.InstanceBuffer.create();
                });

                judgeResetBindedArrayBuffer();
            });
        });
    });

    describe("float32InstanceArraySize(getter)", function(){
        beforeEach(function(){

        });

        it("get float32 instance array size", function(){
            buffer._capacity = 3 * 16 * 4;

            expect(buffer.float32InstanceArraySize).toEqual(3 * 16);
        });
    });

    describe("setCapacity", function () {
        beforeEach(function () {
            buffer._capacity = 3 * 16 * 4;
        });

        it("if instance matrixs capacity not exceed buffer capacity, not recreate buffer and not update capacity", function () {
            buffer.setCapacity(2 * 16 * 4);

            expect(gl.createBuffer).not.toCalledTwice();
            expect(buffer._capacity).toEqual(3 * 16 * 4);
        });
        it("else, increate capacity by 2 times and recreate buffer", function () {
            buffer.setCapacity(4 * 16 * 4);

            expect(gl.createBuffer).toCalledTwice();
            expect(gl.deleteBuffer).toCalledOnce();

            expect(gl.bufferData.withArgs(gl.ARRAY_BUFFER, 6 * 16 * 4, gl.DYNAMIC_DRAW)).toCalledOnce();

            expect(buffer._capacity).toEqual(6 * 16 * 4);
        });
    });
});
