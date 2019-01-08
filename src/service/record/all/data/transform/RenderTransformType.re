type transformRecord = {
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localToWorldMatrixCacheMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t),
  normalMatrixCacheMap: WonderCommonlib.SparseMapService.t(Js.Typed_array.Float32Array.t)
};