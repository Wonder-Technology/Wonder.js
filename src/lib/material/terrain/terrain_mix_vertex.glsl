@varDeclare
varying vec2 v_mixTexCoord;
varying vec2 v_diffuse1TexCoord;
varying vec2 v_diffuse2TexCoord;
varying vec2 v_diffuse3TexCoord;
@end

@body
v_mixTexCoord = a_texCoord;

v_diffuse1TexCoord = a_texCoord * u_diffuse1RepeatRegion.zw + u_diffuse1RepeatRegion.xy;


v_diffuse2TexCoord = a_texCoord * u_diffuse2RepeatRegion.zw + u_diffuse2RepeatRegion.xy;


v_diffuse3TexCoord = a_texCoord * u_diffuse3RepeatRegion.zw + u_diffuse3RepeatRegion.xy;
@end
