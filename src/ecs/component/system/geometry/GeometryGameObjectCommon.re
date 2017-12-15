open GeometryType;

open GeometryGetStateDataCommon;

let getGameObject = (geometry: geometry, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(geometry, getGeometryData(state).gameObjectMap);