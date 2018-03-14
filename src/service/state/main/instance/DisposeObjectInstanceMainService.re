open StateDataType;

open GameObjectType;

open SourceInstanceType;

open ObjectInstanceType;

open DisposeComponentService;

let isAlive = (objectInstance, {disposedIndexArray} as objectInstanceRecord) =>
  DisposeComponentService.isAlive(objectInstance, disposedIndexArray);

let _unsafeGetSourceInstance = (objectInstance: objectInstance, {sourceInstanceMap}) =>
  sourceInstanceMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(objectInstance)
  |> WonderLog.Contract.ensureCheck(
       (sourceInstance) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|souceInstance exist|j}, ~actual={j|not|j}),
                 () => sourceInstance |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
     );

let _disposeData = (objectInstance: objectInstance, {objectInstanceRecord} as state) => {
  let {sourceInstanceMap, gameObjectMap} = objectInstanceRecord;
  {
    ...state,
    objectInstanceRecord: {
      ...objectInstanceRecord,
      sourceInstanceMap: sourceInstanceMap |> disposeSparseMapData(objectInstance),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(objectInstance)
    }
  }
};

let _disposeObjectInstance =
    (sourceInstance, objectInstanceUid: int, {sourceInstanceRecord} as state) => {
  let {objectInstanceArrayMap} = sourceInstanceRecord;
  objectInstanceArrayMap
  |> ObjectInstanceArraySourceInstanceService.unsafeGetObjectInstanceArray(sourceInstance)
  |> removeFromArray(objectInstanceUid)
  |> ignore;
  state
};

let handleDisposeComponent =
    (objectInstance: objectInstance, {sourceInstanceRecord, objectInstanceRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              objectInstance,
              isAlive,
              objectInstanceRecord
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let {disposedIndexArray} = objectInstanceRecord;
  let state =
    state
    |> _disposeObjectInstance(
         _unsafeGetSourceInstance(objectInstance, objectInstanceRecord),
         GameObjectObjectInstanceService.unsafeGetGameObject(objectInstance, objectInstanceRecord)
       )
    |> _disposeData(objectInstance);
  {
    ...state,
    objectInstanceRecord:
      /* record
           |> _disposeObjectInstance(
                _unsafeGetSourceInstance(objectInstance, record),
                GameObjectObjectInstanceService.unsafeGetGameObject(objectInstance, record)
              )
           |> _disposeData(objectInstance),
         disposedIndexArray: disposedIndexArray |> ArrayService.push(objectInstance) */
      {
        ...objectInstanceRecord,
        disposedIndexArray: disposedIndexArray |> ArrayService.push(objectInstance)
      }
  }
};

let _batchDisposeObjectInstance =
    (sourceInstance, isUidDisposedMap, disposedUidArr, {sourceInstanceRecord} as state) => {
  let {objectInstanceArrayMap} = sourceInstanceRecord;
  objectInstanceArrayMap
  |> WonderCommonlib.SparseMapSystem.set(
       sourceInstance,
       batchRemoveFromArray(isUidDisposedMap, disposedUidArr)
     )
  |> ignore;
  state
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      objectInstanceArray: array(objectInstance),
      isGameObjectDisposedMap: array(bool),
      {objectInstanceRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let objectInstanceLen = objectInstanceArray |> Js.Array.length;
          test(
            Log.buildAssertMessage(
              ~expect={j|objectInstanceArray has one objectInstance at least|j},
              ~actual={j|$objectInstanceLen|j}
            ),
            () => objectInstanceLen > 0
          );
          test(
            Log.buildAssertMessage(
              ~expect={j|all objectInstance belong to the same sourceInstance|j},
              ~actual={j|not|j}
            ),
            () => {
              let sourceInstance =
                _unsafeGetSourceInstance(objectInstanceArray[0], objectInstanceRecord);
              objectInstanceArray
              |> WonderCommonlib.ArraySystem.forEach(
                   [@bs]
                   (
                     (objectInstance) =>
                       _unsafeGetSourceInstance(objectInstance, objectInstanceRecord)
                       == sourceInstance
                   )
                 )
            }
          )
        },
        StateData.stateData.isDebug
      );
      let {disposedIndexArray} = objectInstanceRecord;
      let objectInstanceRecord = {
        ...objectInstanceRecord,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(objectInstanceArray)
      };
      let disposedUidArr =
        objectInstanceArray
        |> Js.Array.map(
             (objectInstance) =>
               GameObjectObjectInstanceService.unsafeGetGameObject(
                 objectInstance,
                 objectInstanceRecord
               )
           );
      let isGameObjectDisposedMap =
        DisposeECSService.buildMapFromArray(
          disposedUidArr,
          WonderCommonlib.SparseMapSystem.createEmpty()
        );
      let sourceInstance = _unsafeGetSourceInstance(objectInstanceArray[0], objectInstanceRecord);
      let state = {...state, objectInstanceRecord};
      let state =
        _batchDisposeObjectInstance(
          sourceInstance,
          isGameObjectDisposedMap,
          disposedUidArr,
          state
        );
      objectInstanceArray
      |> ArraySystem.reduceState(
           [@bs] ((state, objectInstance) => state |> _disposeData(objectInstance)),
           state
         )
    }
  );