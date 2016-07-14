@funcDefine
float sdfSmoothStep(float value) {
      float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;

    return smoothstep(0.5 - afwidth, 0.5 + afwidth, value);
}
@end

