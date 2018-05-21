open Js.Typed_array;

open BufferBasicSourceTextureService;

let createTypeArrays = (buffer, basicSourceTextureCount) => (
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapSsOffset(basicSourceTextureCount),
    ~length=getWrapSsLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapTsOffset(basicSourceTextureCount),
    ~length=getWrapTsLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMagFiltersOffset(basicSourceTextureCount),
    ~length=getMagFiltersLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMinFiltersOffset(basicSourceTextureCount),
    ~length=getMinFiltersLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getFormatsOffset(basicSourceTextureCount),
    ~length=getFormatsLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTypesOffset(basicSourceTextureCount),
    ~length=getTypesLength(basicSourceTextureCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsNeedUpdatesOffset(basicSourceTextureCount),
    ~length=getIsNeedUpdatesLength(basicSourceTextureCount)
  )
);