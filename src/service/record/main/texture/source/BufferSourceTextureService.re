open Js.Typed_array;

open BufferSizeTextureService;

open BufferSizeTextureService;

let _getBasicSourceTotalByteLength = basicSourceTextureCount =>
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

let _getArrayBufferViewSourceTotalByteLength =
    arrayBufferViewSourceTextureCount =>
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
      + getFlipYsSize()
    )
    + Uint16Array._BYTES_PER_ELEMENT
    * (
      BufferArrayBufferViewSourceSizeTextureService.getWidthsSize()
      + BufferArrayBufferViewSourceSizeTextureService.getHeightsSize()
    )
  );

let getBasicSourceTextureOffset = () => 0;

let getArrayBufferViewSourceTextureOffset = basicSourceTextureCount =>
  _getBasicSourceTotalByteLength(basicSourceTextureCount);

let getTotalByteLength =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  _getBasicSourceTotalByteLength(basicSourceTextureCount)
  + _getArrayBufferViewSourceTotalByteLength(
      arrayBufferViewSourceTextureCount,
    );

let createBuffer =
    (basicSourceTextureCount, arrayBufferViewSourceTextureCount) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
    ),
  );