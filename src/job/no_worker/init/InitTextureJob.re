open StateDataMainType;

let _initRenderTextureData = state => {
  ...state,
  renderRecord:
    Some({
      ...RecordRenderMainService.getRecord(state),
      textureRecord:
        Some({
          activableTextureUnitArray:
            OperateTextureRenderMainService.createActivableTextureUnitArray(
              state,
            ),
        }),
    }),
};

let execJob = (flags, {gameObjectRecord} as state) => {
  let basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);
  let arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);
  let cubemapTextureRecord = RecordCubemapTextureMainService.getRecord(state);

  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...basicSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            ArrayService.range(0, basicSourceTextureRecord.index - 1),
            basicSourceTextureRecord.glTextureMap,
          ),
      }),
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            IndexAllArrayBufferViewSourceTextureService.getAllArrayBufferViewSourceTextureIndexWhenInit(
              arrayBufferViewSourceTextureRecord.index,
              state.settingRecord
              |> BufferSettingService.getBasicSourceTextureCount,
            ),
            arrayBufferViewSourceTextureRecord.glTextureMap,
          ),
      }),
    cubemapTextureRecord:
      Some({
        ...cubemapTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            ArrayService.range(0, cubemapTextureRecord.index - 1),
            cubemapTextureRecord.glTextureMap,
          ),
      }),
  }
  |> _initRenderTextureData;
};