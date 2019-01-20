type transformRecord = {
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localToWorldMatrixCacheMap: WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t),
  normalMatrixCacheMap: WonderCommonlib.MutableSparseMapService.t(Js.Typed_array.Float32Array.t)
};