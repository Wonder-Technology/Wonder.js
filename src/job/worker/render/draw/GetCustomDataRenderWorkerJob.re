open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);

    let state =
      OperateCustomRenderWorkerService.setCustomDataFromMainWorkerToRenderWorker(.
        data##customData,
        state,
      );

    StateRenderWorkerService.setState(stateData, state);
    e;
  });