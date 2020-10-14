
float _pow5(float v) { return v * v * v * v * v; }

/*!
while BTDF is not reciprocal(refer to
https://github.com/aceyan/Unity3D_PBR_Path_Tracer), we only consider eta, not
invert the direction of our vectors for simplicity!

refer to https://autodesk.github.io/standard-surface/#reciprocity
*/

float computeSpecularLobeProb(vec3 baseColor, float specular, float metallic) {
  const vec3 cd_lin = baseColor;
  const float cd_lum = dot(cd_lin, vec3(0.3, 0.6, 0.1));
  const vec3 c_spec0 = mix(specular * vec3(0.3), cd_lin, metallic);
  const float cs_lum = dot(c_spec0, vec3(0.3, 0.6, 0.1));

  return cs_lum / (cs_lum + (1.0 - metallic) * cd_lum);
}

// bool decideIsConsiderBRDF(inout uint seed, float transmission) {
//   return rnd(seed) < 1.0 - transmission;
// }

float _computeFresnel(vec3 rayDirection, vec3 N, float outsideIOR, float ior) {
  float kr;
  float cosi = clamp(-1, 1, dot(rayDirection, N));
  float etai = outsideIOR;
  float etat = ior;

  if (cosi > 0) {
    // swap(etai, etat);
    float temp = etai;
    etai = etat;
    etat = temp;
  }

  // Compute sini using Snell's law
  float sint = etai / etat * sqrt(max(0.f, 1 - cosi * cosi));
  // Total internal reflection
  if (sint >= 1) {
    kr = 1;
  } else {
    float cost = sqrt(max(0.f, 1 - sint * sint));
    cosi = abs(cosi);
    float Rs =
        ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
    float Rp =
        ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
    kr = (Rs * Rs + Rp * Rp) / 2;
  }
  return kr;
  // As a consequence of the conservation of energy, transmittance is given by:
  // kt = 1 - kr;
}

float computeBSDFSpecularLobeProb(vec3 rayDirection, vec3 N, float outsideIOR,
                                  float ior) {
  return _computeFresnel(rayDirection, N, outsideIOR, ior);
}

// bool decideIsConsiderBSDFAndSpecular(inout uint seed,
//                                      in float bsdfSpecularLobeProb) {
//   return rnd(seed) < bsdfSpecularLobeProb;
// }

bool isFromOutside(vec3 rayDirection, vec3 N) {
  return dot(rayDirection, N) < 0;
}

vec3 _fresnelSchlick(float VdotH, vec3 f0, float f90) {
  return f0 + (vec3(f90) - f0) * _pow5(1.0 - VdotH);
}

float _distributionGGX(float NdotH, float roughness) {
  float a = roughness * roughness;
  float a2 = a * a;
  float NdotH2 = NdotH * NdotH;

  float nom = a2;
  float denom = (NdotH2 * (a2 - 1.0) + 1.0);
  denom = PI * denom * denom;

  return nom / denom;
}

float _geometrySchlickGGX(float NdotV, float roughness) {
  float r = (roughness + 1.0);
  float k = (r * r) / 8.0;

  float nom = NdotV;
  float denom = NdotV * (1.0 - k) + k;

  return nom / denom;
}

float _geometrySmith(float NdotV, float NdotL, float roughness) {
  float ggx2 = _geometrySchlickGGX(NdotV, roughness);
  float ggx1 = _geometrySchlickGGX(NdotL, roughness);

  return ggx1 * ggx2;
}

vec3 _evalDiffuseBRDF(float NdotL, float NdotV, vec3 baseColor, float metallic,
                      vec3 f0, vec3 F) {
  if (NdotL <= 0.0 || NdotV <= 0.0)
    return vec3(0.0);

  vec3 black = vec3(0.0);
  vec3 cdiff = mix(baseColor * (1.0 - max(f0.r, f0.g, f0.b)), black, metallic);

  return (1.0 - max(F.r, F.g, F.b)) * cdiff / PI;
}

