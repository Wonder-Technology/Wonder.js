open BoxGeometryType;

open Js.Typed_array;

let addTypeArrayToPool =
    (geometry, maxSize, (verticesMap, normalsMap, indicesMap), typeArrayPoolRecord) => {
  [@bs]
  TypeArrayPoolService.addFloat32TypeArrayToPool(
    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
  )
  |> ignore;
  [@bs]
  TypeArrayPoolService.addFloat32TypeArrayToPool(
    normalsMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
  )
  |> ignore;
  [@bs]
  TypeArrayPoolService.addUint16TypeArrayToPool(
    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry),
    maxSize,
    TypeArrayPoolService.getUint16ArrayPoolMap(typeArrayPoolRecord)
  )
  |> ignore;
  typeArrayPoolRecord
};

let addAllTypeArrayToPool =
    (maxSize, (verticesMap, normalsMap, indicesMap), (float32ArrayPoolMap, uint16ArrayPoolMap)) => (
  float32ArrayPoolMap
  |> TypeArrayPoolService.addAllFloat32TypeArrayToPool(verticesMap, maxSize)
  |> TypeArrayPoolService.addAllFloat32TypeArrayToPool(normalsMap, maxSize),
  TypeArrayPoolService.addAllUint16TypeArrayToPool(indicesMap, maxSize, uint16ArrayPoolMap)
);