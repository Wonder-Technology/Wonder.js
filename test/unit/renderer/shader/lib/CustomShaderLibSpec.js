describe("CustomShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.CustomShaderLib;
        lib = new Lib();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sendShaderVariables", function(){
        var program,cmd,material;

        beforeEach(function(){
            program = {
                sendUniformData:sandbox.stub(),
                sendAttributeData:sandbox.stub()
            }

            material = wd.ShaderMaterial.create();

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        });

        describe("test semantic", function(){
            var shader;

            beforeEach(function(){
            });

            describe("test attribute semantic", function(){
                var vertices,texCoords,colors,normals,tangents;

                beforeEach(function(){
                    shader = {
                        "attributes": wdCb.Hash.create({
                            "a_position":{
                                "type":"FLOAT_3",
                                "value": "POSITION"
                            },
                            "a_texCoord":{
                                "type":"FLOAT_2",
                                "value": "TEXCOORD"
                            },
                            "a_color": {
                                "type":"FLOAT_3",
                                "value": "COLOR"
                            },
                            "a_normal": {
                                "type":"FLOAT_3",
                                "value": "NORMAL"
                            },
                            "a_tangent": {
                                "type":"FLOAT_3",
                                "value": "TANGENT"
                            }
                        }),
                        "uniforms": wdCb.Hash.create({
                        })
                    }

                    lib.shader = shader;



                    vertices = wd.ArrayBuffer.create([1]);
                    texCoords = wd.ArrayBuffer.create([0.1]);
                    tangents = wd.ArrayBuffer.create([2]);
                    normals = wd.ArrayBuffer.create([3]);
                    colors = wd.ArrayBuffer.create([0.2]);

                    cmd = {
                        buffers: {
                            getChild:sandbox.stub()
                        }
                    }


                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertices);
                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.TEXCOORD).returns(texCoords);
                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.COLOR).returns(colors);
                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.NORMAL).returns(normals);
                    cmd.buffers.getChild.withArgs(wd.EBufferDataType.TANGENT).returns(tangents);

                    lib.sendShaderVariables(program, cmd, material);
                });

                it("POSITION->vertices", function(){
                    expect(program.sendAttributeData).toCalledWith("a_position", wd.EVariableType.BUFFER, vertices);
                });
                it("TEXCOORD->texCoords", function(){
                    expect(program.sendAttributeData).toCalledWith("a_texCoord", wd.EVariableType.BUFFER, texCoords);
                });
                it("COLOR->colors", function(){
                    expect(program.sendAttributeData).toCalledWith("a_color", wd.EVariableType.BUFFER, colors);
                });
                it("NORMAL->normals", function(){
                    expect(program.sendAttributeData).toCalledWith("a_normal", wd.EVariableType.BUFFER, normals);
                });
                it("TANGENT->tangents", function(){
                    expect(program.sendAttributeData).toCalledWith("a_tangent", wd.EVariableType.BUFFER, tangents);
                });
            });

            describe("test uniform semantic", function(){
                beforeEach(function() {
                    shader = {
                        "attributes": wdCb.Hash.create({}),
                        "uniforms": wdCb.Hash.create({
                            "u_mMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "MODEL"
                            },
                            "u_vMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "VIEW"
                            },
                            "u_pMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "PROJECTION"
                            },
                            "u_mvpMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "MODEL_VIEW_PROJECTION"
                            },
                            "u_mInverseMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "MODEL_INVERSE"
                            },
                            "u_vInverseMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "VIEW_INVERSE"
                            },
                            "u_pInverseMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "PROJECTION_INVERSE"
                            },
                            "u_mvInverseMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "MODEL_VIEW_INVERSE"
                            },
                            "u_mvpInverseMatrix": {
                                "type": "FLOAT_MAT4",
                                "value": "MODEL_VIEW_PROJECTION_INVERSE"
                            },
                            "u_mInverseTransposeMatrix": {
                                "type": "FLOAT_MAT3",
                                "value": "MODEL_INVERSE_TRANSPOSE"
                            },
                            "u_mvInverseTransposeMatrix": {
                                "type": "FLOAT_MAT3",
                                "value": "MODEL_VIEW_INVERSE_TRANSPOSE"
                            },
                            "u_viewport": {
                                "type": "FLOAT_4",
                                "value": "VIEWPORT"
                            }
                        })
                    }

                    lib.shader = shader;


                    cmd = {
                        mMatrix:wd.Matrix4.create([0]),
                        vMatrix:wd.Matrix4.create([1]),
                        pMatrix:wd.Matrix4.create([2]),
                        //mvpMatrix: wd.Matrix4.create([3]),
                        //normalMatrix: wd.Matrix4.create([4])
                    }

                });

                it("MODEL", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mMatrix);
                });
                it("VIEW", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_vMatrix", wd.EVariableType.FLOAT_MAT4, cmd.vMatrix);
                });
                it("PROJECTION", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_pMatrix", wd.EVariableType.FLOAT_MAT4, cmd.pMatrix);
                });
                it("MODEL_VIEW_PROJECTION", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mvpMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mvpMatrix);
                });
                it("MODEL_INVERSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mInverseMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mMatrix.clone().invert());
                });
                it("VIEW_INVERSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_vInverseMatrix", wd.EVariableType.FLOAT_MAT4, cmd.vMatrix.clone().invert());
                });
                it("PROJECTION_INVERSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_pInverseMatrix", wd.EVariableType.FLOAT_MAT4, cmd.pMatrix.clone().invert());
                });
                it("MODEL_VIEW_INVERSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mvInverseMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mMatrix.applyMatrix(cmd.vMatrix, true).invert());
                });
                it("MODEL_VIEW_PROJECTION_INVERSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mvpInverseMatrix", wd.EVariableType.FLOAT_MAT4, cmd.mMatrix.applyMatrix(cmd.vMatrix, true).applyMatrix(cmd.pMatrix, false).invert());
                });

                it("MODEL_INVERSE_TRANSPOSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mInverseTransposeMatrix", wd.EVariableType.FLOAT_MAT3, cmd.normalMatrix);
                });
                it("MODEL_VIEW_INVERSE_TRANSPOSE", function(){
                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_mvInverseTransposeMatrix", wd.EVariableType.FLOAT_MAT3, cmd.mMatrix.applyMatrix(cmd.vMatrix, true).invertTo3x3().transpose());
                });
                it("VIEWPORT", function(){
                    wd.DeviceManager.getInstance().setViewport(1,2,3,4);

                    lib.sendShaderVariables(program, cmd, material);

                    expect(program.sendUniformData).toCalledWith("u_viewport", wd.EVariableType.FLOAT_4, wd.RectRegion.create(1,2,3,4));
                });
            });
        });
    });
});
