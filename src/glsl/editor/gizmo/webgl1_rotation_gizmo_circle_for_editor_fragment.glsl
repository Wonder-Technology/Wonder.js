@varDeclare
varying vec3 v_position;
@end

@funcDeclare
bool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem);
@end

@funcDefine
bool isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(vec3 vertexPos, vec3 cameraPosInLocalCoordSystem){
return dot(
normalize(-vertexPos),
cameraPosInLocalCoordSystem - vertexPos
) >= 0.0;
}
@end

@body
if(isAngleBetweenVertexToCenterAndVertexToCameraLessThan90(v_position, u_cameraPosInLocalCoordSystem)){
    discard;
}

gl_FragColor = vec4(u_color, 1.0);
@end