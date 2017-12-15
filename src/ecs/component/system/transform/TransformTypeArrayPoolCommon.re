open TransformType;

open Js.Typed_array;

let addTypeArrayToPool =
    (
      transform: transform,
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      localToWorldMatrixTypeArrayPool,
      localPositionTypeArrayPool
    ) => {
  TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
    transform,
    localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    localToWorldMatrixTypeArrayPool
  )
  |> ignore;
  TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
    transform,
    localPositionMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    localPositionTypeArrayPool
  )
  |> ignore
};

let addAllTypeArrayToPool =
    (
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      localToWorldMatrixTypeArrayPool,
      localPositionTypeArrayPool
    ) => {
  localToWorldMatrixMap
  |> SparseMapSystem.forEachiValid(
       [@bs]
       (
         (typeArray, transform) =>
           TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
             transform,
             typeArray,
             localToWorldMatrixTypeArrayPool
           )
           |> ignore
       )
     );
  localPositionMap
  |> SparseMapSystem.forEachiValid(
       [@bs]
       (
         (typeArray, transform) =>
           TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
             transform,
             typeArray,
             localPositionTypeArrayPool
           )
           |> ignore
       )
     );
  (localToWorldMatrixTypeArrayPool, localPositionTypeArrayPool)
};