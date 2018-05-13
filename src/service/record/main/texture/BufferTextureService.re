open Js.Typed_array;

let getDefaultWrapS = () => TextureWrapService.getClampToEdge();

let getDefaultWrapT = () => TextureWrapService.getClampToEdge();

let getDefaultMagFilter = () => TextureFilterService.getLinear();

let getDefaultMinFilter = () => TextureFilterService.getNearest();

let getDefaultFormat = () => TextureFormatService.getRgba();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getNeedUpdate = () => 1;

let getNotNeedUpdate = () => 0;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

let getWrapSsSize = () => 1;

let getWrapTsSize = () => 1;

let getMagFiltersSize = () => 1;

let getMinFiltersSize = () => 1;

let getFormatsSize = () => 1;

let getTypesSize = () => 1;

let getIsNeedUpdatesSize = () => 1;

let getWrapSsLength = (count) => count * getWrapSsSize();

let getWrapSsOffset = (count) => 0;

let getWrapSIndex = (index) => index * getWrapSsSize();

let getWrapTsLength = (count) => count * getWrapTsSize();

let getWrapTsOffset = (count) =>
  getWrapSsOffset(count) + getWrapSsLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getWrapTIndex = (index) => index * getWrapTsSize();

let getMagFiltersLength = (count) => count * getMagFiltersSize();

let getMagFiltersOffset = (count) =>
  getWrapTsOffset(count) + getWrapTsLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getMagFilterIndex = (index) => index * getMagFiltersSize();

let getMinFiltersLength = (count) => count * getMinFiltersSize();

let getMinFiltersOffset = (count) =>
  getMagFiltersOffset(count) + getMagFiltersLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getMinFilterIndex = (index) => index * getMinFiltersSize();

let getFormatsLength = (count) => count * getFormatsSize();

let getFormatsOffset = (count) =>
  getMinFiltersOffset(count) + getMinFiltersLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getFormatIndex = (index) => index * getFormatsSize();

let getTypesLength = (count) => count * getTypesSize();

let getTypesOffset = (count) =>
  getFormatsOffset(count) + getFormatsLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getTypeIndex = (index) => index * getTypesSize();

let getIsNeedUpdatesLength = (count) => count * getIsNeedUpdatesSize();

let getIsNeedUpdatesOffset = (count) =>
  getTypesOffset(count) + getTypesLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getIsNeedUpdateIndex = (index) => index * getIsNeedUpdatesSize();

let getTotalByteLength = (count) =>
  count
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
  );

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));