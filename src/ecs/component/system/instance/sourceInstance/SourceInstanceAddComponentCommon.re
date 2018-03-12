open SourceInstanceType;

open SourceInstanceStateCommon;

let handleAddComponent =
  [@bs]
  (
    (sourceInstance: sourceInstance, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as record = getSourceInstanceData(state);
      {
        ...state,
        sourceInstanceData: {
          ...record,
          gameObjectMap:
            gameObjectMap
            |> AddComponentService.addComponentToGameObjectMap(sourceInstance, gameObjectUid)
        }
      }
    }
  );