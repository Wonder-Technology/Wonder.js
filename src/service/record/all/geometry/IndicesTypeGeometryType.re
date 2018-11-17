open GeometryType;

let getIndicesType = (index, indicesTypeMap) =>
  indicesTypeMap |> WonderCommonlib.SparseMapService.get(index);

let unsafeGetIndicesType = (index, indicesTypeMap) =>
  getIndicesType(index, indicesTypeMap) |> OptionService.unsafeGet;

let setIndicesType = (index, indicesType, indicesTypeMap) =>
  indicesTypeMap |> WonderCommonlib.SparseMapService.set(index, indicesType);