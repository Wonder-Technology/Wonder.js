open BoxGeometrySystem;

open GeometryType;

open BoxGeometryType;

let createBoxGeometry = create;

let setBoxGeometryConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) =>
  setConfigData(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometry),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    configData,
    state
  );