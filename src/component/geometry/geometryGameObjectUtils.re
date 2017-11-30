open GeometryType;

open GeometryStateUtils;

let getGameObject = (mappedGeometry: geometry, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(mappedGeometry, getGeometryData(state).gameObjectMap);