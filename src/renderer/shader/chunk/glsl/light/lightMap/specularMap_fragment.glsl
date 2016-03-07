@varDeclare
	varying vec2 v_specularMapTexCoord;
@end

@funcDefine
    vec4 getMaterialSpecular() {
        return texture2D(u_specularMapSampler, v_specularMapTexCoord);
    }
@end
