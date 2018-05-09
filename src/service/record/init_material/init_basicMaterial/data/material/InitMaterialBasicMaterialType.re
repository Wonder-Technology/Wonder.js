open MaterialType;

type materialRecord = {
  index: int,
  disposedIndexArray,
  shaderIndices: Js.Typed_array.Uint32Array.t,
  mapUnits: Js.Typed_array.Uint8Array.t
};