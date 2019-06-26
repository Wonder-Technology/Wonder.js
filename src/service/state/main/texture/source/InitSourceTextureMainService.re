open StateDataMainType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

let _handleInitTextureWorker = (texture, state) =>
  switch (texture) {
  | None => state
  | Some(texture) =>
    IndexAllSourceTextureService.handleByJudgeSourceTextureIndex(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
      state,
      (
        (. basicSourceTexture, {settingRecord} as state) => {
          RecordBasicSourceTextureMainService.getRecord(state).
            needInitedTextureIndexArray
          |> ArrayService.push(basicSourceTexture)
          |> ignore;
          state;
        },
        (. arrayBufferViewTexture, {settingRecord} as state) => {
          RecordArrayBufferViewSourceTextureMainService.getRecord(state).
            needInitedTextureIndexArray
          |> ArrayService.push(arrayBufferViewTexture)
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
    IndexAllSourceTextureService.handleByJudgeSourceTextureIndex(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
      state,
      (
        (. basicSourceTexture, {settingRecord} as state) => {
          InitTextureService.initTexture(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            basicSourceTexture,
            RecordBasicSourceTextureMainService.getRecord(state).glTextureMap,
          )
          |> ignore;
          state;
        },
        (. arrayBufferViewTexture, {settingRecord} as state) => {
          InitTextureService.initTexture(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            arrayBufferViewTexture,
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