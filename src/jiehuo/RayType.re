type cull =
  | Back
  | Front
  | None
  | Both;

type floatVec3 = (float, float, float);

type ray = {
  origin: floatVec3,
  direction: floatVec3,
};

type perspectiveCameraData = {
  cameraToWorldMatrix: Js.Typed_array.Float32Array.t,
  projectionMatrix: Js.Typed_array.Float32Array.t,
};