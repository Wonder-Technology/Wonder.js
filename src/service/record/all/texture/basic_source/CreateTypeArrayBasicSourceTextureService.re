open Js.Typed_array;

open BufferBasicSourceTextureService;

let createTypeArrays = (buffer, basicSourceTextureCount) => (
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapSsOffset(basicSourceTextureCount),
    ~length=getWrapSsLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapTsOffset(basicSourceTextureCount),
    ~length=getWrapTsLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMagFiltersOffset(basicSourceTextureCount),
    ~length=getMagFiltersLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMinFiltersOffset(basicSourceTextureCount),
    ~length=getMinFiltersLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getFormatsOffset(basicSourceTextureCount),
    ~length=getFormatsLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTypesOffset(basicSourceTextureCount),
    ~length=getTypesLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsNeedUpdatesOffset(basicSourceTextureCount),
    ~length=getIsNeedUpdatesLength(basicSourceTextureCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getFlipYsOffset(basicSourceTextureCount),
    ~length=getFlipYsLength(basicSourceTextureCount),
  ),
);