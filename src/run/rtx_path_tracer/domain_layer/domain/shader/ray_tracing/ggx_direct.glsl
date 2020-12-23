

vec3 _evalLightSourceWithMIS(vec3 f, float NdotWi, uint lightType, vec3 li,
                             float lightPdf, float scatteringPdf) {
  if (isSpectrumBlack(f)) {
    return vec3(0.0);
  }

  if (isDeltaLight(lightType)) {
    return f * NdotWi * li / lightPdf;
  }

  return f * NdotWi * li * powerHeuristic(1, lightPdf, 1, scatteringPdf) /
         lightPdf;
}

vec3 _sampleLightSourceWithMIS(inout uint seed, float epsilon, float tMin,
                               vec3 worldPosition, vec3 worldNormal,
                               ShadingData shading, uint lightType,
                               uint lightIndex) {
  vec3 f = vec3(0.0);
  float scatteringPdf = 0.0;

  float NdotH;
  float VdotH;
  float NDF;

  vec3 wi;
  float lightPdf;
  float lightDistance;
  vec3 li = sampleLi(lightType, lightIndex, wi, lightPdf, lightDistance);

  if (lightPdf == 0.0 || isSpectrumBlack(li)) {
    return vec3(0.0);
  }

  // TODO support handleMedia(refer to pbrt->integrator.cpp->EstimateDirect)

  // const float NdotL = abs(dot(wi, worldNormal));
  const float NdotL = dot(wi, worldNormal);

  bool isShadowed = shadowRayVisibility(topLevelAS, 1, worldPosition, wi, tMin,
                                        lightDistance);

  if (isShadowed) {
    return vec3(0.0);
  }

  if (isBRDFDir(wi)) {
    if (isEvalBRDF(seed, shading)) {
      f = evalBRDF(seed, wi, worldNormal, wo, epsilon, shading, NdotH, VdotH,
                   NDF);
      scatteringPdf = computeBRDFPdf(NdotL, NdotH, VdotH, NDF, shading);

      return _evalLightSourceWithMIS(f, NdotL, lightType, li, lightPdf,
                                     scatteringPdf);
    }
  } else {
    if (!isEvalBRDF(seed, shading)) {
      f = evalBTDF(seed, wi, worldNormal, wo, epsilon, shading, NdotH, VdotH,
                   NDF);
      scatteringPdf = computeBTDFPdf(NdotL, NdotH, VdotH, NDF, shading);

      return _evalLightSourceWithMIS(f, NdotL, lightType, li, lightPdf,
                                     scatteringPdf);
    }
  }

  return vec3(0.0);
}

vec3 _sampleBSDFWithMIS(inout uint seed, float epsilon, float tMin, float tMax,
                        vec3 worldPosition, vec3 worldNormal, vec3 wo,
                        ShadingData shading, uint lightType, uint lightIndex) {
  if (isDeltaLight(lightType)) {
    return vec3(0.0);
  }

  bool isSampledSpecular = false;

  // TODO handle isSampledSpecular when sample BSDF

  bool isBRDFDir;
  vec3 wi = sample_(seed, wo, worldNormal, epsilon, shading, isBRDFDir);

  float NdotH;
  float VdotH;
  float NDF;
  vec3 f = isBRDFDir ? evalBRDF(seed, wi, worldNormal, wo, epsilon, shading,
                                NdotH, VdotH, NDF)
                     : evalBTDF(seed, wi, worldNormal, wo, epsilon, shading,
                                NdotH, VdotH, NDF);

  // const float NdotL = abs(dot(wi, worldNormal));
  const float NdotL = dot(wi, worldNormal);
  float NdotWi = NdotL;

  float scatteringPdf = isBRDFDir
                            ? computeBRDFPdf(NdotL, NdotH, VdotH, NDF, shading)
                            : computeBTDFPdf(NdotL, NdotH, VdotH, NDF, shading);

  if (scatteringPdf == 0.0 || isSpectrumBlack(f)) {
    return vec3(0.0);
  }

  float weight = 1.0;

  if (!isSampledSpecular) {
    float lightPdf =
        pdfLi(lightType, lightIndex, wi, worldPosition, worldNormal);

    if (lightPdf == 0.0) {
      return vec3(0.0);
    }

    weight = powerHeuristic(1, scatteringPdf, 1, lightPdf);
  }

  traceRayEXT(topLevelAS,         // acceleration structure
              gl_RayFlagsNoneEXT, // rayFlags
              0xFF,               // cullMask
              2,                  // sbtRecordOffset
              0,                  // sbtRecordStride
              2,                  // missIndex
              worldPosition,      // ray origin
              tMin,               // ray min range
              wi,                 // ray direction
              tMax,               // ray max range
              2                   // payload
  );

  vec3 li = vec3(0.0);

  if (isAreaLight(sampleBSDFWithMISHitPayload.lightType) &&
      isSameLight(lightType, sampleBSDFWithMISHitPayload.lightType, lightIndex,
                  sampleBSDFWithMISHitPayload.lightIndex)) {
    li = getAreaLightLe(lightType, lightIndex, -wi);
  } else {
    li = getLightLe(lightType, lightIndex, -wi);
  }

  if (isSpectrumBlack(li)) {
    return vec3(0.0);
  }

  return f * NdotWi * li * weight / scatteringPdf;
}

vec3 _estimateDirect(inout uint seed, float epsilon, float tMin, float tMax,
                     vec3 worldPosition, vec3 worldNormal, vec3 wo,
                     ShadingData shading, uint lightType, uint lightIndex) {
  return _sampleLightSourceWithMIS(seed, epsilon, tMin, worldPosition,
                                   worldNormal, shading, lightType,
                                   lightIndex) +
         _sampleBSDFWithMIS(seed, epsilon, tMin, tMax, worldPosition,
                            worldNormal, wo, shading, lightType, lightIndex);
}

vec3 computeDirectLight(inout uint seed, float epsilon, float tMin, float tMax,
                        vec3 worldPosition, vec3 worldNormal, vec3 wo,
                        ShadingData shading,

                        accelerationStructureEXT topLevelAS) {
  // uint lightIndexToSample = 0;

  // vec3 Lo = vec3(0.0);

  // vec3 lightDir;
  // float lightIntensity;
  // float lightDistance;

  // getLightData(lightIndexToSample, lightIntensity, lightDistance, lightDir);

  // // Tracing shadow ray only if the light is visible from the surface
  // if (isLightVisibleFromTheSurface(worldNormal, lightDir)) {
  //   float tMax = lightDistance;
  //   vec3 origin = worldPosition;
  //   vec3 rayDir = lightDir;

  //   bool isShadowed =
  //       shadowRayVisibility(topLevelAS, 1, origin, rayDir, tMin, tMax);

  //   if (isShadowed) {
  //     return Lo;
  //   }
  // }

  // const vec3 N = worldNormal;

  // const vec3 L = lightDir;

  // float NdotH;
  // float VdotH;
  // float NDF;
  // vec3 f = evalBRDF(seed, L, N, wo, epsilon, shading, NdotH, VdotH, NDF);

  // Lo += lightIntensity * f;

  // return max(vec3(0.0), Lo);

  // uniform sample one light
  float chooseLightPdf;
  uint lightType;
  uint lightIndex;
  randomChooseOneLight(seed, lightType, lightIndex, chooseLightPdf);

  return _estimateDirect(seed, epsilon, tMin, tMax, worldPosition, worldNormal,
                         wo, shading, lightType, lightIndex) /
         chooseLightPdf;
}