let getObjectInstanceTransformIndex = (sourceInstance, objectInstanceTransformIndexMap) =>
  objectInstanceTransformIndexMap |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance);

let setDefaultObjectInstanceTransformIndex = (sourceInstance, objectInstanceTransformIndexMap) =>
  objectInstanceTransformIndexMap |> WonderCommonlib.SparseMapService.set(sourceInstance, 0);

let getObjectInstanceTransformCount = (objectInstanceTransformIndex) => objectInstanceTransformIndex;

let _getStartIndexAndEndIndex =
    (
      sourceInstance,
      objectInstanceCountPerSourceInstance,
      objectInstanceTransformIndex,
      objectInstanceTransformCollections
    ) => {
  let startIndex =
    BufferSourceInstanceService.getObjectInstanceTransformCollectionsIndex(
      sourceInstance,
      objectInstanceCountPerSourceInstance
    );
  (startIndex, startIndex + (objectInstanceTransformIndex |> pred))
  |> WonderLog.Contract.ensureCheck(
       ((startIndex, endIndex)) => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(
             ~expect={j|endIndex should <= objectInstanceTransformCollections->length|j},
             ~actual={j|not|j}
           ),
           () =>
             endIndex <= (objectInstanceTransformCollections |> Js.Typed_array.Uint32Array.length)
         );
         test(
           Log.buildAssertMessage(
             ~expect={j|endIndex + 1 should >= startIndex|j},
             ~actual={j|not|j}
           ),
           () => endIndex + 1 >= startIndex
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let reduceObjectInstanceTransformCollection =
    (
      (
        sourceInstance,
        objectInstanceCountPerSourceInstance,
        objectInstanceTransformIndex,
        objectInstanceTransformCollections
      ),
      initialValue,
      reduceFunc
    ) => {
  let result = ref(initialValue);
  let (startIndex, endIndex) =
    _getStartIndexAndEndIndex(
      sourceInstance,
      objectInstanceCountPerSourceInstance,
      objectInstanceTransformIndex,
      objectInstanceTransformCollections
    );
  for (i in startIndex to endIndex) {
    result :=
      [@bs] reduceFunc(result^, TypeArrayService.getUint32_1(i, objectInstanceTransformCollections))
  };
  result^
};

let getObjectInstanceTransformArray =
    (
      sourceInstance,
      objectInstanceCountPerSourceInstance,
      objectInstanceTransformIndexMap,
      objectInstanceTransformCollections
    ) => {
  let objectInstanceTransformIndex =
    getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndexMap);
  reduceObjectInstanceTransformCollection(
    (
      sourceInstance,
      objectInstanceCountPerSourceInstance,
      objectInstanceTransformIndex,
      objectInstanceTransformCollections
    ),
    [||],
    [@bs]
    (
      (objectInstanceTransformArray, objectInstanceTransform) =>
        objectInstanceTransformArray |> ArrayService.push(objectInstanceTransform)
    )
  )
};

let addObjectInstanceTransform =
    (
      sourceInstance,
      objectInstanceTransform,
      objectInstanceCountPerSourceInstance,
      (objectInstanceTransformIndexMap, objectInstanceTransformCollections)
    ) => {
  let objectInstanceTransformIndex =
    getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndexMap);

  (
    objectInstanceTransformIndexMap
    |> WonderCommonlib.SparseMapService.set(sourceInstance, objectInstanceTransformIndex |> succ),
    TypeArrayService.setUint32_1(
      BufferSourceInstanceService.getObjectInstanceTransformIndex(
        sourceInstance,
        objectInstanceTransformIndex,
        objectInstanceCountPerSourceInstance
      ),
      objectInstanceTransform,
      objectInstanceTransformCollections
    )
  )
  |> WonderLog.Contract.ensureCheck(
       ((objectInstanceTransformIndexMap, objectInstanceTransformCollections)) => {
         open WonderLog;
         open Contract;
         open Operators;
         let objectInstanceTransformIndex =
           getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndexMap);
         test(
           Log.buildAssertMessage(
             ~expect={j|objectInstanceTransformIndex should <= objectInstanceCountPerSourceInstance:$objectInstanceCountPerSourceInstance|j},
             ~actual={j|is $objectInstanceTransformIndex|j}
           ),
           () => objectInstanceTransformIndex <= objectInstanceCountPerSourceInstance
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let resetObjectInstanceTransformIndexMap = (sourceInstance, objectInstanceTransformIndexMap) =>
  WonderCommonlib.SparseMapService.set(sourceInstance, 0, objectInstanceTransformIndexMap);

let batchRemoveObjectInstanceTransform =
    (
      sourceInstance,
      objectInstanceTransformArray,
      objectInstanceCountPerSourceInstance,
      (objectInstanceTransformIndexMap, objectInstanceTransformCollections)
    ) => {
  let objectInstanceTransformIndex =
    objectInstanceTransformIndexMap |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance);
  (
    switch objectInstanceTransformIndex {
    | 0 => (objectInstanceTransformIndexMap, objectInstanceTransformCollections)
    | _ => (
        objectInstanceTransformIndexMap
        |> WonderCommonlib.SparseMapService.set(
             sourceInstance,
             objectInstanceTransformIndex - Js.Array.length(objectInstanceTransformArray)
           ),
        objectInstanceTransformArray
        |> Js.Array.reducei(
             (objectInstanceTransformCollections, objectInstanceTransform, i) =>
               objectInstanceTransformCollections
               |> DisposeTypeArrayService.deleteSingleValueBySwapUint32TypeArr(
                    objectInstanceTransformCollections
                    |> Js.Typed_array.Uint32Array.indexOf(objectInstanceTransform),
                    BufferSourceInstanceService.getObjectInstanceTransformIndex(
                      sourceInstance,
                      objectInstanceTransformIndex - i,
                      objectInstanceCountPerSourceInstance
                    )
                  ),
             objectInstanceTransformCollections
           )
      )
    }
  )
  |> WonderLog.Contract.ensureCheck(
       ((objectInstanceTransformIndexMap, objectInstanceTransformCollections)) => {
         open WonderLog;
         open Contract;
         open Operators;
         let objectInstanceTransformIndex =
           objectInstanceTransformIndexMap
           |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance);
         test(
           Log.buildAssertMessage(
             ~expect={j|objectInstanceTransformIndex should >= 0|j},
             ~actual={j|is $objectInstanceTransformIndex|j}
           ),
           () => objectInstanceTransformIndex >= 0
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};