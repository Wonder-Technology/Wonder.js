@varDeclare
in vec2 v_texcoord;
@end


@body
        vec4 colorData = texture(u_colorBuffer, v_texcoord);

            vec3 diffuseColor = colorData.xyz;
@end
