@funcDeclare
float handleDepthMap(vec4 rgbaDepth);
@end

@funcDefine
float unpackDepth(vec4 rgbaDepth) {
    /*! make sure that the visibility from the shadow map which is not builded is always be 1.0 */
    if(rgbaDepth == vec4(0.0)){
        return 100000.0;
    }

    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
    return dot(rgbaDepth, bitShift);
}

float handleDepthMap(vec4 rgbaDepth) {
    return unpackDepth(rgbaDepth);
}
@end

