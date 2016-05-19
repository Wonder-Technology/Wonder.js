@funcDeclare
float handleDepthMap(vec4 rgbaDepth);
@end

@funcDefine
float handleDepthMap(vec4 rgbaDepth) {
    return rgbaDepth.r;
}
@end

