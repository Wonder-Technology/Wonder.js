open Js.Typed_array;

open BufferTextureService;

let createTypeArrays = (buffer, count) => (
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapSsOffset(count),
    ~length=getWrapSsLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWrapTsOffset(count),
    ~length=getWrapTsLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMagFiltersOffset(count),
    ~length=getMagFiltersLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMinFiltersOffset(count),
    ~length=getMinFiltersLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getFormatsOffset(count),
    ~length=getFormatsLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTypesOffset(count),
    ~length=getTypesLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsNeedUpdatesOffset(count),
    ~length=getIsNeedUpdatesLength(count)
  )
);