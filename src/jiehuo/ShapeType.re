type floatVec3 = (float, float, float);

type aabbShape = {
  min: floatVec3,
  max: floatVec3,
};

type sphereShape = {
  radius: float,
  center: floatVec3,
};

type planeShape = {
  normal: floatVec3,
  constant: float,
};