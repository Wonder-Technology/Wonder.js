open TransformType;

open Js.Typed_array;

let addTypeArrayToPool =
    (
      transform: transform,
      maxSize,
      (localToWorldMatrixMap: array(Float32Array.t), localPositionMap: array(Float32Array.t)),
      typeArrayPoolRecord
    ) => {
  [@bs]
  TypeArrayPoolService.addFloat32TypeArrayToPool(
    localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    maxSize,
    TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
  )
  |> ignore;
  [@bs]
  TypeArrayPoolService.addFloat32TypeArrayToPool(
    localPositionMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    maxSize,
    TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
  )
  |> ignore;
  typeArrayPoolRecord
};

let addAllTypeArrayToPool =
    (
      maxSize,
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      float32ArrayPoolMap
    ) =>
  float32ArrayPoolMap
  |> TypeArrayPoolService.addAllFloat32TypeArrayToPool(localToWorldMatrixMap, maxSize)
  |> TypeArrayPoolService.addAllFloat32TypeArrayToPool(localPositionMap, maxSize);