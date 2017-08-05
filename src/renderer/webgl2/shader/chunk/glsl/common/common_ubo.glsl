@varDeclare
layout(std140) uniform CameraData {
    mat4 u_vMatrix;
    mat4 u_pMatrix;
//    mat4 u_vpMatrix;
    vec3 u_cameraPos;
};


@end
