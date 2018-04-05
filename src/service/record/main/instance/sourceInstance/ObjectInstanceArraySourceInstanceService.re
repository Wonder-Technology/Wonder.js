open SourceInstanceType;

let unsafeGetObjectInstanceArray = (sourceInstance, objectInstanceArrayMap) =>
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
  |> WonderLog.Contract.ensureCheck(
       (objectInstanceArray) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|objectInstanceArray of sourceInstance:$sourceInstance exist|j},
                   ~actual={j|not|j}
                 ),
                 () => objectInstanceArray |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );

let getObjectInstanceArray = (sourceInstance, {objectInstanceArrayMap}) =>
  unsafeGetObjectInstanceArray(sourceInstance, objectInstanceArrayMap);