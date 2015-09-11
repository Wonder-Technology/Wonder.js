describe("skybox shader", function () {
    rendererTool.shaderTest(
        {
            MaterialClassName: "SkyboxMaterial",
            shaderName: "skybox",
            definitionData_attributes: {
            a_normal: {
                type: dy.render.VariableType.FLOAT_4,
                value: dy.render.VariableCategory.ENGINE
            }
        },
            definitionData_uniforms: {
            u_samplerCube0: {
                type: dy.render.VariableType.SAMPLER_CUBE,
                    value: dy.render.VariableCategory.ENGINE
            }
        },
            definitionData_vsSource: 'varying vec3 v_dir;attribute vec4 a_position;attribute vec4 a_normal;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;void main(void){    vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * a_position;    gl_Position = pos.xyww;    v_dir = vec3(a_position);}',
            definitionData_fsSource:
                'precision highp float;varying vec3 v_dir;uniform samplerCube u_samplerCube0;void main(void){    gl_FragColor = textureCube(u_samplerCube0, v_dir);}',
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

                    material.setEnvMap(cubemap);
                }
        }
    );
});

