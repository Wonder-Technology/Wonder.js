@varDeclare
	in vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec3 getMaterialDiffuse() {
        return texture(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb;
    }
@end

