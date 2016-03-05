describe("Program", function() {
    var sandbox = null;
    var program = null;
    var gl = null;
    var device;

    function setShaderDirty(dirty){
        testTool.stubGetter(sinon, program._shader, "dirty", function(){
            return dirty;
        });
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        program = new wd.Program();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });
    
    describe("getUniformLocation", function(){
        var pos;

        beforeEach(function(){
            pos = 1;
        });
        
        describe("test cache", function(){
            beforeEach(function(){
                device.gl.getUniformLocation.returns(pos);
                program.initWithShader(wd.CommonShader.create());
            });

            it("if shader dirty, no cache", function () {
                setShaderDirty(true);

                var result1 = program.getUniformLocation("u_mMatrix");
                var result2 = program.getUniformLocation("u_mMatrix");

                expect(result1 === result2).toBeTruthy();
                expect(device.gl.getUniformLocation).toCalledTwice();
            });
            it("else, if cached, return cached data", function () {
                setShaderDirty(false);
                var result1 = program.getUniformLocation("u_mMatrix");
                var result2 = program.getUniformLocation("u_mMatrix");

                expect(result1 === result2).toBeTruthy();
                expect(device.gl.getUniformLocation).toCalledOnce();

            });
        });
    });

    describe("sendAttributeData", function(){
        var buffer = null;
        var pos;

        beforeEach(function(){
            program.initWithShader(wd.CommonShader.create());

            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getAttribLocation.returns(pos);


            buffer = wd.ArrayBuffer.create([1,2, 3, 1.2,0.2,3.1, 3.3, 10.5, 9.1], 3, wd.EBufferType.UNSIGNED_SHORT);

        });

        describe("test cache", function(){
            beforeEach(function(){
                device.gl.getAttribLocation.returns(pos);
            });

            it("if shader dirty, no cache", function () {
                setShaderDirty(true);

                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);

                expect(device.gl.getAttribLocation).toCalledTwice();
            });
            it("else, if cached, return cached data", function () {
                setShaderDirty(false);

                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);

                expect(device.gl.getAttribLocation).toCalledOnce();
            });
        });

        it("bind array buffer", function(){
            program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);

            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer.buffer);
        });
        it("attach buffer to attribute", function(){
            program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);

            expect(gl.vertexAttribPointer).toCalledWith(pos, 3, gl[wd.EBufferType.UNSIGNED_SHORT], false, 0, 0);
        });
        it("enable attribute", function(){
            program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer);

            expect(gl.enableVertexAttribArray).toCalledWith(pos);
        });
    });
});
