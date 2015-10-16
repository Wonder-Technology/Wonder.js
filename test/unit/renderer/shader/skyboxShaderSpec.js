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

