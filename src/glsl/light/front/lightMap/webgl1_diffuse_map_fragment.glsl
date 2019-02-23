@varDeclare
	varying vec2 v_diffuseMapTexCoord;
@end

@funcDefine
    vec4 getMaterialDiffuse() {
        vec4 texelColor = texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);

        return vec4(texelColor.rgb * u_diffuse, texelColor.a);
    }
@end