open GeometryType;

open GeometryStateCommon;

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  JsObjUtils.(getGeometryData(state).configDataMap |> WonderCommonlib.SparseMapSystem.get(geometry));