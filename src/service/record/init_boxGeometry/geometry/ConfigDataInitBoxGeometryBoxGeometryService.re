open InitBoxGeometryBoxGeometryType;

let getConfigData = (geometry, record) =>
  record.configDataMap |> WonderCommonlib.SparseMapService.get(geometry);
