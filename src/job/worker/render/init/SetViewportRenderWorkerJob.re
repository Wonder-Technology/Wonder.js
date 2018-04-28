open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let viewportData = data##viewportData;
      state.deviceManagerRecord =
        state.deviceManagerRecord
        |> DeviceManagerService.setViewportOfGl(
             [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
             viewportData
           )
        |> DeviceManagerService.setViewportData(viewportData);
      e
    }
  );