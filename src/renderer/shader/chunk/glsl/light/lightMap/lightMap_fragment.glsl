@varDeclare
	varying vec2 v_lightMapTexCoord;
@end

@funcDefine
    vec3 getMaterialLight() {
        return vec3(texture2D(u_lightMapSampler, v_lightMapTexCoord)) * u_lightMapIntensity;
    }
@end
