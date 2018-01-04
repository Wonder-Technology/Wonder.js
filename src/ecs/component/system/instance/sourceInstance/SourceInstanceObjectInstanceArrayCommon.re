open Contract;

let unsafeGetObjectInstanceArray = (sourceInstance, objectInstanceArrayMap) =>
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             {j|objectInstanceArray of sourceInstance:$sourceInstance should exist|j},
             () =>
               objectInstanceArrayMap
               |> WonderCommonlib.SparseMapSystem.get(sourceInstance)
               |> assertExist
           )
         )
     );

let getObjectInstanceArray = (sourceInstance, state: StateDataType.state) =>
  unsafeGetObjectInstanceArray(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).objectInstanceArrayMap
  );