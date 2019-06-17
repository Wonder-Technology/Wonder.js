open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let gl =
        data##canvas
        |> GlService.createGl(
             ContextConfigSettingService.convertContextConfigDataToJsObj(data##contextConfig)
           );
      /* WonderLog.Log.logVar(("gl: ", gl)); */
      state.deviceManagerRecord = state.deviceManagerRecord |> AllDeviceManagerService.setGl(gl);
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );