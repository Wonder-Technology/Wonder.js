let getGameObjects = (component, gameObjectsMap) =>
  WonderCommonlib.SparseMapService.get(component, gameObjectsMap);

let unsafeGetGameObjects = (component, gameObjectsMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(component, gameObjectsMap)
  |> WonderLog.Contract.ensureCheck(
       gameObjectsMap =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|component's gameObjectsMap exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 gameObjectsMap |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let removeGameObject = (gameObject, component, gameObjectsMap) =>
  ArrayMapService.removeValue(component, gameObject, gameObjectsMap);