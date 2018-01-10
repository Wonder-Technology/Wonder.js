open Contract;

let unsafeGetObjectInstanceArray = (sourceInstance, objectInstanceArrayMap) =>
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (objectInstanceArray) =>
         Contract.Operators.(
           test(
             {j|objectInstanceArray of sourceInstance:$sourceInstance should exist|j},
             () => objectInstanceArray |> assertNullableExist
           )
         )
     );

let getObjectInstanceArray = (sourceInstance, state: StateDataType.state) =>
  unsafeGetObjectInstanceArray(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).objectInstanceArrayMap
  );