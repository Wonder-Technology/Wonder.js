open GeometryType;

open GeometryStateUtils;

let handleAddComponent = (geometry: geometry, gameObjectUId: string, state: StateDataType.state) => {
  let geometryData = getGeometryData(state);
  ComponentSystem.addComponentToGameObjectMap(
    geometry,
    gameObjectUId,
    geometryData.gameObjectMap
  )
  |> ignore;
  state
};
