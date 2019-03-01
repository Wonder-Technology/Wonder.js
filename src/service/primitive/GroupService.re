/* let getGroupCount = (component: int, groupCountMap) =>
     switch (groupCountMap |> WonderCommonlib.MutableSparseMapService.get(component)) {
     | None => 0
     | Some(count) => count
     };

   let isGroupComponent = (component: int, groupCountMap) =>
     getGroupCount(component, groupCountMap) > 0;

   let increaseGroupCount = (component: int, groupCountMap) =>
     groupCountMap
     |> WonderCommonlib.MutableSparseMapService.set(
          component,
          getGroupCount(component, groupCountMap) |> succ
        );

   let decreaseGroupCount = (component: int, groupCountMap) =>
     groupCountMap
     |> WonderCommonlib.MutableSparseMapService.set(
          component,
          getGroupCount(component, groupCountMap) |> pred
        ); */

let isGroup = (component, gameObjectsMap) =>
  /* switch (GameObjectsMapService.getGameObjects(component, gameObjectsMap)) {
     | Some(arr) when arr |> Js.Array.length > 1 => true
     | _ => false
     }; */
  switch (GameObjectsMapService.getGameObjects(component, gameObjectsMap)) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

/* let isGroupGeometry = (component, gameObjectsMap) =>
   /* WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                test(
                  Log.buildAssertMessage(
                    ~expect=
                      {j|gameObjectsMap->gameObjectArr.length >= gameObjects.length|j},
                    ~actual={j|not|j},
                  ),
                  () =>
                  switch (
                    GameObjectsMapService.getGameObjects(
                      component,
                      gameObjectsMap,
                    )
                  ) {
                  | Some(arr) =>
                    Js.Array.length(arr) >= Js.Array.length(gameObjects)
                  | _ => assertPass()
                  }
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData),
      );

      switch (GameObjectsMapService.getGameObjects(component, gameObjectsMap)) {
      | Some(arr) when Js.Array.length(arr) === Js.Array.length(gameObjects) =>
        true
      | _ => false
      }; */
   switch (GameObjectsMapService.getGameObjects(component, gameObjectsMap)) {
   | Some(arr) when arr |> Js.Array.length > 0 => true
   | _ => false
   }; */

let removeGameObject = (gameObject, component, gameObjectsMap) =>
  GameObjectsMapService.removeGameObject(
    gameObject,
    component,
    gameObjectsMap,
  );

let batchRemoveGameObjects = (gameObjectArr, component, gameObjectsMap) =>
  GameObjectsMapService.batchRemoveGameObjects(
    gameObjectArr,
    component,
    gameObjectsMap,
  );