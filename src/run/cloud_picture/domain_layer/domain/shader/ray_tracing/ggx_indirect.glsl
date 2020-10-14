
void computeIndirectLight(inout uint seed, in float epsilon, in vec3 V,
                          in vec3 bsdfDir,

                          in vec3 worldNormal, in ShadingData shading,
                          inout vec3 throughput, inout float t) {
  const vec3 N = worldNormal;
  const vec3 L = bsdfDir;

  const float NdotL = abs(dot(L, N));

  float NdotHForBRDF;
  float VdotHForBRDF;
  float NDFForBRDF;
  float NdotHForFresnel;
  float VdotHForFresnel;
  float NDFForFresnel;
  vec3 f = eval(seed, L, N, V, epsilon, shading, NdotHForBRDF, VdotHForBRDF,
                NDFForBRDF, NdotHForFresnel, VdotHForFresnel, NDFForFresnel);

  const float pdf =
      computePdf(NdotL, NdotHForBRDF, VdotHForBRDF, NDFForBRDF, NdotHForFresnel,
                 VdotHForFresnel, NDFForFresnel, shading);

  if (pdf > 0.0) {
    throughput *= f / pdf;
  } else {
    t = -1.0;
  }
}