vec3 _evalSpecularBRDF(float NdotL, float NdotV, float D, float G, vec3 F,
                       float epsilon) {
  if (NdotL <= 0.0 || NdotV <= 0.0)
    return vec3(0.0);

  // Microfacet specular = D * G * F / (4 * NdotL * NdotV)
  vec3 nominator = D * G * F;
  float denominator = 4.0 * NdotV * NdotL + epsilon;

  return nominator / denominator;
}

vec3 _affectByLight(float NdotL, vec3 radiance) {
  /*!
  c.rgb = s.Albedo * _LightColor0.rgb * (NdotL * atten);
  NdotL multiplied with atten(here not has atten!) is where the light is
  applied. If either of these are zero, the whole expression becomes zero and
  the colour of the pixel turns black. So if the surface is no longer at an
  angle where it receives light, or if the light source is too far away, is when
  that will happen. (refer to
  https://www.undefinedgames.org/2019/05/10/shaders-and-lighting-models/)
  */

  return radiance * NdotL;
}

vec3 _evalRefractionBTDF(float NdotV, float NdotL, float NdotH, float VdotH,
                         float LdotH, float D, float G, vec3 F, float epsilon,
                         float etaIn, float etaOut) {
  float term1 = VdotH * LdotH / (NdotV * NdotL);
  vec3 term2 = etaOut * etaOut * (1 - F) * G * D;
  float term3 =
      (etaIn * VdotH + etaOut * LdotH) * (etaIn * VdotH + etaOut * LdotH) +
      epsilon;

  return term1 * term2 / term3;
}

void _evalForBRDF(in vec3 L, in vec3 N, in vec3 V, in vec3 f0, in float f90,
                  in ShadingData shading, out float NdotH, out float VdotH,
                  out vec3 F, out float NDF) {
  vec3 H = normalize(V + L);

  NdotH = abs(dot(N, H));
  VdotH = max(dot(H, V), 0.0);

  F = _fresnelSchlick(VdotH, f0, f90);

  NDF = _distributionGGX(NdotH, shading.roughness);
}

// return the roation matrix
mat3x3 _buildTBN(vec3 N, in float epsilon) {
  const vec3 U = abs(N.z) < (1.0 - epsilon) ? vec3(0, 0, 1) : vec3(1, 0, 0);
  const vec3 T = normalize(cross(U, N));
  const vec3 B = cross(N, T);

  return mat3x3(T, B, N);
}

vec3 _importanceSampleGGX(float u1, float u2, vec3 N, float roughness,
                          float epsilon) {
  float a = roughness * roughness;

  float phi = 2.0 * PI * u1;
  float cosTheta = sqrt((1.0 - u2) / (1.0 + (a * a - 1.0) * u2));
  float sinTheta = sqrt(1.0 - cosTheta * cosTheta);

  // from spherical coordinates to cartesian coordinates
  vec3 H;
  H.x = cos(phi) * sinTheta;
  H.y = sin(phi) * sinTheta;
  H.z = cosTheta;

  vec3 halfVec = H * _buildTBN(N, epsilon);
  halfVec = normalize(halfVec);

  return halfVec;
}

void _evalForFresnel(inout uint seed, in float epsilon, in vec3 L, in vec3 N,
                     in vec3 V, in vec3 f0, in float f90,
                     in ShadingData shading, out float NdotH, out float VdotH,
                     out float LdotH, out vec3 F, out float NDF,
                     out float etaIn, out float etaOut) {
  vec3 H =
      _importanceSampleGGX(rnd(seed), rnd(seed), N, shading.roughness, epsilon);

  NdotH = abs(dot(N, H));
  VdotH = max(dot(H, V), 0.0);
  LdotH = abs(dot(L, H));

  F = _fresnelSchlick(VdotH, f0, f90);

  NDF = _distributionGGX(NdotH, shading.roughness);

  etaIn = shading.isFromOutside ? shading.outsideIOR : shading.ior;
  etaOut = shading.isFromOutside ? shading.ior : shading.outsideIOR;
}

