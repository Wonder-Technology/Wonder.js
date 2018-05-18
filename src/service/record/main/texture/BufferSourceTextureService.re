open Js.Typed_array;

open BufferSourceSizeTextureService;

let _getBasicSourceTotalByteLength = (basicSourceTextureCount) =>
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
    )
  );

let _getArrayBufferViewSourceTotalByteLength = (arrayBufferViewSourceTextureCount) =>
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

let getBasicSourceTextureOffset = () => 0;

let getArrayBufferViewSourceTextureOffset = (basicSourceTextureCount) =>
  _getBasicSourceTotalByteLength(basicSourceTextureCount);

let _getArrayBufferViewSourceTotalByteLength = (arrayBufferViewSourceTextureCount) =>
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

let getTotalByteLength = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  _getBasicSourceTotalByteLength(basicSourceTextureCount)
  + _getArrayBufferViewSourceTotalByteLength(arrayBufferViewSourceTextureCount);

let createBuffer = (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(basicSourceTextureCount, arrayBufferViewSourceTextureCount)
  );