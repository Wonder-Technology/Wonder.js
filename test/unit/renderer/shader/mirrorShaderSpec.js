//describe("mirror shader", function () {
//    rendererTool.shaderTest(
//        {
//            MaterialClassName: "MirrorMaterial",
//            shaderName: "mirror",
//            definitionData_attributes: {
//        },
//            definitionData_uniforms: {
//                u_mirrorSampler: {
//                    type: dy.VariableType.SAMPLER_2D,
//                    value: dy.VariableCategory.ENGINE
//                },
//                u_mirrorColor: {
//                    type: dy.VariableType.FLOAT_3,
//                    value: dy.VariableCategory.ENGINE
//                }
//            },
//            judge_sendLibVariable_attributes: function(program, quadCmd, material){
//                },
//            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
//                expect(program.sendUniformData).toCalledWith(
//                    "u_mirrorColor", dy.VariableType.FLOAT_3, material.color.toVector3()
//                );
//                },
//            judge_sendLibVariable_texture: function(program, quadCmd, material){
//                expect(program.sendUniformData).toCalledWith(
//                    "u_mirrorSampler", dy.VariableType.SAMPLER_2D, 0
//);
//            },
//            setMaterial: function(material) {
//                var texture = dy.MirrorTexture.create();
//                texture.width = 256;
//                texture.height = 256;
//                texture.renderList = [];
//
//
//                material.color = dy.Color.create("#ffffff");
//                material.reflectionMap = texture;
//            }
//        }
//    );
//});

