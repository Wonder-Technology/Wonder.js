open StateDataMainType;

open BasicSourceTextureType;

open ArrayBufferViewSourceTextureType;

let initTexture = (texture, {settingRecord} as state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    switch texture {
    | None => state
    | Some(texture) =>
      IndexSourceTextureService.handleByJudgeSourceTextureIndex(
        texture,
        IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state),
        state,
        (
          [@bs]
          (
            (basicSourceTextureInTypeArray, {settingRecord} as state) => {
              RecordBasicSourceTextureMainService.getRecord(state).needInitedTextureIndexArray
              |> ArrayService.push(texture)
              |> ignore;
              state
            }
          ),
          [@bs]
          (
            (arrayBufferViewTextureInTypeArray, {settingRecord} as state) => {
              RecordArrayBufferViewSourceTextureMainService.getRecord(state).
                needInitedTextureIndexArray
              |> ArrayService.push(texture)
              |> ignore;
              state
            }
          )
        )
      )
    } :
    (
      switch texture {
      | None => state
      | Some(texture) =>
        IndexSourceTextureService.handleByJudgeSourceTextureIndex(
          texture,
          IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state),
          state,
          (
            [@bs]
            (
              (basicSourceTextureInTypeArray, {settingRecord} as state) => {
                InitTextureService.initTexture(
                  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                  basicSourceTextureInTypeArray,
                  RecordBasicSourceTextureMainService.getRecord(state).glTextureMap
                )
                |> ignore;
                state
              }
            ),
            [@bs]
            (
              (arrayBufferViewTextureInTypeArray, {settingRecord} as state) => {
                InitTextureService.initTexture(
                  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                  arrayBufferViewTextureInTypeArray,
                  RecordArrayBufferViewSourceTextureMainService.getRecord(state).glTextureMap
                )
                |> ignore;
                state
              }
            )
          )
        )
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