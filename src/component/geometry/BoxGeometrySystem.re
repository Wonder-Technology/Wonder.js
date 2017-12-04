open GeometryType;

open BoxGeometryType;

let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) =>
  BoxGeometryConfigDataSystem.setConfigData(geometry, configData, state);

let create = BoxGeometryCreateSystem.create;