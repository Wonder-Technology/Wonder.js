@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@body
    //todo optimize(combine, reduce compute numbers)
    //todo BasicTexture extract textureMatrix
    vec2 sourceTexCoord = a_texCoord * u_diffuseSourceRegion.zw + u_diffuseSourceRegion.xy;
    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseRepeatRegion.zw + u_diffuseRepeatRegion.xy;
@end
