@body
//todo refactor

if(mMatrix[3][0] == 50.0){
mMatrix = mat4(a_mVec4_0, a_mVec4_1, a_mVec4_2, a_mVec4_3);
//if(mMatrix[3][0] == 0.0 && mMatrix[3][1] == 0.0  && mMatrix[3][2] == 0.0){
//mMatrix = mat4(
//                        1.0, 0.0, 0.0, 10.0,
//                        0.0, 1.0, 0.0, 10.0,
//                        0.0, 0.0, 1.0, 10.0,
//                        0.0, 0.0, 0.0, 1.0
//);
//}
//if(mMatrix[3][0] != 0.0){
//mMatrix = mat4(
//                        1.0, 0.0, 0.0, 10.0,
//                        0.0, 1.0, 0.0, 10.0,
//                        0.0, 0.0, 1.0, 10.0,
//                        0.0, 0.0, 0.0, 1.0
//);
}
//mMatrix[0][3] = 50.0;
//mMatrix = mat4(
//                        1.0, 0.0, 0.0, 0.0,
//                        0.0, 1.0, 0.0, 0.0,
//                        0.0, 0.0, 1.0, 0.0,
//                        10.0, 0.0, 0.0, 1.0
//);
//mMatrix[3][0] = 10.0;
gl_Position = u_vpMatrixFromLight * mMatrix * vec4(a_position, 1.0);
@end
