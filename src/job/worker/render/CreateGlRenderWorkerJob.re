open RenderWorkerStateDataType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderService.getState(stateData);
      let data = MessageService.getData(e);
      let gl =
        data##canvas
        |> GlService.createGl(
             ContextConfigSettingService.convertContextConfigDataToJsObj(data##contextConfig)
           );
      WonderLog.Log.logVar(("gl: ", gl));
      state.deviceManagerRecord = state.deviceManagerRecord |> DeviceManagerService.setGl(gl);
      e
    }
  );