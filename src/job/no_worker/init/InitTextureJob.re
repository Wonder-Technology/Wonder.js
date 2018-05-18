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
            (
              basicSourceTextureRecord.index,
              CreateSourceTextureMainService.getBasicSourceTextureIndexOffset()
            ),
            basicSourceTextureRecord.glTextureMap
          )
      }),
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
            (
              arrayBufferViewSourceTextureRecord.index,
              CreateSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state)
            ),
            arrayBufferViewSourceTextureRecord.glTextureMap
          )
      })
  }
};