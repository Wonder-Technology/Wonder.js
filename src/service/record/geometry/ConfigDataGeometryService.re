open BoxGeometryType;


let getConfigData = (geometry, record) =>
  record.configDataMap |> WonderCommonlib.SparseMapSystem.get(geometry);

let unsafeGetConfigData = (geometry, record) =>
  getConfigData(geometry, record) |> OptionService.unsafeGet