open MaterialType;

type materialRecord = {
  index: int,
  disposedIndexArray,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  diffuseMapUnits: Js.Typed_array.Uint8Array.t,
  specularMapUnits: Js.Typed_array.Uint8Array.t
};