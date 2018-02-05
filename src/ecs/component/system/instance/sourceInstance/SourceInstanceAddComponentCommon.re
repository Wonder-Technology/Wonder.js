open SourceInstanceType;

open SourceInstanceStateCommon;

let handleAddComponent =
  [@bs]
  (
    (sourceInstance: sourceInstance, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = getSourceInstanceData(state);
      {
        ...state,
        sourceInstanceData: {
          ...data,
          gameObjectMap:
            gameObjectMap
            |> ComponentSystem.addComponentToGameObjectMap(sourceInstance, gameObjectUid)
        }
      }
    }
  );