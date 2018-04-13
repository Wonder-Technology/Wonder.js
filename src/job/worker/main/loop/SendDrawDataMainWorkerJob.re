open StateDataMainType;

open RenderType;

open RenderCameraType;

/* TODO duplicate with CreateBasicRenderObjectBufferMainWorkerJob */
let _getBasicMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {workerInstanceRecord, meshRendererRecord, settingRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let basicRenderObjectRecord =
        OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
      let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state);
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage({
           "operateType": operateType,
           "renderData": {
             "camera": {vMatrix, pMatrix, position},
             "basic": {
               "buffer": basicRenderObjectRecord.buffer,
               "count": basicRenderObjectRecord.count,
               "bufferCount": BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
             }
           }
         });
      Some(operateType)
    }
  );