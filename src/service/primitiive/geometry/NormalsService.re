open Js.Typed_array;

open PointsService;

let getNormals = (index: int, normalsMap) => PointsService.getPoints(index, normalsMap);

let unsafeGetNormals = (index: int, normalsMap) =>
  PointsService.unsafeGetPoints(index, normalsMap);

let getNormalsCount = (index: int, normalsMap) =>
  unsafeGetNormals(index, normalsMap) |> Float32Array.length;

let setNormals = (index: int, record: Float32Array.t, normalsMap) =>
  normalsMap |> setPoints(index, record);