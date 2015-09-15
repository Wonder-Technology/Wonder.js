describe("basic shader", function () {
    rendererTool.shaderTest(
        {
            MaterialClassName: "BasicMaterial",
            shaderName: "basic",
            definitionData_attributes:
            {
                a_color: {
                    type: dy.VariableType.FLOAT_4,
                    value: dy.VariableCategory.ENGINE
                }
            },
            definitionData_uniforms: {
            },
            definitionData_vsSource:
                'precision highp float;precision highp int;attribute vec4 a_position;attribute vec4 a_color;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;varying vec4 v_color;void main(void){gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;    v_color = a_color;}',
            definitionData_fsSource:
                'precision highp float;precision highp int;varying vec4 v_color;void main(void){    gl_FragColor = v_color;}',
            judge_sendLibVariable_attributes: function(program, quadCmd, material){
                expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_color");
                expect(quadCmd.buffers.getChild.secondCall).toCalledWith("colorBuffer");
            },
            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
            }
        }
    );
});

