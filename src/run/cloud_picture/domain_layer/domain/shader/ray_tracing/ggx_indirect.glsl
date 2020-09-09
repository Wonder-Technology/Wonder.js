void computeIndirectLight( in vec3 V,
                          in vec3 bsdfDir,

vec3 worldNormal,
                          in ShadingData shading,
                          out vec3 throughput,
                          out float t
                          ) {
  const vec3 N = worldNormal;
  const vec3 L = bsdfDir;
  const vec3 H = normalize(V + L);

  const float NdotH = abs(dot(N, H));
  const float NdotL = abs(dot(L, N));
  const float HdotL = abs(dot(H, L));
  const float NdotV = abs(dot(N, V));


  const float pdf = computeDiffuseAndSpecularPdf(NdotH, NdotL, HdotL, shading);

  if (pdf > 0.0) {
    throughput *= eval(NdotL, NdotV, NdotH, HdotL, shading) / pdf;
  } else {
    t = -1.0;
  }
}