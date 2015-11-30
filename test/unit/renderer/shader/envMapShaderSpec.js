//describe("envMap shader", function () {
//    describe("basic envMap", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "EnvMapMaterial",
//                shaderName: "basic envMap",
//                definitionData_attributes: {
//                    a_normal: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_samplerCube0: {
//                        type: wd.VariableType.SAMPLER_CUBE,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_normalMatrix: {
//                        type: wd.VariableType.FLOAT_MAT4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_cameraPos: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
//                },
//                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(3).args).toEqual(
//                        ["u_normalMatrix", wd.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
//                    );
//                    expect(program.sendUniformData.getCall(4).args).toEqual(
//                        ["u_cameraPos", wd.VariableType.FLOAT_3, wd.Director.getInstance().scene.camera.transform.position]
//                    );
//                },
//                judge_sendLibVariable_texture: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_samplerCube0");
//                },
//                setMaterial: function (material) {
//                    var asset = wd.ImageTextureAsset.create({});
//                    var cubemap = wd.CubemapTexture.create(
//                        [
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            }
//                        ]
//                    );
//
//                    material.envMap = cubemap;
//                }
//            }
//        );
//    });
//
//    describe("reflect envMap", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "EnvMapMaterial",
//                shaderName: "reflect envMap",
//                definitionData_attributes: {
//                    a_normal: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_samplerCube0: {
//                        type: wd.VariableType.SAMPLER_CUBE,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_normalMatrix: {
//                        type: wd.VariableType.FLOAT_MAT4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_cameraPos: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
//                },
//                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(3).args).toEqual(
//                        ["u_normalMatrix", wd.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
//                    );
//                    expect(program.sendUniformData.getCall(4).args).toEqual(
//                        ["u_cameraPos", wd.VariableType.FLOAT_3, wd.Director.getInstance().scene.camera.transform.position]
//                    );
//                },
//                judge_sendLibVariable_texture: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_samplerCube0");
//                },
//                setMaterial: function (material) {
//                    var asset = wd.ImageTextureAsset.create({});
//                    var cubemap = wd.CubemapTexture.create(
//                        [
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            }
//                        ]
//                    );
//
//                    cubemap.mode = wd.EnvMapMode.REFLECTION;
//
//                    material.envMap = cubemap;
//
//
//
//                    wd.Director.getInstance().scene.camera = {
//                        transform:{
//                            position: wd.Vector3.create(1, 2, 3)
//                        }
//                    }
//                }
//            }
//        );
//    });
//
//    describe("refract envMap", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "EnvMapMaterial",
//                shaderName: "reflect envMap",
//                definitionData_attributes: {
//                    a_normal: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_samplerCube0: {
//                        type: wd.VariableType.SAMPLER_CUBE,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_normalMatrix: {
//                        type: wd.VariableType.FLOAT_MAT4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_cameraPos: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_refractionRatio: {
//                        type: wd.VariableType.FLOAT_1,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
//                },
//                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(3).args).toEqual(
//                        ["u_normalMatrix", wd.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
//                    );
//                    expect(program.sendUniformData.getCall(4).args).toEqual(
//                        ["u_cameraPos", wd.VariableType.FLOAT_3, wd.Director.getInstance().scene.camera.transform.position]
//                    );
//                    expect(program.sendUniformData.getCall(5).args).toEqual(
//                        ["u_refractionRatio", wd.VariableType.FLOAT_1, 0.1]
//                    );
//                },
//                judge_sendLibVariable_texture: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(6).args[0]).toEqual("u_samplerCube0");
//                },
//                setMaterial: function (material) {
//                    var asset = wd.ImageTextureAsset.create({});
//                    var cubemap = wd.CubemapTexture.create(
//                        [
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            }
//                        ]
//                    );
//
//                    cubemap.mode = wd.EnvMapMode.REFRACTION;
//
//                    material.envMap = cubemap;
//
//                    material.refractionRatio = 0.1;
//
//
//
//                    wd.Director.getInstance().scene.camera = {
//                        transform:{
//                            position: wd.Vector3.create(1, 2, 3)
//                        }
//                    }
//                }
//            }
//        );
//    });
//
//
//    describe("fresnel envMap", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "EnvMapMaterial",
//                shaderName: "fresnel envMap",
//                definitionData_attributes: {
//                    a_normal: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_samplerCube0: {
//                        type: wd.VariableType.SAMPLER_CUBE,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_normalMatrix: {
//                        type: wd.VariableType.FLOAT_MAT4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_cameraPos: {
//                        type: wd.VariableType.FLOAT_3,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_refractionRatio: {
//                        type: wd.VariableType.FLOAT_1,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_reflectivity: {
//                        type: wd.VariableType.FLOAT_1,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function (program, quadCmd, material) {
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
//                },
//                judge_sendLibVariable_uniforms: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(3).args).toEqual(
//                        ["u_normalMatrix", wd.VariableType.FLOAT_MAT4, quadCmd.mMatrix.copy().invert().transpose()]
//                    );
//                    expect(program.sendUniformData.getCall(4).args).toEqual(
//                        ["u_cameraPos", wd.VariableType.FLOAT_3, wd.Director.getInstance().scene.camera.transform.position]
//                    );
//                    expect(program.sendUniformData.getCall(5).args).toEqual(
//                        ["u_refractionRatio", wd.VariableType.FLOAT_1, 0.1]
//                    );
//                    expect(program.sendUniformData.getCall(6).args).toEqual(
//                        ["u_reflectivity", wd.VariableType.FLOAT_1, -1]
//                    );
//                },
//                judge_sendLibVariable_texture: function (program, quadCmd, material) {
//                    expect(program.sendUniformData.getCall(7).args[0]).toEqual("u_samplerCube0");
//                },
//                setMaterial: function (material) {
//                    var asset = wd.ImageTextureAsset.create({});
//                    var cubemap = wd.CubemapTexture.create(
//                        [
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            },
//                            {
//                                asset:asset
//                            }
//                        ]
//                    );
//
//                    cubemap.mode = wd.EnvMapMode.FRESNEL;
//
//                    material.envMap = cubemap;
//
//                    material.refractionRatio = 0.1;
//                    //material.reflectivity = null;
//
//
//
//                    wd.Director.getInstance().scene.camera = {
//                        transform:{
//                            position: wd.Vector3.create(1, 2, 3)
//                        }
//                    }
//                },
//                moreTest:[
//                    {
//                        explain:"if set material's reflectivity, send it to glsl",
//                        body: function (updateFunc, quadCmd, program, material) {
//                            material.reflectivity = 0.5;
//
//                            updateFunc();
//
//                            expect(program.sendUniformData.getCall(6).args).toEqual(
//                                ["u_reflectivity", wd.VariableType.FLOAT_1, 0.5]
//                            );
//                        }
//                    }
//                ]
//            }
//        );
//    });
//});
