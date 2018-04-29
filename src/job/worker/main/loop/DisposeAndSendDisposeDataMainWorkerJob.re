open StateDataMainType;

open GameObjectType;

let _buildData =
    (
      operateType,
      (
        boxGeometryNeedDisposeVboBufferArr,
        customGeometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr
      )
    ) => {
  "operateType": operateType,
  "boxGeometryNeedDisposeVboBufferArr": boxGeometryNeedDisposeVboBufferArr,
  "customGeometryNeedDisposeVboBufferArr": customGeometryNeedDisposeVboBufferArr,
  "sourceInstanceNeedDisposeVboBufferArr": sourceInstanceNeedDisposeVboBufferArr
};

let _sendDisposeData = (operateType, needDisposeVboBufferArrTuple, state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
  |> WorkerService.postMessage(_buildData(operateType, needDisposeVboBufferArrTuple));

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
          DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentForWorker,
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
      StateDataMainService.setState(stateData, state);
      Some(operateType)
    }
  );