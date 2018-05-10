let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    /* TODO finish */
    state :
    {
      InitTextureService.initTexture(
        [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
        texture,
        RecordTextureMainService.getRecord(state).glTextureMap
      )
      |> ignore;
      state
    };