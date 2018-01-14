let unsafeGetObjectInstanceArray = (sourceInstance, objectInstanceArrayMap) =>
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
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
       StateData.stateData.isTest
     );

let getObjectInstanceArray = (sourceInstance, state: StateDataType.state) =>
  unsafeGetObjectInstanceArray(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).objectInstanceArrayMap
  );