vec3 _eval(inout uint seed, in vec3 L, in vec3 N, in vec3 V, in float epsilon,
           in ShadingData shading, out float NdotHForBRDF,
           out float VdotHForBRDF, out float NDFForBRDF,
           out float NdotHForFresnel, out float VdotHForFresnel,
           out float NDFForFresnel) {
  const float NdotL = abs(dot(L, N));
  const float NdotV = abs(dot(N, V));

  float dielectricSpecular = pow((shading.ior - shading.outsideIOR) /
                                     (shading.ior + shading.outsideIOR),
                                 2) *
                             shading.specular;

  vec3 dielectricSpecularF0 = vec3(dielectricSpecular) * shading.specularColor;
  float dielectricSpecularF90 = shading.specular;

  vec3 f0 = mix(dielectricSpecularF0, shading.baseColor, shading.metallic);
  float f90 = mix(dielectricSpecularF90, 1.0, shading.metallic);

  float G = _geometrySmith(NdotV, NdotL, shading.roughness);

  vec3 FForBRDF;
  _evalForBRDF(L, N, V, f0, f90, shading, NdotHForBRDF, VdotHForBRDF, FForBRDF,
               NDFForBRDF);

  float LdotHDorFresnel;
  vec3 FForFresnel;
  float etaIn;
  float etaOut;
  _evalForFresnel(seed, epsilon, L, N, V, f0, f90, shading, NdotHForFresnel,
                  VdotHForFresnel, LdotHDorFresnel, FForFresnel, NDFForFresnel,
                  etaIn, etaOut);

  vec3 radiance =
      (1.0 - shading.transmission) *
          (_evalDiffuseBRDF(NdotL, NdotV, shading.baseColor, shading.metallic,
                            f0, FForBRDF) +
           _evalSpecularBRDF(NdotL, NdotV, NDFForBRDF, G, FForBRDF, epsilon)) +

      shading.transmission *
          (_evalRefractionBTDF(NdotV, NdotL, NdotHForFresnel, VdotHForFresnel,
                               LdotHDorFresnel, NDFForFresnel, G, FForFresnel,
                               epsilon, etaIn, etaOut) +
           _evalSpecularBRDF(NdotL, NdotV, NDFForFresnel, G, FForFresnel,
                             epsilon));

  return _affectByLight(NdotL, radiance);
}

vec3 eval(inout uint seed, in vec3 L, in vec3 N, in vec3 V, in float epsilon,
          in ShadingData shading) {
  float NdotHForBRDF;
  float VdotHForBRDF;
  float NDFForBRDF;

  float NdotHForFresnel;
  float VdotHForFresnel;
  float NDFForFresnel;

  return _eval(seed, L, N, V, epsilon, shading, NdotHForBRDF, VdotHForBRDF,
               NDFForBRDF, NdotHForFresnel, VdotHForFresnel, NDFForFresnel);
}

vec3 eval(inout uint seed, in vec3 L, in vec3 N, in vec3 V, in float epsilon,
           in ShadingData shading, out float NdotHForBRDF,
           out float VdotHForBRDF, out float NDFForBRDF,
           out float NdotHForFresnel, out float VdotHForFresnel,
           out float NDFForFresnel) {
  return _eval(seed, L, N, V, epsilon, shading, NdotHForBRDF, VdotHForBRDF,
               NDFForBRDF, NdotHForFresnel, VdotHForFresnel, NDFForFresnel);
}

vec3 _cosineSampleHemisphere(float u1, float u2) {
  vec3 dir;
  float r = sqrt(u1);
  float phi = TWO_PI * u2;
  dir.x = r * cos(phi);
  dir.y = r * sin(phi);
  dir.z = sqrt(max(0.0, 1.0 - dir.x * dir.x - dir.y * dir.y));
  return dir;
}

