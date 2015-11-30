//describe("map shader", function () {
//    describe("basic map", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "MapMaterial",
//                shaderName: "basic map",
//                definitionData_attributes: {
//                    a_texCoord: {
//                        type: wd.VariableType.FLOAT_2,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_sampler2D0: {
//                        type: wd.VariableType.SAMPLER_2D,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_sourceRegion: {
//                        type: wd.VariableType.FLOAT_4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_repeatRegion: {
//                        type: wd.VariableType.FLOAT_4,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function(program, quadCmd, material){
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_texCoord");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("texCoordBuffer");
//                },
//                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
//                },
//                judge_sendLibVariable_texture: function(program, quadCmd, material){
//                    expect(program.sendUniformData.getCall(3).args[0]).toEqual("u_sampler2D0");
//                },
//                setMaterial: function(material){
//                    var asset = wd.ImageTextureAsset.create({});
//                    var map = wd.ImageTexture.create( asset );
//
//                    material.addMap(map);
//                }
//            }
//        );
//    });
//
//
//
//
//
//
//    describe("multi maps", function(){
//        rendererTool.shaderTest(
//            {
//                MaterialClassName: "MapMaterial",
//                shaderName: "multi maps",
//                definitionData_attributes: {
//                    a_texCoord: {
//                        type: wd.VariableType.FLOAT_2,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                definitionData_uniforms: {
//                    u_sampler2D0: {
//                        type: wd.VariableType.SAMPLER_2D,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_sampler2D1: {
//                        type: wd.VariableType.SAMPLER_2D,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_sourceRegion: {
//                        type: wd.VariableType.FLOAT_4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_repeatRegion: {
//                        type: wd.VariableType.FLOAT_4,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_combineMode: {
//                        type: wd.VariableType.NUMBER_1,
//                        value: wd.VariableCategory.ENGINE
//                    },
//                    u_mixRatio: {
//                        type: wd.VariableType.FLOAT_1,
//                        value: wd.VariableCategory.ENGINE
//                    }
//                },
//                judge_sendLibVariable_attributes: function(program, quadCmd, material){
//                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_texCoord");
//                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("texCoordBuffer");
//                },
//                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
//                    expect(program.sendUniformData.getCall(3).args).toEqual(
//                        ["u_combineMode", wd.VariableType.NUMBER_1, wd.TextureCombineMode.MULTIPLY]
//                    );
//                    expect(program.sendUniformData.getCall(4).args).toEqual(
//                        ["u_mixRatio", wd.VariableType.FLOAT_1, 0.9]
//                    );
//                },
//                judge_sendLibVariable_texture: function(program, quadCmd, material){
//                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_sampler2D0");
//                    expect(program.sendUniformData.getCall(6).args[0]).toEqual("u_sourceRegion");
//                    expect(program.sendUniformData.getCall(7).args[0]).toEqual("u_repeatRegion");
//
//
//                    expect(program.sendUniformData.getCall(8).args[0]).toEqual("u_sampler2D1");
//                    expect(program.sendUniformData.getCall(9).args[0]).toEqual("u_sourceRegion");
//                    expect(program.sendUniformData.getCall(10).args[0]).toEqual("u_repeatRegion");
//                },
//                setMaterial: function(material){
//                    var asset = wd.ImageTextureAsset.create({});
//                    var map1 = wd.ImageTexture.create( asset );
//                    var map2 = wd.ImageTexture.create( asset );
//
//                    material.addMap(map1);
//                    material.addMap(map2);
//
//
//                    material.combineMode = wd.TextureCombineMode.MULTIPLY;
//                    material.mixRatio = 0.9;
//                }
//            }
//        );
//    });
//});

