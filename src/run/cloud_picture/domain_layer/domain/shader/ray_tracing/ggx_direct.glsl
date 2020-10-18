
vec3 computeDirectLight(inout uint seed, float epsilon, float tMin,
                        vec3 worldPosition, vec3 worldNormal, vec3 V,
                        ShadingData shading,

                        accelerationStructureEXT topLevelAS) {
  uint lightIndexToSample = 0;

  vec3 Lo = vec3(0.0);

  vec3 lightDir;
  float lightIntensity;
  float lightDistance;

  getLightData(lightIndexToSample, lightIntensity, lightDistance, lightDir);

  // Tracing shadow ray only if the light is visible from the surface
  if (isLightVisibleFromTheSurface(worldNormal, lightDir)) {
    float tMax = lightDistance;
    vec3 origin = worldPosition;
    vec3 rayDir = lightDir;

    bool isShadowed =
        shadowRayVisibility(topLevelAS, 1, origin, rayDir, tMin, tMax);

    if (isShadowed) {
      return Lo;
    }
  }

  const vec3 N = worldNormal;

  const vec3 L = lightDir;

  float NdotH;
  float VdotH;
  float NDF;
  vec3 f = evalBRDF(seed, L, N, V, epsilon, shading, NdotH, VdotH, NDF);

  /*! not consider light pdf! because its pdf === 1.0

    // float lightPdf = 1 / float(lightCount);
    // float lightPdf = 1.0;
  */

  Lo += lightIntensity * f;

  return max(vec3(0.0), Lo);
}