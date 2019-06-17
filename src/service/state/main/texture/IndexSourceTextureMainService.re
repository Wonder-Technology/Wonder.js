open StateDataMainType;

open SourceTextureType;

let getBasicSourceTextureIndexOffset = () =>
  IndexAllSourceTextureService.getBasicSourceTextureIndexOffset();

let getArrayBufferViewSourceTextureIndexOffset = ({settingRecord} as state) =>
  IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexOffset(
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  );

let generateBasicSourceTextureIndex = basicSourceTextureIndex =>
  IndexAllSourceTextureService.generateBasicSourceTextureIndex(
    basicSourceTextureIndex,
  );

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexAllSourceTextureService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    BufferSettingService.getBasicSourceTextureCount(settingRecord),
  );

let isBasicSourceTextureIndex = (texture, state) =>
  IndexAllSourceTextureService.isBasicSourceTextureIndex(
    texture,
    getArrayBufferViewSourceTextureIndexOffset(state),
  );

let isArrayBufferViewSourceTextureIndex = (texture, state) =>
  IndexAllSourceTextureService.isArrayBufferViewSourceTextureIndex(
    texture,
    getArrayBufferViewSourceTextureIndexOffset(state),
  );