open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    state.deviceManagerRecord =
      InitStateJobUtils.execJob(state.deviceManagerRecord);

    let _initState =
      InitNoMaterialShaderJobUtils.exec(
        AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
        CreateInitNoMaterialShaderStateRenderWorkerService.createInitNoMaterialShaderState(
          state,
        ),
      );

    StateRenderWorkerService.setState(stateData, state);
    e;
  });