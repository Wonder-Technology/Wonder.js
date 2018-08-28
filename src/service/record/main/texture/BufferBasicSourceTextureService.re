open Js.Typed_array;

open BufferSourceSizeTextureService;

let getDefaultWrapS = () => SourceTextureType.Clamp_to_edge;

let getDefaultWrapT = () => SourceTextureType.Clamp_to_edge;

let getDefaultMagFilter = () => SourceTextureType.Linear;

let getDefaultMinFilter = () => SourceTextureType.Nearest;

let getDefaultFormat = () => SourceTextureType.Rgba;

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = BufferSourceTextureService.getDefaultIsNeedUpdate;

let getDefaultFlipY = BufferSourceTextureService.getDefaultFlipY;

let getWrapSsLength = basicSourceTextureCount =>
  basicSourceTextureCount * getWrapSsSize();

let getWrapSsOffset = basicSourceTextureCount =>
  BufferSourceTextureService.getBasicSourceTextureOffset() + 0;

let getWrapSIndex = index => index * getWrapSsSize();

let getWrapTsLength = basicSourceTextureCount =>
  basicSourceTextureCount * getWrapTsSize();

let getWrapTsOffset = basicSourceTextureCount =>
  getWrapSsOffset(basicSourceTextureCount)
  + getWrapSsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = index => index * getWrapTsSize();

let getMagFiltersLength = basicSourceTextureCount =>
  basicSourceTextureCount * getMagFiltersSize();

let getMagFiltersOffset = basicSourceTextureCount =>
  getWrapTsOffset(basicSourceTextureCount)
  + getWrapTsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = index => index * getMagFiltersSize();

let getMinFiltersLength = basicSourceTextureCount =>
  basicSourceTextureCount * getMinFiltersSize();

let getMinFiltersOffset = basicSourceTextureCount =>
  getMagFiltersOffset(basicSourceTextureCount)
  + getMagFiltersLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = index => index * getMinFiltersSize();

let getFormatsLength = basicSourceTextureCount =>
  basicSourceTextureCount * getFormatsSize();

let getFormatsOffset = basicSourceTextureCount =>
  getMinFiltersOffset(basicSourceTextureCount)
  + getMinFiltersLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFormatIndex = index => index * getFormatsSize();

let getTypesLength = basicSourceTextureCount =>
  basicSourceTextureCount * getTypesSize();

let getTypesOffset = basicSourceTextureCount =>
  getFormatsOffset(basicSourceTextureCount)
  + getFormatsLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = index => index * getTypesSize();

let getIsNeedUpdatesLength = basicSourceTextureCount =>
  basicSourceTextureCount * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = basicSourceTextureCount =>
  getTypesOffset(basicSourceTextureCount)
  + getTypesLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = BufferSourceTextureService.getIsNeedUpdateIndex;

let getFlipYsLength = basicSourceTextureCount =>
  basicSourceTextureCount * getFlipYsSize();

let getFlipYsOffset = basicSourceTextureCount =>
  getIsNeedUpdatesOffset(basicSourceTextureCount)
  + getIsNeedUpdatesLength(basicSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFlipYIndex = index => index * getFlipYsSize();

let getTotalByteLength = basicSourceTextureCount =>
  basicSourceTextureCount
  * (
    Uint8Array._BYTES_PER_ELEMENT
    * (
      getWrapSsSize()
      + getWrapTsSize()
      + getMagFiltersSize()
      + getMinFiltersSize()
      + getFormatsSize()
      + getTypesSize()
      + getIsNeedUpdatesSize()
      + getFlipYsSize()
    )
  );