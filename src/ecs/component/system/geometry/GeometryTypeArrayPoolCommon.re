open GeometryType;

let addTypeArrayToPool = (geometry: geometry, verticesMap, indicesMap, state: StateDataType.state) => {
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  TypeArrayPoolSystem.addUint16TypeArrayToPool(
    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    TypeArrayPoolSystem.getUint16ArrayPoolMap(state)
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool = (verticesMap, indicesMap, float32ArrayPoolMap, uint16ArrayPoolMap) => (
  TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(verticesMap, float32ArrayPoolMap),
  TypeArrayPoolSystem.addAllUint16TypeArrayToPool(indicesMap, uint16ArrayPoolMap)
);