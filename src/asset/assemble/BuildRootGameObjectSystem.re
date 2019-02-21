open StateDataMainType;

open WDType;

let build = ({scene} as wd, ({gameObjectRecord} as state, gameObjectArr)) => {
  let gameObjects = scene.gameObjects;

  switch (gameObjects |> Js.Array.length) {
  | 1 =>
    let rootGameObject = Array.unsafe_get(gameObjectArr, gameObjects[0]);

    let state =
      AssembleIsRootUtils.doesGameObjectHasIsRootData(0, wd.gameObjects) ?
        state :
        IsRootGameObjectMainService.setIsRoot(.
          rootGameObject,
          scene.isRoot,
          state,
        );

    (state, rootGameObject);
  | _ =>
    let (state, gameObject) = CreateGameObjectMainService.create(state);
    let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
      RecordTransformMainService.getRecord(state);
    let (parentMap, childMap) =
      AssembleCommon.addChildrenToParent(
        GetComponentGameObjectService.unsafeGetTransformComponent(
          gameObject,
          gameObjectRecord,
        ),
        scene.gameObjects
        |> Js.Array.map(gameObjectIndex =>
             GetComponentGameObjectService.unsafeGetTransformComponent(
               Array.unsafe_get(gameObjectArr, gameObjectIndex),
               gameObjectRecord,
             )
           ),
        (parentMap, childMap),
      );

    let state =
      IsRootGameObjectMainService.setIsRoot(.
        gameObject,
        scene.isRoot,
        state,
      );

    (
      {
        ...state,
        transformRecord: Some({...transformRecord, parentMap, childMap}),
      },
      gameObject,
    );
  };
};