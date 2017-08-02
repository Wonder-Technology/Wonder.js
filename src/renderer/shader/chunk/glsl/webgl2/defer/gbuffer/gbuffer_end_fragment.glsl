@varDeclare
layout(location=0) out vec4 gbufferPosition;
layout(location=1) out vec3 gbufferNormal;
layout(location=2) out vec4 gbufferColor;
@end

@body
    gbufferPosition.xyz = v_worldPosition;
    gbufferPosition.w = u_shininess;
    gbufferNormal.xyz = getNormal();
    gbufferColor.rgb = getMaterialDiffuse().rgb;
    gbufferColor.a = getSpecularStrength();

//    gl_FragData[0].xyz = v_worldPosition;
//    gl_FragData[0].w = u_shininess;
//    gl_FragData[1].xyz = getNormal();
//    gl_FragData[2].xyz = getMaterialDiffuse().rgb;
//    gl_FragData[2].w = getSpecularStrength();
@end
