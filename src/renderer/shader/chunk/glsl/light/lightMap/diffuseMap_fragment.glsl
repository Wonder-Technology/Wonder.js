@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec4 getMaterialDiffuse() {
        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);
    }
@end

