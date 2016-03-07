@varDeclare
	varying vec2 v_lightMapTexCoord;
@end

@funcDefine
    vec4 getMaterialLight() {
        return texture2D(u_lightMapSampler, v_lightMapTexCoord) * u_lightMapIntensity;
    }
@end
