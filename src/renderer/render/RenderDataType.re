open CacheType;
open Js.Typed_array;

type renderCameraData = {
  vMatrix: Float32Array.t,
  pMatrix: Float32Array.t
};

type renderData = {
  mutable renderArray: option(array(string)),
  mutable cameraData: option(renderCameraData)
};