open TransformType;

open TransformStateUtils;

let handleAddComponent =
  [@bs]
  (
    (transform: transform, gameObjectUid: string, state: StateDataType.state) => {
      let transformData = getTransformData(state);
      ComponentSystem.addComponentToGameObjectMap(
        transform,
        gameObjectUid,
        transformData.gameObjectMap
      )
      |> ignore;
      state
    }
  );