open StateDataMainType;

open RenderType;

open RenderCameraType;

let _buildData = (operateType, stateData) => {

      let {settingRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      /* let operateType = JobConfigUtils.getOperateType(flags); */
      let basicRenderObjectRecord =
        OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
      let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state);
{
           "operateType": operateType,
           "renderData": {
             "camera": {vMatrix, pMatrix, position},
             "basic": {
               "buffer": basicRenderObjectRecord.buffer,
               "count": basicRenderObjectRecord.count,
               "bufferCount": BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
             }
           }

}
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {workerInstanceRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      /* let basicRenderObjectRecord =
        OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
      let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state); */
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage(
      _buildData(operateType, stateData)  
      );
      Some(operateType)
    }
  );