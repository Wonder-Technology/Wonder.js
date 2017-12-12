open Js.Typed_array;

let addFloat32TypeArrayToPool = (count, typeArray: Float32Array.t, poolMap) => {
  poolMap |> WonderCommonlib.SparseMapSystem.set(count, typeArray);
  poolMap
};

let getFloat32TypeArrayFromPool = (count, poolMap) =>
  poolMap |> WonderCommonlib.SparseMapSystem.get(count);

let addUint16TypeArrayToPool = (count, typeArray: Uint16Array.t, poolMap) => {
  poolMap |> WonderCommonlib.SparseMapSystem.set(count, typeArray);
  poolMap
};

let getUint16TypeArrayFromPool = (count, poolMap) =>
  poolMap |> WonderCommonlib.SparseMapSystem.get(count);