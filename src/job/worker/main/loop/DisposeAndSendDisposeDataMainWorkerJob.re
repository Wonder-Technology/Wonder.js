open StateDataMainType;

open GameObjectType;

let _buildData =
    (
      operateType,
      (
        geometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr,
      ),
    ) => {
  "operateType": operateType,
  "geometryNeedDisposeVboBufferArr": geometryNeedDisposeVboBufferArr,
  "sourceInstanceNeedDisposeVboBufferArr": sourceInstanceNeedDisposeVboBufferArr,
};

let _sendDisposeData = (operateType, needDisposeVboBufferArrTuple, state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
  |> WorkerService.postMessage(
       _buildData(operateType, needDisposeVboBufferArrTuple),
     );

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);
    let operateType = JobConfigUtils.getOperateType(flags);
    let (
      state,
      geometryNeedDisposeVboBufferArr,
      sourceInstanceNeedDisposeVboBufferArr,
    ) =
      DisposeJobUtils.execJob(
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponentDataForWorker,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentDataForWorker,
        state,
      );
    _sendDisposeData(
      operateType,
      (
        geometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr,
      ),
      state,
    );
    StateDataMainService.setState(stateData, state);
    Some(operateType);
  });