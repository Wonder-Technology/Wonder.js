open GeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

let handleAddComponent =
  [@bs]
  (
    (geometry: geometry, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = getGeometryData(state);
      {
        ...state,
        geometryData: {
          ...data,
          gameObjectMap:
            gameObjectMap |> ComponentSystem.addComponentToGameObjectMap(geometry, gameObjectUid)
        }
      }
    }
  );