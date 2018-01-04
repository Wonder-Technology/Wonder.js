open TransformType;

open Js.Typed_array;

let addTypeArrayToPool =
    (
      transform: transform,
      maxSize,
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      state: StateDataType.state
    ) => {
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    maxSize,
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    localPositionMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    maxSize,
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool =
    (
      maxSize,
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      float32ArrayPoolMap
    ) =>
  float32ArrayPoolMap
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(localToWorldMatrixMap, maxSize)
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(localPositionMap, maxSize);