@varDeclare
	in vec2 v_specularMapTexCoord;
@end

@funcDefine
    float getSpecularStrength() {
        return texture(u_specularMapSampler, v_specularMapTexCoord).r;
    }
@end
