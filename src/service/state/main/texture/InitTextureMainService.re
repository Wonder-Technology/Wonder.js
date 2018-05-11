let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    /* TODO finish */
    state :
    (
      switch texture {
      | None => state
      | Some(texture) =>
        InitTextureService.initTexture(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          texture,
          RecordTextureMainService.getRecord(state).glTextureMap
        )
        |> ignore;
        state
      }
    );