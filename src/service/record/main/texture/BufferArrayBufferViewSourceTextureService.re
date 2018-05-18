/* TODO duplicate */
open Js.Typed_array;

open BufferSourceSizeTextureService;

let getDefaultWrapS = () => TextureWrapService.getClampToEdge();

let getDefaultWrapT = () => TextureWrapService.getClampToEdge();

let getDefaultMagFilter = () => TextureFilterService.getLinear();

let getDefaultMinFilter = () => TextureFilterService.getNearest();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getNeedUpdate = () => 1;

let getNotNeedUpdate = () => 0;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

let getDefaultWidth = () => 0;

let getDefaultHeight = () => 0;

/*
 let getWrapSsSize = () => 1;

 let getWrapTsSize = () => 1;

 let getMagFiltersSize = () => 1;

 let getMinFiltersSize = () => 1;

 let getFormatsSize = () => 1;

 let getTypesSize = () => 1;

 let getIsNeedUpdatesSize = () => 1;

 let getWidthsSize = () => 1;

 let getHeightsSize = () => 1; */
let getWrapSsLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getWrapSsSize();

let getWrapSsOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  BufferSourceTextureService.getArrayBufferViewSourceTextureOffset(basicSourceTextureCount) + 0;

let getWrapSIndex = (index) => index * getWrapSsSize();

let getWrapTsLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getWrapTsSize();

let getWrapTsOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWrapSsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWrapSsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = (index) => index * getWrapTsSize();

let getMagFiltersLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getMagFiltersSize();

let getMagFiltersOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWrapTsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = (index) => index * getMagFiltersSize();

let getMinFiltersLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getMinFiltersSize();

let getMinFiltersOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getMagFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getMagFiltersLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = (index) => index * getMinFiltersSize();

let getFormatsLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getFormatsSize();

let getFormatsOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getMinFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getMinFiltersLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getFormatIndex = (index) => index * getFormatsSize();

let getTypesLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getTypesSize();

let getTypesOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getFormatsLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = (index) => index * getTypesSize();

let getIsNeedUpdatesLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getTypesLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = (index) => index * getIsNeedUpdatesSize();

let getWidthsLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getWidthsSize();

let getWidthsOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getIsNeedUpdatesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getIsNeedUpdatesLength(arrayBufferViewSourceTextureCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getWidthIndex = (index) => index * getWidthsSize();

let getHeightsLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount * getHeightsSize();

let getHeightsOffset = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  + getWidthsLength(arrayBufferViewSourceTextureCount)
  * Uint16Array._BYTES_PER_ELEMENT;

let getHeightIndex = (index) => index * getHeightsSize();

let getTotalByteLength = (arrayBufferViewSourceTextureCount) =>
  arrayBufferViewSourceTextureCount
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
    )
    + Uint16Array._BYTES_PER_ELEMENT
    * (getWidthsSize() + getHeightsSize())
  );