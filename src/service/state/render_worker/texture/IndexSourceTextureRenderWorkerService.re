open StateDataRenderWorkerType;

let getBasicSourceTextureIndexOffset = () =>
  IndexSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount(settingRecord)
  );