open StateDataMainType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...basicSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            ArrayService.range(0, basicSourceTextureRecord.index - 1),
            basicSourceTextureRecord.glTextureMap,
          ),
      }),
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            IndexArrayBufferViewSourceTextureService.getAllArrayBufferViewSourceTextureIndexWhenInit(
              arrayBufferViewSourceTextureRecord.index,
              state.settingRecord
              |> BufferSettingService.getBasicSourceTextureCount,
            ),
            arrayBufferViewSourceTextureRecord.glTextureMap,
          ),
      }),
  };
};