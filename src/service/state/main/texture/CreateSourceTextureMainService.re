open StateDataMainType;

open SourceTextureType;

let getBasicSourceTextureIndexOffset = ({settingRecord} as state) => 0;

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  BufferSettingService.getBasicSourceTextureCount(settingRecord);

let getBasicSourceTextureIndex = (basicSourceTextureIndex, state) =>
  getBasicSourceTextureIndexOffset(state) + basicSourceTextureIndex;

let getArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  getArrayBufferViewSourceTextureIndexOffset(state) + arrayBufferViewSourceTextureIndex;