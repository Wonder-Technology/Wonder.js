
void computeIndirectLight(inout uint seed, in float epsilon, in vec3 V,
                          in vec3 bsdfDir,

                          in vec3 worldNormal, in ShadingData shading,
                          in bool isBRDFDir, inout vec3 throughput,
                          inout float t) {
  const vec3 N = worldNormal;
  const vec3 L = bsdfDir;

  float NdotH;
  float VdotH;
  float NDF;

  vec3 f = isBRDFDir
               ? evalBRDF(seed, L, N, V, epsilon, shading, NdotH, VdotH, NDF)
               : evalBTDF(seed, L, N, V, epsilon, shading, NdotH, VdotH, NDF);

  const float NdotL = abs(dot(L, N));

  const float pdf = isBRDFDir
                        ? computeBRDFPdf(NdotL, NdotH, VdotH, NDF, shading)
                        : computeBTDFPdf(NdotL, NdotH, VdotH, NDF, shading);

  if (pdf > 0.0) {
    throughput *= f / pdf;
  } else {
    t = -1.0;
  }
}