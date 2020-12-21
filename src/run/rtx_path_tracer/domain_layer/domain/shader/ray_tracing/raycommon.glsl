
struct HitPayload {
  vec3 radiance;
  float t;
  vec3 scatterDirection;
  vec3 throughput;
  uint seed;
  vec3 bias;
  bool isSpecularBounce;
  uint bounceIndex;
  bool isTerminate;
  float tMax;
  vec4 debugColor;
};

struct SampleBSDFWithMISHitPayload {
  uint lightType;
  uint lightIndex;
};