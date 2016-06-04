describe("Program", function(){
    var program = null;
    var gl = null;
    var device;
    var sandbox;

    //function setShaderDirty(dirty){
    //    testTool.stubGetter(sinon, program._shader, "dirty", function(){
    //        return dirty;
    //    });
    //}

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

        describe("else", function(){
            beforeEach(function(){
            });

            it("use program", function () {
                program.glProgram = {};

                program.use();

                expect(gl.useProgram).toCalledWith(program.glProgram);
            });
        });
    });

    describe("_clearAllCache", function(){
        it("clear _getAttribLocationCache", function () {
            sandbox.stub(program._getAttribLocationCache, "removeAllChildren");

            program._clearAllCache();

            expect(program._getAttribLocationCache.removeAllChildren).toCalledOnce();
        });
        it("clear _getUniformLocationCache", function () {
            var pos1 = program.getUniformLocation("a");

            program._clearAllCache();


            var pos2 = program.getUniformLocation("a");

            expect(gl.getUniformLocation).toCalledTwice();
        });
        it("clear _uniformTable", function () {
            program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1.1, 2.1]);

            program._clearAllCache();


            program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1.1, 2.1]);

            expect(gl.uniform2f).toCalledTwice();
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
            });

            //it("if shader dirty, no cache", function () {
            //    setShaderDirty(true);
            //
            //    var result1 = program.getUniformLocation("u_mMatrix");
            //    var result2 = program.getUniformLocation("u_mMatrix");
            //
            //    expect(result1 === result2).toBeTruthy();
            //    expect(device.gl.getUniformLocation).toCalledTwice();
            //});
            it("if cached, return cached data", function () {
                //setShaderDirty(false);
                var result1 = program.getUniformLocation("u_mMatrix");
                var result2 = program.getUniformLocation("u_mMatrix");

                expect(result1 === result2).toBeTruthy();
                expect(device.gl.getUniformLocation).toCalledOnce();

            });
        });
    });

    describe("getAttributeLocation", function(){
        var pos;

        beforeEach(function(){
            pos = 1;
        });

        describe("test cache", function() {
            beforeEach(function () {
                device.gl.getAttribLocation.returns(pos);
            });

            //it("if shader dirty, no cache", function () {
            //    setShaderDirty(true);
            //
            //    program.sendAttributeBuffer("a_position", wd.EVariableType.BUFFER, buffer);
            //    program.sendAttributeBuffer("a_position", wd.EVariableType.BUFFER, buffer);
            //
            //    expect(device.gl.getAttribLocation).toCalledTwice();
            //});
            it("if cached, return cached data", function () {
                var result1 = program.getAttribLocation("a_position");
                var result2 = program.getAttribLocation("a_position");

                expect(result1 === result2).toBeTruthy();
                expect(device.gl.getAttribLocation).toCalledOnce();
            });
        });
    });

    describe("sendAttributeBuffer", function(){
    });

    describe("sendUniformData", function(){
        var pos;

        beforeEach(function(){
            //program.initWithShader(wd.CommonShader.create());

            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";

            gl.getUniformLocation.returns(pos);

        });

        describe("test send FLOAT_1", function () {
            it("convert data to number", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, "1");

                expect(gl.uniform1f).toCalledWith(pos, 1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);

                    expect(gl.uniform1f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 1);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_1, 2);

                    expect(gl.uniform1f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send FLOAT_2", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1,2.1]);

                expect(gl.uniform2f).toCalledWith(pos, 1, 2.1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1,2.1]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1,2.1]);

                    expect(gl.uniform2f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [1,2.1]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_2, [3.1,2.1]);

                    expect(gl.uniform2f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send VECTOR_2", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.VECTOR_2, wd.Vector2.create(1,2));

                expect(gl.uniform2f).toCalledWith(pos, 1, 2);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_2, wd.Vector2.create(1,2));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_2, wd.Vector2.create(1,2));

                    expect(gl.uniform2f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_2, wd.Vector2.create(2,2));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_2, wd.Vector2.create(1,2));

                    expect(gl.uniform2f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send FLOAT_3", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, [1,2.1,3.1]);

                expect(gl.uniform3f).toCalledWith(pos, 1, 2.1, 3.1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, [1,2,3]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, [1,2,3]);

                    expect(gl.uniform3f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, [1,2,3]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_3, [2,2,3]);

                    expect(gl.uniform3f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send VECTOR_3", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.VECTOR_3, wd.Vector3.create(1,2,3));

                expect(gl.uniform3f).toCalledWith(pos, 1, 2, 3);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_3, wd.Vector3.create(1,2,3));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_3, wd.Vector3.create(1,2,3));

                    expect(gl.uniform3f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_3, wd.Vector3.create(1,2,3));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_3, wd.Vector3.create(2,2,3));

                    expect(gl.uniform3f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send FLOAT_4", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, [1,2,3,4]);

                expect(gl.uniform4f).toCalledWith(pos, 1, 2, 3, 4);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, [1,2,3,4]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, [1,2,3,4]);

                    expect(gl.uniform4f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, [1,2,3,4]);
                    program.sendUniformData("u_a", wd.EVariableType.FLOAT_4, [2,2,3,4]);

                    expect(gl.uniform4f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send VECTOR_4", function () {
            it("convert data to array", function () {
                program.sendUniformData("u_a", wd.EVariableType.VECTOR_4, wd.Vector4.create(1,2,3,4));

                expect(gl.uniform4f).toCalledWith(pos, 1, 2, 3, 4);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_4, wd.Vector4.create(1,2,3,4));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_4, wd.Vector4.create(1,2,3,4));

                    expect(gl.uniform4f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_4, wd.Vector4.create(1,2,3,4));
                    program.sendUniformData("u_a", wd.EVariableType.VECTOR_4, wd.Vector4.create(2,2,3,4));

                    expect(gl.uniform4f.withArgs(pos)).toCalledTwice();
                });
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

        describe("test send NUMBER_1", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, 1);

                expect(gl.uniform1i).toCalledWith(pos, 1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, 1);
                    program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, 1);

                    expect(gl.uniform1i.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, 1);
                    program.sendUniformData("u_a", wd.EVariableType.NUMBER_1, 2);

                    expect(gl.uniform1i.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send SAMPLER_CUBE", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 1);

                expect(gl.uniform1i).toCalledWith(pos, 1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 1);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 1);

                    expect(gl.uniform1i.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 1);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_CUBE, 2);

                    expect(gl.uniform1i.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send SAMPLER_2D", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 1);

                expect(gl.uniform1i).toCalledWith(pos, 1);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 1);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 1);

                    expect(gl.uniform1i.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 1);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_2D, 2);

                    expect(gl.uniform1i.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send SAMPLER_ARRAY", function () {
            it("test", function () {
                program.sendUniformData("u_a", wd.EVariableType.SAMPLER_ARRAY, [1,2]);

                expect(gl.uniform1iv).toCalledWith(pos, [1,2]);
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_ARRAY, [1,2]);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_ARRAY, [1,2]);

                    expect(gl.uniform1iv.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_ARRAY, [1,2]);
                    program.sendUniformData("u_a", wd.EVariableType.SAMPLER_ARRAY, [2,3]);

                    expect(gl.uniform1iv.withArgs(pos)).toCalledTwice();
                });
            });
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
            var pos;

            beforeEach(function(){
                gl.VERTEX_ATTRIB_ARRAY_ENABLED = 2;

                //program.initWithShader(wd.CommonShader.create());

                pos = 2;

                program._sender.sendBuffer(pos, wd.ArrayBuffer.create());
            });

            it("if position > gl.VERTEX_ATTRIB_ARRAY_ENABLED, not disable", function () {
                gl.VERTEX_ATTRIB_ARRAY_ENABLED = 1;
                gl.getAttribLocation.returns(pos);
                program.sendAttributeBuffer("a", wd.EVariableType.BUFFER, {});

                program.dispose();

                expect(gl.disableVertexAttribArray).not.toCalled();
            });
            it("else, disable", function () {
                gl.getAttribLocation.returns(pos);
                program.sendAttributeBuffer("a", wd.EVariableType.BUFFER, {});

                program.dispose();

                expect(gl.disableVertexAttribArray).toCalledOnce();
            });
        });

        it("clear all cache", function () {
            sandbox.stub(program, "_clearAllCache");

            program.dispose();

            expect(program._clearAllCache).toCalledOnce();
        });
    });
});
