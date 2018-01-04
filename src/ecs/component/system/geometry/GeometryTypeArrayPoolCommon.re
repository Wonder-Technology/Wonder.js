open GeometryType;

let addTypeArrayToPool =
    (geometry: geometry, maxSize, verticesMap, indicesMap, state: StateDataType.state) => {
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  TypeArrayPoolSystem.addUint16TypeArrayToPool(
    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolSystem.getUint16ArrayPoolMap(state)
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool =
    (maxSize, verticesMap, indicesMap, float32ArrayPoolMap, uint16ArrayPoolMap) => (
  TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(verticesMap, maxSize, float32ArrayPoolMap),
  TypeArrayPoolSystem.addAllUint16TypeArrayToPool(indicesMap, maxSize, uint16ArrayPoolMap)
);