describe("skybox shader", function () {
    rendererTool.shaderTest(
        {
            MaterialClassName: "SkyboxMaterial",
            shaderName: "skybox",
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
            }
        },
            definitionData_vsSource:
                'precision highp float;precision highp int;attribute vec3 a_position;attribute vec3 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;varying vec3 v_dir;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * vec4(a_position, 1.0);    gl_Position = pos.xyww;    v_dir = a_position;}',
            definitionData_fsSource:
                'precision highp float;precision highp int;uniform samplerCube u_samplerCube0;varying vec3 v_dir;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_FragColor = textureCube(u_samplerCube0, v_dir);}',
            judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_normal");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("normalBuffer");
                },
            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                },
            judge_sendLibVariable_texture: function(program, quadCmd, material){
                expect(program.sendUniformData.getCall(3).args[0]).toEqual("u_samplerCube0");
            },
            setMaterial: function(material){
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

