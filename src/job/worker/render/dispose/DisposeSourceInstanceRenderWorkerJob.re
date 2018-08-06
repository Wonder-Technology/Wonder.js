open StateDataRenderWorkerType;

open RenderWorkerSourceInstanceType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let {sourceInstanceRecord, typeArrayPoolRecord, settingRecord} as state =
      StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let {
      matrixFloat32ArrayMap,
      matrixInstanceBufferCapacityMap,
      isSendTransformMatrixDataMap,
    } = sourceInstanceRecord;
    let (
      matrixFloat32ArrayMap,
      matrixInstanceBufferCapacityMap,
      isSendTransformMatrixDataMap,
    ) =
      data##sourceInstanceNeedDisposeVboBufferArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (
               matrixFloat32ArrayMap,
               matrixInstanceBufferCapacityMap,
               isSendTransformMatrixDataMap,
             ),
             sourceInstance,
           ) => (
             DisposeSourceInstanceAllService.disposeMatrixFloat32ArrayMap(
               sourceInstance,
               MemoryRenderWorkerSettingService.getMaxBigTypeArrayPoolSize(
                 settingRecord,
               ),
               matrixFloat32ArrayMap,
               typeArrayPoolRecord,
             ),
             DisposeSourceInstanceAllService.disposeMatrixInstanceBufferCapacityMap(
               sourceInstance,
               matrixInstanceBufferCapacityMap,
             ),
             DisposeSourceInstanceAllService.disposeIsSendTransformMatrixDataMap(
               sourceInstance,
               isSendTransformMatrixDataMap,
             ),
           ),
           (
             matrixFloat32ArrayMap,
             matrixInstanceBufferCapacityMap,
             isSendTransformMatrixDataMap,
           ),
         );
    state.sourceInstanceRecord = {
      ...sourceInstanceRecord,
      matrixFloat32ArrayMap,
      matrixInstanceBufferCapacityMap,
      isSendTransformMatrixDataMap,
    };
    StateRenderWorkerService.setState(stateData, state);
    e;
  });