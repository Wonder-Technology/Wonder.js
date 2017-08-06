@varDeclare
//	varying vec2 v_diffuseMapTexCoord;
	out vec2 v_diffuseMapTexCoord;
@end

@body
    //todo optimize(combine, reduce compute numbers)
    //todo BasicTexture extract textureMatrix
//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;
//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;

    v_diffuseMapTexCoord = a_texCoord;
@end

