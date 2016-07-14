@funcDefine
float sdfSmoothStep(float value) {
    /*! gl_FragCoord.w is wrong, need fix! */
    float afwidth = (1.0 / 32.0) * (1.4142135623730951 / (2.0 * gl_FragCoord.w));

    return smoothstep(0.5 - afwidth, 0.5 + afwidth, value);
}
@end
