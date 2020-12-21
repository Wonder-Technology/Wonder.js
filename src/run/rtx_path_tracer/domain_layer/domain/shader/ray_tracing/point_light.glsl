

struct PointLight {
  float instanceIndex;
  vec3 i;
};

layout(std140, set = 2, binding = 1) buffer PointLights { PointLight l[]; }
pointLights;

uint getPointLights() { return pointLights.l; }

vec3 samplePointLightLi(in uint lightIndex, in float tMax, out vec3 wi,
                        out float lightPdf, out float lightDistance) {
  PointLight light = getPointLights()[lightIndex];
  Instance instance = getInstance(uint(light.instanceIndex));


TODO get worldPosition from instance.modelMatrix
TODO finish:
    ProfilePhase _(Prof::LightSample);
    *wi = Normalize(pLight - ref.p);
    *pdf = 1.f;
    *vis =
        VisibilityTester(ref, Interaction(pLight, ref.time, mediumInterface));
    return I / DistanceSquared(pLight, ref.p);
}
