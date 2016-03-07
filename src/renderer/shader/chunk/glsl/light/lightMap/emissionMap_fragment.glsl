@varDeclare
	varying vec2 v_emissionMapTexCoord;
@end

@funcDefine
    vec4 getMaterialEmission() {
        return texture2D(u_emissionMapSampler, v_emissionMapTexCoord);
    }
@end
