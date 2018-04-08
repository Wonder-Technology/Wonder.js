open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {workerInstanceRecord} as state = StateDataMainService.getState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      WonderLog.Log.log({j|send draw data in main worker|j});
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage({"operateType": operateType});
      Some(operateType)
    }
  );