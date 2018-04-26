open StateDataMainType;

open GameObjectType;

let _sendDisposeData =
    (
      operateType,
      (
        boxGeometryNeedDisposeVboBufferArr,
        customGeometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr
      ),
      state
    ) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
  |> WorkerService.postMessage({
       "operateType": operateType,
       "boxGeometryNeedDisposeVboBufferArr": boxGeometryNeedDisposeVboBufferArr,
       "customGeometryNeedDisposeVboBufferArr": customGeometryNeedDisposeVboBufferArr,
       "sourceInstanceNeedDisposeVboBufferArr": sourceInstanceNeedDisposeVboBufferArr
     });

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let (
        state,
        boxGeometryNeedDisposeVboBufferArr,
        customGeometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr
      ) =
        DisposeJobUtils.execJob(
          DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponentForWorker,
          state
        );
      _sendDisposeData(
        operateType,
        (
          boxGeometryNeedDisposeVboBufferArr,
          customGeometryNeedDisposeVboBufferArr,
          sourceInstanceNeedDisposeVboBufferArr
        ),
        state
      );
      /*! only sync job can set state */
      state |> StateDataMainService.setState(stateData);
      Some(operateType)
    }
  );