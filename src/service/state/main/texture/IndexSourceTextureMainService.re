open StateDataMainType;

open SourceTextureType;

let getBasicSourceTextureIndexOffset = () =>
  IndexSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferSettingService.getBasicSourceTextureCount(settingRecord)
  );

let generateBasicSourceTextureIndex = (basicSourceTextureIndex) =>
  IndexSourceTextureService.generateBasicSourceTextureIndex(basicSourceTextureIndex);

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord)
  );