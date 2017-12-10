open SourceInstanceType;

open SourceInstanceStateCommon;

let handleAddComponent =
  [@bs]
  (
    (sourceInstance: sourceInstance, gameObjectUid: int, state: StateDataType.state) => {
      let data = getData(state);
      ComponentSystem.addComponentToGameObjectMap(
        sourceInstance,
        gameObjectUid,
        data.gameObjectMap
      )
      |> ignore;
      state
    }
  );