describe("Program", function() {
    var sandbox = null;
    var program = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        var device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        program = new wd.Program();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });

    describe("sendAttributeData", function(){
        var buffer = null;
        var pos;

        beforeEach(function(){
            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getAttribLocation.returns(pos);

            program.sendAttributeData("a_position", wd.VariableType.BUFFER, buffer);

            buffer = wd.ArrayBuffer.create([1,2, 3, 1.2,0.2,3.1, 3.3, 10.5, 9.1], 3, wd.BufferType.UNSIGNED_SHORT);

        });

        it("bind array buffer", function(){
            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer.buffer);
        });
        it("attach buffer to attribute", function(){
            expect(gl.vertexAttribPointer).toCalledWith(pos, 3, gl[wd.BufferType.UNSIGNED_SHORT], false, 0, 0);
        });
        it("enable attribute", function(){
            expect(gl.enableVertexAttribArray).toCalledWith(pos);
        });
    });
});
