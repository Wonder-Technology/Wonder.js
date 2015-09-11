var rendererTool = {
    shaderTest: function(option){
        var MaterialClassName = option.MaterialClassName ,
            shaderName = option.shaderName,
            definitionData_attributes = option.definitionData_attributes,
            definitionData_uniforms = option.definitionData_uniforms,
            definitionData_vsSource = option.definitionData_vsSource,
            definitionData_fsSource = option.definitionData_fsSource,
            judge_sendLibVariable_attributes = option.judge_sendLibVariable_attributes,
            judge_sendLibVariable_uniforms = option.judge_sendLibVariable_uniforms,
            judge_sendLibVariable_texture = option.judge_sendLibVariable_texture,
            setMaterial = option.setMaterial,
            moreTest = option.moreTest,
            moreTestExplain = option.moreTestExplain;

        var sandbox = null;
        var material = null;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            testTool.clearInstance();
            sandbox.stub(dy.Director.getInstance(), "gl", testTool.buildFakeGl(sandbox));
            sandbox.stub(dy.GPUDetector.getInstance(), "precision", dy.GPUPrecision.HIGHP);

            material = new dy[MaterialClassName]();
        });
        afterEach(function () {
            sandbox.restore();
            testTool.clearInstance();
        });

        describe("integration test", function() {
            describe(MaterialClassName + " use " + shaderName + " shader", function () {
                var shader, program;
                beforeEach(function () {
                    shader = material.shader;
                    program = shader.program;

                    sandbox.stub(dy.render.ArrayBuffer, "create", function(arr, num, type){
                        return testTool.getValues(arr);
                    });

                    sandbox.stub(material.textureManager, "init");
                    sandbox.stub(shader.program, "sendAttributeData");
                    sandbox.stub(shader.program, "sendUniformData");
                });
                describe("init shader", function () {
                    beforeEach(function () {
                        sandbox.stub(shader.program, "initWithShader");

                        setMaterial && setMaterial(material);

                        material.init();
                    });

                    it("build definition data", function () {
                        var attributes = testTool.extend({
                            a_position: {
                                type: dy.render.VariableType.FLOAT_4,
                                value: dy.render.VariableCategory.ENGINE
                            }
                        }, definitionData_attributes);
                        var uniforms = testTool.extend({
                            u_mMatrix: {type: dy.render.VariableType.FLOAT_MAT4, value: dy.render.VariableCategory.ENGINE},
                            u_vMatrix: {type: dy.render.VariableType.FLOAT_MAT4, value: dy.render.VariableCategory.ENGINE},
                            u_pMatrix: {type: dy.render.VariableType.FLOAT_MAT4, value: dy.render.VariableCategory.ENGINE}
                        }, definitionData_uniforms);


                        expect(shader.attributes.getChildren()).toEqual( attributes );
                        expect(shader.uniforms.getChildren()).toEqual( uniforms );
                        expect(shader.vsSource.split("\n").join("")).toEqual( definitionData_vsSource );
                        expect(shader.fsSource.split("\n").join("")).toEqual( definitionData_fsSource )
                    });
                    it("program init with shader", function () {
                        expect(shader.program.initWithShader).toCalledWith(shader);
                    });
                });

                describe("update shader", function () {
                    var quadCmd;

                    beforeEach(function () {
                        quadCmd = dy.render.QuadCommand.create();
                        sandbox.stub(quadCmd.buffers, "hasChild").returns(true);
                        sandbox.stub(quadCmd.buffers, "getChild");


                        quadCmd.mMatrix = dy.Matrix.create();
                        quadCmd.vMatrix = dy.Matrix.create();
                        quadCmd.pMatrix = dy.Matrix.create();

                        setMaterial && setMaterial(material);
                    });

                    it("send texture's variables", function () {
                        material.init();
                        material.updateShader(quadCmd);

judge_sendLibVariable_texture && judge_sendLibVariable_texture(program, quadCmd, material);
                    });
                    it("send shader lib's variables", function () {
                        material.init();
                        material.updateShader(quadCmd);

                        expect(program.sendAttributeData.firstCall.args[0]).toEqual("a_position");
                        expect(quadCmd.buffers.getChild.firstCall).toCalledWith("vertexBuffer");
                        judge_sendLibVariable_attributes(program, quadCmd, material);

                        expect(program.sendUniformData.firstCall.args[0]).toEqual("u_mMatrix");
                        expect(program.sendUniformData.firstCall.args[2]).toEqual(quadCmd.mMatrix);
                        expect(program.sendUniformData.secondCall.args[0]).toEqual("u_vMatrix");
                        expect(program.sendUniformData.secondCall.args[2]).toEqual(quadCmd.vMatrix);
                        expect(program.sendUniformData.thirdCall.args[0]).toEqual("u_pMatrix");
                        expect(program.sendUniformData.thirdCall.args[2]).toEqual(quadCmd.pMatrix);
                        judge_sendLibVariable_uniforms(program, quadCmd, material);
                    });
                    it("send custom shader's attribute variables", function () {
                    });
                    it("send custom shader's uniform variables", function () {
                    });

                    if(moreTest && moreTestExplain){
                        it(moreTestExplain, function(){
                            moreTest(function(){
                                material.init();
                                material.updateShader(quadCmd);
                            },quadCmd, program, material);
                        });
                    }
                });
            });
        });
    }
};
