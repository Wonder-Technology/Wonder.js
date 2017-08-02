@varDeclare
	varying vec2 v_specularMapTexCoord;
@end

@funcDefine
    float getSpecularStrength() {
        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;
    }
@end
