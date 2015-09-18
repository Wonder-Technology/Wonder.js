@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec3 getMaterialDiffuse() {
        return vec3(texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord));
    }
@end
