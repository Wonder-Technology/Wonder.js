open StateDataMainType;

let getSceneGameObject = state =>
  RecordSceneMainService.getRecord(state).sceneGameObject;

let setSceneGameObject = (sceneGameObject, state) => {
  ...state,
  sceneRecord:
    Some({...RecordSceneMainService.getRecord(state), sceneGameObject}),
};

let addChild = (childGameObject, {gameObjectRecord} as state) => {
  ...state,
  transformRecord:
    Some(
      HierachyTransformService.setParent(.
        GetComponentGameObjectService.unsafeGetTransformComponent(
          getSceneGameObject(state),
          gameObjectRecord,
        )
        |. Some,
        GetComponentGameObjectService.unsafeGetTransformComponent(
          childGameObject,
          gameObjectRecord,
        ),
        RecordTransformMainService.getRecord(state),
      ),
    ),
};

let addChildren = (childGameObjectArr, {gameObjectRecord} as state) =>
  childGameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, childGameObject) => addChild(childGameObject, state),
       state,
     );