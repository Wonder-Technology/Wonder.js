describe("map shader", function () {
    describe("basic map", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "MapMaterial",
                shaderName: "basic map",
                definitionData_attributes: {
                    a_texCoord: {
                        type: dy.VariableType.FLOAT_2,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_sampler2D0: {
                        type: dy.VariableType.SAMPLER_2D,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_sourceRegion: {
                        type: dy.VariableType.FLOAT_4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_repeatRegion: {
                        type: dy.VariableType.FLOAT_4,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_vsSource:
                    'precision highp float;precision highp int;attribute vec3 a_position;attribute vec2 a_texCoord;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform vec4 u_sourceRegion;uniform vec4 u_repeatRegion;varying vec2 v_texCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;}',
                definitionData_fsSource:
                    'precision highp float;precision highp int;uniform sampler2D u_sampler2D0;varying vec2 v_texCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_FragColor = texture2D(u_sampler2D0, v_texCoord);}',
                judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_texCoord");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("texCoordBuffer");
                },
                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                },
                judge_sendLibVariable_texture: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(3).args[0]).toEqual("u_sampler2D0");
                },
                setMaterial: function(material){
                    var asset = dy.TwoDTextureAsset.create({});
                    var map = dy.TwoDTexture.create( asset );

                    material.addMap(map);
                }
            }
        );
    });






    describe("multi maps", function(){
        rendererTool.shaderTest(
            {
                MaterialClassName: "MapMaterial",
                shaderName: "multi maps",
                definitionData_attributes: {
                    a_texCoord: {
                        type: dy.VariableType.FLOAT_2,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_uniforms: {
                    u_sampler2D0: {
                        type: dy.VariableType.SAMPLER_2D,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_sampler2D1: {
                        type: dy.VariableType.SAMPLER_2D,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_sourceRegion: {
                        type: dy.VariableType.FLOAT_4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_repeatRegion: {
                        type: dy.VariableType.FLOAT_4,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_combineMode: {
                        type: dy.VariableType.NUMBER_1,
                        value: dy.VariableCategory.ENGINE
                    },
                    u_mixRatio: {
                        type: dy.VariableType.FLOAT_1,
                        value: dy.VariableCategory.ENGINE
                    }
                },
                definitionData_vsSource:
                    'precision highp float;precision highp int;attribute vec3 a_position;attribute vec2 a_texCoord;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;uniform vec4 u_sourceRegion;uniform vec4 u_repeatRegion;varying vec2 v_texCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;    v_texCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;}',
                definitionData_fsSource:
                    'precision highp float;precision highp int;uniform sampler2D u_sampler2D0;uniform sampler2D u_sampler2D1;uniform int u_combineMode;uniform float u_mixRatio;varying vec2 v_texCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){vec4 color0 = texture2D(u_sampler2D0, v_texCoord);    vec4 color1 = texture2D(u_sampler2D1, v_texCoord);    if(u_combineMode == 0){        gl_FragColor = mix(color0, color1, u_mixRatio);    }    else if(u_combineMode == 1){        gl_FragColor = color0 * color1;    }    else if(u_combineMode == 2){        gl_FragColor = color0 + color1;    }}',
                judge_sendLibVariable_attributes: function(program, quadCmd, material){
                    expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_texCoord");
                    expect(quadCmd.buffers.getChild.secondCall).toCalledWith("texCoordBuffer");
                },
                judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(3).args).toEqual(
                        ["u_combineMode", dy.VariableType.NUMBER_1, dy.TextureCombineMode.MULTIPLY]
                    );
                    expect(program.sendUniformData.getCall(4).args).toEqual(
                        ["u_mixRatio", dy.VariableType.FLOAT_1, 0.9]
                    );
                },
                judge_sendLibVariable_texture: function(program, quadCmd, material){
                    expect(program.sendUniformData.getCall(5).args[0]).toEqual("u_sampler2D0");
                    expect(program.sendUniformData.getCall(6).args[0]).toEqual("u_sourceRegion");
                    expect(program.sendUniformData.getCall(7).args[0]).toEqual("u_repeatRegion");


                    expect(program.sendUniformData.getCall(8).args[0]).toEqual("u_sampler2D1");
                    expect(program.sendUniformData.getCall(9).args[0]).toEqual("u_sourceRegion");
                    expect(program.sendUniformData.getCall(10).args[0]).toEqual("u_repeatRegion");
                },
                setMaterial: function(material){
                    var asset = dy.TwoDTextureAsset.create({});
                    var map1 = dy.TwoDTexture.create( asset );
                    var map2 = dy.TwoDTexture.create( asset );

                    material.addMap(map1);
                    material.addMap(map2);


                    material.combineMode = dy.TextureCombineMode.MULTIPLY;
                    material.mixRatio = 0.9;
                }
            }
        );
    });
});

