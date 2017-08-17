@varDeclare
layout(location=0) out vec4 gbufferPosition;
layout(location=1) out vec4 gbufferNormal;
layout(location=2) out vec4 gbufferColor;
@end

@body
    gbufferPosition.xyz = v_worldPosition;
    gbufferPosition.w = u_shininess;
    gbufferNormal.xyz = getNormal();
    gbufferNormal.w = 1.0;
    gbufferColor.xyz = getMaterialDiffuse();
    gbufferColor.w = getSpecularStrength();
@end
