open MainStateDataType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateDataMainService.getState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let offscreen =
        CreateCanvasService.createCanvas(OperateSettingService.getCanvasId(state.settingRecord))
        |> Worker.transferControlToOffscreen;
      WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           {
             "operateType": operateType,
             "canvas": offscreen,
             "contextConfig": OperateSettingService.unsafeGetContext(state.settingRecord)
           },
           [|offscreen|]
         );
      Some(operateType)
    }
  );