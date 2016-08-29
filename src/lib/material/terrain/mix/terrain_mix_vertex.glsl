@varDeclare
varying vec2 v_mixMapTexCoord;
varying vec2 v_diffuseMap1TexCoord;
varying vec2 v_diffuseMap2TexCoord;
varying vec2 v_diffuseMap3TexCoord;
@end

@body
v_mixMapTexCoord = a_texCoord;

v_diffuseMap1TexCoord = a_texCoord * u_diffuseMap1RepeatRegion.zw + u_diffuseMap1RepeatRegion.xy;


v_diffuseMap2TexCoord = a_texCoord * u_diffuseMap2RepeatRegion.zw + u_diffuseMap2RepeatRegion.xy;


v_diffuseMap3TexCoord = a_texCoord * u_diffuseMap3RepeatRegion.zw + u_diffuseMap3RepeatRegion.xy;
@end
