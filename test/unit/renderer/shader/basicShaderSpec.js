describe("basic shader", function () {
    rendererTool.shaderTest(
        {
            MaterialClassName: "BasicMaterial",
            shaderName: "basic",
            definitionData_attributes:
            {
                a_color: {
                    type: dy.VariableType.FLOAT_3,
                    value: dy.VariableCategory.ENGINE
                }
            },
            definitionData_uniforms: {
            },
            definitionData_vsSource:
                'precision highp float;precision highp int;attribute vec3 a_position;attribute vec3 a_color;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;varying vec4 v_color;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);v_color = vec4(a_color, 1.0);}',
            definitionData_fsSource:
                'precision highp float;precision highp int;varying vec4 v_color;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){gl_FragColor = v_color;}',
            judge_sendLibVariable_attributes: function(program, quadCmd, material){
                expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_color");
                expect(quadCmd.buffers.getChild.secondCall).toCalledWith("colorBuffer");
            },
            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
            }
        }
    );
});

