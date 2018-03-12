let getGameObject = (component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.get(component, gameObjectMap);

let unsafeGetGameObject = (component, gameObjectMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(component, gameObjectMap)
  |> WonderLog.Contract.ensureCheck(
       (gameObject) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|component's gameObject exist|j},
                   ~actual={j|not|j}
                 ),
                 () => gameObject |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );