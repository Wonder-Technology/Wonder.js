open Js.Typed_array;

open BufferSourceSizeTextureService;

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
    * (getWidthsSize() + getHeightsSize())
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

let getNeedUpdate = () =>
  SourceTextureType.NEEDUPDATE |> SourceTextureType.isNeedUpdateToUint8;

let getNotNeedUpdate = () =>
  SourceTextureType.NOT_NEEDUPDATE |> SourceTextureType.isNeedUpdateToUint8;

let getDefaultIsNeedUpdate = () => getNeedUpdate();

let getFlipY = () =>
  SourceTextureType.FLIPY |> SourceTextureType.isFlipYToUint8;

let getNotFlipY = () =>
  SourceTextureType.NOT_FLIPY |> SourceTextureType.isFlipYToUint8;

let getFlipYTypeArrayValue = (isFlipY: bool) =>
  isFlipY ? getFlipY() : getNotFlipY();

let getFlipYFromTypeArrayValue = (isFlipY: int) =>
  switch (isFlipY |> SourceTextureType.uint8ToIsFlipY) {
  | SourceTextureType.FLIPY => true
  | _ => false
  };

let getDefaultFlipY = () => getFlipY();

let getIsNeedUpdateIndex = index => index * getIsNeedUpdatesSize();