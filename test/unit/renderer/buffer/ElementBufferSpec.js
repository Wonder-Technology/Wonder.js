describe("ElementBuffer", function() {
    var sandbox = null;
    var buffer = null;
    var device = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));

        gl = device.gl;

        buffer = new wd.ElementBuffer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("test static method", function(){
        describe("create", function(){
            it("if not pass param type, buffer should set type by check data", function () {
                buffer = wd.ElementBuffer.create([1,2,65535], null);

                expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_SHORT);


                buffer = wd.ElementBuffer.create([1,2,65536], null);

                expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_INT);
            });
        });
    });

    describe("get typeSize", function(){
        beforeEach(function(){

        });

        it("return typed data->BYTES_PER_ELEMENT", function(){
            buffer = wd.ElementBuffer.create([1,2,65535], null);
            expect(buffer.typeSize).toEqual(2);

            buffer = wd.ElementBuffer.create([1,2,65536], null);
            expect(buffer.typeSize).toEqual(4);
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
                buffer = wd.ElementBuffer.create([1,2,3]);

                buffer.resetData([2,3,4], null, 0);

                expect(gl.bufferData.withArgs(gl["ELEMENT_ARRAY_BUFFER"], new Uint16Array([2,3,4]), gl.DYNAMIC_DRAW));
                expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
            });

            describe("else, use bufferSubData to reset data", function () {
                it("test buffer.usage !== STATIC_DRAW", function () {
                    buffer = wd.ElementBuffer.create([1,2,3], null, wd.EBufferUsage.DYNAMIC_DRAW);

                    buffer.resetData([2,3,65536], null, 0);

                    expect(gl.bufferData).not.toCalledTwice();
                    expect(gl.bufferSubData).toCalledWith(gl["ELEMENT_ARRAY_BUFFER"], 0, new Uint32Array([2,3,65536]));
                    expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
                });
                it("test offset !== 0", function () {
                    buffer = wd.ElementBuffer.create([1,2,3], null, wd.EBufferUsage.STATIC_DRAW);

                    buffer.resetData([2,3,4], null, 1);

                    expect(gl.bufferData).not.toCalledTwice();
                    expect(gl.bufferSubData).toCalledWith(gl["ELEMENT_ARRAY_BUFFER"], 1, new Uint16Array([2,3,4]));
                    expect(buffer.usage).toEqual(wd.EBufferUsage.DYNAMIC_DRAW);
                });
            });
        });

        describe("reset binded element buffer", function(){
            beforeEach(function(){
                buffer.resetData([1,1,1]);
            });

            it("release binded buffer", function(){
                expect(gl.bindBuffer.getCall(1).args[1]).toBeNull();
            });
            it("empty BufferTable->lastBindedElementBuffer", function () {
                expect(wd.BufferTable.lastBindedElementBuffer).toBeNull();
            });
        });

        it("if not pass param type, buffer should set type by check data", function () {
            buffer.resetData([1,2,3]);

            expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_SHORT);



            buffer.resetData([1,65536,3]);

            expect(buffer.type).toEqual(wd.EBufferType.UNSIGNED_INT);
        });
    });
});

