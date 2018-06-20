@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec3 getMaterialDiffuse() {
        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord).rgb * u_diffuse;
    }
@end