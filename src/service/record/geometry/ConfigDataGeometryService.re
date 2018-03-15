open BoxGeometryType;


let getConfigData = (geometry, record) =>
  record.configDataMap |> WonderCommonlib.SparseMapService.get(geometry);

let unsafeGetConfigData = (geometry, record) =>
  getConfigData(geometry, record) |> OptionService.unsafeGet