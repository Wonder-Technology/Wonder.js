type renderObjectRecord = {
  renderIndexArray: array(int),
  transformIndices: Js.Typed_array.Uint32Array.t,
  materialIndices: Js.Typed_array.Uint32Array.t,
  meshRendererIndices: Js.Typed_array.Uint32Array.t,
  geometryIndices: Js.Typed_array.Uint32Array.t,
  sourceInstanceIndices: Js.Typed_array.Uint32Array.t,
};

type renderRecord = {
  mutable basicRenderObjectRecord: option(renderObjectRecord),
  mutable lightRenderObjectRecord: option(renderObjectRecord),
  mutable cameraRecord: option(AllRenderCameraType.renderCameraRecord),
};