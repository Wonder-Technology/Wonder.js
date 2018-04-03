open Js.Typed_array;

type renderCameraRecord = {
  vMatrix: Float32Array.t,
  pMatrix: Float32Array.t,
  position: (float, float, float)
};

type renderObjectRecord = {
  buffer: Js.Typed_array.array_buffer,
  count: int,
  transformIndices: Js.Typed_array.Uint32Array.t,
  materialIndices: Js.Typed_array.Uint32Array.t,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  geometryIndices: Js.Typed_array.Uint32Array.t,
  geometryTypes: Js.Typed_array.Uint8Array.t,
  sourceInstanceIndices: Js.Typed_array.Uint32Array.t
};

type renderRecord = {
  basicRenderObjectRecord: option(renderObjectRecord),
  lightRenderObjectRecord: option(renderObjectRecord),
  cameraRecord: option(renderCameraRecord)
};