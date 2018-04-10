type transformRecord = {
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
  localPositions: Js.Typed_array.Float32Array.t,
  localToWorldMatrixCacheMap: array(Js.Typed_array.Float32Array.t),
  normalMatrixCacheMap: array(Js.Typed_array.Float32Array.t)
};