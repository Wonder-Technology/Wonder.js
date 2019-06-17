open MaterialType;

type basicMaterialRecord = {
  shaderIndices: option(Js.Typed_array.Uint32Array.t),
  colors: option(Js.Typed_array.Float32Array.t),
  isDepthTests: option(Js.Typed_array.Uint8Array.t),
  alphas: option(Js.Typed_array.Float32Array.t),
  index: int,
  disposedIndexArray,
  isSourceInstanceMap: WonderCommonlib.MutableSparseMapService.t(bool),
};