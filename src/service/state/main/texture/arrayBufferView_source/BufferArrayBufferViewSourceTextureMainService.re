open StateDataMainType;

let getMaxArrayBufferViewSourceTextureIndex = ({settingRecord} as state) =>
  IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state)
  + BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);