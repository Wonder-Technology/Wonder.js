open StateDataMainType;

open GameObjectType;

let _buildData =
    (
      operateType,
      (
        geometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr,
        needDisposedBasicSourceTextureIndexArray,
        needDisposedArrayBufferViewTextureIndexArray,
      ),
    ) => {
  "operateType": operateType,
  "geometryNeedDisposeVboBufferArr": geometryNeedDisposeVboBufferArr,
  "sourceInstanceNeedDisposeVboBufferArr": sourceInstanceNeedDisposeVboBufferArr,
  "needDisposedBasicSourceTextureIndexArray": needDisposedBasicSourceTextureIndexArray,
  "needDisposedArrayBufferViewTextureIndexArray": needDisposedArrayBufferViewTextureIndexArray,
};

let _sendDisposeData = (operateType, needDisposeVboBufferArrTuple, state) =>
  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
  |> WorkerService.postMessage(
       _buildData(operateType, needDisposeVboBufferArrTuple),
     );

let _clearData = state =>
  state |> DisposeTextureMainService.clearNeedDisposedTextureIndexArray;

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

    let needDisposedBasicSourceTextureIndexArray =
      RecordBasicSourceTextureMainService.getRecord(state).
        needDisposedTextureIndexArray
      |> WonderCommonlib.ArrayService.removeDuplicateItems;
    let needDisposedArrayBufferViewTextureIndexArray =
      RecordArrayBufferViewSourceTextureMainService.getRecord(state).
        needDisposedTextureIndexArray
      |> WonderCommonlib.ArrayService.removeDuplicateItems;

    _sendDisposeData(
      operateType,
      (
        geometryNeedDisposeVboBufferArr,
        sourceInstanceNeedDisposeVboBufferArr,
        needDisposedBasicSourceTextureIndexArray,
        needDisposedArrayBufferViewTextureIndexArray,
      ),
      state,
    );

    let state = state |> _clearData;

    StateDataMainService.setState(stateData, state);

    Some(operateType);
  });