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
      let {workerInstanceRecord, meshRendererRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let basicRenderObjectRecord =
        OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
      let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state);
      WonderLog.Log.log({j|send draw data in main worker|j});
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage({
           "operateType": operateType,
           "renderData": {
             "camera": {vMatrix, pMatrix, position},
             "basic": {
               "buffer": basicRenderObjectRecord.buffer,
               "count": basicRenderObjectRecord.count
               /* "renderArray":
                 state
                 |> _getBasicMaterialRenderArray(
                      meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
                    ) */
             }
           }
         });
      Some(operateType)
    }
  );