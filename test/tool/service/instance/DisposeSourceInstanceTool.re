open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

let handleDisposeComponent =
  [@bs]
  (
    fun (
          sourceInstance: sourceInstance,
          batchDisposeGameObjectFunc,
          {vboBufferRecord, typeArrayPoolRecord, sourceInstanceRecord} as state
        ) => (
      {
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
        let (state, boxGeometryNeedDisposeVboBufferArr) =
          state |> _disposeData(sourceInstance, false, batchDisposeGameObjectFunc);
        (
          {
            ...state,
            sourceInstanceRecord: {
              ...state.sourceInstanceRecord,
              disposedIndexArray: disposedIndexArray |> ArrayService.push(sourceInstance)
            }
          },
          boxGeometryNeedDisposeVboBufferArr
        )
      }: (
        StateDataMainType.state,
        array(int)
      )
    )
  );