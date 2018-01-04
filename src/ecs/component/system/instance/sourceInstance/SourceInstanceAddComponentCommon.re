open SourceInstanceType;

open SourceInstanceStateCommon;

let handleAddComponent =
  [@bs]
  (
    (sourceInstance: sourceInstance, gameObjectUid: int, state: StateDataType.state) => {
      let data = getSourceInstanceData(state);
      ComponentSystem.addComponentToGameObjectMap(
        sourceInstance,
        gameObjectUid,
        data.gameObjectMap
      )
      |> ignore;
      state
    }
  );