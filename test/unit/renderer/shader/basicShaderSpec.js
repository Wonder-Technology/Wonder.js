//describe("basic shader", function () {
//    rendererTool.shaderTest(
//        {
//            MaterialClassName: "BasicMaterial",
//            shaderName: "basic",
//            definitionData_attributes:
//            {
//                a_color: {
//                    type: dy.VariableType.FLOAT_3,
//                    value: dy.VariableCategory.ENGINE
//                }
//            },
//            definitionData_uniforms: {
//            },
//            judge_sendLibVariable_attributes: function(program, quadCmd, material){
//                expect(program.sendAttributeData.secondCall.args[0]).toEqual("a_color");
//                expect(quadCmd.buffers.getChild.secondCall).toCalledWith("colorBuffer");
//            },
//            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
//            }
//        }
//    );
//});

