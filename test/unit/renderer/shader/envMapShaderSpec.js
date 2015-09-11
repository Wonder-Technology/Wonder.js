describe("envMap shader", function () {
    describe("basic envMap", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "EnvMapMaterial",
                shaderName: "basic envMap",
                definitionData_attributes: {
                    a_normal: {
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'varying vec3 v_dir;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_dir = vec3(a_position);}',
                definitionData_fsSource:
                    'precision highp float;varying vec3 v_dir;uniform samplerCube u_samplerCube0;void main(void){    gl_FragColor = textureCube(u_samplerCube0, v_dir);}',
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

                    material.setEnvMap(cubemap);


                    dy.Director.getInstance().stage.camera = {
                        transform:{
                            position: dy.Vector3.create(1, 2, 3)
                        }
                    }
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
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'varying vec3 v_normal;varying vec3 v_position;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_normal = vec3(u_normalMatrix * a_normal);    v_position = vec3(u_mMatrix * a_position);}',
                definitionData_fsSource:
                    'precision highp float;varying vec3 v_normal;varying vec3 v_position;uniform samplerCube u_samplerCube0;uniform vec3 u_cameraPos;void main(void){    vec3 inDir = normalize(v_position - u_cameraPos);    gl_FragColor = textureCube(u_samplerCube0, reflect(inDir, normalize(v_normal)));}',
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

                    material.setEnvMap(cubemap);



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
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'varying vec3 v_normal;varying vec3 v_position;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_normal = vec3(u_normalMatrix * a_normal);    v_position = vec3(u_mMatrix * a_position);}',
                definitionData_fsSource:
                    'precision highp float;varying vec3 v_normal;varying vec3 v_position;uniform samplerCube u_samplerCube0;uniform vec3 u_cameraPos;uniform float u_refractionRatio;void main(void){    vec3 inDir = normalize(v_position - u_cameraPos);    gl_FragColor = textureCube(u_samplerCube0, refract(inDir, normalize(v_normal), u_refractionRatio));}',
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

                    material.setEnvMap(cubemap);

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
                        type: dy.VariableType.FLOAT_4,
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
                definitionData_vsSource:
                    'varying vec3 v_normal;varying vec3 v_position;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform mat4 u_normalMatrix;void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_normal = vec3(u_normalMatrix * a_normal);    v_position = vec3(u_mMatrix * a_position);}',
                definitionData_fsSource:
                    'precision highp float;varying vec3 v_normal;varying vec3 v_position;float computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);    float fresnelPower = 5.0;    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);    return ratio / 100.0;}uniform samplerCube u_samplerCube0;uniform vec3 u_cameraPos;uniform float u_refractionRatio;uniform float u_reflectivity;void main(void){    vec3 inDir = normalize(v_position - u_cameraPos);    vec3 normal = normalize(v_normal);    vec3 reflectDir = reflect(inDir, normal);    vec3 refractDir = refract(inDir, normal, u_refractionRatio);    vec4 reflectColor = textureCube(u_samplerCube0, reflectDir);    vec4 refractColor = textureCube(u_samplerCube0, refractDir);	if(u_reflectivity != -1.0){        gl_FragColor = mix(reflectColor, refractColor, u_reflectivity);	}	else{        gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));	}}',
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

                    material.setEnvMap(cubemap);

                    material.refractionRatio = 0.1;
                    material.reflectivity = null;



                    dy.Director.getInstance().stage.camera = {
                        transform:{
                            position: dy.Vector3.create(1, 2, 3)
                        }
                    }
                },
                moreTest: function (updateFunc, quadCmd, program, material) {
                    material.reflectivity = 0.5;

                    updateFunc();

                    expect(program.sendUniformData.getCall(6).args).toEqual(
                        ["u_reflectivity", dy.VariableType.FLOAT_1, 0.5]
                    );
                },
                moreTestExplain: "if set material's reflectivity, send it to glsl"
            }
        );
    });
});
