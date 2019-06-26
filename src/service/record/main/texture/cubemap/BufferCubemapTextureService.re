open Js.Typed_array;

open BufferSizeTextureService;

let getDefaultWrapS = () => TextureType.Clamp_to_edge;

let getDefaultWrapT = () => TextureType.Clamp_to_edge;

let getDefaultMagFilter = () => TextureType.Linear;

let getDefaultMinFilter = () => TextureType.Nearest;

let getDefaultFormat = () => TextureType.Rgb;

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = BufferTextureService.getDefaultIsNeedUpdate;

let getDefaultFlipY = BufferTextureService.getNotFlipY;

let getWrapSsLength = cubemapTextureCount =>
  cubemapTextureCount * getWrapSsSize();

let getWrapSsOffset = cubemapTextureCount => 0;

let getWrapSIndex = index => index * getWrapSsSize();

let getWrapTsLength = cubemapTextureCount =>
  cubemapTextureCount * getWrapTsSize();

let getWrapTsOffset = cubemapTextureCount =>
  getWrapSsOffset(cubemapTextureCount)
  + getWrapSsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = index => index * getWrapTsSize();

let getMagFiltersLength = cubemapTextureCount =>
  cubemapTextureCount * getMagFiltersSize();

let getMagFiltersOffset = cubemapTextureCount =>
  getWrapTsOffset(cubemapTextureCount)
  + getWrapTsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = index => index * getMagFiltersSize();

let getMinFiltersLength = cubemapTextureCount =>
  cubemapTextureCount * getMinFiltersSize();

let getMinFiltersOffset = cubemapTextureCount =>
  getMagFiltersOffset(cubemapTextureCount)
  + getMagFiltersLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = index => index * getMinFiltersSize();

let getFormatIndex = index => index * getFormatsSize();

let getFormatsLength = cubemapTextureCount =>
  cubemapTextureCount * getFormatsSize();

let getPXFormatsOffset = cubemapTextureCount =>
  getMinFiltersOffset(cubemapTextureCount)
  + getMinFiltersLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getNXFormatsOffset = cubemapTextureCount =>
  getPXFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getPYFormatsOffset = cubemapTextureCount =>
  getNXFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getNYFormatsOffset = cubemapTextureCount =>
  getPYFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getPZFormatsOffset = cubemapTextureCount =>
  getNYFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getNZFormatsOffset = cubemapTextureCount =>
  getPYFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getPXTypesOffset = cubemapTextureCount =>
  getNZFormatsOffset(cubemapTextureCount)
  + getFormatsLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = index => index * getTypesSize();

let getTypesLength = cubemapTextureCount =>
  cubemapTextureCount * getTypesSize();

let getNXTypesOffset = cubemapTextureCount =>
  getPXTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getPYTypesOffset = cubemapTextureCount =>
  getNXTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getNYTypesOffset = cubemapTextureCount =>
  getPYTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getPZTypesOffset = cubemapTextureCount =>
  getNYTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getNZTypesOffset = cubemapTextureCount =>
  getPZTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdatesLength = cubemapTextureCount =>
  cubemapTextureCount * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = cubemapTextureCount =>
  getNZTypesOffset(cubemapTextureCount)
  + getTypesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = BufferTextureService.getIsNeedUpdateIndex;

let getFlipYsLength = cubemapTextureCount =>
  cubemapTextureCount * getFlipYsSize();

let getFlipYsOffset = cubemapTextureCount =>
  getIsNeedUpdatesOffset(cubemapTextureCount)
  + getIsNeedUpdatesLength(cubemapTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFlipYIndex = index => index * getFlipYsSize();

let getTotalByteLength = cubemapTextureCount =>
  cubemapTextureCount
  * (
    Uint8Array._BYTES_PER_ELEMENT
    * (
      getWrapSsSize()
      + getWrapTsSize()
      + getMagFiltersSize()
      + getMinFiltersSize()
      + getFormatsSize()
      * 6
      + getTypesSize()
      * 6
      + getIsNeedUpdatesSize()
      + getFlipYsSize()
    )
  );

let createBuffer = cubemapTextureCount =>
  Worker.newSharedArrayBuffer(getTotalByteLength(cubemapTextureCount));