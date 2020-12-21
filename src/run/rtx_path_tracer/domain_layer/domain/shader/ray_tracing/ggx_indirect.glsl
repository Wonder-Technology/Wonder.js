
vec3 computeIndirectLight(inout uint seed, in float epsilon, in vec3 wo,
                          in vec3 wi,

                          in vec3 worldNormal, in ShadingData shading,
                          in bool isBRDFDir, inout vec3 throughput,
                          inout float t, out float NdotWi, out float pdf) {
  const vec3 N = worldNormal;
  const vec3 L = wi;

  float NdotH;
  float VdotH;
  float NDF;

  vec3 f = isBRDFDir
               ? evalBRDF(seed, L, N, wo, epsilon, shading, NdotH, VdotH, NDF)
               : evalBTDF(seed, L, N, wo, epsilon, shading, NdotH, VdotH, NDF);

  // const float NdotL = abs(dot(L, N));
  const float NdotL = dot(L, N);

  NdotWi = NdotL;

  pdf = isBRDFDir ? computeBRDFPdf(NdotL, NdotH, VdotH, NDF, shading)
                  : computeBTDFPdf(NdotL, NdotH, VdotH, NDF, shading);

  return f;
}