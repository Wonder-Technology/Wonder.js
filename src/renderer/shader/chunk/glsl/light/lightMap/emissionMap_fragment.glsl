@varDeclare
	varying vec2 v_emissionMapTexCoord;
@end

@funcDefine
    vec3 getMaterialEmission() {
        return vec3(texture2D(u_emissionMapSampler, v_emissionMapTexCoord));
    }
@end
