@varDeclare
	varying vec2 v_specularMapTexCoord;
@end

@funcDefine
    vec3 getMaterialSpecular() {
        return texture2D(u_specularMapSampler, v_specularMapTexCoord).rgb;
    }
@end
