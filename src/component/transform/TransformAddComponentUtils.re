open TransformType;

open TransformStateUtils;

let handleAddComponent = (transform: transform, gameObjectUid: string, state: StateDataType.state) => {
  let transformData = getTransformData(state);
  ComponentSystem.addComponentToGameObjectMap(
    transform,
    gameObjectUid,
    transformData.gameObjectMap
  )
  |> ignore;
  state
};
