open Contract;

let unsafeGetObjectInstanceList = (sourceInstance, objectInstanceListMap) =>
  objectInstanceListMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             {j|objectInstanceList of sourceInstance:$sourceInstance should exist|j},
             () =>
               objectInstanceListMap
               |> WonderCommonlib.SparseMapSystem.get(sourceInstance)
               |> assertExist
           )
         )
     );

let getObjectInstanceList = (sourceInstance, state: StateDataType.state) =>
  unsafeGetObjectInstanceList(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).objectInstanceListMap
  );