describe("Program", function(){
    var program = null;
    var gl = null;
    var device;
    var sandbox;

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
        testTool.clearInstance(sandbox);
    });

    describe("use", function(){
        it("if the program is already used, not use again", function () {
            program.use();

            program.use();

            expect(gl.useProgram).toCalledOnce();
        });
        it("else, use program", function () {
            program._program = {};

            program.use();

            expect(gl.useProgram).toCalledWith(program._program);
        });
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

    describe("sendUniformData", function(){
        var pos;

        beforeEach(function(){
            program.initWithShader(wd.CommonShader.create());

            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";

            gl.getUniformLocation.returns(pos);

        });

        describe("test cache", function(){
            beforeEach(function(){
            });

            it("if shader dirty, no cache", function () {
                setShaderDirty(true);

                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);

                expect(device.gl.getUniformLocation).toCalledTwice();
            });
            it("else, if cached, return cached data", function () {
                setShaderDirty(false);

                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);

                expect(device.gl.getUniformLocation).toCalledOnce();
            });
        });

        describe("test send FLOAT_1", function () {
            it("convert data to number", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, "1");

                expect(gl.uniform1f).toCalledWith(pos, 1);
            });
        });

        describe("test send FLOAT_2", function () {
            it("convert data to array", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, wd.Vector2.create(1,2));

                expect(gl.uniform2f).toCalledWith(pos, 1, 2);
            });
        });

        describe("test send FLOAT_3", function () {
            it("convert data to array", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, wd.Vector3.create(1,2,3));

                expect(gl.uniform3f).toCalledWith(pos, 1, 2, 3);
            });
        });

        describe("test send FLOAT_4", function () {
            it("convert data to array", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, wd.Vector4.create(1,2,3,4));

                expect(gl.uniform4f).toCalledWith(pos, 1, 2, 3, 4);
            });
        });

        it("test send FLOAT_MAT3", function () {
            var mat = wd.Matrix3.create();
            program.sendUniformData("u_a", wd.EVariableType.FLOAT_MAT3, mat);

            expect(gl.uniformMatrix3fv).toCalledWith(pos, false, mat.values);
        });
        it("test send FLOAT_MAT4", function () {
            var mat = wd.Matrix4.create();
            program.sendUniformData("u_a", wd.EVariableType.FLOAT_MAT4, mat);

            expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.values);
        });
        it("test send NUMBER_1", function () {
            program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, "1");

            expect(gl.uniform1i).toCalledWith(pos, 1);
        });
        it("test send SAMPLER_CUBE", function () {
            program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 1);

            expect(gl.uniform1i).toCalledWith(pos, 1);
        });
        it("test send SAMPLER_2D", function () {
            program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 1);

            expect(gl.uniform1i).toCalledWith(pos, 1);
        });
    });

    describe("dispose", function(){
        beforeEach(function(){
        });

        it("delete program", function(){
            program.dispose();

            expect(gl.deleteProgram).toCalledOnce();
        });

        describe("unbind vertex buffer", function () {
            beforeEach(function(){
                gl.VERTEX_ATTRIB_ARRAY_ENABLED = 2;

                program.initWithShader(wd.CommonShader.create());
            });

            it("if position > gl.VERTEX_ATTRIB_ARRAY_ENABLED, not disable", function () {
                gl.VERTEX_ATTRIB_ARRAY_ENABLED = 1;
                var pos = 2;
                gl.getAttribLocation.returns(pos);
                program.sendAttributeData("a", wd.EVariableType.BUFFER, {});

                program.dispose();

                expect(gl.disableVertexAttribArray).not.toCalled();
            });
            it("else, disable", function () {
                var pos = 1;
                gl.getAttribLocation.returns(pos);
                program.sendAttributeData("a", wd.EVariableType.BUFFER, {});

                program.dispose();

                expect(gl.disableVertexAttribArray).toCalledOnce();
            });
        });
    });
});
