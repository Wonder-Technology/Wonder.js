open TransformType;

open Js.Typed_array;

let addTypeArrayToPool =
    (
      transform: transform,
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      state: StateDataType.state
    ) => {
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    localPositionMap |> WonderCommonlib.SparseMapSystem.unsafeGet(transform),
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool =
    (
      localToWorldMatrixMap: array(Float32Array.t),
      localPositionMap: array(Float32Array.t),
      float32ArrayPoolMap
    ) =>
  float32ArrayPoolMap
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(localToWorldMatrixMap)
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(localPositionMap);