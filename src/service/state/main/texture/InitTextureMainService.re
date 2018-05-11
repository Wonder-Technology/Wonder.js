open TextureType;

let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    {
      let {needInitedTextureIndexArray} = RecordTextureMainService.getRecord(state);
      needInitedTextureIndexArray |> ArrayService.push(texture) |> ignore;
      state
    } :
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

let clearNeedInitedTextureIndexArray = (state) => {
  ...state,
  textureRecord:
    Some({...RecordTextureMainService.getRecord(state), needInitedTextureIndexArray: [||]})
};