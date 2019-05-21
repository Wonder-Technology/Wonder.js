open StateDataMainType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

let _handleInitTextureWorker = (texture, state) =>
  switch (texture) {
  | None => state
  | Some(texture) =>
    IndexSourceTextureService.handleByJudgeSourceTextureIndex(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
      state,
      (
        (. basicSourceTextureInTypeArray, {settingRecord} as state) => {
          RecordBasicSourceTextureMainService.getRecord(state).
            needInitedTextureIndexArray
          |> ArrayService.push(texture)
          |> ignore;
          state;
        },
        (. arrayBufferViewTextureInTypeArray, {settingRecord} as state) => {
          RecordArrayBufferViewSourceTextureMainService.getRecord(state).
            needInitedTextureIndexArray
          |> ArrayService.push(texture)
          |> ignore;
          state;
        },
      ),
    )
  };

let _handleInitTextureNoWorker = (texture, state) =>
  switch (texture) {
  | None => state
  | Some(texture) =>
    IndexSourceTextureService.handleByJudgeSourceTextureIndex(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
      state,
      (
        (. basicSourceTextureInTypeArray, {settingRecord} as state) => {
          InitTextureService.initTexture(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            basicSourceTextureInTypeArray,
            RecordBasicSourceTextureMainService.getRecord(state).glTextureMap,
          )
          |> ignore;
          state;
        },
        (. arrayBufferViewTextureInTypeArray, {settingRecord} as state) => {
          InitTextureService.initTexture(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            arrayBufferViewTextureInTypeArray,
            RecordArrayBufferViewSourceTextureMainService.getRecord(state).
              glTextureMap,
          )
          |> ignore;
          state;
        },
      ),
    )
  };

let initTexture = (texture, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    _handleInitTextureWorker(texture, state) :
    _handleInitTextureNoWorker(texture, state);

let clearNeedInitedTextureIndexArray = state => {
  ...state,
  basicSourceTextureRecord:
    Some({
      ...RecordBasicSourceTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||],
    }),
  arrayBufferViewSourceTextureRecord:
    Some({
      ...RecordArrayBufferViewSourceTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||],
    }),
};