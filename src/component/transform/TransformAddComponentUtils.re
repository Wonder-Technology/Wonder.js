open TransformType;

open TransformStateUtils;

let handleAddComponent = (transform: transform, gameObjectUId: string, state: StateDataType.state) => {
  let transformData = getTransformData(state);
  ComponentSystem.addComponentToGameObjectMap(
    transform,
    gameObjectUId,
    transformData.gameObjectMap
  )
  |> ignore;
  state
};
