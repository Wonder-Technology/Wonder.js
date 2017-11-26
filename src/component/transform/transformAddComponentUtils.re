open TransformType;

open TransformStateUtils;

let handleAddComponent =
  [@bs]
  (
    (transform: transform, gameObjectUid: int, state: StateDataType.state) => {
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