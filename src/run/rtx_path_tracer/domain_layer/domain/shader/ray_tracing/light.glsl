

// layout(std140, set = 2, binding = 7) uniform Light {
//   uint directionLightCount;
//   uint pointLightCount;
//   uint rectLightCount;
// }
// uLight;

// void getLightData(in uint lightIndex, out float lightIntensity,
//                   out float lightDistance, out vec3 lightDir) {
//   DirectionLight data = lights.l[lightIndex];

//   lightIntensity = data.intensity;
//   lightDistance = 100000.0;

//   // lightDir = normalize(vec3(data.position) - vec3(0.0));
//   lightDir = normalize(vec3(data.direction));
// }

// bool isLightVisibleFromTheSurface(vec3 worldNormal, vec3 lightDir) {
//   return dot(worldNormal, lightDir) > 0;
// }

// TODO choose based on light's power
void randomChooseOneLight(inout uint seed, out uint lightType,
                          out uint lightIndex, out float chooseLightPdf) {
  // uint directionLightCount = uLight.directionLightCount;
  // uint pointLightCount = uLight.pointLightCount;
  // uint rectLightCount = uLight.rectLightCount;

  uint directionLightCount = getDirectionLights().length();
  uint pointLightCount = getPointLights().length();
  uint rectLightCount = getRectLights().length();

  uint totalLightCount = directionLightCount + pointLightCount + rectLightCount;

  chooseLightPdf = 1 / totalLightCount;

  uint i = floor(rnd(seed) * totalLightCount);

  if (i < directionLightCount) {
    lightType = DIRECTION;
    lightIndex = i;
  } else if (i < directionLightCount + pointLightCount) {
    lightType = POINT;
    lightIndex = i - directionLightCount;
  } else {
    lightType = RECT;
    lightIndex = i - directionLightCount - pointLightCount;
  }
}


vec3 sampleLi(in uint lightType, in uint lightIndex, in float tMax, out vec3 wi,
              out float lightPdf, out float lightDistance) {
  switch (lightType) {
  case DIRECTION:
    return sampleDirectionLightLi(lightIndex, tMax, wi, lightPdf,
                                  lightDistance);
  case POINT:
  TODO finish it!!!
    return samplePointLightLi(lightIndex, wi, tMax, lightPdf, lightDistance);
  case RECT:
    return sampleAreaLightLi(lightIndex, wi, lightPdf, lightDistance);
  case INFINITE_AREA:
    return sampleInfiniteAreaLightLi(lightIndex, tMax, wi, lightPdf,
                                     lightDistance);
  default:
    path.debugColor = ERROR_COLOR_0;
    return vec3(0.0);
  }
}

vec3 getLightLe(uint lightType, uint lightIndex) {
  // TODO finish

  return vec3(0.0);
}

bool isEmittedInstance(vec3 materialEmission, uint lightType) {
  switch (lightType) {
  case NONE:
    return materialEmission != vec3(0.0);
  default:
    return true;
  }
}
