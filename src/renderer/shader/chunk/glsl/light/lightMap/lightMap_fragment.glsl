@varDeclare
	varying vec2 v_lightMapTexCoord;
@end

@funcDefine
    vec3 getMaterialLight() {
        return texture2D(u_lightMapSampler, v_lightMapTexCoord).rgb * u_lightMapIntensity;
    }
@end
