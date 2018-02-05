open TransformType;

open TransformStateCommon;

let handleAddComponent =
  [@bs]
  (
    (transform: transform, gameObjectUid: int, state: StateDataType.state) => {
      let {gameObjectMap} as data = getTransformData(state);
      {
        ...state,
        transformData: {
          ...data,
          gameObjectMap:
            gameObjectMap |> ComponentSystem.addComponentToGameObjectMap(transform, gameObjectUid)
        }
      }
    }
  );