open StateDataMainType;

open WDType;

let build = ({scene}, ({gameObjectRecord} as state, gameObjectArr)) => {
  let gameObjects = scene.gameObjects;

  switch (gameObjects |> Js.Array.length) {
  | 1 => (state, Array.unsafe_get(gameObjectArr, gameObjects[0]))
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
    (
      {
        ...state,
        transformRecord: Some({...transformRecord, parentMap, childMap}),
      },
      gameObject,
    );
  };
};