vec3 _sampleSpecularBRDF(float r1, float r2, vec3 N, vec3 V, float roughness,
                         float epsilon) {
  vec3 halfVec = _importanceSampleGGX(r1, r2, N, roughness, epsilon);

  // TODO coment this line???
  halfVec = dot(halfVec, V) <= 0.0 ? halfVec * -1.0 : halfVec;

  return reflect(getRayDirectionFromV(V), halfVec);
}

vec3 _sampleRefractionBTDF(float r1, float r2, vec3 N, vec3 V,
                           bool isFromOutside, float roughness, float ior,
                           float outsideIOR, float epsilon) {
  vec3 halfVec = _importanceSampleGGX(r1, r2, N, roughness, epsilon);

  float eta = isFromOutside ? outsideIOR / ior : ior / outsideIOR;

  return normalize(refract(getRayDirectionFromV(V), halfVec, eta));
}

vec3 sample_(inout uint seed, in vec3 V, in vec3 N, in float epsilon,
             in ShadingData shading) {
  if (rnd(seed) < 1.0 - shading.transmission) {
    // BRDF

    if (rnd(seed) < shading.specularLobeProb) {
      // specular

      //   r2 /= shading.specularLobeProb;

      return _sampleSpecularBRDF(rnd(seed), rnd(seed), N, V, shading.roughness,
                                 epsilon);
    }

    // diffuse

    // r2 -= shading.specularLobeProb;
    // r2 /= (1.0 - shading.specularLobeProb);

    return _cosineSampleHemisphere(rnd(seed), rnd(seed)) *
           _buildTBN(N, epsilon);
  } else {
    // BTDF

    if (rnd(seed) < shading.bsdfSpecularLobeProb) {
      // specular

      //   r2 /= shading.bsdfSpecularLobeProb;

      return _sampleSpecularBRDF(rnd(seed), rnd(seed), N, V, shading.roughness,
                                 epsilon);
    }

    // refraction

    // r2 -= shading.bsdfSpecularLobeProb;
    // r2 /= (1.0 - shading.bsdfSpecularLobeProb);

    return _sampleRefractionBTDF(rnd(seed), rnd(seed), N, V,
                                 shading.isFromOutside, shading.roughness,
                                 shading.ior, shading.outsideIOR, epsilon);
  }
}

float _cosinSamplePDF(float NdotL) { return NdotL / PI; }

float _importanceSampleGGXPDF(float NDF, float NdotH, float VdotH) {
  // ImportanceSampleGGX pdf
  // pdf = D * NoH / (4 * VoH)
  return NDF * NdotH / (4 * VdotH);
}

float computePdf(float NdotL, float NdotHForBRDF, float VdotHForBRDF,
                 float NDFForBRDF, float NdotHForFresnel, float VdotHForFresnel,
                 float NDFForFresnel, ShadingData shading) {
  return (1.0 - shading.transmission) *
             ((1.0 - shading.specularLobeProb) * _cosinSamplePDF(NdotL) +
              shading.specularLobeProb *
                  _importanceSampleGGXPDF(NDFForBRDF, NdotHForBRDF,
                                          VdotHForBRDF)) +
         shading.transmission *
             /*! ((1.0 - shading.bsdfSpecularLobeProb) *
                  _importanceSampleGGXPDF(NDFForFresnel,
                                          NdotHForFresnel,
                                          VdotHForFresnel) +
              shading.bsdfSpecularLobeProb *
                  _importanceSampleGGXPDF(NDFForFresnel,
                                          NdotHForFresnel,
                                          VdotHForFresnel));
                                          */
             _importanceSampleGGXPDF(NDFForFresnel, NdotHForFresnel,
                                     VdotHForFresnel);
}