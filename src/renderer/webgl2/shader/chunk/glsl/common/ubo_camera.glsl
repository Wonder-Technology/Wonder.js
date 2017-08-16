@varDeclare
layout(std140) uniform CameraUbo {
    mat4 vMatrix;
    mat4 pMatrix;
    vec4 cameraPos;
    vec4 normalMatrixCol1;
    vec4 normalMatrixCol2;
    vec4 normalMatrixCol3;
} cameraUbo;
@end
