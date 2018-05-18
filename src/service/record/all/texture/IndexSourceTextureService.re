let getBasicSourceTextureIndexOffset = () => 0;

let getArrayBufferViewSourceTextureIndexOffset = (basicSourceTextureCount) => basicSourceTextureCount;

let getBasicSourceTextureIndex = (basicSourceTextureIndex) =>
  getBasicSourceTextureIndexOffset() + basicSourceTextureIndex;

let getArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, basicSourceTextureCount) =>
  getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount)
  + arrayBufferViewSourceTextureIndex;

let isBasicSourceTextureIndex = (textureIndex, basicSourceTextureCount) =>
  textureIndex < getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount);

let isArrayBufferViewSourceTextureIndex = (textureIndex, basicSourceTextureCount) =>
  textureIndex >= getArrayBufferViewSourceTextureIndexOffset(basicSourceTextureCount);