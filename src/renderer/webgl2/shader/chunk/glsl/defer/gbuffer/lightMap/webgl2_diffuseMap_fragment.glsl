@varDeclare
	in vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec4 getMaterialDiffuse() {
        return texture(u_diffuseMapSampler, v_diffuseMapTexCoord);
    }
@end

