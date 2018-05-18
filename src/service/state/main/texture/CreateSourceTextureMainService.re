open StateDataMainType;

open SourceTextureType;

let getBasicSourceTextureIndexOffset = () =>
  IndexSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferSettingService.getBasicSourceTextureCount(settingRecord)
  );

let getBasicSourceTextureIndex = (basicSourceTextureIndex) =>
  IndexSourceTextureService.getBasicSourceTextureIndex(basicSourceTextureIndex);

let getArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureService.getArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord)
  );