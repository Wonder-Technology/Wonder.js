describe("envMap shader", function () {
    describe("basic envMap", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "EnvMapMaterial",
                shaderName: "basic envMap",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_samplerCube0: {
                        type: dy.VariableType.SAMPLER_CUBE,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_normalMatrix: {
                        type: dy.VariableType.FLOAT_MAT4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_cameraPos: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );
                },
                judge_sendLibVariable_texture: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_samplerCube0");
                },
                setMaterial: function (material) {
                    var asset = dy.TwoDTextureAsset.create({});
                    var cubemap = dy.CubemapTexture.create(
                        [
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            }
                        ]
                    );

                    material.envMap = cubemap;
                }
            }
        );
    });

    describe("reflect envMap", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "EnvMapMaterial",
                shaderName: "reflect envMap",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_samplerCube0: {
                        type: dy.VariableType.SAMPLER_CUBE,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_normalMatrix: {
                        type: dy.VariableType.FLOAT_MAT4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_cameraPos: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );
                },
                judge_sendLibVariable_texture: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_samplerCube0");
                },
                setMaterial: function (material) {
                    var asset = dy.TwoDTextureAsset.create({});
                    var cubemap = dy.CubemapTexture.create(
                        [
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            }
                        ]
                    );

                    cubemap.mode = dy.EnvMapMode.REFLECTION;

                    material.envMap = cubemap;



                    dy.Director.getInstance().stage.camera = {
                        transform:{
                            position: dy.Vector3.create(1, 2, 3)
                        }
                    }
                }
            }
        );
    });

    describe("refract envMap", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "EnvMapMaterial",
                shaderName: "reflect envMap",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_samplerCube0: {
                        type: dy.VariableType.SAMPLER_CUBE,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_normalMatrix: {
                        type: dy.VariableType.FLOAT_MAT4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_cameraPos: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_refractionRatio: {
                        type: dy.VariableType.FLOAT_1,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );
                    expect(program.sendUniformData.getCall(5).args).toEqual(
                        ["u_refractionRatio", dy.VariableType.FLOAT_1, 0.1]
                    );
                },
                judge_sendLibVariable_texture: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(6).args[0]).toEqual("u_samplerCube0");
                },
                setMaterial: function (material) {
                    var asset = dy.TwoDTextureAsset.create({});
                    var cubemap = dy.CubemapTexture.create(
                        [
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            }
                        ]
                    );

                    cubemap.mode = dy.EnvMapMode.REFRACTION;

                    material.envMap = cubemap;

                    material.refractionRatio = 0.1;



                    dy.Director.getInstance().stage.camera = {
                        transform:{
                            position: dy.Vector3.create(1, 2, 3)
                        }
                    }
                }
            }
        );
    });


    describe("fresnel envMap", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "EnvMapMaterial",
                shaderName: "fresnel envMap",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_samplerCube0: {
                        type: dy.VariableType.SAMPLER_CUBE,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_normalMatrix: {
                        type: dy.VariableType.FLOAT_MAT4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_cameraPos: {
                        type: dy.VariableType.FLOAT_3,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_refractionRatio: {
                        type: dy.VariableType.FLOAT_1,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_reflectivity: {
                        type: dy.VariableType.FLOAT_1,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_normalMatrix", dy.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_cameraPos", dy.VariableType.FLOAT_3, dy.Director.getInstance().stage.camera.transform.position]
                    );
                    expect(program.sendUniformData.getCall(5).args).toEqual(
                        ["u_refractionRatio", dy.VariableType.FLOAT_1, 0.1]
                    );
                    expect(program.sendUniformData.getCall(6).args).toEqual(
                        ["u_reflectivity", dy.VariableType.FLOAT_1, -1]
                    );
                },
                judge_sendLibVariable_texture: function (program, quadCmd, material) {
                    expect(program.sendUniformData.getCall(7).args[0]).toEqual("u_samplerCube0");
                },
                setMaterial: function (material) {
                    var asset = dy.TwoDTextureAsset.create({});
                    var cubemap = dy.CubemapTexture.create(
                        [
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            },
                            {
                                asset:asset
                            }
                        ]
                    );

                    cubemap.mode = dy.EnvMapMode.FRESNEL;

                    material.envMap = cubemap;

                    material.refractionRatio = 0.1;
                    //material.reflectivity = null;



                    dy.Director.getInstance().stage.camera = {
                        transform:{
                            position: dy.Vector3.create(1, 2, 3)
                        }
                    }
                },
                moreTest:[
                    {
                        explain:"if set material's reflectivity, send it to glsl",
                        body: function (updateFunc, quadCmd, program, material) {
                            material.reflectivity = 0.5;

                            updateFunc();

                            expect(program.sendUniformData.getCall(6).args).toEqual(
                                ["u_reflectivity", dy.VariableType.FLOAT_1, 0.5]
                            );
                        }
                    }
                ]
            }
        );
    });
});
