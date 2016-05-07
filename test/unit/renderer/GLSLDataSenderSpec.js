describe("GLSLDataSender", function () {
    var sender = null;
    var gl = null;
    var device;
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        sender = wd.GLSLDataSender.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("sendBuffer", function () {
        var buffer = null;
        var pos;

        beforeEach(function () {
            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getAttribLocation.returns(pos);

            buffer = wd.ArrayBuffer.create([1, 2, 3, 1.2, 0.2, 3.1, 3.3, 10.5, 9.1], 3, wd.EBufferType.UNSIGNED_SHORT);
        });

        it("bind array buffer", function () {
            sender.sendBuffer(pos, buffer);

            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer.buffer);
        });
        it("attach buffer to attribute", function () {
            sender.sendBuffer(pos, buffer);

            expect(gl.vertexAttribPointer).toCalledWith(pos, 3, gl[wd.EBufferType.UNSIGNED_SHORT], false, 0, 0);
        });
        it("enable attribute", function () {
            sender.sendBuffer(pos, buffer);

            expect(gl.enableVertexAttribArray).toCalledWith(pos);
        });

        //describe("test cache", function () {
        //    beforeEach(function () {
        //    });
        //
        //    it("if cached, return cached data", function () {
        //        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);
        //        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);
        //
        //        expect(gl.vertexAttribPointer.withArgs(pos, 3, gl[wd.EBufferType.UNSIGNED_SHORT], false, 0, 0)).toCalledOnce();
        //    });
        //    it("if data not equal, cache miss", function () {
        //        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);
        //        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, wd.ArrayBuffer.create([1, 2, 3, 1.2, 0.2, 3.1, 3.3, 10.5, 9.1], 3, wd.EBufferType.UNSIGNED_SHORT));
        //
        //        expect(gl.vertexAttribPointer.withArgs(pos)).toCalledTwice();
        //    });
        //});
    });
});
