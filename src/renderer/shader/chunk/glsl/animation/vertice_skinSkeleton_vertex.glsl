@varDeclare
uniform mat4 u_jointMatrices[MAX_JOINT_COUNT];
@end


@funcDefine
    mat4 getJointMatrix(const in float i) {
        return u_jointMatrices[int(i)];
    }

    mat4 getVertexBlendedJointMatrix() {
        return getJointMatrix(a_jointIndice.x) * a_jointWeight.x + getJointMatrix(a_jointIndice.y) * a_jointWeight.y + getJointMatrix(a_jointIndice.z) * a_jointWeight.z + getJointMatrix(a_jointIndice.w) * a_jointWeight.w;
    }
@end


@body
    vec3 a_position = vec3(getVertexBlendedJointMatrix() * vec4(a_position, 1.0));
@end
