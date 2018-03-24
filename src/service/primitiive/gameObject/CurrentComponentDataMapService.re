let addToMap = (uid, componentData, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.set(uid, componentData, currentComponentDataMap);

let removeFromMap = (uid, currentComponentDataMap) =>
  currentComponentDataMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(uid)
  |> Obj.magic;

let unsafeGetComponentData = (uid, currentComponentDataMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(uid, currentComponentDataMap)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|has component|j}, ~actual={j|not|j}),
                 () => r |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );