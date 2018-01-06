open GeometryType;

open GeometryGetStateDataCommon;

let getConfigData = (geometry: geometry, state: StateDataType.state) =>
  JsObjUtils.(
    getGeometryData(state).configDataMap |> WonderCommonlib.SparseMapSystem.get(geometry)
  );