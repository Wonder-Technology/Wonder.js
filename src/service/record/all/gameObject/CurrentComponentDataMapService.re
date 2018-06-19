let getBoxGeometryType = () => 0;

let getCustomGeometryType = () => 1;

let getComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.get(uid, currentComponentDataMap);

let unsafeGetComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, currentComponentDataMap)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|has component|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );