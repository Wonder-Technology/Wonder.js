open StateDataMainType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    switch texture {
    | None => state
    | Some(texture) =>
      /* let {needInitedTextureIndexArray} = RecordBasicSourceTextureMainService.getRecord(state); */
      RecordBasicSourceTextureMainService.getRecord(state).needInitedTextureIndexArray
      |> ArrayService.push(texture)
      |> ignore;
      /* let {needInitedTextureIndexArray} = RecordArrayBufferViewSourceTextureMainService.getRecord(state); */
      RecordArrayBufferViewSourceTextureMainService.getRecord(state).needInitedTextureIndexArray
      |> ArrayService.push(texture)
      |> ignore;
      state
    } :
    (
      switch texture {
      | None => state
      | Some(texture) =>
        InitTextureService.initTexture(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          texture,
          RecordBasicSourceTextureMainService.getRecord(state).glTextureMap
        )
        |> ignore;
        InitTextureService.initTexture(
          [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
          texture,
          RecordArrayBufferViewSourceTextureMainService.getRecord(state).glTextureMap
        )
        |> ignore;
        state
      }
    );

let clearNeedInitedTextureIndexArray = (state) => {
  ...state,
  basicSourceTextureRecord:
    Some({
      ...RecordBasicSourceTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||]
    }),
  arrayBufferViewSourceTextureRecord:
    Some({
      ...RecordArrayBufferViewSourceTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||]
    })
};