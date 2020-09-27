
vec2 gammaCorrection(vec2 colorInLinearSpace) {
  return pow(colorInLinearSpace, vec2(1.0 / 2.2));
}

vec3 gammaCorrection(vec3 colorInLinearSpace) {
  return pow(colorInLinearSpace, vec3(1.0 / 2.2));
}

vec3 invGammaCorrectionForSpecificColorDefinedInShader(
    vec3 specificColorDefinedInShader) {
  return pow(specificColorDefinedInShader, vec3(2.2));
}
