open GeometryType;

open BoxGeometryType;

let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) =>
  BoxGeometryConfigDataCommon.setConfigData(geometry, configData, state);

let create = BoxGeometryCreateCommon.create;