layout(std140, set = 1, binding = 0) uniform Camera {
  mat4 viewInverse;
  mat4 projectionInverse;
  float near;
  float far;
  float pad_0;
  float pad_1;
}
uCamera;