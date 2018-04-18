open StateDataMainType;

open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open ObjectInstanceType;

open DisposeObjectInstanceMainService;

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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
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