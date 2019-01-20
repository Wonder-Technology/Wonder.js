let getGameObject = (component, gameObjectMap) =>
  WonderCommonlib.MutableSparseMapService.get(component, gameObjectMap);

let unsafeGetGameObject = (component, gameObjectMap) =>
  WonderCommonlib.MutableSparseMapService.unsafeGet(component, gameObjectMap)
  |> WonderLog.Contract.ensureCheck(
       gameObject =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|component's gameObject exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 gameObject |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );