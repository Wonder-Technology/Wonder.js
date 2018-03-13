
open Js.Typed_array;

type renderCameraData = {
  vMatrix: Float32Array.t,
  pMatrix: Float32Array.t,
  position: (float, float, float)
};

type renderRecord = {
  renderArray: option(array(int)),
  cameraData: option(renderCameraData)
};