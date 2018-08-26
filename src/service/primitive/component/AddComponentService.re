open ComponentType;

let addComponentToGameObjectMap =
    (component, gameObjectUid: int, gameObjectMap) =>
  WonderCommonlib.SparseMapService.set(
    component,
    gameObjectUid,
    gameObjectMap,
  );

let addSharableComponentToGameObjectsMap =
    (component, gameObjectUid: int, gameObjectsMap) =>
  (
    switch (gameObjectsMap |> WonderCommonlib.SparseMapService.get(component)) {
    | None =>
      gameObjectsMap
      |> WonderCommonlib.SparseMapService.set(component, [|gameObjectUid|])
    | Some(gameObjectArr) =>
      gameObjectArr |> ArrayService.push(gameObjectUid) |> ignore;
      gameObjectsMap;
    }
  )
  |> WonderLog.Contract.ensureCheck(
       gameObjectsMap =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect=
                     {j|sharable component only add to the same gameObject once|j},
                   ~actual={j|not|j},
                 ),
                 () => {
                   let (map, hasDuplicateItems) =
                     gameObjectsMap
                     |> WonderCommonlib.SparseMapService.unsafeGet(component)
                     |> WonderCommonlib.ArrayService.reduceOneParam(
                          (. (map, hasDuplicateItems), gameObject) =>
                            switch (
                              map
                              |> WonderCommonlib.SparseMapService.get(
                                   gameObject,
                                 )
                            ) {
                            | None => (
                                map
                                |> WonderCommonlib.SparseMapService.set(
                                     gameObject,
                                     true,
                                   ),
                                hasDuplicateItems,
                              )
                            | Some(_) => (map, true)
                            },
                          (
                            WonderCommonlib.SparseMapService.createEmpty(),
                            false,
                          ),
                        );

                   hasDuplicateItems |> assertFalse;
                 },
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );