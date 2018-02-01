open GeometryType;

let addTypeArrayToPool =
    (
      geometry: geometry,
      maxSize,
      (verticesMap, normalsMap, indicesMap),
      state: StateDataType.state
    ) => {
  [@bs]
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  [@bs]
  TypeArrayPoolSystem.addFloat32TypeArrayToPool(
    normalsMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
  )
  |> ignore;
  [@bs]
  TypeArrayPoolSystem.addUint16TypeArrayToPool(
    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolSystem.getUint16ArrayPoolMap(state)
  )
  |> ignore;
  state
};

let addAllTypeArrayToPool =
    (maxSize, (verticesMap, normalsMap, indicesMap), (float32ArrayPoolMap, uint16ArrayPoolMap)) => (
  float32ArrayPoolMap
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(verticesMap, maxSize)
  |> TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(normalsMap, maxSize),
  TypeArrayPoolSystem.addAllUint16TypeArrayToPool(indicesMap, maxSize, uint16ArrayPoolMap)
);