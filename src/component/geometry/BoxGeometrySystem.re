open GeometryType;

open BoxGeometryType;

let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) =>
  BoxGeometryConfigDataUtils.setConfigData(geometry, configData, state);

let create = BoxGeometryCreateUtils.create;