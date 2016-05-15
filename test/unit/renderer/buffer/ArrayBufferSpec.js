describe("ArrayBuffer", function() {
    var sandbox = null;
    var buffer = null;
    var device = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));

        gl = device.gl;

        buffer = new wd.ArrayBuffer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("test static method", function(){
        describe("create", function(){
            it("if not pass param type, the buffer->type should be FLOAT", function () {
                buffer = wd.ArrayBuffer.create([1,2,1], null);

                expect(buffer.type).toEqual(wd.EBufferType.FLOAT);

                buffer = wd.ArrayBuffer.create([1,2,65536], null);

                expect(buffer.type).toEqual(wd.EBufferType.FLOAT);
            });
        });
    });

    describe("resetData", function(){
        beforeEach(function(){
        });

        it("bind buffer", function () {
            buffer.buffer = {};

            buffer.resetData([]);

            expect(gl.bindBuffer.withArgs(sinon.match.any, buffer.buffer)).toCalledOnce();
        });

        describe("reset buffer data", function(){
            beforeEach(function(){
            });

            it("if buffer.usage === STATIC_DRAW && offset === 0, use bufferData to reset data and change usage to DYNAMIC_DRAW", function(){
                buffer = wd.ArrayBuffer.create([1,2,3]);

                buffer.resetData([2,3,4], null, 0);

                expect(gl.bufferData.withArgs(gl["ARRAY_BUFFER"], new Float32Array([2,3,4]), gl.DYNAMIC_DRAW));
                expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
            });

            describe("else, use bufferSubData to reset data", function () {
                it("test buffer.usage !== STATIC_DRAW", function () {
                    buffer = wd.ArrayBuffer.create([1,2,3], 3, wd.EBufferType.FLOAT, wd.EBufferUsage.DYNAMIC_DRAW);

                    buffer.resetData([2,3,4], 3, wd.EBufferType.FLOAT, 0);

                    expect(gl.bufferData).not.toCalledTwice();
                    expect(gl.bufferSubData).toCalledWith(gl["ARRAY_BUFFER"], 0, new Float32Array([2,3,4]));
                    expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
                });
                it("test offset !== 0", function () {
                    buffer = wd.ArrayBuffer.create([1,2,3], 3, wd.EBufferType.FLOAT, wd.EBufferUsage.STATIC_DRAW);

                    buffer.resetData([2,3,4], 3, wd.EBufferType.FLOAT, 1);

                    expect(gl.bufferData).not.toCalledTwice();
                    expect(gl.bufferSubData).toCalledWith(gl["ARRAY_BUFFER"], 1, new Float32Array([2,3,4]));
                    expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
                });
            });
        });

        describe("reset binded array buffer", function(){
            beforeEach(function(){
                buffer.resetData([1,1,1]);
            });

            it("release binded buffer", function(){
                expect(gl.bindBuffer.getCall(1).args[1]).toBeNull();
            });
            it("null BufferTable->lastBindedArrayBufferArr", function () {
                expect(wd.BufferTable.lastBindedArrayBufferArr).toBeNull();
            });
        });

        it("if not pass param type, the buffer->type should be the setted type  which is set when create", function () {
            buffer = wd.ArrayBuffer.create([0], 3, wd.EBufferType.UNSIGNED_BYTE);

            buffer.resetData([1,2,3]);

            expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_BYTE);



            buffer.resetData([1,65536,3]);

            expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_BYTE);
        });
    });
});

