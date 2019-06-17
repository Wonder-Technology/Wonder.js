open MaterialType;

type materialRecord = {
  index: int,
  disposedIndexArray,
  shaderIndices: Js.Typed_array.Uint32Array.t,
};