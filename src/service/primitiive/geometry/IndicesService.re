open Js.Typed_array;

open PointsService;

let getIndices = (index: int, indicesMap) => PointsService.getPoints(index, indicesMap);

let unsafeGetIndices = (index: int, indicesMap) =>
  PointsService.unsafeGetPoints(index, indicesMap);

let getIndicesCount = (index: int, indicesMap) =>
  unsafeGetIndices(index, indicesMap) |> Uint16Array.length;

let setIndices = (index: int, record: Uint16Array.t, indicesMap) =>
  indicesMap |> setPoints(index, record);

let hasIndices = (index: int, indicesMap) => getIndicesCount(index, indicesMap) > 0;