let unsafeGetObjectInstanceTransformArray = (sourceInstance, objectInstanceTransformArrayMap) =>
  objectInstanceTransformArrayMap
  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance)
  |> WonderLog.Contract.ensureCheck(
       (objectInstanceTransformArray) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|objectInstanceTransformArray of sourceInstance:$sourceInstance exist|j},
                   ~actual={j|not|j}
                 ),
                 () => objectInstanceTransformArray |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );