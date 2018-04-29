open StateDataRenderWorkerType;

open RenderWorkerWorkerDetectType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let workerDetectData = data##workerDetectData;
      state.workerDetectRecord = Some({isUseWorker: workerDetectData##isUseWorker});
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );