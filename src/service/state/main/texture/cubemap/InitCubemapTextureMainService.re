open StateDataMainType;

let _handleInitTextureWorker = (texture, state) => {
  RecordCubemapTextureMainService.getRecord(state).needInitedTextureIndexArray
  |> ArrayService.push(texture)
  |> ignore;
  state;
};

let _handleInitTextureNoWorker = (texture, state) => {
  InitTextureService.initTexture(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    texture,
    RecordCubemapTextureMainService.getRecord(state).glTextureMap,
  )
  |> ignore;
  state;
};

let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    _handleInitTextureWorker(texture, state) :
    _handleInitTextureNoWorker(texture, state);

let clearNeedInitedTextureIndexArray = state => {
  ...state,
  cubemapTextureRecord:
    Some({
      ...RecordCubemapTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||],
    }),
};