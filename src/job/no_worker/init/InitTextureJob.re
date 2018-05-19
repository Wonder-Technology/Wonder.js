open StateDataMainType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let basicSourceTextureRecord = RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...basicSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
            ArrayService.range(0, basicSourceTextureRecord.index - 1),
            basicSourceTextureRecord.glTextureMap
          )
      }),
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
            ArrayService.range(0, arrayBufferViewSourceTextureRecord.index - 1),
            arrayBufferViewSourceTextureRecord.glTextureMap
          )
      })
  }
};