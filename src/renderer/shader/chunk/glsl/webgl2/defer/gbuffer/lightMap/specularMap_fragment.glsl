@varDeclare
//	varying vec2 v_specularMapTexCoord;
	in vec2 v_specularMapTexCoord;
@end

@funcDefine
    float getSpecularStrength() {
//        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;
        return texture(u_specularMapSampler, v_specularMapTexCoord).r;
    }
@end
