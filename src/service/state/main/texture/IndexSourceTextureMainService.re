open StateDataMainType;

open SourceTextureType;

let getBasicSourceTextureIndexOffset = () =>
  IndexSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  );

let generateBasicSourceTextureIndex = basicSourceTextureIndex =>
  IndexSourceTextureService.generateBasicSourceTextureIndex(
    basicSourceTextureIndex,
  );

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  );

let isBasicSourceTextureIndex = (texture, state) =>
  IndexSourceTextureService.isBasicSourceTextureIndex(
    texture,
    getArrayBufferViewSourceTextureIndexOffset(state),
  );

let isArrayBufferViewSourceTextureIndex = (texture, state) =>
  IndexSourceTextureService.isArrayBufferViewSourceTextureIndex(
    texture,
    getArrayBufferViewSourceTextureIndexOffset(state),
  );