open StateDataMainType;

open RenderType;

open RenderCameraType;

let _buildData = (operateType, stateData) => {
  let {settingRecord} as state = StateDataMainService.unsafeGetState(stateData);
  let basicRenderObjectRecord = OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
  let cameraData = OperateRenderMainService.getCameraRecord(state);
  let isRender = cameraData |> Js.Option.isSome;
  let (isRender, cameraData) =
    switch (OperateRenderMainService.getCameraRecord(state)) {
    | None => (Js.false_, Js.Nullable.empty)
    | Some({vMatrix, pMatrix, position}) => (
        Js.true_,
        Js.Nullable.return({"vMatrix": vMatrix, "pMatrix": pMatrix, "position": position})
      )
    };
  {
    "operateType": operateType,
    "renderData": {
      "isRender": isRender,
      "camera": cameraData,
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
      let {workerInstanceRecord} as state = StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      /* let basicRenderObjectRecord =
           OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
         let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state); */
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage(_buildData(operateType, stateData));
      Some(operateType)
    }
  );