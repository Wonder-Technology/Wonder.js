open Js.Typed_array;

open BufferArrayBufferViewSourceTextureService;

let createTypeArrays = (buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount) => (
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapSsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getWrapSsLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapTsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getWrapTsLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMagFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getMagFiltersLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMinFiltersOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getMinFiltersLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getFormatsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getFormatsLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTypesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getTypesLength(arrayBufferViewSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsNeedUpdatesOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getIsNeedUpdatesLength(arrayBufferViewSourceTextureCount)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWidthsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getWidthsLength(arrayBufferViewSourceTextureCount)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getHeightsOffset(basicSourceTextureCount, arrayBufferViewSourceTextureCount),
    ~length=getHeightsLength(arrayBufferViewSourceTextureCount)
  )
);