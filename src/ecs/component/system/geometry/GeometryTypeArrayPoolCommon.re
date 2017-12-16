open GeometryType;

let addTypeArrayToPool =
    (
      geometry: geometry,
      verticesMap,
      indicesMap,
      float32ArrayPoolMap,
      uint16ArrayPoolMap,
      state: StateDataType.state
    ) => {
  TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
    GeometryOperateCommon.getVerticesCount(geometry, state),
    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    float32ArrayPoolMap
  )
  |> ignore;
  TypeArrayPoolCommonUtils.addUint16TypeArrayToPool(
    GeometryOperateCommon.getIndicesCount(geometry, state),
    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    uint16ArrayPoolMap
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool =
    (verticesMap, indicesMap, float32ArrayPoolMap, uint16ArrayPoolMap, state: StateDataType.state) => {
  verticesMap
  |> SparseMapSystem.forEachiValid(
       [@bs]
       (
         (typeArray, geometry) =>
           TypeArrayPoolCommonUtils.addFloat32TypeArrayToPool(
             GeometryOperateCommon.getVerticesCount(geometry, state),
             typeArray,
             float32ArrayPoolMap
           )
           |> ignore
       )
     );
  indicesMap
  |> SparseMapSystem.forEachiValid(
       [@bs]
       (
         (typeArray, geometry) =>
           TypeArrayPoolCommonUtils.addUint16TypeArrayToPool(
             GeometryOperateCommon.getIndicesCount(geometry, state),
             typeArray,
             uint16ArrayPoolMap
           )
           |> ignore
       )
     );
  (float32ArrayPoolMap, uint16ArrayPoolMap)
};