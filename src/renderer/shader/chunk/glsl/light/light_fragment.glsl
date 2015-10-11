@varDeclare
varying vec3 v_worldPosition;
@end

@body
    vec3 norm = normalize(getNormal());
    vec3 viewDir = normalize(getViewDir());

    vec3 totalLight = vec3(0, 0, 0);

    calcTotalLight(totalLight, norm, viewDir);

    totalLight = getShadowVisibility() * totalLight;

    gl_FragColor = vec4(totalLight, 1.0);
@end
