open Js.Typed_array;

type renderCameraRecord = {
  vMatrix: Float32Array.t,
  pMatrix: Float32Array.t,
  position: (float, float, float)
};