open Js.Typed_array;

open PointsService;

let getVertices = (index: int, verticesMap) => PointsService.getPoints(index, verticesMap);

let unsafeGetVertices = (index: int, verticesMap) =>
  PointsService.unsafeGetPoints(index, verticesMap);

let getVerticesCount = (index: int, verticesMap) =>
  unsafeGetVertices(index, verticesMap) |> Float32Array.length;

let setVertices = (index: int, record: Float32Array.t, verticesMap) =>
  verticesMap |> setPoints(index, record);