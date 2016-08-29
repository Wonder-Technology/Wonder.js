@varDeclare
varying vec2 v_mixTexCoord;
varying vec2 v_diffuse1TexCoord;
varying vec2 v_diffuse2TexCoord;
varying vec2 v_diffuse3TexCoord;
@end

@body
v_mixTexCoord = a_texCoord;

v_diffuse1TexCoord = a_texCoord * u_diffuseMap1RepeatRegion.zw + u_diffuseMap1RepeatRegion.xy;


v_diffuse2TexCoord = a_texCoord * u_diffuseMap2RepeatRegion.zw + u_diffuseMap2RepeatRegion.xy;


v_diffuse3TexCoord = a_texCoord * u_diffuseMap3RepeatRegion.zw + u_diffuseMap3RepeatRegion.xy;
@end
