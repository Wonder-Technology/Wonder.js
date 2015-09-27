describe("mirror shader", function () {
    rendererTool.shaderTest(
        {
            MaterialClassName: "MirrorMaterial",
            shaderName: "mirror",
            definitionData_attributes: {
        },
            definitionData_uniforms: {
                u_mirrorSampler: {
                    type: dy.VariableType.SAMPLER_2D,
                    value: dy.VariableCategory.ENGINE
                },
                u_mirrorColor: {
                    type: dy.VariableType.FLOAT_3,
                    value: dy.VariableCategory.ENGINE
                }
            },
            definitionData_vsSource:
                'precision highp float;precision highp int;attribute vec3 a_position;uniform mat4 u_mMatrix;uniform mat4 u_vMatrix;uniform mat4 u_pMatrix;varying vec4 v_mirrorCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }void main(void){//vec4 worldPosition = u_mMatrix * vec4( a_position, 1.0 );gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);mat4 textureMatrix = mat4(                        0.5, 0.0, 0.0, 0.0,                        0.0, 0.5, 0.0, 0.0,                        0.0, 0.0, 0.5, 0.0,                        0.5, 0.5, 0.5, 1.0);			v_mirrorCoord = textureMatrix * gl_Position;}',
            definitionData_fsSource:
                'precision highp float;precision highp int;uniform vec3 u_mirrorColor;uniform sampler2D u_mirrorSampler;varying vec4 v_mirrorCoord;mat2 transpose(mat2 m) {  return mat2(  m[0][0], m[1][0],   // new col 0                m[0][1], m[1][1]    // new col 1             );  }mat3 transpose(mat3 m) {  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0                m[0][1], m[1][1], m[2][1],  // new col 1                m[0][2], m[1][2], m[2][2]   // new col 1             );  }//todo which way to mix mirror color and textureColor?		float blendOverlay(float base, float blend) {			return( base < 0.5 ? ( 2.0 * base * blend ) : (1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );		}void main(void){			vec4 color = texture2DProj(u_mirrorSampler, v_mirrorCoord);			color = vec4(blendOverlay(u_mirrorColor.r, color.r), blendOverlay(u_mirrorColor.g, color.g), blendOverlay(u_mirrorColor.b, color.b), 1.0);			gl_FragColor = color;			//gl_FragColor = vec4(v_mirrorCoord.x/v_mirrorCoord.w, v_mirrorCoord.y/v_mirrorCoord.w, 1.0, 1.0);}',
            judge_sendLibVariable_attributes: function(program, quadCmd, material){
                },
            judge_sendLibVariable_uniforms: function(program, quadCmd, material){
                expect(program.sendUniformData).toCalledWith(
                    "u_mirrorColor", dy.VariableType.FLOAT_3, material.color.toVector3()
                );
                },
            judge_sendLibVariable_texture: function(program, quadCmd, material){
                expect(program.sendUniformData).toCalledWith(
                    "u_mirrorSampler", dy.VariableType.SAMPLER_2D, 0
);
            },
            setMaterial: function(material) {
                var texture = dy.MirrorTexture.create();
                texture.width = 256;
                texture.height = 256;
                texture.renderList = [];


                material.color = dy.Color.create("#ffffff");
                material.reflectionMap = texture;
            }
        }
    );
});

