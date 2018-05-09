open Js.Typed_array;

open BufferTextureService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getWidthsOffset(count),
    ~length=getWidthsLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getHeightsOffset(count),
    ~length=getHeightsLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsNeedUpdatesOffset(count),
    ~length=getIsNeedUpdatesLength(count)
  )
);