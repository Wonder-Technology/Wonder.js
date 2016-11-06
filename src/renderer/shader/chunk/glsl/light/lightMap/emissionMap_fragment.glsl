@varDeclare
	varying vec2 v_emissionMapTexCoord;
@end

@funcDefine
    vec3 getMaterialEmission() {
        return texture2D(u_emissionMapSampler, v_emissionMapTexCoord).rgb;
    }
@end
