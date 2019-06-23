open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);

    let data = MessageService.getRecord(e);

    switch (IsRenderUtils.isRender(data)) {
    | false => e
    | true =>
      let skyboxData = data##renderData##skyboxData;
      let cubemapTextureOpt = skyboxData##cubemapTextureOpt;
      let renderSkyboxGameObjectData = skyboxData##renderSkyboxGameObjectData;

      let _renderState =
        RenderSkyboxJobUtils.exec(
          AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
          cubemapTextureOpt,
          renderSkyboxGameObjectData,
          CreateRenderStateRenderWorkerService.createRenderState(state),
        );

      state |> StateRenderWorkerService.setState(stateData);

      e;
    };
  });