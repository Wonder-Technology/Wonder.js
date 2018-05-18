open StateDataRenderWorkerType;

let getBasicSourceTextureIndexOffset = ({settingRecord} as state) => 0;

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount(settingRecord);