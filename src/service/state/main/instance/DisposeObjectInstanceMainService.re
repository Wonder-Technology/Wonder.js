open StateDataMainType;

open StateDataMainType;

open AllInstanceType;

open SourceInstanceType;

open ObjectInstanceType;

open DisposeComponentService;

let isAlive = (objectInstance, {disposedIndexArray} as objectInstanceRecord) =>
  DisposeComponentService.isAlive(objectInstance, disposedIndexArray);

let _unsafeGetSourceInstance =
    (objectInstance: objectInstance, {sourceInstanceMap}) =>
  sourceInstanceMap
  |> WonderCommonlib.MutableSparseMapService.unsafeGet(objectInstance)
  |> WonderLog.Contract.ensureCheck(
       sourceInstance =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|souceInstance exist|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 sourceInstance |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let _disposeData =
    (objectInstance: objectInstance, {objectInstanceRecord} as state) => {
  let {sourceInstanceMap, gameObjectMap} = objectInstanceRecord;
  {
    ...state,
    objectInstanceRecord: {
      ...objectInstanceRecord,
      sourceInstanceMap:
        sourceInstanceMap |> disposeSparseMapData(objectInstance),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(objectInstance),
    },
  };
};

let _batchDisposeObjectInstance =
    (sourceInstance, objectInstanceTransformArray, {settingRecord} as state) => {
  let {objectInstanceTransformCollections, objectInstanceTransformIndexMap} =
    RecordSourceInstanceMainService.getRecord(state);
  let objectInstanceCountPerSourceInstance =
    BufferSettingService.getObjectInstanceCountPerSourceInstance(
      settingRecord,
    );
  ObjectInstanceCollectionService.batchRemoveObjectInstanceTransform(
    sourceInstance,
    objectInstanceTransformArray,
    objectInstanceCountPerSourceInstance,
    (objectInstanceTransformIndexMap, objectInstanceTransformCollections),
  )
  |> ignore;
  state;
};

let handleBatchDisposeComponent =
  (.
    objectInstanceArray: array(objectInstance),
    {objectInstanceRecord, gameObjectRecord} as state,
  ) => {
    WonderLog.Contract.requireCheck(
      () => {
        open WonderLog;
        open Contract;
        open Operators;
        let objectInstanceLen = objectInstanceArray |> Js.Array.length;
        DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
          objectInstanceArray,
          isAlive,
          objectInstanceRecord,
        );
        test(
          Log.buildAssertMessage(
            ~expect={j|objectInstanceArray has one objectInstance at least|j},
            ~actual={j|$objectInstanceLen|j},
          ),
          () =>
          objectInstanceLen > 0
        );
        test(
          Log.buildAssertMessage(
            ~expect={j|all objectInstance belong to the same sourceInstance|j},
            ~actual={j|not|j},
          ),
          () => {
            let sourceInstance =
              _unsafeGetSourceInstance(
                Array.unsafe_get(objectInstanceArray, 0),
                objectInstanceRecord,
              );
            objectInstanceArray
            |> WonderCommonlib.ArrayService.forEach((. objectInstance) =>
                 _unsafeGetSourceInstance(
                   objectInstance,
                   objectInstanceRecord,
                 )
                 == sourceInstance
               );
          },
        );
      },
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let {disposedIndexArray} = objectInstanceRecord;
    let objectInstanceRecord = {
      ...objectInstanceRecord,
      disposedIndexArray:
        disposedIndexArray |> Js.Array.concat(objectInstanceArray),
    };
    let objectInstanceTransformArray =
      objectInstanceArray
      |> Js.Array.map(objectInstance =>
           GetComponentGameObjectService.unsafeGetTransformComponent(
             GameObjectObjectInstanceService.unsafeGetGameObject(
               objectInstance,
               objectInstanceRecord,
             ),
             gameObjectRecord,
           )
         );
    let sourceInstance =
      _unsafeGetSourceInstance(
        Array.unsafe_get(objectInstanceArray, 0),
        objectInstanceRecord,
      );
    let state = {...state, objectInstanceRecord};
    let state =
      _batchDisposeObjectInstance(
        sourceInstance,
        objectInstanceTransformArray,
        state,
      );
    objectInstanceArray
    |> ReduceStateMainService.reduceState(
         (. state, objectInstance) => state |> _disposeData(objectInstance),
         state,
       );
  };