@varDeclare
    varying vec3 v_worldPosition;
@end

@body
    v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));
    gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);
@end
