@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@body
    vec2 sourceTexCoord = a_texCoord * u_sourceRegion.zw + u_sourceRegion.xy;
    v_diffuseMapTexCoord = sourceTexCoord * u_repeatRegion.zw + u_repeatRegion.xy;
    //v_diffuseMapTexCoord = a_texCoord;
@end
