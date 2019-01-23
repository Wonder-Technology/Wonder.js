type basicMaterialRecord = {
  shaderIndices: Js.Typed_array.Uint32Array.t,
  colors: Js.Typed_array.Float32Array.t,
  textureIndices: Js.Typed_array.Uint32Array.t,
  mapUnits: Js.Typed_array.Uint8Array.t,
  isDepthTests: Js.Typed_array.Uint8Array.t,
};