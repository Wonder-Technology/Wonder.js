open GeometryType;

open GeometryStateUtils;

let handleAddComponent =
  [@bs]
  (
    (geometry: geometry, gameObjectUid: string, state: StateDataType.state) => {
      let geometryData = getGeometryData(state);
      ComponentSystem.addComponentToGameObjectMap(
        geometry,
        gameObjectUid,
        geometryData.gameObjectMap
      )
      |> ignore;
      state
    }
  );