@funcDefine

mat4 getModelMatrix(){
    return u_mMatrix;
}
@end

@body
mat4 mMatrix = getModelMatrix();
@end