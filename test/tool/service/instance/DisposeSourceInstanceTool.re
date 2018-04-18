open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

let handleDisposeComponent =
  [@bs]
  (
    (
      sourceInstance: sourceInstance,
      batchDisposeGameObjectFunc,
      {vboBufferRecord, typeArrayPoolRecord, sourceInstanceRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAlive(
                  sourceInstance,
                  isAlive,
                  sourceInstanceRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let {disposedIndexArray} = sourceInstanceRecord;
      let state = {
        ...state,
        vboBufferRecord:
          PoolVboBufferService.addInstanceBufferToPool(sourceInstance, vboBufferRecord)
      };
      let state = state |> _disposeData(sourceInstance, false, batchDisposeGameObjectFunc);
      {
        ...state,
        sourceInstanceRecord: {
          ...state.sourceInstanceRecord,
          disposedIndexArray: disposedIndexArray |> ArrayService.push(sourceInstance)
        }
      }
    }
  );