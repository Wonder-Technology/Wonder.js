open StateDataRenderWorkerType;

let getBasicSourceTextureIndexOffset = () =>
  IndexAllSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount(settingRecord)
  );